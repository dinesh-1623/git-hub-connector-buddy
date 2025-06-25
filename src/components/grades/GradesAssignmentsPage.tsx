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
  MoreVertical,
  TrendingUp,
  Users,
  Clock,
  CheckCircle
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

  const totalSubmissions = assignments.reduce((sum, a) => sum + a.total_submissions, 0);
  const gradedSubmissions = assignments.reduce((sum, a) => sum + a.graded_submissions, 0);
  const averageScore = assignments.length > 0 
    ? assignments.reduce((sum, a) => sum + a.average_score, 0) / assignments.length 
    : 0;

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
                  <p className="text-3xl font-bold text-foreground">{assignments.length}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-blue-50 border-blue-200 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                  <p className="text-3xl font-bold text-foreground">{totalSubmissions}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-green-50 border-green-200 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Graded</p>
                  <p className="text-3xl font-bold text-foreground">{gradedSubmissions}</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-orange-50 border-orange-200 shadow-card hover:shadow-card-hover transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-foreground">{averageScore.toFixed(1)}%</p>
                </div>
                <div className="h-12 w-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 mb-6 border border-primary/20">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search assignments..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="border-primary/30 focus:ring-primary bg-background/80 backdrop-blur-sm"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="border-primary/30 focus:ring-primary bg-background/80 backdrop-blur-sm">
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
                  <SelectTrigger className="border-primary/30 focus:ring-primary bg-background/80 backdrop-blur-sm">
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
            </div>

            {/* Assignments Grid */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {filteredAssignments.length} Assignment{filteredAssignments.length !== 1 ? 's' : ''} Found
                </h3>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredAssignments.length} of {assignments.length} assignments
                </div>
              </div>
              
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredAssignments.map(assignment => (
                  <Card 
                    key={assignment.id} 
                    className="group bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 hover:border-primary/30"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                            {assignment.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="font-medium">{assignment.course_name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              <span>Due: {assignment.due_date}</span>
                            </div>
                          </CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <span className="sr-only">Open menu</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
                            <DropdownMenuItem onClick={() => handleOpenGradingInterface(assignment)}>
                              Grade Submissions
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenSubmissionList(assignment)}>
                              View Submissions
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={assignment.type === 'exam' ? 'default' : 'secondary'}
                            className={
                              assignment.type === 'quiz' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                              assignment.type === 'assignment' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                              'bg-red-100 text-red-800 border-red-200'
                            }
                          >
                            {assignment.type}
                          </Badge>
                          <Badge 
                            variant="outline" 
                            className={
                              assignment.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                              assignment.status === 'closed' ? 'bg-gray-100 text-gray-800 border-gray-200' :
                              'bg-yellow-100 text-yellow-800 border-yellow-200'
                            }
                          >
                            {assignment.status}
                          </Badge>
                        </div>
                        
                        {assignment.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {assignment.description}
                          </p>
                        )}
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">
                              {Math.round((assignment.graded_submissions / assignment.total_submissions) * 100)}% Graded
                            </span>
                          </div>
                          <Progress 
                            value={(assignment.graded_submissions / assignment.total_submissions) * 100} 
                            className="h-2"
                          />
                          
                          <div className="grid grid-cols-3 gap-2 text-xs text-center">
                            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                              <div className="font-semibold text-blue-800">{assignment.total_submissions}</div>
                              <div className="text-blue-600">Total</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-2 border border-green-200">
                              <div className="font-semibold text-green-800">{assignment.graded_submissions}</div>
                              <div className="text-green-600">Graded</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-2 border border-orange-200">
                              <div className="font-semibold text-orange-800">{assignment.pending_submissions}</div>
                              <div className="text-orange-600">Pending</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                            <div className="text-sm">
                              <span className="text-muted-foreground">Avg Score: </span>
                              <span className="font-semibold text-foreground">{assignment.average_score}%</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">Max: </span>
                              <span className="font-semibold text-foreground">{assignment.max_score} pts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || filterType !== 'all' || selectedCourse !== 'all' 
                      ? 'Try adjusting your filters to see more assignments.'
                      : 'Create your first assignment to get started.'
                    }
                  </p>
                  <Button onClick={handleOpenDialog} className="bg-gradient-to-r from-primary to-primary/80">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
                  </Button>
                </div>
              )}
            </div>
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
