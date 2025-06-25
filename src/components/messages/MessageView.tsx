import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reply, Forward, Archive, Trash2 } from 'lucide-react';
import { Message } from '@/pages/admin/MessagesPage';

interface MessageViewProps {
  message: Message | null;
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

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function MessageView({ message }: MessageViewProps) {
  if (!message) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Reply className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a message
          </h3>
          <p className="text-sm text-gray-600">
            Choose a message from the list to view its contents
          </p>
        </div>
      </div>
    );
  }

  const handleReply = () => {
    console.log('Reply to message:', message.id);
    // TODO: Implement reply functionality
  };

  const handleForward = () => {
    console.log('Forward message:', message.id);
    // TODO: Implement forward functionality
  };

  const handleArchive = () => {
    console.log('Archive message:', message.id);
    // TODO: Implement archive functionality
  };

  const handleDelete = () => {
    console.log('Delete message:', message.id);
    // TODO: Implement delete functionality
  };

  return (
    <div className="flex flex-col h-full">
      {/* Message Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {message.subject}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">
                {message.sender_name}
              </span>
              <Badge 
                variant={getRoleBadgeVariant(message.sender_role)}
                className="text-xs px-2 py-1 capitalize"
              >
                {message.sender_role}
              </Badge>
              <span className="text-sm text-gray-500">
                {formatDateTime(message.sent_at)}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReply}
              className="gap-2"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleForward}
              className="gap-2"
            >
              <Forward className="h-4 w-4" />
              Forward
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleArchive}
              className="gap-2"
            >
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}
