
import React from 'react';
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
  MoreVertical
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

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

interface AssignmentCardProps {
  assignment: Assignment;
  onOpenGradingInterface: (assignment: Assignment) => void;
  onOpenSubmissionList: (assignment: Assignment) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({
  assignment,
  onOpenGradingInterface,
  onOpenSubmissionList
}) => {
  return (
    <Card className="group bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 hover:border-primary/30">
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
              <DropdownMenuItem onClick={() => onOpenGradingInterface(assignment)}>
                Grade Submissions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onOpenSubmissionList(assignment)}>
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
  );
};

export default AssignmentCard;
