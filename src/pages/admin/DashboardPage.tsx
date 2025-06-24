
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Activity, 
  HardDrive,
  TrendingUp,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const stats = [
  {
    title: 'Total Users',
    value: '2,847',
    description: '+12% from last month',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Active Courses',
    value: '156',
    description: '+3 new this week',
    icon: BookOpen,
    trend: 'up'
  },
  {
    title: 'System Health',
    value: '98.5%',
    description: 'All systems operational',
    icon: Activity,
    trend: 'stable'
  },
  {
    title: 'Storage Usage',
    value: '2.4 TB',
    description: '67% of total capacity',
    icon: HardDrive,
    trend: 'up'
  },
];

const recentUsers = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    status: 'Active',
    joinDate: '2 hours ago',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    email: 'michael.c@example.com', 
    status: 'Active',
    joinDate: '4 hours ago',
    avatar: 'MC'
  },
  {
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    status: 'Pending',
    joinDate: '1 day ago',
    avatar: 'EW'
  },
  {
    name: 'James Miller',
    email: 'james.m@example.com',
    status: 'Active', 
    joinDate: '2 days ago',
    avatar: 'JM'
  }
];

const systemHealth = [
  { component: 'Database', status: 'Operational', uptime: '99.9%' },
  { component: 'API Server', status: 'Operational', uptime: '99.8%' },
  { component: 'File Storage', status: 'Warning', uptime: '97.2%' },
  { component: 'Email Service', status: 'Operational', uptime: '99.5%' }
];

const storageBreakdown = [
  { category: 'User Files', usage: '1.2 TB', percentage: 35 },
  { category: 'Course Content', usage: '800 GB', percentage: 25 },
  { category: 'System Backups', usage: '400 GB', percentage: 15 },
  { category: 'Other', usage: '300 GB', percentage: 10 }
];

export default function DashboardPage() {
  const handleGenerateReport = () => {
    console.log('Generating dashboard report');
    toast.success('Dashboard report generation started');
  };

  const handleQuickAction = () => {
    console.log('Quick action triggered');
    toast.info('Quick action menu would appear here');
  };

  const handleViewUser = (user: any) => {
    console.log('Viewing user:', user.name);
    toast.info(`Viewing ${user.name}'s profile`);
  };

  const handleSystemComponent = (component: any) => {
    console.log('Checking system component:', component.component);
    toast.info(`System status: ${component.component} - ${component.status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your learning platform
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleGenerateReport}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button size="sm" onClick={handleQuickAction}>
            <Plus className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-shadow hover:shadow-md cursor-pointer" onClick={() => toast.info(`${stat.title}: ${stat.value}`)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Users
            </CardTitle>
            <CardDescription>
              Latest user registrations and activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleViewUser(user)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                      {user.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={user.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                      {user.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">{user.joinDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health Details
            </CardTitle>
            <CardDescription>
              Real-time system component status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleSystemComponent(item)}
                >
                  <div className="flex items-center space-x-3">
                    {item.status === 'Operational' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="font-medium text-sm">{item.component}</span>
                  </div>
                  <div className="text-right">
                    <Badge variant={item.status === 'Operational' ? 'default' : 'secondary'} className="text-xs">
                      {item.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">{item.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Storage Breakdown
          </CardTitle>
          <CardDescription>
            Detailed storage usage across categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {storageBreakdown.map((item, index) => (
              <div 
                key={index} 
                className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => toast.info(`${item.category}: ${item.usage} (${item.percentage}%)`)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="text-lg font-bold mb-2">{item.usage}</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
