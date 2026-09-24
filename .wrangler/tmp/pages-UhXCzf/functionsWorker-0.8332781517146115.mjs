var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// api/_utils.js
function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...headers }
  });
}
__name(json, "json");
function uuid() {
  return crypto.randomUUID();
}
__name(uuid, "uuid");
function unauthorized() {
  return json({ error: "Not signed in through Cloudflare Access, or not allowed." }, 401);
}
__name(unauthorized, "unauthorized");
var IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
async function sniffImageType(file) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const at = /* @__PURE__ */ __name((offset, bytes) => bytes.every((v, i) => b[offset + i] === v), "at");
  if (at(0, [255, 216, 255])) return "image/jpeg";
  if (at(0, [137, 80, 78, 71, 13, 10, 26, 10])) return "image/png";
  if (at(0, [71, 73, 70, 56])) return "image/gif";
  if (at(0, [82, 73, 70, 70]) && at(8, [87, 69, 66, 80])) return "image/webp";
  return null;
}
__name(sniffImageType, "sniffImageType");
var IMAGE_ONLY_MESSAGE = "Only JPEG, PNG, WebP or GIF images can be uploaded.";
var MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
var TOO_LARGE_MESSAGE = "Images must be under 15 MB.";
function uploadKeyName(name) {
  return (name || "image").replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[.-]+/, "").slice(-80) || "image";
}
__name(uploadKeyName, "uploadKeyName");
function uploadResponseHeaders(object) {
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
__name(uploadResponseHeaders, "uploadResponseHeaders");
var b64urlToBytes = /* @__PURE__ */ __name((s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0)), "b64urlToBytes");
var b64urlToJson = /* @__PURE__ */ __name((s) => JSON.parse(new TextDecoder().decode(b64urlToBytes(s))), "b64urlToJson");
var accessKeys = { team: null, keys: {} };
async function accessKey(team, kid) {
  if (accessKeys.team !== team || !accessKeys.keys[kid]) {
    const response = await fetch(`https://${team}/cdn-cgi/access/certs`);
    if (!response.ok) throw new Error(`Access certs fetch failed (${response.status})`);
    const { keys } = await response.json();
    const imported = {};
    for (const jwk of keys) {
      imported[jwk.kid] = await crypto.subtle.importKey(
        "jwk",
        jwk,
        { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
        false,
        ["verify"]
      );
    }
    accessKeys = { team, keys: imported };
  }
  return accessKeys.keys[kid] || null;
}
__name(accessKey, "accessKey");
async function verifyAccess(request, env) {
  const host = new URL(request.url).hostname;
  if (env.ACCESS_DEV_BYPASS === "1" && (host === "localhost" || host === "127.0.0.1")) {
    return "local-dev";
  }
  const team = env.ACCESS_TEAM_DOMAIN;
  const auds = (env.ACCESS_AUD || "").split(",").map((a) => a.trim()).filter(Boolean);
  if (!team || !auds.length) return null;
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
      "RSASSA-PKCS1-v1_5",
      key,
      b64urlToBytes(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    );
    if (!valid) return null;
    const now = Math.floor(Date.now() / 1e3);
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (payload.iss !== `https://${team}`) return null;
    if (!audiences.some((a) => auds.includes(a))) return null;
    if (!payload.exp || payload.exp < now) return null;
    if (payload.nbf && payload.nbf > now + 60) return null;
    const email = String(payload.email || "").toLowerCase();
    const allowed = (env.ACCESS_EMAILS || "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
    if (allowed.length && !allowed.includes(email)) return null;
    return email || payload.sub || null;
  } catch (e) {
    console.error("Access token check failed", e);
    return null;
  }
}
__name(verifyAccess, "verifyAccess");
var text = /* @__PURE__ */ __name((v) => (typeof v === "string" ? v.trim() : "") || null, "text");
function jsonList(value, clean = (x) => x) {
  return JSON.stringify(Array.isArray(value) ? value.map(clean).filter(Boolean) : []);
}
__name(jsonList, "jsonList");
function parseList(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}
__name(parseList, "parseList");
var CONTENT_CACHE_KEY = "content";
async function invalidateContent(env) {
  try {
    await env.KV.delete(CONTENT_CACHE_KEY);
  } catch (e) {
  }
}
__name(invalidateContent, "invalidateContent");

// api/admin/projects/[id].js
async function onRequestDelete(context) {
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
    const keys = uploads.results.map((r) => r.r2_key);
    if (keys.length) {
      try {
        await env.MEDIA.delete(keys);
      } catch (e) {
      }
    }
    return json({ success: true });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(onRequestDelete, "onRequestDelete");

// api/admin/timeline/[id].js
async function onRequestDelete2(context) {
  const { request, env, params } = context;
  try {
    await env.DB.prepare("DELETE FROM timeline WHERE id = ?").bind(params.id).run();
    await invalidateContent(env);
    return json({ success: true });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(onRequestDelete2, "onRequestDelete");

// api/_content.js
async function buildContent(env, includeDrafts) {
  const where = includeDrafts ? "" : "WHERE status = 'published'";
  const [projects, media, timeline] = await Promise.all([
    env.DB.prepare(`
            SELECT id, title, description, long_description, icon, tags, details, links,
                   is_featured, status, updated_at
            FROM projects ${where}
            ORDER BY position, created_at
        `).all(),
    env.DB.prepare(`
            SELECT id, project_id, kind, r2_key, url, caption
            FROM project_media
            ORDER BY position, rowid
        `).all(),
    env.DB.prepare(`
            SELECT id, section, title, organization, period, description, resume_bullets, status
            FROM timeline ${where}
            ORDER BY position, rowid
        `).all()
  ]);
  const mediaByProject = {};
  for (const m of media.results) {
    const { project_id, ...item } = m;
    (mediaByProject[project_id] ||= []).push(item);
  }
  const timelineItem = /* @__PURE__ */ __name(({ section, ...t }) => ({ ...t, resume_bullets: parseList(t.resume_bullets) }), "timelineItem");
  return JSON.stringify({
    projects: projects.results.map((p) => ({
      ...p,
      tags: parseList(p.tags),
      details: parseList(p.details),
      links: parseList(p.links),
      is_featured: p.is_featured === 1,
      media: mediaByProject[p.id] || []
    })),
    experience: timeline.results.filter((t) => t.section === "experience").map(timelineItem),
    education: timeline.results.filter((t) => t.section === "education").map(timelineItem)
  });
}
__name(buildContent, "buildContent");

// api/admin/content.js
async function onRequestGet(context) {
  const { env, data } = context;
  try {
    const content = JSON.parse(await buildContent(env, true));
    return json({ ...content, user: data.accessUser });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(onRequestGet, "onRequestGet");

// api/admin/order.js
var TABLES = { projects: "projects", timeline: "timeline" };
async function onRequestPut(context) {
  const { request, env } = context;
  try {
    const { type, ids } = await request.json();
    const table = TABLES[type];
    if (!table) return json({ error: "type must be 'projects' or 'timeline'." }, 400);
    if (!Array.isArray(ids) || !ids.length || ids.some((id) => typeof id !== "string")) {
      return json({ error: "ids must be a non-empty list of ids." }, 400);
    }
    await env.DB.batch(ids.map(
      (id, i) => env.DB.prepare(`UPDATE ${table} SET position = ? WHERE id = ?`).bind(i, id)
    ));
    await invalidateContent(env);
    return json({ success: true });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(onRequestPut, "onRequestPut");

// api/admin/projects.js
async function onRequestPost(context) {
  return handleSave(context, "POST");
}
__name(onRequestPost, "onRequestPost");
async function onRequestPut2(context) {
  return handleSave(context, "PUT");
}
__name(onRequestPut2, "onRequestPut");
var isHttpUrl = /* @__PURE__ */ __name((v) => /^https?:\/\/\S+$/i.test(v || ""), "isHttpUrl");
async function handleSave(context, method) {
  const { request, env } = context;
  try {
    const data = await request.json();
    const isPost = method === "POST";
    const id = isPost ? uuid() : data.id;
    const title = text(data.title);
    const description = text(data.description);
    if (!title) return json({ error: "A title is required." }, 400);
    if (!description) return json({ error: "A short description is required." }, 400);
    const tags = jsonList(data.tags, (t) => text(t));
    const details = jsonList(data.details, (d) => {
      const label = text(d && d.label), value = text(d && d.value);
      return label && value ? { label, value } : null;
    });
    const links = jsonList(data.links, (l) => {
      const label = text(l && l.label), url = text(l && l.url);
      return label && isHttpUrl(url) ? { label, url } : null;
    });
    const isFeatured = data.is_featured ? 1 : 0;
    const status = data.status === "published" ? "published" : "draft";
    const rows = [];
    for (const m of data.media || []) {
      if (m && m.kind === "upload" && text(m.r2_key)) {
        rows.push({ kind: "upload", r2_key: text(m.r2_key), url: null, caption: text(m.caption) });
      } else if (m && m.kind === "video" && isHttpUrl(text(m.url))) {
        rows.push({ kind: "video", r2_key: null, url: text(m.url), caption: text(m.caption) });
      }
    }
    let previousUploads = [];
    if (!isPost) {
      const existing = await env.DB.prepare("SELECT id FROM projects WHERE id = ?").bind(id).first();
      if (!existing) return json({ error: "Project not found." }, 404);
      const old = await env.DB.prepare(
        "SELECT r2_key FROM project_media WHERE project_id = ? AND kind = 'upload'"
      ).bind(id).all();
      previousUploads = old.results.map((r) => r.r2_key);
    }
    const fields = [
      title,
      description,
      data.long_description || null,
      text(data.icon),
      tags,
      details,
      links,
      isFeatured,
      status
    ];
    const statements = [];
    if (isFeatured) {
      statements.push(env.DB.prepare("UPDATE projects SET is_featured = 0 WHERE id <> ?").bind(id));
    }
    if (isPost) {
      statements.push(env.DB.prepare(`
                INSERT INTO projects (title, description, long_description, icon, tags, details, links,
                                      is_featured, status, id, position)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (SELECT COALESCE(MAX(position), -1) + 1 FROM projects))
            `).bind(...fields, id));
    } else {
      statements.push(env.DB.prepare(`
                UPDATE projects SET title = ?, description = ?, long_description = ?, icon = ?,
                       tags = ?, details = ?, links = ?, is_featured = ?, status = ?,
                       updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
                WHERE id = ?
            `).bind(...fields, id));
      statements.push(env.DB.prepare("DELETE FROM project_media WHERE project_id = ?").bind(id));
    }
    rows.forEach((r, i) => {
      statements.push(env.DB.prepare(`
                INSERT INTO project_media (id, project_id, kind, r2_key, url, caption, position)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).bind(uuid(), id, r.kind, r.r2_key, r.url, r.caption, i));
    });
    await env.DB.batch(statements);
    await invalidateContent(env);
    const kept = new Set(rows.filter((r) => r.kind === "upload").map((r) => r.r2_key));
    const dropped = previousUploads.filter((k) => !kept.has(k));
    if (dropped.length) {
      try {
        await env.MEDIA.delete(dropped);
      } catch (e) {
      }
    }
    return json({ success: true, id });
  } catch (err) {
    return json({ error: err.message }, 500);
  }
}
__name(handleSave, "handleSave");

// api/admin/timeline.js
async function onRequestPost2(context) {
  return handleSave2(context, "POST");
}
__name(onRequestPost2, "onRequestPost");
async function onRequestPut3(context) {
  return handleSave2(context, "PUT");
}
__name(onRequestPut3, "onRequestPut");
async function handleSave2(context, method) {
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
    if (!period) return json({ error: 'A period is required, e.g. "2019 - Present".' }, 400);
    const fields = [
      section,
      title,
      text(data.organization),
      period,
      text(data.description),
      jsonList(data.resume_bullets, (b) => text(b)),
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
__name(handleSave2, "handleSave");

// api/admin/upload.js
async function onRequestPost3(context) {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || typeof file === "string") return json({ error: "No file uploaded" }, 400);
    if (file.size > MAX_UPLOAD_BYTES) return json({ error: TOO_LARGE_MESSAGE }, 413);
    const type = await sniffImageType(file);
    if (!type) return json({ error: IMAGE_ONLY_MESSAGE }, 415);
    const r2Key = `projects/${Date.now()}-${uploadKeyName(file.name)}`;
    await env.MEDIA.put(r2Key, file.stream(), {
      httpMetadata: { contentType: type }
    });
    return json({ r2_key: r2Key });
  } catch (err) {
    console.error("Upload failed", err);
    return json({ error: "Upload failed" }, 500);
  }
}
__name(onRequestPost3, "onRequestPost");

// api/media/[[path]].js
async function onRequestGet2(context) {
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
__name(onRequestGet2, "onRequestGet");

// api/content.js
var CACHE_TTL = 60 * 60 * 24;
async function onRequestGet3(context) {
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
__name(onRequestGet3, "onRequestGet");

// api/admin/_middleware.js
async function onRequest(context) {
  const user = await verifyAccess(context.request, context.env);
  if (!user) return unauthorized();
  context.data.accessUser = user;
  return context.next();
}
__name(onRequest, "onRequest");

// ../.wrangler/tmp/pages-UhXCzf/functionsRoutes-0.4954542204973118.mjs
var routes = [
  {
    routePath: "/api/admin/projects/:id",
    mountPath: "/api/admin/projects",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete]
  },
  {
    routePath: "/api/admin/timeline/:id",
    mountPath: "/api/admin/timeline",
    method: "DELETE",
    middlewares: [],
    modules: [onRequestDelete2]
  },
  {
    routePath: "/api/admin/content",
    mountPath: "/api/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/admin/order",
    mountPath: "/api/admin",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut]
  },
  {
    routePath: "/api/admin/projects",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/admin/projects",
    mountPath: "/api/admin",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut2]
  },
  {
    routePath: "/api/admin/timeline",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/admin/timeline",
    mountPath: "/api/admin",
    method: "PUT",
    middlewares: [],
    modules: [onRequestPut3]
  },
  {
    routePath: "/api/admin/upload",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/media/:path*",
    mountPath: "/api/media",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/content",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/admin",
    mountPath: "/api/admin",
    method: "",
    middlewares: [onRequest],
    modules: []
  }
];

// ../node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-FmMnJh/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-FmMnJh/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.8332781517146115.mjs.map
