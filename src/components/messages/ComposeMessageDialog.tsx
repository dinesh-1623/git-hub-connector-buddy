
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, X } from 'lucide-react';
import { messagesService } from '@/services/messagesService';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  role: string;
}

interface ComposeMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (messageData: { recipient: string; subject: string; content: string }) => void;
  initialData?: {
    recipient?: string;
    subject?: string;
    content?: string;
  };
}

export function ComposeMessageDialog({ isOpen, onClose, onSend, initialData }: ComposeMessageDialogProps) {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Load available users when dialog opens
  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  // Set initial data when provided
  useEffect(() => {
    if (initialData) {
      setRecipient(initialData.recipient || '');
      setSubject(initialData.subject || '');
      setContent(initialData.content || '');
    }
  }, [initialData]);

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const availableUsers = await messagesService.getAvailableUsers();
      setUsers(availableUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleSend = async () => {
    if (!recipient || !subject || !content) {
      return;
    }

    setIsSending(true);
    
    try {
      await onSend({ recipient, subject, content });
      
      // Reset form and close dialog
      setRecipient('');
      setSubject('');
      setContent('');
      onClose();
    } catch (error) {
      console.error('Error in handleSend:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (!isSending) {
      setRecipient('');
      setSubject('');
      setContent('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-2xl rounded-2xl">
        <DialogHeader className="border-b border-gray-200/60 pb-4 mb-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900 tracking-tight">Compose Message</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isSending}
              className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 transition-all duration-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Recipient */}
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-sm font-medium text-gray-700 tracking-wide">To</Label>
            <Select value={recipient} onValueChange={setRecipient} disabled={loadingUsers}>
              <SelectTrigger className="bg-white/80 border-gray-200 hover:border-gray-300 focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm">
                <SelectValue placeholder={loadingUsers ? "Loading users..." : "Select recipient"} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl rounded-lg">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id} className="hover:bg-blue-50/80 transition-colors duration-150">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700 tracking-wide">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              disabled={isSending}
              className="bg-white/80 border-gray-200 hover:border-gray-300 focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700 tracking-wide">Message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              disabled={isSending}
              className="resize-none bg-white/80 border-gray-200 hover:border-gray-300 focus:border-blue-400 transition-all duration-200 rounded-lg shadow-sm font-light leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200/60">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSending}
              className="bg-white/80 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!recipient || !subject || !content || isSending}
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
