import { loadPublished, renderPage, projectSlug, projectUrl, coverUrl, SITE_URL } from "../_page.js";

// GET /projects/<slug> - the homepage with this project's pop-up open, and the
// project's own title, description, preview image and structured data in <head>.
// script.js recognises the path and opens the same project once it has loaded.
export async function onRequestGet(context) {
    let project = null;
    try {
        const { projects } = await loadPublished(context);
        project = projects.find(p => projectSlug(p) === context.params.slug) || null;
    } catch (err) {
        console.error("Project page: content load failed", err);
    }

    if (!project) {
        // Unknown (or unpublished) project: the homepage, as a proper 404 that is not indexed.
        return renderPage(context, { status: 404, noindex: true });
    }

    const url = projectUrl(project);
    const image = coverUrl(project);
    const title = `${project.title} · Lauris Taube`;
    return renderPage(context, {
        title,
        description: project.description,
        url,
        image: image || undefined,
        type: "article",
        project,
        jsonLd: {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url,
            ...(image ? { image } : {}),
            ...(project.tags.length ? { keywords: project.tags.join(", ") } : {}),
            creator: { "@type": "Person", name: "Lauris Taube", url: `${SITE_URL}/` }
        }
    });
}
