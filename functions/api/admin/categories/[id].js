import { json, invalidateContent } from "../../_utils.js";

// DELETE /api/admin/categories/:id - remove a filter tag from the list and from every project.
export async function onRequestDelete(context) {
    const { env, params } = context;
    try {
        await env.DB.batch([
            env.DB.prepare("DELETE FROM project_categories WHERE category_id = ?").bind(params.id),
            env.DB.prepare("DELETE FROM categories WHERE id = ?").bind(params.id)
        ]);
        await invalidateContent(env);
        return json({ success: true });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
