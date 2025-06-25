
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
    toast.success(`Starting reply to ${message.sender_name}`, {
      description: "Reply composition will open shortly"
    });
    // TODO: Open compose dialog with pre-filled recipient and subject
  };

  const handleForward = () => {
    console.log('Forward message:', message.id);
    toast.success("Message ready to forward", {
      description: "Forward composition will open shortly"
    });
    // TODO: Open compose dialog with pre-filled content
  };

  const handleArchive = () => {
    console.log('Archive message:', message.id);
    toast.success("Message archived successfully", {
      description: "You can find it in your archived messages"
    });
    // TODO: Update message status to archived
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
