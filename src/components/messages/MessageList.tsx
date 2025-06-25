
import React from 'react';
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
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-sm font-medium">No messages yet</p>
          <p className="text-xs text-gray-400 mt-1">
            Messages will appear here when you receive them
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => onMessageSelect(message)}
          className={cn(
            'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
            selectedMessage?.id === message.id && 'bg-blue-50 border-r-2 border-blue-500',
            !message.read && 'bg-blue-25'
          )}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className={cn(
                'text-sm font-medium truncate',
                !message.read && 'font-semibold'
              )}>
                {message.sender_name}
              </span>
              <Badge 
                variant={getRoleBadgeVariant(message.sender_role)}
                className="text-xs px-1.5 py-0.5 capitalize"
              >
                {message.sender_role}
              </Badge>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {formatTimeAgo(message.sent_at)}
            </span>
          </div>
          
          <div className="mb-2">
            <p className={cn(
              'text-sm text-gray-900 truncate',
              !message.read && 'font-semibold'
            )}>
              {message.subject}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 truncate">
              {message.content.substring(0, 80)}...
            </p>
            {!message.read && (
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
