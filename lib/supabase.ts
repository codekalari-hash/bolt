import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://gmpfbcwwjraakccobkpm.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcGZiY3d3anJhYWtjY29ia3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MTg5OTIsImV4cCI6MjA4MjM5NDk5Mn0.6rTL9f6NM2zXQNZEYUh1ShY7JDpCLwSh5ys7lNaGtAc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Profile = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  total_carbon_saved?: number;
  rank?: number;
  level?: number;
  daily_goal?: number;
  weekly_goal?: number;
  monthly_goal?: number;
  created_at?: string;
  updated_at?: string;
};
