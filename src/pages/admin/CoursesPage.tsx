
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Search, Users, Clock, Play, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { courses } from '@/lib/coursesData';
import { CreateCourseDialog } from '@/components/dialogs/CreateCourseDialog';

export default function CoursesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleViewCourse = (courseId: number) => {
    console.log('Navigating to course:', courseId);
    navigate(`/courses/${courseId}`);
  };

  const handleCreateCourse = () => {
    console.log('Opening course creation dialog');
    setIsCreateDialogOpen(true);
  };

  const handlePreviewCourse = (course: any) => {
    console.log('Previewing course:', course.title);
    toast.info(`Opening preview for: ${course.title}`);
    // In a real app, this would open a preview modal or navigate to preview
  };

  const handleEditCourse = (course: any) => {
    console.log('Editing course:', course.title);
    toast.info(`Editing course: ${course.title}`);
    // In a real app, this would open an edit dialog
  };

  const handleDeleteCourse = (course: any) => {
    console.log('Deleting course:', course.title);
    toast.error(`Delete course: ${course.title}`);
    // In a real app, this would show a confirmation dialog
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage courses and educational content
          </p>
        </div>
        <Button onClick={handleCreateCourse}>
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>
            View and manage all courses in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => toast.info('Filter options would appear here')}>
              Filter
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="transition-all hover:shadow-md hover:scale-[1.02] overflow-hidden">
                <div className="relative group">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewCourse(course);
                      }}
                    >
                      <Play className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                  <Badge 
                    variant={course.status === 'active' ? 'default' : 'secondary'}
                    className="absolute top-3 right-3"
                  >
                    {course.status}
                  </Badge>
                  {course.price && (
                    <Badge 
                      variant="outline"
                      className="absolute top-3 left-3 bg-white/90"
                    >
                      ${course.price}
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {course.level && (
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium">Instructor:</span> {course.instructor}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      View Course
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCourse(course);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(course);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateCourseDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}
