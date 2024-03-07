export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      comment: {
        Row: {
          content: string;
          created_at: string;
          created_by: string;
          document_id: string;
          id: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          created_by?: string;
          document_id?: string;
          id?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string;
          document_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_comment_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_comment_post_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "document";
            referencedColumns: ["id"];
          }
        ];
      };
      document: {
        Row: {
          content: string;
          created_at: string;
          created_by: string;
          id: string;
          isPublished: boolean;
          summary: string;
          title: string;
          updated_at: string;
          updated_by: string;
        };
        Insert: {
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          isPublished?: boolean;
          summary?: string;
          title?: string;
          updated_at?: string;
          updated_by?: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          created_by?: string;
          id?: string;
          isPublished?: boolean;
          summary?: string;
          title?: string;
          updated_at?: string;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_document_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      like: {
        Row: {
          created_at: string;
          created_by: string;
          document_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          document_id: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          document_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_like_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "public_like_document_id_fkey";
            columns: ["document_id"];
            isOneToOne: false;
            referencedRelation: "document";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string;
          created_at: string;
          first_name: string;
          id: string;
          last_name: string;
        };
        Insert: {
          avatar_url?: string;
          created_at?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
        };
        Update: {
          avatar_url?: string;
          created_at?: string;
          first_name?: string;
          id?: string;
          last_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "public_user_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_permission: "channels.delete" | "messages.delete";
      app_role: "admin" | "moderator";
      user_status: "ONLINE" | "OFFLINE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;
