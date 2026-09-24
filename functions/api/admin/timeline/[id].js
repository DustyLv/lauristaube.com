import { json, invalidateContent } from "../../_utils.js";

// DELETE /api/admin/timeline/:id - remove an experience or education entry.
export async function onRequestDelete(context) {
    const { request, env, params } = context;

    try {
        await env.DB.prepare("DELETE FROM timeline WHERE id = ?").bind(params.id).run();
        await invalidateContent(env);
        return json({ success: true });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
