
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reply, Forward, Archive, Trash2 } from 'lucide-react';
import { Message } from '@/pages/admin/MessagesPage';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { toast } from 'sonner';

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
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Reply className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Select a message
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Choose a message from the list to view its contents and take actions
          </p>
        </div>
      </div>
    );
  }

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

  const handleDelete = () => {
    console.log('Delete message:', message.id);
    toast.success("Message deleted successfully", {
      description: "The message has been permanently removed"
    });
    // TODO: Remove message from list and update state
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Message Header with Enhanced Styling */}
      <div className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
              {message.subject}
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-gray-900">
                {message.sender_name}
              </span>
              <Badge 
                variant={getRoleBadgeVariant(message.sender_role)}
                className="text-xs px-2 py-1 capitalize font-medium shadow-sm"
              >
                {message.sender_role}
              </Badge>
              <span className="text-sm text-gray-500">
                {formatDateTime(message.sent_at)}
              </span>
              {!message.read && (
                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                  Unread
                </Badge>
              )}
            </div>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex items-center gap-2 ml-4 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReply}
              className="gap-2 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all duration-200 shadow-sm"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleForward}
              className="gap-2 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all duration-200 shadow-sm"
            >
              <Forward className="h-4 w-4" />
              Forward
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleArchive}
              className="gap-2 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-200 shadow-sm"
            >
              <Archive className="h-4 w-4" />
              Archive
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 transition-all duration-200 shadow-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Message</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this message? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Message Content with Context Menu */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base">
                {message.content}
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem onClick={handleReply} className="gap-2">
            <Reply className="h-4 w-4" />
            Reply to this message
          </ContextMenuItem>
          <ContextMenuItem onClick={handleForward} className="gap-2">
            <Forward className="h-4 w-4" />
            Forward message
          </ContextMenuItem>
          <ContextMenuItem onClick={handleArchive} className="gap-2">
            <Archive className="h-4 w-4" />
            Archive message
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDelete} className="gap-2 text-red-600">
            <Trash2 className="h-4 w-4" />
            Delete message
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
