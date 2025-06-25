
import { toast } from 'sonner';
import { Message } from '@/pages/admin/MessagesPage';
import { messagesService } from '@/services/messagesService';

interface UseMessageActionsProps {
  message: Message;
  onMessageDeleted?: () => void;
}

export const useMessageActions = ({ message, onMessageDeleted }: UseMessageActionsProps) => {
  const handleReply = () => {
    console.log('Reply to message:', message.id);
    toast.info(`Reply functionality not yet implemented`, {
      description: "This feature will be available in a future update"
    });
    // TODO: Implement reply functionality with compose dialog
  };

  const handleForward = () => {
    console.log('Forward message:', message.id);
    toast.info("Forward functionality not yet implemented", {
      description: "This feature will be available in a future update"
    });
    // TODO: Implement forward functionality with compose dialog
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
