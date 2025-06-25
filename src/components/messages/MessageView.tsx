
import { Message } from '@/pages/admin/MessagesPage';
import { MessageEmptyState } from './MessageEmptyState';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';

interface MessageViewProps {
  message: Message | null;
  onMessageDeleted?: () => void;
  onReply?: (message: Message) => void;
  onForward?: (message: Message) => void;
}

export function MessageView({ message, onMessageDeleted, onReply, onForward }: MessageViewProps) {
  if (!message) {
    return <MessageEmptyState />;
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50/30 backdrop-blur-sm">
      <MessageHeader 
        message={message} 
        onMessageDeleted={onMessageDeleted}
        onReply={onReply}
        onForward={onForward}
      />
      <MessageContent 
        message={message} 
        onMessageDeleted={onMessageDeleted}
        onReply={onReply}
        onForward={onForward}
      />
    </div>
  );
}
