import { loadPublished, renderPage, coverUrl } from "./_page.js";

// GET / - the homepage, with the featured project's cover as the link-preview image.
// If the content can't be loaded the plain page (with its default tags) is served.
export async function onRequestGet(context) {
    try {
        const { projects } = await loadPublished(context);
        const featured = projects.find(p => p.is_featured) || projects[0];
        const image = coverUrl(featured);
        return renderPage(context, image ? { image } : {});
    } catch (err) {
        console.error("Homepage: content load failed", err);
        return context.env.ASSETS.fetch(context.request);
    }
}
