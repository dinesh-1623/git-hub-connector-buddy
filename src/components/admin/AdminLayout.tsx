
import { Outlet, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  Settings,
  UserPlus,
  Plus,
  LogOut,
  User,
  MessageSquare,
  MessageCircle,
  GraduationCap,
} from 'lucide-react';

const getNavigationItems = (userRole: string) => {
  const baseItems = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Courses',
      url: '/courses',
      icon: BookOpen,
    },
  ];

  if (userRole === 'admin' || userRole === 'teacher') {
    baseItems.push(
      {
        title: 'Grade Assignments',
        url: '/grades',
        icon: GraduationCap,
      },
      {
        title: 'Messages',
        url: '/messages',
        icon: MessageSquare,
      },
      {
        title: 'Discussions',
        url: '/discussions',
        icon: MessageCircle,
      },
      {
        title: 'Users',
        url: '/users',
        icon: Users,
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: FileText,
      }
    );
  }

  baseItems.push({
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  });

  return baseItems;
};

const getQuickActions = (userRole: string) => {
  const baseActions = [
    {
      title: 'Create Course',
      url: '/courses',
      icon: Plus,
    },
  ];

  if (userRole === 'admin' || userRole === 'teacher') {
    baseActions.unshift({
      title: 'Add User',
      url: '/users',
      icon: UserPlus,
    });
    
    baseActions.push({
      title: 'Generate Report',
      url: '/reports',
      icon: FileText,
    });
  }

  return baseActions;
};

export function AdminSidebar() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  
  const navigationItems = getNavigationItems(profile?.role || 'student');
  const quickActions = getQuickActions(profile?.role || 'student');

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              {profile?.role === 'admin' ? 'Admin Portal' : 
               profile?.role === 'teacher' ? 'Teacher Portal' : 
               'Student Portal'}
            </span>
            <span className="text-xs text-muted-foreground">DIL Platform</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left text-sm">
                    <span className="truncate font-semibold">
                      {profile?.full_name || 'User'}
                    </span>
                    <span className="truncate text-xs text-muted-foreground capitalize">
                      {profile?.role || 'User'}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-dropdown-menu-trigger-width]">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export function AdminLayout() {
  const { profile } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>
                {profile?.role === 'admin' ? 'Admin Portal' : 
                 profile?.role === 'teacher' ? 'Teacher Portal' : 
                 'Student Portal'}
              </span>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
