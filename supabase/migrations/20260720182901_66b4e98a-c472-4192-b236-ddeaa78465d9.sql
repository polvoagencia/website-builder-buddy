
CREATE TABLE public.fohat_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  lead_type TEXT NOT NULL CHECK (lead_type IN ('contato','locacao')),
  name TEXT,
  company TEXT,
  email TEXT,
  phone TEXT,
  city TEXT,
  event_location TEXT,
  start_date DATE,
  end_date DATE,
  project_type TEXT,
  equipment JSONB,
  quantity TEXT,
  needs_delivery BOOLEAN,
  needs_install BOOLEAN,
  needs_support BOOLEAN,
  description TEXT,
  equipment_details TEXT,
  attachment_url TEXT,
  source_page TEXT,
  source_cta TEXT,
  page_url TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  status TEXT NOT NULL DEFAULT 'novo'
);

GRANT INSERT ON public.fohat_leads TO anon;
GRANT INSERT ON public.fohat_leads TO authenticated;
GRANT ALL ON public.fohat_leads TO service_role;

ALTER TABLE public.fohat_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.fohat_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    lead_type IN ('contato','locacao')
    AND status = 'novo'
  );

-- Storage policies for private bucket fohat-lead-attachments
CREATE POLICY "Anyone can upload lead attachments"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'fohat-lead-attachments');
