
import React from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import SignInPage from './pages/SignInPage';
import GradesAssignmentsPage from './components/grades/GradesAssignmentsPage';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen, AlertCircle } from 'lucide-react';
import { hasSupabaseConfig } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

const SupabaseSetupPage: React.FC = () => {
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

  // Check if Supabase is configured
  if (!hasSupabaseConfig) {
    console.log('⚠️ App: Supabase not configured, showing setup page');
    return <SupabaseSetupPage />;
  }

  // Show loading screen while checking authentication
  if (loading) {
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

  // Show sign-in page if not authenticated
  if (!user || !profile) {
    return <SignInPage />;
  }

  // Check if user has teacher/admin role for grades page
  if (profile.role !== 'teacher' && profile.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
          <p className="text-muted-foreground">
            You need teacher or admin privileges to access this application.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/grade-assignments" element={<GradesAssignmentsPage />} />
      {/* Redirect any other path to /grade-assignments if authenticated */}
      <Route path="*" element={<Navigate to="/grade-assignments" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}

export default App;
