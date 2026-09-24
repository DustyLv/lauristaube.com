-- Portfolio content. Apply with (from the repo root):
--   npx wrangler d1 migrations apply portfolio-db --local --persist-to=.wrangler/state
--   npx wrangler d1 migrations apply portfolio-db --remote

CREATE TABLE projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    -- Plain text for the project card and the resume.
    description TEXT NOT NULL,
    -- Rich text (HTML from the CMS editor) for the project modal.
    long_description TEXT,
    -- Lucide icon name shown on the card.
    icon TEXT,
    -- JSON: ["Unity", "C#"]
    tags TEXT NOT NULL DEFAULT '[]',
    -- JSON: [{"label": "Platform", "value": "PC"}]
    details TEXT NOT NULL DEFAULT '[]',
    -- JSON: [{"label": "Play on itch.io", "url": "https://..."}]
    links TEXT NOT NULL DEFAULT '[]',
    -- The featured project gets the large card and is left out of the resume.
    is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
    -- Drafts are only visible in the CMS.
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    position INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- At most one featured project.
CREATE UNIQUE INDEX idx_projects_one_featured ON projects (is_featured) WHERE is_featured = 1;
CREATE INDEX idx_projects_listing ON projects (status, position);

-- A project's gallery, in display order:
--   upload - an image in the MEDIA bucket, addressed by r2_key
--   video  - a YouTube link, by url
CREATE TABLE project_media (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    kind TEXT NOT NULL CHECK (kind IN ('upload', 'video')),
    r2_key TEXT,
    url TEXT,
    caption TEXT,
    position INTEGER NOT NULL DEFAULT 0,
    CHECK ((kind = 'upload' AND r2_key IS NOT NULL) OR (kind = 'video' AND url IS NOT NULL))
);

CREATE INDEX idx_project_media_project ON project_media (project_id, position);

-- Experience and education entries, shown on the site and in the resume.
CREATE TABLE timeline (
    id TEXT PRIMARY KEY,
    section TEXT NOT NULL CHECK (section IN ('experience', 'education')),
    title TEXT NOT NULL,
    organization TEXT,
    -- Free text, e.g. "2019 - Present".
    period TEXT NOT NULL,
    -- Paragraph shown on the site.
    description TEXT,
    -- JSON: ["...", "..."]. The resume shows these, or the description when empty.
    resume_bullets TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    position INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_timeline_listing ON timeline (section, status, position);

-- CMS logins. Replaced by Cloudflare Access and dropped in 0002.
CREATE TABLE access_keys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
