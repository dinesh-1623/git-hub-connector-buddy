
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
    <div className="border-b border-gray-200/60 p-6 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900 truncate tracking-tight">
                {message.subject}
              </h2>
            </div>
            
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">{message.sender_name}</span>
                <Badge 
                  variant={getRoleBadgeVariant(message.sender_role)}
                  className="text-xs px-2 py-1 capitalize font-medium rounded-full"
                >
                  {message.sender_role}
                </Badge>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-light">{formatDate(message.sent_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReply}
              className="gap-2 bg-white/80 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/80 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl rounded-xl min-w-[160px]">
                <DropdownMenuItem 
                  onClick={handleForward}
                  className="gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-green-50/80 hover:text-green-700"
                >
                  <Forward className="h-4 w-4" />
                  <span className="font-medium">Forward</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleArchive}
                  className="gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-amber-50/80 hover:text-amber-700"
                >
                  <Archive className="h-4 w-4" />
                  <span className="font-medium">Archive</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleDelete}
                  className="gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 hover:bg-red-50/80 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="font-medium">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
