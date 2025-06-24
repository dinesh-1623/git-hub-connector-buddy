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
  SidebarSeparator,
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
  BarChart3,
  ChevronDown,
} from 'lucide-react';

const getMainNavigation = (userRole: string) => [
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

const getCommunicationItems = (userRole: string) => {
  if (userRole === 'admin' || userRole === 'teacher') {
    return [
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
    ];
  }
  return [];
};

const getManagementItems = (userRole: string) => {
  const items = [];
  
  if (userRole === 'admin' || userRole === 'teacher') {
    items.push(
      {
        title: 'Grade Assignments',
        url: '/grades',
        icon: GraduationCap,
      },
      {
        title: 'Users',
        url: '/users',
        icon: Users,
      }
    );
  }
  
  return items;
};

const getAnalyticsItems = (userRole: string) => {
  if (userRole === 'admin' || userRole === 'teacher') {
    return [
      {
        title: 'Reports',
        url: '/reports',
        icon: BarChart3,
      },
    ];
  }
  return [];
};

const getQuickActions = (userRole: string) => {
  const actions = [
    {
      title: 'New Course',
      url: '/courses',
      icon: Plus,
      description: 'Create a new course',
    },
  ];

  if (userRole === 'admin' || userRole === 'teacher') {
    actions.unshift({
      title: 'Add User',
      url: '/users',
      icon: UserPlus,
      description: 'Invite new users',
    });
    
    actions.push({
      title: 'Generate Report',
      url: '/reports',
      icon: FileText,
      description: 'Create analytics report',
    });
  }

  return actions;
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Admin Dashboard';
    case 'teacher':
      return 'Teacher Dashboard';
    default:
      return 'Student Dashboard';
  }
};

export function AdminSidebar() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  
  const mainNavigation = getMainNavigation(profile?.role || 'student');
  const communicationItems = getCommunicationItems(profile?.role || 'student');
  const managementItems = getManagementItems(profile?.role || 'student');
  const analyticsItems = getAnalyticsItems(profile?.role || 'student');
  const quickActions = getQuickActions(profile?.role || 'student');

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold leading-tight">
              DIL Platform
            </span>
            <span className="text-xs text-muted-foreground">
              {getRoleDisplayName(profile?.role || 'student')}
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="h-9"
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

        {/* Communication Section */}
        {communicationItems.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
                Communication
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {communicationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className="h-9"
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
          </>
        )}

        {/* Management Section */}
        {managementItems.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
                Management
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className="h-9"
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
          </>
        )}

        {/* Analytics Section */}
        {analyticsItems.length > 0 && (
          <>
            <SidebarSeparator />
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
                Analytics
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {analyticsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className="h-9"
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
          </>
        )}

        {/* Quick Actions Dropdown */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="h-9 w-full justify-between">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        <span>Create New</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-48">
                    <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {quickActions.map((action) => (
                      <DropdownMenuItem key={action.title} asChild>
                        <Link to={action.url} className="flex items-center gap-2">
                          <action.icon className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span>{action.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {action.description}
                            </span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={location.pathname === '/settings'}
                  className="h-9"
                >
                  <Link to="/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="h-12">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 text-left text-sm">
                    <span className="truncate font-medium">
                      {profile?.full_name || 'User'}
                    </span>
                    <span className="truncate text-xs text-muted-foreground capitalize">
                      {profile?.role || 'User'}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
                {getRoleDisplayName(profile?.role || 'student')}
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
