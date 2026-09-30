import { json } from "./_utils.js";
import { getPublishedContent } from "./_content.js";

// GET /api/content - published projects + timeline for the public site, cached
// in KV. Shape: see _content.js. The CMS reads /api/admin/content instead.
export async function onRequestGet(context) {
    try {
        const body = await getPublishedContent(context);
        return new Response(body, { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
