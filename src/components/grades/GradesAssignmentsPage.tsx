
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateAssignmentQuizDialog from './CreateAssignmentQuizDialog';
import GradingInterface from './GradingInterface';
import StudentSubmissionList from './StudentSubmissionList';
import AssignmentStatistics from './AssignmentStatistics';
import AssignmentFilters from './AssignmentFilters';
import AssignmentGrid from './AssignmentGrid';

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-primary/20">
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                Assignments & Grades
              </h1>
              <p className="text-lg text-muted-foreground">
                Manage assignments, track progress, and provide meaningful feedback to your students
              </p>
            </div>
            <Button 
              onClick={handleOpenDialog}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create Assignment
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Statistics Cards */}
        <AssignmentStatistics assignments={assignments} />

        {/* Main Content Card */}
        <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-card">
          <CardHeader className="border-b border-primary/10 bg-gradient-to-r from-card to-primary/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Assignment Management
                </CardTitle>
                <CardDescription className="text-base">
                  Filter, search, and manage all your course assignments
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Filters */}
            <AssignmentFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterType={filterType}
              setFilterType={setFilterType}
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              courses={courses}
            />

            {/* Assignments Grid */}
            <AssignmentGrid
              assignments={assignments}
              filteredAssignments={filteredAssignments}
              searchQuery={searchQuery}
              filterType={filterType}
              selectedCourse={selectedCourse}
              onOpenDialog={handleOpenDialog}
              onOpenGradingInterface={handleOpenGradingInterface}
              onOpenSubmissionList={handleOpenSubmissionList}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
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
