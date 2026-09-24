import {
    json,
    sniffImageType, uploadKeyName, IMAGE_ONLY_MESSAGE, MAX_UPLOAD_BYTES, TOO_LARGE_MESSAGE
} from "../_utils.js";

// POST /api/admin/upload - store an image in the MEDIA bucket. Returns { r2_key }.
//
// No database row is written here: the file is recorded against its project
// when the project is saved. An upload whose project is never saved stays in
// the bucket unreferenced.
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file || typeof file === "string") return json({ error: "No file uploaded" }, 400);
        if (file.size > MAX_UPLOAD_BYTES) return json({ error: TOO_LARGE_MESSAGE }, 413);

        // Decided by the file's contents, not the name or the declared type.
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
