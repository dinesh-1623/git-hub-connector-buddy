
import { Message } from '@/pages/admin/MessagesPage';
import { MessageEmptyState } from './MessageEmptyState';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';

interface MessageViewProps {
  message: Message | null;
  onMessageDeleted?: () => void;
}

export function MessageView({ message, onMessageDeleted }: MessageViewProps) {
  if (!message) {
    return <MessageEmptyState />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <MessageHeader message={message} onMessageDeleted={onMessageDeleted} />
      <MessageContent message={message} />
    </div>
  );
}
