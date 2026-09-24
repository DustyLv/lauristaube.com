import { verifyAccess, unauthorized } from "../_utils.js";

// Every /api/admin/* request must carry a valid Cloudflare Access token (see
// verifyAccess in _utils.js). The signed-in email is passed on as
// context.data.accessUser.
export async function onRequest(context) {
    const user = await verifyAccess(context.request, context.env);
    if (!user) return unauthorized();
    context.data.accessUser = user;
    return context.next();
}
