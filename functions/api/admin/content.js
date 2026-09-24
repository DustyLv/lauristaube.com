import { json } from "../_utils.js";
import { buildContent } from "../_content.js";

// GET /api/admin/content - everything, drafts included, never cached. For the CMS.
// Also answers { user } so the CMS can show who is signed in.
export async function onRequestGet(context) {
    const { env, data } = context;
    try {
        const content = JSON.parse(await buildContent(env, true));
        return json({ ...content, user: data.accessUser });
    } catch (err) {
        return json({ error: err.message }, 500);
    }
}
