CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT,
  completion_date DATE,
  client_name TEXT,
  budget DECIMAL,
  area_sqm DECIMAL,
  is_published BOOLEAN DEFAULT false,
  has_permission BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE portfolio_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image' or 'video'
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can access all projects" ON portfolio_projects FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Public can view published and permitted projects" ON portfolio_projects FOR SELECT USING (is_published = true AND has_permission = true);

CREATE POLICY "Admin can access all media" ON portfolio_media FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Public can view media for published projects" ON portfolio_media FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM portfolio_projects 
    WHERE id = portfolio_media.project_id AND is_published = true AND has_permission = true
  )
);
