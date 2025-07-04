import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import SignInPage from './pages/SignInPage';
import { AdminLayout } from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import UsersPage from './pages/admin/UsersPage';
import CoursesPage from './pages/admin/CoursesPage';
import CourseDetailPage from './pages/admin/CourseDetailPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import { MessagesPage } from './pages/admin/MessagesPage';
import { DiscussionsPage } from './pages/admin/DiscussionsPage';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, AlertCircle } from 'lucide-react';
import { hasSupabaseConfig } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import GradesAssignmentsPage from './components/grades/GradesAssignmentsPage';

console.log('🚀 App.tsx: Starting application initialization');

const SupabaseSetupPage: React.FC = () => {
  console.log('🔧 App: Rendering Supabase setup page');
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <AlertCircle className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <CardTitle>Setup Required</CardTitle>
          <CardDescription>
            Supabase configuration is required to use this application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>To get started, you need to:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Connect your project to Supabase</li>
              <li>Set up your database schema</li>
              <li>Configure authentication</li>
            </ol>
          </div>
          <Button
            onClick={() => window.open('https://docs.lovable.dev/integrations/supabase/', '_blank')}
            className="w-full"
          >
            View Setup Instructions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();

  console.log('🔍 App: Current auth state:', {
    user: !!user,
    profile: !!profile,
    loading,
    userRole: profile?.role,
    hasSupabaseConfig,
    timestamp: new Date().toISOString()
  });

  if (!hasSupabaseConfig) {
    console.log('⚠️ App: Supabase not configured, showing setup page');
    return <SupabaseSetupPage />;
  }

  if (loading) {
    console.log('🔍 App: Still loading auth state, showing loading screen');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-3 w-32 mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }

  // If user exists but no profile (due to missing profiles table), use fallback routing
  if (user && !profile) {
    console.log('🔍 App: User exists but no profile, using fallback routing');
    
    return (
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="grades" element={<GradesAssignmentsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="discussions" element={<DiscussionsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  if (!user) {
    console.log('🔍 App: User not authenticated, showing sign-in page');
    return <SignInPage />;
  }

  console.log('✅ App: User authenticated, rendering main application');
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="grades" element={<GradesAssignmentsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="discussions" element={<DiscussionsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  console.log('🚀 App: Main App component rendering');
  
  try {
    return (
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </AuthProvider>
    );
  } catch (error) {
    console.error('❌ App: Critical error in App component:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Application Error</CardTitle>
            <CardDescription>
              Something went wrong loading the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please refresh the page or contact support if the issue persists.
            </p>
            <Button 
              onClick={() => window.location.reload()} 
              className="w-full mt-4"
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
