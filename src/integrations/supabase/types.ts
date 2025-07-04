export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          bot_response: string | null
          created_at: string | null
          id: string
          user_message: string
        }
        Insert: {
          bot_response?: string | null
          created_at?: string | null
          id?: string
          user_message: string
        }
        Update: {
          bot_response?: string | null
          created_at?: string | null
          id?: string
          user_message?: string
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          author_id: string
          author_name: string
          author_role: string
          content: string
          created_at: string
          discussion_id: string
          id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          author_name: string
          author_role?: string
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          author_name?: string
          author_role?: string
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          author_id: string
          author_name: string
          author_role: string
          category: string
          content: string
          created_at: string
          id: string
          last_activity_at: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          author_name: string
          author_role?: string
          category?: string
          content: string
          created_at?: string
          id?: string
          last_activity_at?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          author_name?: string
          author_role?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          last_activity_at?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          recipient_id: string
          recipient_name: string
          recipient_role: string
          sender_id: string
          sender_name: string
          sender_role: string
          sent_at: string
          subject: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id: string
          recipient_name: string
          recipient_role: string
          sender_id: string
          sender_name: string
          sender_role: string
          sent_at?: string
          subject: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          recipient_id?: string
          recipient_name?: string
          recipient_role?: string
          sender_id?: string
          sender_name?: string
          sender_role?: string
          sent_at?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          mentor_id: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          mentor_id?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          mentor_id?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_mentor_id_fkey"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_messages: {
        Row: {
          content: string | null
          created_at: string | null
          id: string | null
          read: boolean | null
          recipient_id: string | null
          recipient_name: string | null
          recipient_role: string | null
          sender_id: string | null
          sender_name: string | null
          sender_role: string | null
          sent_at: string | null
          subject: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string | null
          read?: boolean | null
          recipient_id?: string | null
          recipient_name?: string | null
          recipient_role?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_role?: string | null
          sent_at?: string | null
          subject?: string | null
          type?: never
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string | null
          read?: boolean | null
          recipient_id?: string | null
          recipient_name?: string | null
          recipient_role?: string | null
          sender_id?: string | null
          sender_name?: string | null
          sender_role?: string | null
          sent_at?: string | null
          subject?: string | null
          type?: never
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
