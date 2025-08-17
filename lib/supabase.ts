import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: number
          title: string
          city: string
          state: string
          type: string
          funding_goal: number
          current_funding: number
          progress: number
          description: string
          long_description: string
          deadline: string
          status: 'active' | 'funded' | 'completed'
          team_size: number
          timeline: string
          impact: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          city: string
          state: string
          type: string
          funding_goal: number
          current_funding?: number
          progress?: number
          description: string
          long_description: string
          deadline: string
          status?: 'active' | 'funded' | 'completed'
          team_size: number
          timeline: string
          impact: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          city?: string
          state?: string
          type?: string
          funding_goal?: number
          current_funding?: number
          progress?: number
          description?: string
          long_description?: string
          deadline?: string
          status?: 'active' | 'funded' | 'completed'
          team_size?: number
          timeline?: string
          impact?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: number
          project_id: number
          amount: number
          donor_name: string
          donor_email: string
          message?: string
          is_recurring: boolean
          created_at: string
        }
        Insert: {
          id?: number
          project_id: number
          amount: number
          donor_name: string
          donor_email: string
          message?: string
          is_recurring?: boolean
          created_at?: string
        }
        Update: {
          id?: number
          project_id?: number
          amount?: number
          donor_name?: string
          donor_email?: string
          message?: string
          is_recurring?: boolean
          created_at?: string
        }
      }
      project_updates: {
        Row: {
          id: number
          project_id: number
          date: string
          title: string
          content: string
          type: 'milestone' | 'update' | 'news'
          created_at: string
        }
        Insert: {
          id?: number
          project_id: number
          date: string
          title: string
          content: string
          type: 'milestone' | 'update' | 'news'
          created_at?: string
        }
        Update: {
          id?: number
          project_id?: number
          date?: string
          title?: string
          content?: string
          type?: 'milestone' | 'update' | 'news'
          created_at?: string
        }
      }
    }
  }
}
