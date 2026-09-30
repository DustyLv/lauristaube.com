import { loadPublished, projectUrl, SITE_URL } from "./_page.js";

const xmlEscape = v => String(v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));

// GET /sitemap.xml - the homepage and every published project page.
export async function onRequestGet(context) {
    const { projects } = await loadPublished(context);
    const entries = [
        { loc: `${SITE_URL}/` },
        ...projects.map(p => ({ loc: projectUrl(p), lastmod: (p.updated_at || "").slice(0, 10) }))
    ];
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        entries.map(e => `  <url><loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`).join("\n") +
        "\n</urlset>\n";
    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" }
    });
}
