import { uploadResponseHeaders } from "../_utils.js";

// GET /api/media/<r2_key> - serve an uploaded image from the MEDIA bucket.
// Public and edge-cached; a key never changes for a given file, so it can be
// cached for a year.
export async function onRequestGet(context) {
    const { request, env } = context;

    const url = new URL(request.url);
    const key = decodeURIComponent(url.pathname.replace("/api/media/", ""));
    if (!key) return new Response("Object key required", { status: 400 });

    const cache = caches.default;
    const cacheKey = new Request(url.toString(), request);

    try {
        let response = await cache.match(cacheKey);
        if (response) return response;

        const object = await env.MEDIA.get(key);
        if (!object) return new Response("Object Not Found", { status: 404 });

        response = new Response(object.body, { headers: uploadResponseHeaders(object) });
        context.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
    } catch (err) {
        console.error("Media read failed", err);
        return new Response("Could not read the file", { status: 500 });
    }
}
