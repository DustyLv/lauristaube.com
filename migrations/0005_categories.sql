-- Filter tags ("Tags" in the CMS, the filter bar on the site). Separate from
-- projects.tags, which are the technologies (Unity, C#, ...). Names live in one
-- place, so renaming a tag in the CMS updates every project that uses it.
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    -- Order of the filter buttons.
    position INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE project_categories (
    project_id TEXT NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    category_id TEXT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

CREATE INDEX idx_project_categories_category ON project_categories (category_id);

-- Preset tags. Add, rename, reorder or delete them in the CMS.
INSERT INTO categories (id, name, position) VALUES
    ('vr', 'VR', 0),
    ('ar', 'AR', 1),
    ('game', 'Games', 2),
    ('3d-art', '3D Art', 3),
    ('training', 'Training', 4),
    ('education', 'Education', 5),
    ('museum', 'Museums', 6),
    ('simulation', 'Simulation', 7),
    ('prototype', 'Prototypes', 8);

-- Starting tags for the projects imported from the old site, from their
-- descriptions. Projects that no longer exist are skipped. Adjust in the CMS.
WITH v(project_id, category_id) AS (VALUES
    ('pitchforks', 'game'),
    ('lipke-guide', 'ar'), ('lipke-guide', 'museum'),
    ('rix', '3d-art'), ('rix', 'vr'),
    ('lipke-vr', 'vr'), ('lipke-vr', 'museum'), ('lipke-vr', '3d-art'),
    ('volga-heatwave', 'game'),
    ('crayfish-rush', 'vr'), ('crayfish-rush', 'game'), ('crayfish-rush', 'museum'),
    ('izlidzi-vitolam', 'vr'), ('izlidzi-vitolam', 'game'), ('izlidzi-vitolam', 'education'),
    ('zaao', 'vr'), ('zaao', 'game'), ('zaao', 'education'),
    ('train-dispatch', 'game'), ('train-dispatch', 'education'), ('train-dispatch', 'museum'),
    ('art-plus', 'ar'), ('art-plus', '3d-art'),
    ('audio-viz', '3d-art'),
    ('bog-sim', 'vr'), ('bog-sim', 'simulation'),
    ('motor-assembly', 'vr'), ('motor-assembly', 'training'), ('motor-assembly', 'education'),
    ('safescaff', 'vr'), ('safescaff', 'training'), ('safescaff', 'simulation'),
    ('exonicus', 'ar'), ('exonicus', 'prototype'),
    ('overly', 'museum'),
    ('find-yourself', 'game'), ('find-yourself', 'education'),
    ('stellar-miner', 'game'),
    ('spatial', 'vr'), ('spatial', 'prototype')
)
INSERT OR IGNORE INTO project_categories (project_id, category_id)
SELECT v.project_id, v.category_id FROM v JOIN projects p ON p.id = v.project_id;
