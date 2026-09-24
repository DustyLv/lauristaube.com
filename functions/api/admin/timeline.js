import { json, uuid, text, jsonList, invalidateContent } from "../_utils.js";

// Experience and education entries. Reading is done through /api/admin/content (drafts included) and /api/content.
//
//   POST   /api/admin/timeline        create (new entries go to the end of their section)
//   PUT    /api/admin/timeline        update (body carries the id)
//   DELETE /api/admin/timeline/:id    timeline/[id].js
//
// Body: { id?, section: 'experience'|'education', title, organization, period,
//         description, resume_bullets[], status }

export async function onRequestPost(context) {
    return handleSave(context, "POST");
}

export async function onRequestPut(context) {
    return handleSave(context, "PUT");
}

async function handleSave(context, method) {
    const { request, env } = context;

    try {
        const data = await request.json();
        const isPost = method === "POST";
        const id = isPost ? uuid() : data.id;

        const section = data.section;
        if (section !== "experience" && section !== "education") {
            return json({ error: "section must be 'experience' or 'education'." }, 400);
        }
        const title = text(data.title);
        const period = text(data.period);
        if (!title) return json({ error: "A title is required." }, 400);
        if (!period) return json({ error: "A period is required, e.g. \"2019 - Present\"." }, 400);

        const fields = [
            section, title, text(data.organization), period, text(data.description),
            jsonList(data.resume_bullets, b => text(b)),
            data.status === "published" ? "published" : "draft"
        ];

        let result;
        if (isPost) {
            result = await env.DB.prepare(`
                INSERT INTO timeline (section, title, organization, period, description, resume_bullets, status, id, position)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?,
                        (SELECT COALESCE(MAX(position), -1) + 1 FROM timeline WHERE section = ?))
            `).bind(...fields, id, section).run();
        } else {
            result = await env.DB.prepare(`
                UPDATE timeline SET section = ?, title = ?, organization = ?, period = ?,
                       description = ?, resume_bullets = ?, status = ?
                WHERE id = ?
            `).bind(...fields, id).run();
            if (!result.meta.changes) return json({ error: "Entry not found." }, 404);
        }

        await invalidateContent(env);
        return json({ success: true, id });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
