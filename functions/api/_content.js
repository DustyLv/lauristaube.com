import { parseList, CONTENT_CACHE_KEY } from "./_utils.js";

const CACHE_TTL = 60 * 60 * 24; // safety net; mutations clear the cache anyway

// Published content as a JSON string, from the KV cache or rebuilt (and cached).
// Used by /api/content and the server-rendered pages (/, /projects/<slug>, sitemap).
export async function getPublishedContent(context) {
    const { env } = context;
    const cached = await env.KV.get(CONTENT_CACHE_KEY);
    if (cached) return cached;
    const body = await buildContent(env, false);
    context.waitUntil(env.KV.put(CONTENT_CACHE_KEY, body, { expirationTtl: CACHE_TTL }));
    return body;
}

// Everything the site renders, as a JSON string. Used by /api/content
// (published only) and /api/admin/content (drafts too).
//
// Shape:
//   { projects: [{ id, slug, title, description, long_description, icon, role, client, year, duration, team, tags[], details[],
//                  links[], is_featured, status, updated_at, media: [{ id, kind, r2_key, url, caption }],
//                  categories: [category id, ...] }],
//     categories: [{ id, name }],   filter tags in display order (all of them, used or not)
//     experience: [{ id, title, organization, period, description, resume_bullets[], status }],
//     education:  [ ...same as experience ] }
export async function buildContent(env, includeDrafts) {
    const where = includeDrafts ? "" : "WHERE status = 'published'";
    const [projects, media, timeline, categories, projectCategories] = await Promise.all([
        env.DB.prepare(`
            SELECT id, slug, title, description, long_description, icon, tags, details, links,
                   is_featured, status, role, client, year, duration, team, updated_at
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
        `).all(),
        env.DB.prepare("SELECT id, name FROM categories ORDER BY position, name").all(),
        env.DB.prepare(`
            SELECT pc.project_id, pc.category_id
            FROM project_categories pc JOIN categories c ON c.id = pc.category_id
            ORDER BY c.position, c.name
        `).all()
    ]);

    const mediaByProject = {};
    for (const m of media.results) {
        const { project_id, ...item } = m;
        (mediaByProject[project_id] ||= []).push(item);
    }

    const categoriesByProject = {};
    for (const { project_id, category_id } of projectCategories.results) {
        (categoriesByProject[project_id] ||= []).push(category_id);
    }

    const timelineItem = ({ section, ...t }) => ({ ...t, resume_bullets: parseList(t.resume_bullets) });
    return JSON.stringify({
        projects: projects.results.map(p => ({
            ...p,
            tags: parseList(p.tags),
            details: parseList(p.details),
            links: parseList(p.links),
            is_featured: p.is_featured === 1,
            media: mediaByProject[p.id] || [],
            categories: categoriesByProject[p.id] || []
        })),
        categories: categories.results,
        experience: timeline.results.filter(t => t.section === "experience").map(timelineItem),
        education: timeline.results.filter(t => t.section === "education").map(timelineItem)
    });
}
