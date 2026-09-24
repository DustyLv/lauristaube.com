import { parseList } from "./_utils.js";

// Everything the site renders, as a JSON string. Used by /api/content
// (published only) and /api/admin/content (drafts too).
//
// Shape:
//   { projects: [{ id, title, description, long_description, icon, tags[], details[],
//                  links[], is_featured, status, updated_at, media: [{ id, kind, r2_key, url, caption }] }],
//     experience: [{ id, title, organization, period, description, resume_bullets[], status }],
//     education:  [ ...same as experience ] }
export async function buildContent(env, includeDrafts) {
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

    const timelineItem = ({ section, ...t }) => ({ ...t, resume_bullets: parseList(t.resume_bullets) });
    return JSON.stringify({
        projects: projects.results.map(p => ({
            ...p,
            tags: parseList(p.tags),
            details: parseList(p.details),
            links: parseList(p.links),
            is_featured: p.is_featured === 1,
            media: mediaByProject[p.id] || []
        })),
        experience: timeline.results.filter(t => t.section === "experience").map(timelineItem),
        education: timeline.results.filter(t => t.section === "education").map(timelineItem)
    });
}
