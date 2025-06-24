import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, Users, Clock, Edit, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with Python',
    instructor: 'Jane Smith',
    students: 45,
    duration: '8 weeks',
    status: 'active',
    fullDescription: 'This comprehensive course introduces students to the fundamentals of programming using Python. Students will learn variables, control structures, functions, and basic data structures.',
    lessons: 24,
    assignments: 8,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    description: 'Calculus and advanced mathematical concepts',
    instructor: 'Dr. Wilson',
    students: 32,
    duration: '12 weeks',
    status: 'active',
    fullDescription: 'An advanced mathematics course covering calculus, linear algebra, and statistical analysis. Perfect for students pursuing STEM fields.',
    lessons: 36,
    assignments: 12,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
  },
  {
    id: 3,
    title: 'Web Development',
    description: 'Build modern web applications',
    instructor: 'Mike Johnson',
    students: 28,
    duration: '10 weeks',
    status: 'draft',
    fullDescription: 'Learn to build modern web applications using HTML, CSS, JavaScript, and React. This hands-on course covers both frontend and backend development.',
    lessons: 30,
    assignments: 10,
    startDate: '2024-03-01',
    endDate: '2024-05-15',
  },
];

export default function CourseDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const course = courses.find(c => c.id === parseInt(id || '0'));

  if (!course) {
    return (
      <div className="space-y-6">
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="text-muted-foreground">Course Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Course
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Course
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Course Information</CardTitle>
                <Badge variant={course.status === 'active' ? 'default' : 'secondary'}>
                  {course.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{course.fullDescription}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Instructor</h4>
                    <p className="text-muted-foreground">{course.instructor}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Duration</h4>
                    <p className="text-muted-foreground">{course.duration}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Start Date</h4>
                    <p className="text-muted-foreground">{course.startDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">End Date</h4>
                    <p className="text-muted-foreground">{course.endDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full">View Students</Button>
                <Button variant="outline" className="w-full">Manage Content</Button>
                <Button variant="outline" className="w-full">View Analytics</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
