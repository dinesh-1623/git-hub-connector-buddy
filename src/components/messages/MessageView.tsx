
import { Message } from '@/pages/admin/MessagesPage';
import { MessageEmptyState } from './MessageEmptyState';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';

interface MessageViewProps {
  message: Message | null;
}

export function MessageView({ message }: MessageViewProps) {
  if (!message) {
    return <MessageEmptyState />;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <MessageHeader message={message} />
      <MessageContent message={message} />
    </div>
  );
}
