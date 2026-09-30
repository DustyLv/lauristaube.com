-- Case-study facts for each project, shown at the top of the project pop-up's
-- details and (role, year) in the resume. All optional free text.
ALTER TABLE projects ADD COLUMN role TEXT;      -- "Lead developer", "3D artist"
ALTER TABLE projects ADD COLUMN client TEXT;    -- "Žanis Lipke Memorial", "Personal project"
ALTER TABLE projects ADD COLUMN year TEXT;      -- "2023", "2021 - 2022"
ALTER TABLE projects ADD COLUMN duration TEXT;  -- "3 months"
ALTER TABLE projects ADD COLUMN team TEXT;      -- "Solo", "Team of 4"
