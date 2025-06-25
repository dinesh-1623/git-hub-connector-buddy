
import { Reply, Forward, Archive, Trash2 } from 'lucide-react';
import { Message } from '@/pages/admin/MessagesPage';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useMessageActions } from './MessageActions';

interface MessageContentProps {
  message: Message;
  onMessageDeleted?: () => void;
}

export function MessageContent({ message, onMessageDeleted }: MessageContentProps) {
  const { handleReply, handleForward, handleArchive, handleDelete } = useMessageActions({ 
    message,
    onMessageDeleted
  });

  return (
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
  );
}
