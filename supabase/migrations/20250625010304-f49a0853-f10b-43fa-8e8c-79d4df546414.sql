
-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES auth.users NOT NULL,
  sender_name TEXT NOT NULL,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('student', 'teacher', 'admin')),
  recipient_id UUID REFERENCES auth.users NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_role TEXT NOT NULL CHECK (recipient_role IN ('student', 'teacher', 'admin')),
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view messages sent to them or sent by them" 
  ON public.messages 
  FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" 
  ON public.messages 
  FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update read status of messages sent to them" 
  ON public.messages 
  FOR UPDATE 
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- Create an index for better performance
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);

-- Create a view for easier message handling
CREATE VIEW public.user_messages AS
SELECT 
  m.*,
  CASE 
    WHEN m.sender_id = auth.uid() THEN 'sent'
    ELSE 'inbox'
  END as type
FROM public.messages m
WHERE m.sender_id = auth.uid() OR m.recipient_id = auth.uid();

-- Enable RLS on the view
ALTER VIEW public.user_messages SET (security_invoker = true);
