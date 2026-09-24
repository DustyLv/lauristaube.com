// Shared helpers for the CMS API (Cloudflare Pages Functions).
// Ported from the Lipke CMS. Everything is same-origin, so there is no CORS.

export function json(data, status = 200, headers = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", ...headers }
    });
}

export function uuid() {
    return crypto.randomUUID();
}

export function unauthorized() {
    return json({ error: "Not signed in through Cloudflare Access, or not allowed." }, 401);
}

// ---- Uploads ----
// Only these raster formats are accepted and served as images. SVG is left out
// on purpose: it is a document that can carry script, not just a picture.
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// The real type of an uploaded file, read from its first bytes. The type the
// browser declares is whatever the uploader says it is, so it decides nothing.
// Returns null for anything that is not one of IMAGE_TYPES.
export async function sniffImageType(file) {
    const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const at = (offset, bytes) => bytes.every((v, i) => b[offset + i] === v);
    if (at(0, [0xFF, 0xD8, 0xFF])) return "image/jpeg";
    if (at(0, [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])) return "image/png";
    if (at(0, [0x47, 0x49, 0x46, 0x38])) return "image/gif"; // GIF8(7|9)a
    if (at(0, [0x52, 0x49, 0x46, 0x46]) && at(8, [0x57, 0x45, 0x42, 0x50])) return "image/webp"; // RIFF....WEBP
    return null;
}

export const IMAGE_ONLY_MESSAGE = "Only JPEG, PNG, WebP or GIF images can be uploaded.";

// Largest accepted upload. The CMS already shrinks images to well under this
// before sending them, so in practice it only stops oversized files sent to the
// API directly. Keep in step with IMAGE_MAX_BYTES in public/admin/admin.js.
export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
export const TOO_LARGE_MESSAGE = "Images must be under 15 MB.";

// A storage key from an uploaded file name: readable, but nothing that needs
// escaping in a URL or could be read as a path.
export function uploadKeyName(name) {
    return (name || "image").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[.-]+/, "").slice(-80) || "image";
}

// Headers for serving a stored upload. Images keep their type; anything else
// already in a bucket (from before uploads were checked) is sent as a plain
// download. Either way the browser is told not to guess the type and to treat
// the file as an inert, sandboxed resource, so nothing in it can run as a page
// on this domain.
export function uploadResponseHeaders(object) {
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    const type = (headers.get("Content-Type") || "").split(";")[0].trim().toLowerCase();
    if (!IMAGE_TYPES.includes(type)) {
        headers.set("Content-Type", "application/octet-stream");
        headers.set("Content-Disposition", "attachment");
    }
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Content-Security-Policy", "default-src 'none'; sandbox");
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return headers;
}

// ---- Cloudflare Access ----
// The CMS (/admin) and its API (/api/admin/*) sit behind a Cloudflare Access
// application. Access handles the login and forwards each allowed request with
// a signed JWT in the Cf-Access-Jwt-Assertion header. api/admin/_middleware.js
// verifies that token here, so a request that reaches the Pages project some
// other way (for example the *.pages.dev hostname without a policy) is refused
// as well.
//
// Configured in wrangler.toml [vars]:
//   ACCESS_TEAM_DOMAIN  e.g. "lauristaube.cloudflareaccess.com"
//   ACCESS_AUD          Application Audience (AUD) tag(s), comma-separated: the CMS app,
//                       plus the one Pages creates for preview deployments
//   ACCESS_EMAILS       optional comma-separated allowlist, checked on top of the Access policy
// Local dev: ACCESS_DEV_BYPASS=1 in .dev.vars skips the check, on localhost only.

const b64urlToBytes = s => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
const b64urlToJson = s => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

// Signing keys, per isolate. Access rotates them now and then; an unknown key
// id triggers one refetch.
let accessKeys = { team: null, keys: {} };

async function accessKey(team, kid) {
    if (accessKeys.team !== team || !accessKeys.keys[kid]) {
        const response = await fetch(`https://${team}/cdn-cgi/access/certs`);
        if (!response.ok) throw new Error(`Access certs fetch failed (${response.status})`);
        const { keys } = await response.json();
        const imported = {};
        for (const jwk of keys) {
            imported[jwk.kid] = await crypto.subtle.importKey(
                "jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]
            );
        }
        accessKeys = { team, keys: imported };
    }
    return accessKeys.keys[kid] || null;
}

// The signed-in email for a valid Access token, or null.
export async function verifyAccess(request, env) {
    const host = new URL(request.url).hostname;
    if (env.ACCESS_DEV_BYPASS === "1" && (host === "localhost" || host === "127.0.0.1")) {
        return "local-dev";
    }

    const team = env.ACCESS_TEAM_DOMAIN;
    const auds = (env.ACCESS_AUD || "").split(",").map(a => a.trim()).filter(Boolean);
    if (!team || !auds.length) return null; // not configured: refuse everything

    const token = request.headers.get("Cf-Access-Jwt-Assertion");
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    try {
        const header = b64urlToJson(parts[0]);
        const payload = b64urlToJson(parts[1]);
        if (header.alg !== "RS256") return null;

        const key = await accessKey(team, header.kid);
        if (!key) return null;
        const valid = await crypto.subtle.verify(
            "RSASSA-PKCS1-v1_5", key, b64urlToBytes(parts[2]),
            new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
        );
        if (!valid) return null;

        const now = Math.floor(Date.now() / 1000);
        const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
        if (payload.iss !== `https://${team}`) return null;
        if (!audiences.some(a => auds.includes(a))) return null;
        if (!payload.exp || payload.exp < now) return null;
        if (payload.nbf && payload.nbf > now + 60) return null;

        const email = String(payload.email || "").toLowerCase();
        const allowed = (env.ACCESS_EMAILS || "").split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
        if (allowed.length && !allowed.includes(email)) return null;
        return email || payload.sub || null;
    } catch (e) {
        console.error("Access token check failed", e);
        return null;
    }
}

// ---- Content helpers ----

// Trimmed string, or null when empty / not a string.
export const text = v => (typeof v === "string" ? v.trim() : "") || null;

// A JSON-column value from a request body: an array, kept as JSON text.
export function jsonList(value, clean = x => x) {
    return JSON.stringify(Array.isArray(value) ? value.map(clean).filter(Boolean) : []);
}

// A JSON column read back from D1; bad or missing data becomes [].
export function parseList(value) {
    try {
        const parsed = JSON.parse(value || "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
}

// GET /api/content (published only) is cached in KV under this key. Every
// mutation clears it; direct D1 edits do not, so clear it by hand after those:
//   npx wrangler kv key delete --binding KV content --remote
export const CONTENT_CACHE_KEY = "content";

export async function invalidateContent(env) {
    try { await env.KV.delete(CONTENT_CACHE_KEY); } catch (e) { /* expires on its own */ }
}
