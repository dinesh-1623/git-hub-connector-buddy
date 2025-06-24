import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Check if we have real Supabase credentials
export const hasSupabaseConfig = !!(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  import.meta.env.VITE_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
  import.meta.env.VITE_SUPABASE_ANON_KEY !== 'placeholder-key'
);

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
