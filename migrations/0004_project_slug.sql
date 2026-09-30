-- URL name for each project: lauristaube.com/projects/<slug>.
-- Existing ids are already URL-friendly names ('pitchforks', 'lipke-vr', ...), so
-- they become the slugs; new projects get one from their title (editable in the CMS).
ALTER TABLE projects ADD COLUMN slug TEXT;
UPDATE projects SET slug = id;
CREATE UNIQUE INDEX idx_projects_slug ON projects (slug);
