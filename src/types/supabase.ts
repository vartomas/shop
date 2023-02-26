export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
      }
      orders: {
        Row: {
          adress: string | null
          city: string | null
          country: string | null
          created_at: string | null
          firstName: string | null
          id: number
          lastName: string | null
          price: number | null
          products: Json | null
          userId: string | null
        }
        Insert: {
          adress?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          price?: number | null
          products?: Json | null
          userId?: string | null
        }
        Update: {
          adress?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          firstName?: string | null
          id?: number
          lastName?: string | null
          price?: number | null
          products?: Json | null
          userId?: string | null
        }
      }
      products: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          image: string | null
          name: string | null
          price: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          price?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          image?: string | null
          name?: string | null
          price?: number | null
        }
      }
      profiles: {
        Row: {
          adress: string | null
          city: string | null
          country: string | null
          firstname: string | null
          id: string
          lastname: string | null
          phonenumber: string | null
          updated_at: string | null
        }
        Insert: {
          adress?: string | null
          city?: string | null
          country?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          phonenumber?: string | null
          updated_at?: string | null
        }
        Update: {
          adress?: string | null
          city?: string | null
          country?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          phonenumber?: string | null
          updated_at?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
