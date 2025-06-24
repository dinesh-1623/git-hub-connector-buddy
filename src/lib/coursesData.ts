
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  students: number;
  duration: string;
  status: 'active' | 'draft' | 'archived';
  fullDescription: string;
  lessons: number;
  assignments: number;
  startDate: string;
  endDate: string;
  thumbnail: string;
  videoUrl: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning',
    instructor: 'Dr. Sarah Chen',
    students: 156,
    duration: '12 weeks',
    status: 'active',
    fullDescription: 'This comprehensive course introduces students to the fundamentals of Artificial Intelligence and Machine Learning. Students will learn about neural networks, deep learning, natural language processing, and computer vision. Perfect for beginners looking to enter the AI field.',
    lessons: 36,
    assignments: 12,
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    level: 'beginner',
    price: 299,
  },
  {
    id: 2,
    title: 'Advanced Mathematics',
    description: 'Calculus, Linear Algebra, and Statistical Analysis',
    instructor: 'Dr. Michael Wilson',
    students: 89,
    duration: '16 weeks',
    status: 'active',
    fullDescription: 'An advanced mathematics course covering multivariable calculus, linear algebra, differential equations, and statistical analysis. This course is designed for students pursuing STEM fields and requires strong mathematical foundations.',
    lessons: 48,
    assignments: 16,
    startDate: '2024-02-01',
    endDate: '2024-06-01',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    level: 'advanced',
    price: 399,
  },
  {
    id: 3,
    title: 'Web Development Bootcamp',
    description: 'Full-stack web development with React, Node.js, and MongoDB',
    instructor: 'Alex Rodriguez',
    students: 234,
    duration: '24 weeks',
    status: 'active',
    fullDescription: 'Learn to build modern full-stack web applications using React, Node.js, Express, and MongoDB. This hands-on bootcamp covers frontend development, backend APIs, database design, and deployment strategies.',
    lessons: 72,
    assignments: 24,
    startDate: '2024-03-01',
    endDate: '2024-09-01',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    level: 'intermediate',
    price: 599,
  },
  {
    id: 4,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming with Python',
    instructor: 'Jane Smith',
    students: 45,
    duration: '8 weeks',
    status: 'draft',
    fullDescription: 'This comprehensive course introduces students to the fundamentals of programming using Python. Students will learn variables, control structures, functions, and basic data structures.',
    lessons: 24,
    assignments: 8,
    startDate: '2024-04-15',
    endDate: '2024-06-15',
    thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=250&fit=crop&crop=center',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    level: 'beginner',
    price: 199,
  },
];

export const getCourseById = (id: number): Course | undefined => {
  return courses.find(course => course.id === id);
};
