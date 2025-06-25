import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Reply, Forward, Archive, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Message } from '@/pages/admin/MessagesPage';
import { useMessageActions } from './MessageActions';

interface MessageHeaderProps {
  message: Message;
  onMessageDeleted?: () => void;
  onReply?: (message: Message) => void;
  onForward?: (message: Message) => void;
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export function MessageHeader({ message, onMessageDeleted, onReply, onForward }: MessageHeaderProps) {
  const { handleReply, handleForward, handleArchive, handleDelete } = useMessageActions({
    message,
    onMessageDeleted,
    onReply,
    onForward
  });

  return (
    <div className="border-b border-gray-200 p-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {message.subject}
            </h2>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-medium">{message.sender_name}</span>
            <Badge 
              variant={getRoleBadgeVariant(message.sender_role)}
              className="text-xs px-1.5 py-0.5 capitalize"
            >
              {message.sender_role}
            </Badge>
            <span className="text-gray-400">•</span>
            <span>{formatDate(message.sent_at)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <Button variant="outline" size="sm" onClick={handleReply}>
            <Reply className="h-4 w-4 mr-1" />
            Reply
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleForward}>
                <Forward className="h-4 w-4 mr-2" />
                Forward
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive}>
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
