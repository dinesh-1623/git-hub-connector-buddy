
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
  onReply?: (message: Message) => void;
  onForward?: (message: Message) => void;
}

export function MessageContent({ message, onMessageDeleted, onReply, onForward }: MessageContentProps) {
  const { handleReply, handleForward, handleArchive, handleDelete } = useMessageActions({ 
    message,
    onMessageDeleted,
    onReply,
    onForward
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex-1 p-8 overflow-y-auto bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/90">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-gray">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-base font-light tracking-wide selection:bg-blue-100/60 selection:text-blue-900">
                {message.content}
              </div>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl rounded-xl">
        <ContextMenuItem onClick={handleReply} className="gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-blue-50/80 hover:text-blue-700 group">
          <Reply className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Reply to this message</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleForward} className="gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-green-50/80 hover:text-green-700 group">
          <Forward className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Forward message</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleArchive} className="gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-amber-50/80 hover:text-amber-700 group">
          <Archive className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Archive message</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="gap-3 py-3 px-4 rounded-lg transition-all duration-200 hover:bg-red-50/80 hover:text-red-600 group">
          <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium">Delete message</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
