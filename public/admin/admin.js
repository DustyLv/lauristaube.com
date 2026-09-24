// Portfolio CMS (/admin). Alpine.js component; all data goes through /api/*.
// Patterns (image optimisation, rich text directive, unsaved-changes guard)
// are ported from the Lipke CMS.

// Extract the 11-character video id from the usual YouTube URL shapes:
// watch?v=, youtu.be/, /embed/, /shorts/, /live/. Returns '' if not recognised.
function youtubeId(url) {
    const s = (url || '').trim();
    if (!s) return '';
    const m = s.match(
        /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : '';
}

function mediaUrl(r2Key) {
    return `/api/media/${r2Key.split('/').map(encodeURIComponent).join('/')}`;
}

// ---- Image uploads ----------------------------------------------------------
// Every image is resized and re-encoded in the browser before upload: longest
// side at most IMAGE_MAX_SIDE, WebP at IMAGE_QUALITY. This also strips hidden
// metadata such as GPS positions.
const IMAGE_MAX_SIDE = 3200;
const IMAGE_QUALITY = 0.85;
// The file as chosen, before processing. Also enforced by the server (MAX_UPLOAD_BYTES).
const IMAGE_MAX_BYTES = 15 * 1024 * 1024;
const IMAGE_INPUT_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

async function optimizeImage(file) {
    let source;
    try {
        // from-image: a phone photo taken sideways is turned upright.
        source = await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch (e) {
        throw new Error(`"${file.name}" could not be read as an image`);
    }

    const scale = Math.min(1, IMAGE_MAX_SIDE / Math.max(source.width, source.height));
    const width = Math.max(1, Math.round(source.width * scale));
    const height = Math.max(1, Math.round(source.height * scale));

    // Big reductions are done in halving steps: one large jump in a single
    // drawImage gets grainy, a few gentle ones stay smooth.
    let current = source;
    let cw = source.width;
    let ch = source.height;
    while (cw / 2 >= width && ch / 2 >= height) {
        cw = Math.round(cw / 2);
        ch = Math.round(ch / 2);
        const step = document.createElement('canvas');
        step.width = cw;
        step.height = ch;
        const sctx = step.getContext('2d');
        sctx.imageSmoothingQuality = 'high';
        sctx.drawImage(current, 0, 0, cw, ch);
        current = step;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(current, 0, 0, width, height);
    if (source.close) source.close();

    const encode = type => new Promise(resolve => canvas.toBlob(resolve, type, IMAGE_QUALITY));
    let blob = await encode('image/webp');
    let ext = 'webp';
    // A browser without a WebP encoder (older Safari) quietly returns PNG
    // instead. Fall back to JPEG there, on white, as JPEG has no transparency.
    if (!blob || blob.type !== 'image/webp') {
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        blob = await encode('image/jpeg');
        ext = 'jpg';
    }
    if (!blob) throw new Error(`"${file.name}" could not be converted`);

    const base = (file.name || 'image').replace(/\.[^.]*$/, '') || 'image';
    return new File([blob], `${base}.${ext}`, { type: blob.type });
}

// ---- Rich text (Quill) ------------------------------------------------------
// Kept outside Alpine state: Alpine deep-proxies what it holds, and Quill
// compares its internals by identity, which a Proxy breaks.

function rtMount(el, setter, placeholder) {
    if (!el || !window.Quill) return null;
    const quill = new Quill(el, {
        theme: 'snow',
        placeholder: placeholder || '',
        // Allowlist; anything else is stripped, on paste too.
        formats: ['bold', 'italic', 'underline', 'list', 'link'],
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean']
            ]
        }
    });
    const Delta = Quill.import('delta');
    ['IMG', 'PICTURE', 'SOURCE', 'VIDEO', 'AUDIO', 'IFRAME', 'EMBED', 'OBJECT']
        .forEach(tag => quill.clipboard.addMatcher(tag, () => new Delta()));
    // Dropping a file would otherwise embed it as a base64 data URI.
    quill.root.addEventListener('drop', e => {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) e.preventDefault();
    });

    const rt = { quill, last: null };
    quill.on('text-change', (delta, oldDelta, source) => {
        // Only user edits write back, so opening a record can't mark it dirty.
        if (source !== 'user') return;
        let html = quill.root.innerHTML;
        if (html === '<p><br></p>') html = '';
        rt.last = html;
        setter(html);
    });
    return rt;
}

// Push a model value into an editor without triggering write-back.
function rtSync(rt, value) {
    if (!rt) return;
    const val = value || '';
    if (val === rt.last) return;
    rt.last = val;
    rt.quill.setContents(rt.quill.clipboard.convert({ html: val }), 'api');
}

const clone = v => JSON.parse(JSON.stringify(v));

const EMPTY_PROJECT = {
    id: null, title: '', description: '', long_description: '', icon: '',
    tags: [], details: [], links: [], is_featured: false, status: 'draft', media: []
};
const EMPTY_TIMELINE = {
    id: null, section: 'experience', title: '', organization: '', period: '',
    description: '', resume_bullets: [], status: 'draft'
};

document.addEventListener('alpine:init', () => {
    // x-richtext="path.to.field"
    Alpine.directive('richtext', (el, { expression }, { evaluateLater, effect }) => {
        const getValue = evaluateLater(expression);
        const setValue = v => Alpine.evaluate(el, `${expression} = __rtVal`, { scope: { __rtVal: v } });
        const rt = rtMount(el, setValue, el.dataset.rtPlaceholder || '');
        effect(() => getValue(value => rtSync(rt, value)));
    });

    Alpine.data('cmsApp', () => ({
        view: 'loading', // 'loading' | 'denied' | 'list' | 'editor'
        tab: 'projects', // 'projects' | 'experience' | 'education'
        editorType: null, // 'project' | 'timeline'
        // Signed in through Cloudflare Access; this page never sees a password.
        user: '',
        deniedMessage: '',

        projects: [],
        experience: [],
        education: [],

        activeRecord: {},
        // JSON snapshot of activeRecord when the editor opened, for dirty-checking.
        pristine: null,
        saving: false,
        uploading: 0,
        newTag: '',
        newVideo: '',
        newBullet: '',

        status: { visible: false, msg: '', type: '' },
        modal: { open: false, title: '', body: '', actions: [] },

        async init() {
            this.$watch('view', () => this.refreshIcons());
            this.$watch('tab', () => this.refreshIcons());
            // New rows (media, details, links…) and the icon preview bring new <i data-lucide> tags.
            this.$watch('activeRecord', () => this.refreshIcons());
            window.addEventListener('beforeunload', e => {
                if (this.editorType && this.isDirty()) e.preventDefault();
            });
            try {
                await this.loadContent();
                this.view = 'list';
                this.refreshIcons();
            } catch (err) {
                this.deniedMessage = err.message;
                this.view = 'denied';
            }
        },

        refreshIcons() {
            this.$nextTick(() => window.lucide && lucide.createIcons());
        },

        // Whether Lucide knows an icon name ("gamepad-2" -> icons.Gamepad2).
        iconExists(name) {
            if (!name || !window.lucide) return false;
            const key = name.trim().split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
            return !!lucide.icons[key];
        },

        youtubeId,
        mediaUrl,

        flash(msg, type = 'success') {
            this.status = { visible: true, msg, type };
            clearTimeout(this._flashTimer);
            this._flashTimer = setTimeout(() => { this.status.visible = false; }, type === 'error' ? 6000 : 3000);
        },

        // fetch for /api/admin/*. When the Cloudflare Access sign-in has expired,
        // Access answers with a redirect to its login page, which fetch cannot
        // follow; the edits on screen are kept and the user signs in again in
        // another tab.
        async request(url, options = {}) {
            let response;
            try {
                response = await fetch(url, { ...options, redirect: 'manual' });
            } catch (err) {
                throw new Error('Connection failed');
            }
            const redirected = response.type === 'opaqueredirect' || (response.status >= 300 && response.status < 400);
            if (redirected || response.status === 401) {
                if (this.view !== 'loading') this.accessExpired();
                throw new Error('Not signed in (Cloudflare Access)');
            }
            const data = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
            return data;
        },

        api(method, url, body) {
            return this.request(url, {
                method,
                headers: body ? { 'Content-Type': 'application/json' } : {},
                body: body ? JSON.stringify(body) : undefined
            });
        },

        accessExpired() {
            this.modal = {
                open: true,
                title: 'Sign in again',
                body: 'Your Cloudflare Access sign-in has expired. Sign in again in a new tab, then come back here and repeat what you were doing. Your edits on this page are kept.',
                actions: [
                    {
                        text: 'Sign in (new tab)', class: 'bg-zinc-900 text-white hover:bg-zinc-700',
                        fn: () => { window.open('/admin/', '_blank'); this.modal.open = false; }
                    },
                    {
                        text: 'Close', class: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200',
                        fn: () => { this.modal.open = false; }
                    }
                ]
            };
        },

        logout() {
            this.pristine = null;
            window.location.href = '/cdn-cgi/access/logout';
        },

        // ---- Data ----
        async loadContent() {
            const data = await this.api('GET', '/api/admin/content');
            this.user = data.user;
            this.projects = data.projects;
            this.experience = data.experience;
            this.education = data.education;
        },

        listFor(tab) {
            return tab === 'projects' ? this.projects : this[tab];
        },

        // ---- Unsaved-changes guard ----
        isDirty() {
            return this.pristine !== null && JSON.stringify(this.activeRecord) !== this.pristine;
        },

        // All navigation goes through here so unsaved edits are never lost silently.
        go(target, arg) {
            const actions = {
                list: () => this.showList(),
                newProject: () => this.openProject(null),
                newTimeline: () => this.openTimeline(null, arg),
                project: () => this.openProject(arg),
                timeline: () => this.openTimeline(arg),
                logout: () => this.logout()
            };
            const action = actions[target];
            if (!action) return;
            if (this.editorType && this.isDirty()) this.confirmDiscard(action);
            else action();
        },

        confirmDiscard(action) {
            this.modal = {
                open: true,
                title: 'Unsaved changes',
                body: 'You have unsaved changes. What would you like to do?',
                actions: [
                    {
                        text: 'Save changes', class: 'bg-zinc-900 text-white hover:bg-zinc-700',
                        fn: async () => {
                            this.modal.open = false;
                            if (await this.handleSave()) action();
                        }
                    },
                    {
                        text: 'Discard', class: 'bg-red-600 text-white hover:bg-red-700',
                        fn: () => { this.pristine = null; this.modal.open = false; action(); }
                    },
                    {
                        text: 'Keep editing', class: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200',
                        fn: () => { this.modal.open = false; }
                    }
                ]
            };
        },

        async showList() {
            this.editorType = null;
            this.pristine = null;
            this.view = 'list';
            try {
                await this.loadContent();
            } catch (err) {
                this.flash(err.message, 'error');
            }
            this.refreshIcons();
        },

        openProject(id) {
            const found = id && this.projects.find(p => p.id === id);
            this.activeRecord = clone(found || EMPTY_PROJECT);
            this.editorType = 'project';
            this.newTag = this.newVideo = '';
            this.pristine = JSON.stringify(this.activeRecord);
            this.view = 'editor';
            window.scrollTo(0, 0);
        },

        openTimeline(id, section) {
            const found = id && [...this.experience.map(e => ({ ...e, section: 'experience' })),
                                 ...this.education.map(e => ({ ...e, section: 'education' }))].find(e => e.id === id);
            this.activeRecord = clone(found || { ...EMPTY_TIMELINE, section: section || 'experience' });
            this.editorType = 'timeline';
            this.newBullet = '';
            this.pristine = JSON.stringify(this.activeRecord);
            this.view = 'editor';
            window.scrollTo(0, 0);
        },

        // ---- Save / delete ----
        async handleSave() {
            if (this.saving) return false;
            if (this.uploading) {
                this.flash('Wait for the uploads to finish.', 'error');
                return false;
            }
            this.saving = true;
            const r = this.activeRecord;
            const url = this.editorType === 'project' ? '/api/admin/projects' : '/api/admin/timeline';
            try {
                const result = await this.api(r.id ? 'PUT' : 'POST', url, r);
                r.id = result.id;
                this.pristine = JSON.stringify(r);
                this.flash('Saved');
                await this.loadContent();
                return true;
            } catch (err) {
                this.flash(err.message, 'error');
                return false;
            } finally {
                this.saving = false;
            }
        },

        confirmDelete() {
            const r = this.activeRecord;
            this.modal = {
                open: true,
                title: 'Delete permanently?',
                body: `"${r.title}" will be removed${this.editorType === 'project' ? ', together with its uploaded images' : ''}. This cannot be undone.`,
                actions: [
                    {
                        text: 'Delete', class: 'bg-red-600 text-white hover:bg-red-700',
                        fn: async () => {
                            this.modal.open = false;
                            const url = this.editorType === 'project' ? '/api/admin/projects/' : '/api/admin/timeline/';
                            try {
                                await this.api('DELETE', url + encodeURIComponent(r.id));
                                this.flash('Deleted');
                                this.pristine = null;
                                await this.showList();
                            } catch (err) {
                                this.flash(err.message, 'error');
                            }
                        }
                    },
                    {
                        text: 'Cancel', class: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200',
                        fn: () => { this.modal.open = false; }
                    }
                ]
            };
        },

        // ---- Ordering (list view) ----
        async move(tab, index, delta) {
            const list = this.listFor(tab);
            const to = index + delta;
            if (to < 0 || to >= list.length) return;
            [list[index], list[to]] = [list[to], list[index]];
            try {
                await this.api('PUT', '/api/admin/order', {
                    type: tab === 'projects' ? 'projects' : 'timeline',
                    ids: list.map(item => item.id)
                });
            } catch (err) {
                this.flash(err.message, 'error');
                await this.loadContent();
            }
            this.refreshIcons();
        },

        // Move an item inside an array on the active record (media, details, links, bullets).
        moveItem(arr, index, delta) {
            const to = index + delta;
            if (to < 0 || to >= arr.length) return;
            [arr[index], arr[to]] = [arr[to], arr[index]];
        },

        // ---- Project editor helpers ----
        addTag() {
            const tag = this.newTag.trim().replace(/,$/, '');
            if (tag && !this.activeRecord.tags.includes(tag)) this.activeRecord.tags.push(tag);
            this.newTag = '';
        },

        // Tags already used on other projects, offered as suggestions.
        knownTags() {
            return [...new Set(this.projects.flatMap(p => p.tags))].sort();
        },

        addVideo() {
            const id = youtubeId(this.newVideo);
            if (!id) {
                this.flash('That does not look like a YouTube link.', 'error');
                return;
            }
            // Stored in the one shape the public site's embed code reads.
            this.activeRecord.media.push({ kind: 'video', url: `https://www.youtube.com/watch?v=${id}`, caption: '' });
            this.newVideo = '';
        },

        async uploadFiles(fileList) {
            const files = [...fileList];
            for (const file of files) {
                if (!IMAGE_INPUT_TYPES.includes(file.type)) {
                    this.flash(`"${file.name}" is not a JPEG, PNG, WebP or GIF image.`, 'error');
                    continue;
                }
                if (file.size > IMAGE_MAX_BYTES) {
                    this.flash(`"${file.name}" is over 15 MB.`, 'error');
                    continue;
                }
                this.uploading++;
                try {
                    const optimized = await optimizeImage(file);
                    const form = new FormData();
                    form.append('file', optimized);
                    const data = await this.request('/api/admin/upload', { method: 'POST', body: form });
                    this.activeRecord.media.push({ kind: 'upload', r2_key: data.r2_key, caption: '' });
                } catch (err) {
                    this.flash(err.message, 'error');
                } finally {
                    this.uploading--;
                }
            }
        },

        // ---- Timeline editor helpers ----
        addBullet() {
            const text = this.newBullet.trim();
            if (text) this.activeRecord.resume_bullets.push(text);
            this.newBullet = '';
        }
    }));
});
