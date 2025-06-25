
import { Message } from '@/pages/admin/MessagesPage';

export const mockMessages: Message[] = [
  {
    id: '1',
    sender_id: 'teacher-1',
    sender_name: 'Dr. Sarah Johnson',
    sender_role: 'teacher',
    recipient_id: 'current-user',
    subject: 'Assignment Deadline Extension Request',
    content: `Dear Student,

I hope this message finds you well. I wanted to reach out regarding the upcoming assignment deadline for our Advanced Digital Marketing course.

Due to the recent technical difficulties with the learning management system, I've decided to extend the deadline by 48 hours. The new submission deadline is Friday, December 29th at 11:59 PM.

Please use this additional time wisely to refine your work and ensure all requirements are met. If you have any questions about the assignment requirements or need clarification on any points, please don't hesitate to reach out.

Best regards,
Dr. Sarah Johnson
Professor of Digital Marketing`,
    sent_at: '2024-06-25T14:30:00Z',
    read: false,
    type: 'inbox'
  },
  {
    id: '2',
    sender_id: 'admin-1',
    sender_name: 'Michael Chen',
    sender_role: 'admin',
    recipient_id: 'current-user',
    subject: 'Platform Maintenance Scheduled',
    content: `Hello,

We will be performing scheduled maintenance on the DIL Platform this weekend to improve performance and add new features.

Maintenance Window:
- Start: Saturday, June 29th at 2:00 AM EST
- End: Saturday, June 29th at 6:00 AM EST

During this time, the platform will be temporarily unavailable. We apologize for any inconvenience this may cause.

Thank you for your patience.

Best regards,
Michael Chen
System Administrator`,
    sent_at: '2024-06-25T09:15:00Z',
    read: true,
    type: 'inbox'
  },
  {
    id: '3',
    sender_id: 'student-1',
    sender_name: 'Emily Rodriguez',
    sender_role: 'student',
    recipient_id: 'current-user',
    subject: 'Study Group Formation',
    content: `Hi everyone,

I'm organizing a study group for the upcoming Data Analytics exam and wanted to see if anyone would be interested in joining.

We're planning to meet twice a week (Tuesdays and Thursdays) from 6-8 PM via video call. We'll review course materials, work through practice problems, and help each other understand complex concepts.

If you're interested, please reply to this message or send me a direct message. Looking forward to studying together!

Best,
Emily Rodriguez`,
    sent_at: '2024-06-24T16:45:00Z',
    read: true,
    type: 'inbox'
  },
  {
    id: '4',
    sender_id: 'current-user',
    sender_name: 'You',
    sender_role: 'student',
    recipient_id: 'teacher-2',
    subject: 'Question about Course Material',
    content: `Dear Professor Wilson,

I hope you're doing well. I have a question about the content covered in last week's lecture on machine learning algorithms.

Specifically, I'm having trouble understanding the difference between supervised and unsupervised learning methods. Could you provide some additional examples or point me to some supplementary resources?

I've reviewed the lecture notes and textbook materials, but I'd appreciate some clarification to ensure I'm on the right track.

Thank you for your time and assistance.

Best regards,
[Your Name]`,
    sent_at: '2024-06-24T11:20:00Z',
    read: true,
    type: 'sent'
  },
  {
    id: '5',
    sender_id: 'teacher-3',
    sender_name: 'Prof. David Wilson',
    sender_role: 'teacher',
    recipient_id: 'current-user',
    subject: 'Great Work on Your Project',
    content: `Dear Student,

I wanted to take a moment to commend you on the excellent work you submitted for the recent project assignment.

Your analysis was thorough, your presentation was clear and well-organized, and your conclusions were well-supported by the data. It's evident that you put significant effort into this work.

I'm particularly impressed with your innovative approach to the problem-solving section. Your creativity and critical thinking skills really shine through.

Keep up the outstanding work!

Best regards,
Prof. David Wilson`,
    sent_at: '2024-06-23T13:10:00Z',
    read: false,
    type: 'inbox'
  },
  {
    id: '6',
    sender_id: 'current-user',
    sender_name: 'You',
    sender_role: 'student',
    recipient_id: 'admin-1',
    subject: 'Account Access Issue',
    content: `Hello Support Team,

I'm experiencing an issue accessing some of the course materials in my account. When I try to download the PDF resources for Digital Marketing Fundamentals, I receive an error message.

Could you please help resolve this issue? I need access to these materials for an upcoming assignment.

My user ID is: student_12345
Course: Digital Marketing Fundamentals
Issue: Unable to download PDF resources

Thank you for your assistance.

Best regards,
[Your Name]`,
    sent_at: '2024-06-23T08:30:00Z',
    read: true,
    type: 'sent'
  }
];
