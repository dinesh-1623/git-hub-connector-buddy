
import { supabase } from '@/integrations/supabase/client';
import { Message } from '@/pages/admin/MessagesPage';

export interface DatabaseMessage {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'student' | 'teacher' | 'admin';
  recipient_id: string;
  recipient_name: string;
  recipient_role: 'student' | 'teacher' | 'admin';
  subject: string;
  content: string;
  sent_at: string;
  read: boolean;
  type?: 'inbox' | 'sent';
}

export const messagesService = {
  // Fetch all messages for the current user
  async fetchUserMessages(): Promise<Message[]> {
    console.log('Fetching user messages from database...');
    
    const { data, error } = await supabase
      .from('user_messages')
      .select('*')
      .order('sent_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }

    console.log('Fetched messages:', data);

    return data?.map(msg => ({
      id: msg.id || '',
      sender_id: msg.sender_id || '',
      sender_name: msg.sender_name || '',
      sender_role: (msg.sender_role as 'student' | 'teacher' | 'admin') || 'student',
      recipient_id: msg.recipient_id || '',
      subject: msg.subject || '',
      content: msg.content || '',
      sent_at: msg.sent_at || '',
      read: msg.read || false,
      type: (msg.type as 'inbox' | 'sent') || 'inbox'
    })).filter(msg => msg.id) || [];
  },

  // Send a new message
  async sendMessage(messageData: {
    recipient_id: string;
    recipient_name: string;
    recipient_role: string;
    subject: string;
    content: string;
  }): Promise<void> {
    console.log('Sending message:', messageData);

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Get current user profile for sender info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    const { error } = await supabase
      .from('messages')
      .insert({
        sender_id: user.id,
        sender_name: profile?.full_name || 'Unknown User',
        sender_role: profile?.role || 'student',
        recipient_id: messageData.recipient_id,
        recipient_name: messageData.recipient_name,
        recipient_role: messageData.recipient_role,
        subject: messageData.subject,
        content: messageData.content
      });

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }

    console.log('Message sent successfully');
  },

  // Mark message as read
  async markAsRead(messageId: string): Promise<void> {
    console.log('Marking message as read:', messageId);

    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', messageId);

    if (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  // Delete a message
  async deleteMessage(messageId: string): Promise<void> {
    console.log('Deleting message:', messageId);

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.error('Error deleting message:', error);
      throw error;
    }

    console.log('Message deleted successfully');
  },

  // Get available users for messaging
  async getAvailableUsers(): Promise<Array<{ id: string; name: string; role: string }>> {
    console.log('Fetching available users...');

    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role')
      .not('full_name', 'is', null);

    if (error) {
      console.error('Error fetching users:', error);
      throw error;
    }

    return data?.map(user => ({
      id: user.id,
      name: user.full_name || 'Unknown User',
      role: user.role || 'student'
    })) || [];
  }
};
