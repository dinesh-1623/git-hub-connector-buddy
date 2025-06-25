
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageSquare, User, Clock, Send } from 'lucide-react';
import { Discussion, DiscussionReply, discussionsService } from '@/services/discussionsService';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

interface DiscussionDetailProps {
  discussion: Discussion;
  onBack: () => void;
  onUpdate: () => void;
}

export const DiscussionDetail: React.FC<DiscussionDetailProps> = ({
  discussion,
  onBack,
  onUpdate
}) => {
  const { user } = useAuth();
  const [replies, setReplies] = useState<DiscussionReply[]>([]);
  const [newReply, setNewReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadDiscussionData = async () => {
    try {
      setLoading(true);
      const data = await discussionsService.fetchDiscussion(discussion.id);
      setReplies(data.replies);
    } catch (error) {
      console.error('Error loading discussion:', error);
      toast.error('Failed to load discussion details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussionData();
  }, [discussion.id]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReply.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to reply');
      return;
    }

    try {
      setSubmitting(true);
      await discussionsService.addReply(discussion.id, newReply.trim());
      setNewReply('');
      await loadDiscussionData();
      onUpdate(); // Update the discussions list
      toast.success('Reply posted successfully!');
    } catch (error) {
      console.error('Error posting reply:', error);
      toast.error('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'teacher': return 'bg-blue-100 text-blue-800';
      case 'student': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Discussions
        </Button>
      </div>

      {/* Main Discussion */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl font-bold">{discussion.title}</CardTitle>
              <CardDescription className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {discussion.author_name}
                  <Badge className={getRoleColor(discussion.author_role)}>
                    {discussion.author_role}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                </div>
              </CardDescription>
            </div>
            {discussion.status === 'closed' && (
              <Badge variant="secondary">Closed</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{discussion.content}</p>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Replies ({replies.length})
        </h3>

        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : replies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MessageSquare className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-600 text-center">No replies yet. Be the first to respond!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {replies.map((reply) => (
              <Card key={reply.id} className="ml-4">
                <CardHeader className="pb-3">
                  <CardDescription className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {reply.author_name}
                      <Badge className={getRoleColor(reply.author_role)} variant="outline">
                        {reply.author_role}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reply Form */}
      {user && discussion.status !== 'closed' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Reply</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReply} className="space-y-4">
              <Textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Share your thoughts or ask follow-up questions..."
                rows={4}
                required
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={submitting || !newReply.trim()}>
                  {submitting ? (
                    'Posting...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!user && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-600 text-center mb-4">
              You must be logged in to participate in discussions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
