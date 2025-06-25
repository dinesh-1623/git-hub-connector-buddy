
import { useState, useEffect } from 'react';
import { MessageList } from '@/components/messages/MessageList';
import { MessageView } from '@/components/messages/MessageView';
import { ComposeMessageDialog } from '@/components/messages/ComposeMessageDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { messagesService } from '@/services/messagesService';
import { useAuth } from '@/context/AuthContext';

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_role: 'student' | 'teacher' | 'admin';
  recipient_id: string;
  subject: string;
  content: string;
  sent_at: string;
  read: boolean;
  type: 'inbox' | 'sent';
}

export function MessagesPage() {
  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  // Load messages on component mount
  useEffect(() => {
    if (user) {
      loadMessages();
    }
  }, [user]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const fetchedMessages = await messagesService.fetchUserMessages();
      setMessages(fetchedMessages);
      console.log('Loaded messages:', fetchedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const inboxMessages = messages.filter(msg => msg.type === 'inbox');
  const sentMessages = messages.filter(msg => msg.type === 'sent');

  const handleMessageSelect = async (message: Message) => {
    setSelectedMessage(message);
    
    // Mark as read if it's an inbox message and not already read
    if (message.type === 'inbox' && !message.read) {
      try {
        await messagesService.markAsRead(message.id);
        // Update local state
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        ));
      } catch (error) {
        console.error('Failed to mark message as read:', error);
      }
    }
  };

  const handleCompose = () => {
    setIsComposeOpen(true);
  };

  const handleSendMessage = async (messageData: { 
    recipient: string; 
    subject: string; 
    content: string; 
  }) => {
    try {
      // Get available users to find recipient details
      const users = await messagesService.getAvailableUsers();
      const recipient = users.find(u => u.id === messageData.recipient);
      
      if (!recipient) {
        toast.error('Recipient not found');
        return;
      }

      await messagesService.sendMessage({
        recipient_id: recipient.id,
        recipient_name: recipient.name,
        recipient_role: recipient.role,
        subject: messageData.subject,
        content: messageData.content
      });

      toast.success('Message sent successfully!', {
        description: 'Your message has been delivered to the recipient.'
      });

      // Reload messages to show the sent message
      await loadMessages();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
            <p className="text-sm text-gray-600 mt-1">
              Loading messages...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-600 mt-1">
            Communicate with students, teachers, and administrators
          </p>
        </div>
        <Button onClick={handleCompose} className="gap-2">
          <Plus className="h-4 w-4" />
          Compose
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex h-full">
          {/* Left Panel - Message List */}
          <div className="w-96 border-r border-gray-200 flex flex-col">
            <div className="border-b border-gray-200">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-50 rounded-none">
                  <TabsTrigger 
                    value="inbox" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Inbox ({inboxMessages.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sent"
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    Sent ({sentMessages.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="inbox" className="mt-0">
                  <MessageList
                    messages={inboxMessages}
                    selectedMessage={selectedMessage}
                    onMessageSelect={handleMessageSelect}
                  />
                </TabsContent>
                
                <TabsContent value="sent" className="mt-0">
                  <MessageList
                    messages={sentMessages}
                    selectedMessage={selectedMessage}
                    onMessageSelect={handleMessageSelect}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Panel - Message View */}
          <div className="flex-1">
            <MessageView message={selectedMessage} />
          </div>
        </div>
      </div>

      {/* Compose Dialog */}
      <ComposeMessageDialog 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendMessage}
      />
    </div>
  );
}
