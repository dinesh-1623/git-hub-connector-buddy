
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface Course {
  id: string;
  name: string;
  title: string;
  description: string;
  credits: number;
  teacher_id: string;
}

interface AssignmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  courses: Course[];
}

const AssignmentFilters: React.FC<AssignmentFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  selectedCourse,
  setSelectedCourse,
  courses
}) => {
  return (
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
  );
};

export default AssignmentFilters;
