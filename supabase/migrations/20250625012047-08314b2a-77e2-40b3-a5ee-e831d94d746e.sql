
-- Create discussions table
CREATE TABLE public.discussions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  author_name text NOT NULL,
  author_role text NOT NULL DEFAULT 'student',
  category text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'open',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  last_activity_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create discussion replies table
CREATE TABLE public.discussion_replies (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  discussion_id uuid REFERENCES public.discussions(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  author_id uuid REFERENCES auth.users(id) NOT NULL,
  author_name text NOT NULL,
  author_role text NOT NULL DEFAULT 'student',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discussion_replies ENABLE ROW LEVEL SECURITY;

-- RLS policies for discussions - allow all authenticated users to read
CREATE POLICY "Authenticated users can view discussions" 
  ON public.discussions 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create discussions" 
  ON public.discussions 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own discussions" 
  ON public.discussions 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = author_id);

-- RLS policies for replies - allow all authenticated users to read
CREATE POLICY "Authenticated users can view replies" 
  ON public.discussion_replies 
  FOR SELECT 
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create replies" 
  ON public.discussion_replies 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own replies" 
  ON public.discussion_replies 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = author_id);

-- Create indexes for better performance
CREATE INDEX idx_discussions_created_at ON public.discussions(created_at DESC);
CREATE INDEX idx_discussions_category ON public.discussions(category);
CREATE INDEX idx_discussion_replies_discussion_id ON public.discussion_replies(discussion_id);
CREATE INDEX idx_discussion_replies_created_at ON public.discussion_replies(created_at);

-- Function to update last_activity_at when replies are added
CREATE OR REPLACE FUNCTION update_discussion_activity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.discussions 
  SET last_activity_at = now() 
  WHERE id = NEW.discussion_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update discussion activity
CREATE TRIGGER trigger_update_discussion_activity
  AFTER INSERT ON public.discussion_replies
  FOR EACH ROW EXECUTE FUNCTION update_discussion_activity();
