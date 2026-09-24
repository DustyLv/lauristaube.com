import { json, CONTENT_CACHE_KEY } from "./_utils.js";
import { buildContent } from "./_content.js";

// GET /api/content - published projects + timeline for the public site, cached
// in KV. Shape: see _content.js. The CMS reads /api/admin/content instead.

const CACHE_TTL = 60 * 60 * 24; // safety net; mutations clear the cache anyway

export async function onRequestGet(context) {
    const { env } = context;
    try {
        const cached = await env.KV.get(CONTENT_CACHE_KEY);
        if (cached) return new Response(cached, { headers: { "Content-Type": "application/json" } });

        const body = await buildContent(env, false);
        context.waitUntil(env.KV.put(CONTENT_CACHE_KEY, body, { expirationTtl: CACHE_TTL }));
        return new Response(body, { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
