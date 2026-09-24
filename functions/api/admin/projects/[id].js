import { json, invalidateContent } from "../../_utils.js";

// DELETE /api/admin/projects/:id - remove a project, its media rows and its uploaded images.
export async function onRequestDelete(context) {
    const { request, env, params } = context;

    const id = params.id;
    try {
        const uploads = await env.DB.prepare(
            "SELECT r2_key FROM project_media WHERE project_id = ? AND kind = 'upload'"
        ).bind(id).all();

        await env.DB.batch([
            env.DB.prepare("DELETE FROM project_media WHERE project_id = ?").bind(id),
            env.DB.prepare("DELETE FROM projects WHERE id = ?").bind(id)
        ]);
        await invalidateContent(env);

        const keys = uploads.results.map(r => r.r2_key);
        if (keys.length) {
            try { await env.MEDIA.delete(keys); } catch (e) { /* orphaned file, harmless */ }
        }
        return json({ success: true });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
