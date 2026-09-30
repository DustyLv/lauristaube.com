// Every response. *.pages.dev copies of the site (the project's own domain and
// preview deployments) are marked noindex so search engines only list
// lauristaube.com.
export async function onRequest(context) {
    const response = await context.next();
    if (!new URL(context.request.url).hostname.endsWith(".pages.dev")) return response;
    const marked = new Response(response.body, response);
    marked.headers.set("X-Robots-Tag", "noindex");
    return marked;
}
