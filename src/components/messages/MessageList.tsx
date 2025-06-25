
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Message } from '@/pages/admin/MessagesPage';

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message) => void;
}

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case 'admin':
      return 'destructive';
    case 'teacher':
      return 'default';
    case 'student':
      return 'secondary';
    default:
      return 'outline';
  }
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const messageDate = new Date(dateString);
  const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }
};

export function MessageList({ messages, selectedMessage, onMessageSelect }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500 p-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-inner">
            <div className="w-8 h-8 rounded-full bg-white/60"></div>
          </div>
          <p className="text-sm font-medium text-gray-600">No messages yet</p>
          <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
            Messages will appear here when you receive them
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100/60">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onMessageSelect(message)}
          className={cn(
            'p-5 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 border-l-2 border-transparent hover:border-blue-200',
            selectedMessage?.id === message.id && 'bg-gradient-to-r from-blue-50/80 to-indigo-50/50 border-l-blue-500 shadow-sm',
            !message.read && 'bg-gradient-to-r from-blue-25/60 to-indigo-25/30'
          )}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className={cn(
                'text-sm font-medium truncate tracking-wide',
                !message.read && 'font-semibold text-gray-900',
                message.read && 'text-gray-700'
              )}>
                {message.sender_name}
              </span>
              <Badge 
                variant={getRoleBadgeVariant(message.sender_role)}
                className="text-xs px-2 py-1 capitalize font-medium rounded-full shadow-sm"
              >
                {message.sender_role}
              </Badge>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-3 font-light">
              {formatTimeAgo(message.sent_at)}
            </span>
          </div>
          
          <div className="mb-3">
            <p className={cn(
              'text-sm text-gray-900 truncate tracking-wide',
              !message.read && 'font-semibold',
              message.read && 'font-medium'
            )}>
              {message.subject}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 truncate font-light leading-relaxed">
              {message.content.substring(0, 80)}...
            </p>
            {!message.read && (
              <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full ml-3 flex-shrink-0 shadow-sm"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
