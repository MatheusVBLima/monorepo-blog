export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Area = "technology" | "literature"

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: number
          title: string
          author: string
          description: string
          content: string
          area: Area
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          author: string
          description: string
          content: string
          area: Area
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          author?: string
          description?: string
          content?: string
          area?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

// Tipo específico para Posts
export type Post = Tables<"posts">
