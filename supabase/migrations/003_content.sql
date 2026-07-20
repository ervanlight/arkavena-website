CREATE TABLE managed_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE trust_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE app_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE content_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES managed_content(id) ON DELETE CASCADE,
  value JSONB NOT NULL,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE managed_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read content" ON managed_content FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read trust docs" ON trust_documents FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read app modules" ON app_modules FOR SELECT USING (true);

-- Admin policies
CREATE POLICY "Admin full access managed_content" ON managed_content FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access site_settings" ON site_settings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access trust_documents" ON trust_documents FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access app_modules" ON app_modules FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Admin full access content_revisions" ON content_revisions FOR ALL USING (auth.role() = 'service_role');
