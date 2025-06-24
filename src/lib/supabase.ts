import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ebcrcsiepxuowptxkwmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3Jjc2llcHh1b3dwdHhrd21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ4MjEsImV4cCI6MjA2NTk0MDgyMX0.pydjUXA9bKsVb0sPO26oZw_Rub-olu8-VeSJD8fTQ28';

// Check if we have real Supabase credentials
export const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey);

console.log('🔍 Supabase Config Check:', {
  hasConfig: hasSupabaseConfig,
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on your schema
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          role: 'student' | 'teacher' | 'admin';
          avatar_url?: string;
          bio?: string;
          created_at?: string;
          updated_at?: string;
          mentor_id?: string;
        };
        Insert: {
          id: string;
          full_name?: string;
          role?: 'student' | 'teacher' | 'admin';
          avatar_url?: string;
          bio?: string;
          mentor_id?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: 'student' | 'teacher' | 'admin';
          avatar_url?: string;
          bio?: string;
          mentor_id?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description?: string;
          instructor_id?: string;
          thumbnail_url?: string;
          level: 'beginner' | 'intermediate' | 'advanced';
          duration?: string;
          price?: number;
          status: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          course_id: string;
          quiz_id?: string;
          title: string;
          description?: string;
          type: 'quiz' | 'assignment' | 'exam';
          due_date: string;
          max_score: number;
          instructions?: string;
          status: 'draft' | 'published' | 'archived';
          created_at?: string;
          updated_at?: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          assignment_id: string;
          user_id: string;
          submitted_at?: string;
          file_url?: string;
          answer_text?: string;
          score?: number;
          feedback?: string;
          status: 'pending' | 'submitted' | 'late' | 'graded' | 'returned';
          graded_by?: string;
          graded_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
