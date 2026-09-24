import { json, invalidateContent } from "../_utils.js";

// PUT /api/admin/order - set display order. Body: { type: 'projects'|'timeline', ids: [...] }
// Each id's position becomes its index; for the timeline, send one section's ids at a time.
const TABLES = { projects: "projects", timeline: "timeline" };

export async function onRequestPut(context) {
    const { request, env } = context;

    try {
        const { type, ids } = await request.json();
        const table = TABLES[type];
        if (!table) return json({ error: "type must be 'projects' or 'timeline'." }, 400);
        if (!Array.isArray(ids) || !ids.length || ids.some(id => typeof id !== "string")) {
            return json({ error: "ids must be a non-empty list of ids." }, 400);
        }

        await env.DB.batch(ids.map((id, i) =>
            env.DB.prepare(`UPDATE ${table} SET position = ? WHERE id = ?`).bind(i, id)
        ));
        await invalidateContent(env);
        return json({ success: true });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
