
import { supabase } from '@/integrations/supabase/client';

export interface Discussion {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  author_role: 'student' | 'teacher' | 'admin';
  category: string;
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  last_activity_at: string;
  reply_count?: number;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  content: string;
  author_id: string;
  author_name: string;
  author_role: 'student' | 'teacher' | 'admin';
  created_at: string;
  updated_at: string;
}

export const discussionsService = {
  // Fetch all discussions with reply counts
  async fetchDiscussions(): Promise<Discussion[]> {
    console.log('Fetching discussions from database...');
    
    const { data, error } = await supabase
      .from('discussions')
      .select(`
        *,
        discussion_replies(count)
      `)
      .order('last_activity_at', { ascending: false });

    if (error) {
      console.error('Error fetching discussions:', error);
      throw error;
    }

    return data?.map(discussion => ({
      ...discussion,
      reply_count: discussion.discussion_replies?.[0]?.count || 0
    })) || [];
  },

  // Fetch single discussion with replies
  async fetchDiscussion(id: string): Promise<{ discussion: Discussion; replies: DiscussionReply[] }> {
    console.log('Fetching discussion:', id);
    
    const [discussionResult, repliesResult] = await Promise.all([
      supabase
        .from('discussions')
        .select('*')
        .eq('id', id)
        .single(),
      supabase
        .from('discussion_replies')
        .select('*')
        .eq('discussion_id', id)
        .order('created_at', { ascending: true })
    ]);

    if (discussionResult.error) {
      console.error('Error fetching discussion:', discussionResult.error);
      throw discussionResult.error;
    }

    if (repliesResult.error) {
      console.error('Error fetching replies:', repliesResult.error);
      throw repliesResult.error;
    }

    return {
      discussion: discussionResult.data,
      replies: repliesResult.data || []
    };
  },

  // Create a new discussion
  async createDiscussion(discussionData: {
    title: string;
    content: string;
    category: string;
  }): Promise<Discussion> {
    console.log('Creating discussion:', discussionData);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get current user profile for author info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    const { data, error } = await supabase
      .from('discussions')
      .insert({
        title: discussionData.title,
        content: discussionData.content,
        category: discussionData.category,
        author_id: user.id,
        author_name: profile?.full_name || 'Unknown User',
        author_role: profile?.role || 'student'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating discussion:', error);
      throw error;
    }

    return data;
  },

  // Add a reply to a discussion
  async addReply(discussionId: string, content: string): Promise<DiscussionReply> {
    console.log('Adding reply to discussion:', discussionId);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get current user profile for author info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    const { data, error } = await supabase
      .from('discussion_replies')
      .insert({
        discussion_id: discussionId,
        content,
        author_id: user.id,
        author_name: profile?.full_name || 'Unknown User',
        author_role: profile?.role || 'student'
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding reply:', error);
      throw error;
    }

    return data;
  }
};
