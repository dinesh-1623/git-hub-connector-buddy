
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Users, Clock, Edit, Trash2, DollarSign, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseById } from '@/lib/coursesData';
import { CourseVideoPlayer } from '@/components/CourseVideoPlayer';
import { toast } from 'sonner';

export default function CourseDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const course = getCourseById(parseInt(id || '0'));

  // Action button handlers
  const handleViewStudents = () => {
    console.log(`View Students clicked for course: ${course?.title} (ID: ${id})`);
    toast.info(`Viewing students for ${course?.title}`, {
      description: 'This will show the student list for this course'
    });
    // TODO: Navigate to students page or open students modal
    // navigate(`/courses/${id}/students`);
  };

  const handleManageContent = () => {
    console.log(`Manage Content clicked for course: ${course?.title} (ID: ${id})`);
    toast.info(`Managing content for ${course?.title}`, {
      description: 'This will open the content management interface'
    });
    // TODO: Navigate to content management page or open content modal
    // navigate(`/courses/${id}/content`);
  };

  const handleViewAnalytics = () => {
    console.log(`View Analytics clicked for course: ${course?.title} (ID: ${id})`);
    toast.info(`Viewing analytics for ${course?.title}`, {
      description: 'This will show course analytics and performance data'
    });
    // TODO: Navigate to analytics page or open analytics modal
    // navigate(`/courses/${id}/analytics`);
  };

  const handleSchedule = () => {
    console.log(`Schedule clicked for course: ${course?.title} (ID: ${id})`);
    toast.info(`Opening schedule for ${course?.title}`, {
      description: 'This will show the course schedule and calendar'
    });
    // TODO: Navigate to schedule page or open schedule modal
    // navigate(`/courses/${id}/schedule`);
  };

  const handleEditCourse = () => {
    console.log(`Edit Course clicked for course: ${course?.title} (ID: ${id})`);
    toast.info(`Editing ${course?.title}`, {
      description: 'This will open the course editor'
    });
    // TODO: Navigate to edit page or open edit modal
  };

  const handleDeleteCourse = () => {
    console.log(`Delete Course clicked for course: ${course?.title} (ID: ${id})`);
    toast.warning(`Delete requested for ${course?.title}`, {
      description: 'This will show a confirmation dialog'
    });
    // TODO: Show confirmation dialog and handle deletion
  };

  if (!course) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Course Not Found</h3>
            <p className="text-muted-foreground">
              The course you're looking for doesn't exist.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{course.title}</h1>
              <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                {course.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">Course Details</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleEditCourse}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Course
          </Button>
          <Button variant="destructive" onClick={handleDeleteCourse}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Course
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Course Video Player */}
          <CourseVideoPlayer videoUrl={course.videoUrl} title={course.title} />

          {/* Course Information */}
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{course.fullDescription}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-1">Instructor</h4>
                    <p className="text-muted-foreground">{course.instructor}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Duration</h4>
                    <p className="text-muted-foreground">{course.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Level</h4>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  {course.price && (
                    <div>
                      <h4 className="font-medium mb-1">Price</h4>
                      <p className="text-muted-foreground">${course.price}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium mb-1">Start Date</h4>
                    <p className="text-muted-foreground">{course.startDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">End Date</h4>
                    <p className="text-muted-foreground">{course.endDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Course Thumbnail */}
          <Card>
            <CardHeader>
              <CardTitle>Course Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg border"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&crop=center';
                }}
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Students</span>
                  </div>
                  <span className="font-semibold">{course.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Lessons</span>
                  </div>
                  <span className="font-semibold">{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">Assignments</span>
                  </div>
                  <span className="font-semibold">{course.assignments}</span>
                </div>
                {course.price && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Price</span>
                    </div>
                    <span className="font-semibold">${course.price}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" onClick={handleViewStudents}>
                  View Students
                </Button>
                <Button variant="outline" className="w-full" onClick={handleManageContent}>
                  Manage Content
                </Button>
                <Button variant="outline" className="w-full" onClick={handleViewAnalytics}>
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full" onClick={handleSchedule}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
