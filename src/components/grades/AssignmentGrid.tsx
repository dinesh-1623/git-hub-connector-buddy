
import React from 'react';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AssignmentCard from './AssignmentCard';

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

interface AssignmentGridProps {
  assignments: Assignment[];
  filteredAssignments: Assignment[];
  searchQuery: string;
  filterType: string;
  selectedCourse: string;
  onOpenDialog: () => void;
  onOpenGradingInterface: (assignment: Assignment) => void;
  onOpenSubmissionList: (assignment: Assignment) => void;
}

const AssignmentGrid: React.FC<AssignmentGridProps> = ({
  assignments,
  filteredAssignments,
  searchQuery,
  filterType,
  selectedCourse,
  onOpenDialog,
  onOpenGradingInterface,
  onOpenSubmissionList
}) => {
  return (
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
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onOpenGradingInterface={onOpenGradingInterface}
            onOpenSubmissionList={onOpenSubmissionList}
          />
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
          <Button onClick={onOpenDialog} className="bg-gradient-to-r from-primary to-primary/80">
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignmentGrid;
