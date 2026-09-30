import { getPublishedContent } from "./api/_content.js";

// Server-side page rendering for link previews and search engines.
// public/index.html carries default <head> tags (title, description, Open Graph,
// canonical); the page functions (index.js, projects/[slug].js) serve that same
// file with the tags rewritten for the page, so a shared link shows the right
// title, text and image even though the page itself is rendered by script.js.

// Canonical address: pages.dev copies point here instead of competing with it.
export const SITE_URL = "https://lauristaube.com";

export async function loadPublished(context) {
    return JSON.parse(await getPublishedContent(context));
}

export const projectSlug = project => project.slug || project.id;
export const projectUrl = project => `${SITE_URL}/projects/${encodeURIComponent(projectSlug(project))}`;

function youtubeId(url) {
    const m = (url || "").match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : "";
}

// Absolute URL of a project's cover (its first gallery item), or null. Same rule as the cards.
export function coverUrl(project) {
    const first = project && project.media[0];
    if (!first) return null;
    if (first.kind === "upload") {
        return `${SITE_URL}/api/media/${first.r2_key.split("/").map(encodeURIComponent).join("/")}`;
    }
    const id = youtubeId(first.url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

// JSON inside <script>: "<" is escaped so the text can never close the tag.
const scriptJson = value => JSON.stringify(value).replace(/</g, "\\u003c");

const setContent = value => ({ element(e) { e.setAttribute("content", value); } });

// Serve public/index.html with page-specific head tags. Every option is optional:
//   title, description, url, image, type ('website' | 'article'), jsonLd (object),
//   project (pre-fill and show its pop-up), status, noindex
export async function renderPage(context, options = {}) {
    const { env, request } = context;
    const page = await env.ASSETS.fetch(new URL("/", request.url));

    let rewriter = new HTMLRewriter();
    if (options.title) {
        rewriter = rewriter
            .on("title", { element(e) { e.setInnerContent(options.title); } })
            .on('meta[property="og:title"]', setContent(options.title));
    }
    if (options.description) {
        rewriter = rewriter
            .on('meta[name="description"]', setContent(options.description))
            .on('meta[property="og:description"]', setContent(options.description));
    }
    if (options.url) {
        rewriter = rewriter
            .on('meta[property="og:url"]', setContent(options.url))
            .on('link[rel="canonical"]', { element(e) { e.setAttribute("href", options.url); } });
    }
    if (options.image) rewriter = rewriter.on('meta[property="og:image"]', setContent(options.image));
    if (options.type) rewriter = rewriter.on('meta[property="og:type"]', setContent(options.type));
    if (options.jsonLd || options.noindex) {
        rewriter = rewriter.on("head", {
            element(e) {
                if (options.jsonLd) e.append(`<script type="application/ld+json">${scriptJson(options.jsonLd)}</script>`, { html: true });
                if (options.noindex) e.append('<meta name="robots" content="noindex">', { html: true });
            }
        });
    }

    // The pop-up arrives already open with the project's text, so crawlers and
    // no-JS visitors get the content; script.js then fills in the gallery.
    const project = options.project;
    if (project) {
        rewriter = rewriter
            .on("#project-modal-title", { element(e) { e.setInnerContent(project.title); } })
            .on("#project-modal-long-desc", { element(e) { e.setInnerContent(project.long_description || "", { html: true }); } })
            .on("#project-modal-overlay", {
                element(e) { e.setAttribute("class", (e.getAttribute("class") || "").replace(/\bhidden\b/, "").trim()); }
            })
            .on("body", {
                element(e) { e.setAttribute("class", `${e.getAttribute("class") || ""} modal-open`.trim()); }
            });
    }

    const transformed = rewriter.transform(page);
    const headers = new Headers(transformed.headers);
    // The body differs per page, so index.html's validators must not be reused.
    headers.delete("etag");
    headers.delete("last-modified");
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    return new Response(transformed.body, { status: options.status || 200, headers });
}
