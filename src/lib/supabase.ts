import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  total_carbon_saved: number;
  rank: number;
  level: number;
  daily_goal: number;
  weekly_goal: number;
  monthly_goal: number;
  created_at: string;
  updated_at: string;
};

export type CarbonTracking = {
  id: string;
  user_id: string;
  date: string;
  daily_total: number;
  category: 'transport' | 'energy' | 'food' | 'waste';
  created_at: string;
};

export type InventoryItem = {
  id: string;
  user_id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiry_date: string;
  carbon_score: number;
  created_at: string;
};

export type Trip = {
  id: string;
  user_id: string;
  date: string;
  from_location: string;
  to_location: string;
  distance: number;
  mode: string;
  emissions: number;
  created_at: string;
};

export type Meal = {
  id: string;
  user_id: string;
  name: string;
  date: string;
  meal_type: string;
  carbon_score: number;
  distance: number;
  is_local: boolean;
  created_at: string;
};

export type WasteAction = {
  id: string;
  user_id: string;
  date: string;
  action_type: 'Recycling' | 'Composting' | 'Landfill';
  items: string;
  weight: number;
  created_at: string;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  created_at: string;
};

export type UserBadge = {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  progress: number;
  badge?: Badge;
};

export type Alert = {
  id: string;
  user_id: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
};

export type ShopProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  carbon_saved: number;
  image_url: string;
  category: string;
  rating: number;
  created_at: string;
};

export type CommunityGroup = {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  created_at: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  participant_count: number;
  ends_at: string;
  created_at: string;
};

export type UserChallenge = {
  id: string;
  user_id: string;
  challenge_id: string;
  progress: number;
  joined_at: string;
  challenge?: Challenge;
};
