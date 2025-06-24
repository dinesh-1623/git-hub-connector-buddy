
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  TrendingUp,
  UserPlus,
  Plus,
  FileText 
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '1,234',
    description: '+12% from last month',
    icon: Users,
  },
  {
    title: 'Active Courses',
    value: '156',
    description: '+3 new this week',
    icon: BookOpen,
  },
  {
    title: 'Assignments',
    value: '89',
    description: '12 pending review',
    icon: GraduationCap,
  },
  {
    title: 'Success Rate',
    value: '94.2%',
    description: '+2.1% improvement',
    icon: TrendingUp,
  },
];

const recentActivity = [
  {
    action: 'New user registered',
    user: 'John Doe',
    time: '2 minutes ago',
  },
  {
    action: 'Assignment submitted',
    user: 'Jane Smith',
    time: '5 minutes ago',
  },
  {
    action: 'Course completed',
    user: 'Mike Johnson',
    time: '10 minutes ago',
  },
  {
    action: 'New course created',
    user: 'Sarah Wilson',
    time: '15 minutes ago',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your admin dashboard. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions and events in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Course
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <GraduationCap className="h-4 w-4 mr-2" />
              Grade Assignments
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
