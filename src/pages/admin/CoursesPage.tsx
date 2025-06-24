
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Search, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with Python',
    instructor: 'Jane Smith',
    students: 45,
    duration: '8 weeks',
    status: 'active',
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    description: 'Calculus and advanced mathematical concepts',
    instructor: 'Dr. Wilson',
    students: 32,
    duration: '12 weeks',
    status: 'active',
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Build modern web applications',
    instructor: 'Mike Johnson',
    students: 28,
    duration: '10 weeks',
    status: 'draft',
  },
];

export default function CoursesPage() {
  const navigate = useNavigate();

  const handleViewCourse = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Manage courses and educational content
          </p>
        </div>
        <Button>
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
              <Input placeholder="Search courses..." className="pl-10" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="transition-all hover:shadow-md hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
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
                  <div className="mt-6 pt-4 border-t">
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleViewCourse(course.id)}
                    >
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
