
import React, { useState } from 'react';
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

interface ComposeMessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ComposeMessageDialog({ isOpen, onClose }: ComposeMessageDialogProps) {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (!recipient || !subject || !content) {
      return;
    }

    setIsSending(true);
    
    // Simulate sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Sending message:', {
      recipient,
      subject,
      content,
    });

    // TODO: Implement actual message sending to Supabase
    
    // Reset form and close dialog
    setRecipient('');
    setSubject('');
    setContent('');
    setIsSending(false);
    onClose();
  };

  const handleClose = () => {
    if (!isSending) {
      setRecipient('');
      setSubject('');
      setContent('');
      onClose();
    }
  };

  // Mock users for recipient selection
  const mockUsers = [
    { id: '1', name: 'Dr. Sarah Johnson', role: 'teacher' },
    { id: '2', name: 'Michael Chen', role: 'admin' },
    { id: '3', name: 'Emily Rodriguez', role: 'student' },
    { id: '4', name: 'Prof. David Wilson', role: 'teacher' },
    { id: '5', name: 'Lisa Park', role: 'student' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Compose Message</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isSending}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Recipient */}
          <div className="space-y-2">
            <Label htmlFor="recipient">To</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <span>{user.name}</span>
                      <span className="text-xs text-gray-500 capitalize">
                        ({user.role})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter message subject"
              disabled={isSending}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Message</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              disabled={isSending}
              className="resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!recipient || !subject || !content || isSending}
              className="gap-2"
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
