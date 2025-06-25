
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Plus, Clock, User, BookOpen, HelpCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { Discussion, discussionsService } from '@/services/discussionsService';
import { CreateDiscussionDialog } from '@/components/discussions/CreateDiscussionDialog';
import { DiscussionDetail } from '@/components/discussions/DiscussionDetail';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const CATEGORIES = [
  { id: 'general', label: 'General', icon: MessageSquare, color: 'bg-blue-100 text-blue-800' },
  { id: 'academic', label: 'Academic', icon: BookOpen, color: 'bg-green-100 text-green-800' },
  { id: 'help', label: 'Help & Support', icon: HelpCircle, color: 'bg-orange-100 text-orange-800' },
  { id: 'ideas', label: 'Ideas & Suggestions', icon: Lightbulb, color: 'bg-purple-100 text-purple-800' },
  { id: 'announcements', label: 'Announcements', icon: AlertCircle, color: 'bg-red-100 text-red-800' }
];

export const DiscussionsPage: React.FC = () => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      const data = await discussionsService.fetchDiscussions();
      setDiscussions(data);
    } catch (error) {
      console.error('Error loading discussions:', error);
      toast.error('Failed to load discussions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, []);

  const filteredDiscussions = discussions.filter(discussion => 
    selectedCategory === 'all' || discussion.category === selectedCategory
  );

  const getCategoryConfig = (categoryId: string) => {
    return CATEGORIES.find(cat => cat.id === categoryId) || CATEGORIES[0];
  };

  const handleCreateDiscussion = async () => {
    await loadDiscussions();
    setIsCreateDialogOpen(false);
  };

  if (selectedDiscussion) {
    return (
      <DiscussionDetail
        discussion={selectedDiscussion}
        onBack={() => setSelectedDiscussion(null)}
        onUpdate={loadDiscussions}
      />
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discussions</h1>
          <p className="text-gray-600 mt-1">Engage with the community and share knowledge</p>
        </div>
        {user && (
          <Button onClick={() => setIsCreateDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        )}
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              <category.icon className="h-4 w-4 mr-2" />
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredDiscussions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions yet</h3>
                <p className="text-gray-600 text-center mb-4">
                  {selectedCategory === 'all' 
                    ? "Be the first to start a discussion!" 
                    : `No discussions in ${getCategoryConfig(selectedCategory).label} category yet.`
                  }
                </p>
                {user && (
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => {
                const categoryConfig = getCategoryConfig(discussion.category);
                return (
                  <Card 
                    key={discussion.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge className={categoryConfig.color}>
                              <categoryConfig.icon className="h-3 w-3 mr-1" />
                              {categoryConfig.label}
                            </Badge>
                            {discussion.status === 'closed' && (
                              <Badge variant="secondary">Closed</Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg font-semibold hover:text-primary transition-colors">
                            {discussion.title}
                          </CardTitle>
                        </div>
                      </div>
                      <CardDescription className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {discussion.author_name}
                          <Badge variant="outline" className="text-xs">
                            {discussion.author_role}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {discussion.reply_count || 0} {(discussion.reply_count || 0) === 1 ? 'reply' : 'replies'}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 line-clamp-2">
                        {discussion.content}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <CreateDiscussionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleCreateDiscussion}
        categories={CATEGORIES}
      />
    </div>
  );
};
