import { json, uuid, text, invalidateContent } from "../_utils.js";

// Filter tags ("Tags" in the CMS). Reading is done through /api/admin/content.
//
//   POST   /api/admin/categories        create { name } (goes to the end of the list)
//   PUT    /api/admin/categories        rename { id, name }
//   DELETE /api/admin/categories/:id    categories/[id].js
//   Order: PUT /api/admin/order { type: 'categories', ids }

const MAX_NAME = 40;

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

        const name = text(data.name);
        if (!name) return json({ error: "A tag needs a name." }, 400);
        if (name.length > MAX_NAME) return json({ error: `Tag names can be at most ${MAX_NAME} characters.` }, 400);

        // Names are unique regardless of case, so "vr" can't sit next to "VR".
        const clash = await env.DB.prepare(
            "SELECT id FROM categories WHERE lower(name) = lower(?) AND id <> ?"
        ).bind(name, id || "").first();
        if (clash) return json({ error: `There is already a tag called "${name}".` }, 409);

        if (isPost) {
            await env.DB.prepare(`
                INSERT INTO categories (id, name, position)
                VALUES (?, ?, (SELECT COALESCE(MAX(position), -1) + 1 FROM categories))
            `).bind(id, name).run();
        } else {
            const result = await env.DB.prepare("UPDATE categories SET name = ? WHERE id = ?").bind(name, id).run();
            if (!result.meta.changes) return json({ error: "Tag not found." }, 404);
        }

        await invalidateContent(env);
        return json({ success: true, id, name });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
