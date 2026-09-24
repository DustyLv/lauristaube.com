import { json, uuid, text, jsonList, invalidateContent } from "../_utils.js";

// Projects. Reading is done through /api/admin/content (drafts included) and /api/content.
//
//   POST   /api/admin/projects        create (new projects go to the end of the list)
//   PUT    /api/admin/projects        update (body carries the id)
//   DELETE /api/admin/projects/:id    projects/[id].js
//
// Body: { id?, title, description, long_description, icon, tags[], details[{label,value}],
//         links[{label,url}], is_featured, status, media[{kind:'upload',r2_key,caption} |
//         {kind:'video',url,caption}] }

export async function onRequestPost(context) {
    return handleSave(context, "POST");
}

export async function onRequestPut(context) {
    return handleSave(context, "PUT");
}

const isHttpUrl = v => /^https?:\/\/\S+$/i.test(v || "");

async function handleSave(context, method) {
    const { request, env } = context;

    try {
        const data = await request.json();
        const isPost = method === "POST";
        const id = isPost ? uuid() : data.id;

        const title = text(data.title);
        const description = text(data.description);
        if (!title) return json({ error: "A title is required." }, 400);
        if (!description) return json({ error: "A short description is required." }, 400);

        const tags = jsonList(data.tags, t => text(t));
        const details = jsonList(data.details, d => {
            const label = text(d && d.label), value = text(d && d.value);
            return label && value ? { label, value } : null;
        });
        const links = jsonList(data.links, l => {
            const label = text(l && l.label), url = text(l && l.url);
            return label && isHttpUrl(url) ? { label, url } : null;
        });
        const isFeatured = data.is_featured ? 1 : 0;
        const status = data.status === "published" ? "published" : "draft";

        const rows = [];
        for (const m of data.media || []) {
            if (m && m.kind === "upload" && text(m.r2_key)) {
                rows.push({ kind: "upload", r2_key: text(m.r2_key), url: null, caption: text(m.caption) });
            } else if (m && m.kind === "video" && isHttpUrl(text(m.url))) {
                rows.push({ kind: "video", r2_key: null, url: text(m.url), caption: text(m.caption) });
            }
        }

        let previousUploads = [];
        if (!isPost) {
            const existing = await env.DB.prepare("SELECT id FROM projects WHERE id = ?").bind(id).first();
            if (!existing) return json({ error: "Project not found." }, 404);
            const old = await env.DB.prepare(
                "SELECT r2_key FROM project_media WHERE project_id = ? AND kind = 'upload'"
            ).bind(id).all();
            previousUploads = old.results.map(r => r.r2_key);
        }

        const fields = [
            title, description, data.long_description || null, text(data.icon),
            tags, details, links, isFeatured, status
        ];
        const statements = [];
        // Only one project can be featured: taking the flag clears it everywhere else.
        if (isFeatured) {
            statements.push(env.DB.prepare("UPDATE projects SET is_featured = 0 WHERE id <> ?").bind(id));
        }
        if (isPost) {
            statements.push(env.DB.prepare(`
                INSERT INTO projects (title, description, long_description, icon, tags, details, links,
                                      is_featured, status, id, position)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT COALESCE(MAX(position), -1) + 1 FROM projects))
            `).bind(...fields, id));
        } else {
            statements.push(env.DB.prepare(`
                UPDATE projects SET title = ?, description = ?, long_description = ?, icon = ?,
                       tags = ?, details = ?, links = ?, is_featured = ?, status = ?,
                       updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
                WHERE id = ?
            `).bind(...fields, id));
            statements.push(env.DB.prepare("DELETE FROM project_media WHERE project_id = ?").bind(id));
        }
        rows.forEach((r, i) => {
            statements.push(env.DB.prepare(`
                INSERT INTO project_media (id, project_id, kind, r2_key, url, caption, position)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).bind(uuid(), id, r.kind, r.r2_key, r.url, r.caption, i));
        });

        await env.DB.batch(statements);
        await invalidateContent(env);

        // Images taken off the project are no longer referenced anywhere (each
        // upload gets a unique key), so free the storage. Done after the batch
        // succeeds, and a failure here does not undo a good save.
        const kept = new Set(rows.filter(r => r.kind === "upload").map(r => r.r2_key));
        const dropped = previousUploads.filter(k => !kept.has(k));
        if (dropped.length) {
            try { await env.MEDIA.delete(dropped); } catch (e) { /* orphaned file, harmless */ }
        }

        return json({ success: true, id });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
