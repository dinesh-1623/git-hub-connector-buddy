
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Users, CheckCircle, TrendingUp } from 'lucide-react';

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

interface AssignmentStatisticsProps {
  assignments: Assignment[];
}

const AssignmentStatistics: React.FC<AssignmentStatisticsProps> = ({ assignments }) => {
  const totalSubmissions = assignments.reduce((sum, a) => sum + a.total_submissions, 0);
  const gradedSubmissions = assignments.reduce((sum, a) => sum + a.graded_submissions, 0);
  const averageScore = assignments.length > 0 
    ? assignments.reduce((sum, a) => sum + a.average_score, 0) / assignments.length 
    : 0;

  return (
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
  );
};

export default AssignmentStatistics;
