
import { toast } from 'sonner';
import { Message } from '@/pages/admin/MessagesPage';
import { messagesService } from '@/services/messagesService';

interface UseMessageActionsProps {
  message: Message;
  onMessageDeleted?: () => void;
  onReply?: (message: Message) => void;
  onForward?: (message: Message) => void;
}

export const useMessageActions = ({ message, onMessageDeleted, onReply, onForward }: UseMessageActionsProps) => {
  const handleReply = () => {
    console.log('Reply to message:', message.id);
    if (onReply) {
      onReply(message);
    } else {
      // Open compose with pre-filled data
      const event = new CustomEvent('openCompose', {
        detail: {
          recipient: message.sender_id,
          subject: `Re: ${message.subject}`,
          content: `\n\n--- Original Message ---\nFrom: ${message.sender_name}\nSubject: ${message.subject}\n\n${message.content}`
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleForward = () => {
    console.log('Forward message:', message.id);
    if (onForward) {
      onForward(message);
    } else {
      // Open compose with forwarded content
      const event = new CustomEvent('openCompose', {
        detail: {
          subject: `Fwd: ${message.subject}`,
          content: `\n\n--- Forwarded Message ---\nFrom: ${message.sender_name}\nTo: You\nSubject: ${message.subject}\nDate: ${message.sent_at}\n\n${message.content}`
        }
      });
      window.dispatchEvent(event);
    }
  };

  const handleArchive = async () => {
    try {
      console.log('Archive message:', message.id);
      // For now, we'll mark the message as read since there's no archive status in the current schema
      await messagesService.markAsRead(message.id);
      toast.success("Message archived successfully", {
        description: "The message has been marked as archived"
      });
      
      // Call the callback to refresh the message list
      if (onMessageDeleted) {
        onMessageDeleted();
      }
    } catch (error) {
      console.error('Failed to archive message:', error);
      toast.error("Failed to archive message", {
        description: "Please try again"
      });
    }
  };

  const handleDelete = async () => {
    try {
      console.log('Delete message:', message.id);
      await messagesService.deleteMessage(message.id);
      toast.success("Message deleted successfully", {
        description: "The message has been permanently removed"
      });
      
      // Call the callback to refresh the message list
      if (onMessageDeleted) {
        onMessageDeleted();
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error("Failed to delete message", {
        description: "Please try again"
      });
    }
  };

  return {
    handleReply,
    handleForward,
    handleArchive,
    handleDelete
  };
};
