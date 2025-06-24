
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarDays, 
  BookOpen, 
  Plus,
  MoreVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import CreateAssignmentQuizDialog from './CreateAssignmentQuizDialog';
import GradingInterface from './GradingInterface';
import StudentSubmissionList from './StudentSubmissionList';

interface Assignment {
  id: string;
  title: string;
  course_id: string;
  course_name: string;
  course_title: string;
  due_date: string;
  type: 'quiz' | 'assignment' | 'exam';
  max_score: number;
  description?: string;
  total_submissions: number;
  graded_submissions: number;
  pending_submissions: number;
  average_score: number;
  status: 'draft' | 'active' | 'closed';
}

interface Course {
  id: string;
  name: string;
  title: string;
  description: string;
  credits: number;
  teacher_id: string;
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Midterm Exam',
    course_id: '101',
    course_name: 'Introduction to React',
    course_title: 'Introduction to React',
    due_date: '2024-05-01',
    type: 'exam',
    max_score: 100,
    description: 'Comprehensive exam covering all topics.',
    total_submissions: 25,
    graded_submissions: 20,
    pending_submissions: 5,
    average_score: 85,
    status: 'active'
  },
  {
    id: '2',
    title: 'Essay on Hooks',
    course_id: '101',
    course_name: 'Introduction to React',
    course_title: 'Introduction to React',
    due_date: '2024-05-15',
    type: 'assignment',
    max_score: 50,
    description: 'Write an essay discussing the benefits of React Hooks.',
    total_submissions: 25,
    graded_submissions: 15,
    pending_submissions: 10,
    average_score: 78,
    status: 'active'
  },
  {
    id: '3',
    title: 'Quiz 1 - Components',
    course_id: '101',
    course_name: 'Introduction to React',
    course_title: 'Introduction to React',
    due_date: '2024-04-15',
    type: 'quiz',
    max_score: 20,
    description: 'Short quiz on React components.',
    total_submissions: 25,
    graded_submissions: 25,
    pending_submissions: 0,
    average_score: 92,
    status: 'closed'
  },
];

const mockCourses: Course[] = [
  {
    id: '101',
    name: 'Introduction to React',
    title: 'Introduction to React',
    description: 'An introductory course to React development.',
    credits: 3,
    teacher_id: 'T123'
  },
  {
    id: '102',
    name: 'Advanced JavaScript',
    title: 'Advanced JavaScript',
    description: 'A deep dive into advanced JavaScript concepts.',
    credits: 4,
    teacher_id: 'T124'
  },
];

const GradesAssignmentsPage: React.FC = () => {
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [courses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [isSubmissionListOpen, setIsSubmissionListOpen] = useState(false);

  useEffect(() => {
    console.log('GradesAssignmentsPage: Component mounted');
  }, []);

  const filteredAssignments = assignments.filter(assignment => {
    const searchFilter = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const typeFilter = filterType === 'all' || assignment.type === filterType;
    const courseFilter = selectedCourse === 'all' || assignment.course_id === selectedCourse;

    return searchFilter && typeFilter && courseFilter;
  });

  const handleOpenDialog = () => {
    console.log('Opening create assignment dialog');
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing create assignment dialog');
    setIsDialogOpen(false);
  };

  const handleCreateAssignment = () => {
    console.log('Assignment created successfully');
    handleCloseDialog();
  };

  const handleOpenGradingInterface = (assignment: Assignment) => {
    console.log('Opening grading interface for assignment:', assignment.title);
    setSelectedAssignment(assignment);
    setSelectedStudentId('student-123');
  };

  const handleCloseGradingInterface = () => {
    console.log('Closing grading interface');
    setSelectedAssignment(null);
    setSelectedStudentId('');
  };

  const handleOpenSubmissionList = (assignment: Assignment) => {
    console.log('Opening submission list for assignment:', assignment.title);
    setSelectedAssignment(assignment);
    setIsSubmissionListOpen(true);
  };

  const handleCloseSubmissionList = () => {
    console.log('Closing submission list');
    setIsSubmissionListOpen(false);
    setSelectedAssignment(null);
  };

  const handleGradeSubmitted = () => {
    console.log('Grade submitted successfully');
    handleCloseGradingInterface();
  };

  const handleGradeStudent = (studentId: string) => {
    console.log('Grading student:', studentId);
    setSelectedStudentId(studentId);
    setIsSubmissionListOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl">Assignments & Grades</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Input
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="quiz">Quiz</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="exam">Exam</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {filteredAssignments.length} Assignments
            </h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredAssignments.map(assignment => (
                <Card key={assignment.id}>
                  <CardHeader>
                    <CardTitle>{assignment.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{assignment.course_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>Due: {assignment.due_date}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-2">
                    <Badge variant={assignment.type === 'exam' ? 'default' : 'secondary'}>
                      {assignment.type}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {assignment.description}
                    </div>
                    <Progress value={(assignment.graded_submissions / assignment.total_submissions) * 100} />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {Math.round((assignment.graded_submissions / assignment.total_submissions) * 100)}% Graded
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenGradingInterface(assignment)}>
                            Grade Submissions
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenSubmissionList(assignment)}>
                            View Submissions
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateAssignmentQuizDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        courses={courses}
        onAssignmentCreated={handleCreateAssignment}
      />

      {selectedAssignment && selectedStudentId && (
        <GradingInterface
          assignment={selectedAssignment}
          studentId={selectedStudentId}
          onBack={handleCloseGradingInterface}
          onGradeSubmitted={handleGradeSubmitted}
        />
      )}

      {selectedAssignment && isSubmissionListOpen && (
        <StudentSubmissionList
          assignment={selectedAssignment}
          onBack={handleCloseSubmissionList}
          onGradeStudent={handleGradeStudent}
        />
      )}
    </div>
  );
};

export default GradesAssignmentsPage;
