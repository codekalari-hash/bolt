/*
  # EcoSphere Mobile App Database Schema

  ## Overview
  Complete database schema for EcoSphere carbon tracking and gamification mobile app.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, references auth.users)
  - `name` (text)
  - `email` (text)
  - `avatar_url` (text)
  - `total_carbon_saved` (numeric)
  - `rank` (integer)
  - `level` (integer)
  - `daily_goal` (numeric)
  - `weekly_goal` (numeric)
  - `monthly_goal` (numeric)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 2. carbon_tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `date` (date)
  - `daily_total` (numeric)
  - `category` (text) - transport, energy, food, waste
  - `created_at` (timestamptz)

  ### 3. inventory_items
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `category` (text)
  - `quantity` (numeric)
  - `unit` (text)
  - `expiry_date` (date)
  - `carbon_score` (numeric)
  - `created_at` (timestamptz)

  ### 4. trips
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `date` (date)
  - `from_location` (text)
  - `to_location` (text)
  - `distance` (numeric)
  - `mode` (text)
  - `emissions` (numeric)
  - `created_at` (timestamptz)

  ### 5. energy_usage
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `date` (date)
  - `usage_kwh` (numeric)
  - `cost` (numeric)
  - `appliance_name` (text)
  - `created_at` (timestamptz)

  ### 6. meals
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `name` (text)
  - `date` (date)
  - `meal_type` (text)
  - `carbon_score` (numeric)
  - `distance` (numeric)
  - `is_local` (boolean)
  - `created_at` (timestamptz)

  ### 7. waste_actions
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `date` (date)
  - `action_type` (text) - Recycling, Composting, Landfill
  - `items` (text)
  - `weight` (numeric)
  - `created_at` (timestamptz)

  ### 8. badges
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `icon` (text)
  - `requirement` (text)
  - `created_at` (timestamptz)

  ### 9. user_badges
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `badge_id` (uuid, references badges)
  - `earned_at` (timestamptz)
  - `progress` (integer)

  ### 10. alerts
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `type` (text)
  - `title` (text)
  - `message` (text)
  - `read` (boolean)
  - `created_at` (timestamptz)

  ### 11. shop_products
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `price` (numeric)
  - `carbon_saved` (integer)
  - `image_url` (text)
  - `category` (text)
  - `rating` (numeric)
  - `created_at` (timestamptz)

  ### 12. community_groups
  - `id` (uuid, primary key)
  - `name` (text)
  - `description` (text)
  - `category` (text)
  - `member_count` (integer)
  - `created_at` (timestamptz)

  ### 13. challenges
  - `id` (uuid, primary key)
  - `title` (text)
  - `description` (text)
  - `participant_count` (integer)
  - `ends_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 14. user_challenges
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `challenge_id` (uuid, references challenges)
  - `progress` (integer)
  - `joined_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Public read access for shop_products, badges, community_groups, and challenges
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  total_carbon_saved numeric DEFAULT 0,
  rank integer DEFAULT 999999,
  level integer DEFAULT 1,
  daily_goal numeric DEFAULT 5.0,
  weekly_goal numeric DEFAULT 35.0,
  monthly_goal numeric DEFAULT 150.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create carbon_tracking table
CREATE TABLE IF NOT EXISTS carbon_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  daily_total numeric NOT NULL DEFAULT 0,
  category text NOT NULL CHECK (category IN ('transport', 'energy', 'food', 'waste')),
  created_at timestamptz DEFAULT now()
);

-- Create inventory_items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL,
  expiry_date date,
  carbon_score numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  from_location text NOT NULL,
  to_location text NOT NULL,
  distance numeric NOT NULL DEFAULT 0,
  mode text NOT NULL,
  emissions numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create energy_usage table
CREATE TABLE IF NOT EXISTS energy_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  usage_kwh numeric NOT NULL DEFAULT 0,
  cost numeric DEFAULT 0,
  appliance_name text,
  created_at timestamptz DEFAULT now()
);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  meal_type text NOT NULL,
  carbon_score numeric NOT NULL DEFAULT 0,
  distance numeric DEFAULT 0,
  is_local boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create waste_actions table
CREATE TABLE IF NOT EXISTS waste_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  action_type text NOT NULL CHECK (action_type IN ('Recycling', 'Composting', 'Landfill')),
  items text,
  weight numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL,
  requirement text,
  created_at timestamptz DEFAULT now()
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id uuid REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0,
  UNIQUE(user_id, badge_id)
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('info', 'success', 'warning', 'danger')),
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create shop_products table
CREATE TABLE IF NOT EXISTS shop_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  carbon_saved integer DEFAULT 0,
  image_url text,
  category text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create community_groups table
CREATE TABLE IF NOT EXISTS community_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  member_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  participant_count integer DEFAULT 0,
  ends_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_challenges table
CREATE TABLE IF NOT EXISTS user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  challenge_id uuid REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
  progress integer DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Carbon tracking policies
CREATE POLICY "Users can view own carbon data"
  ON carbon_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own carbon data"
  ON carbon_tracking FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own carbon data"
  ON carbon_tracking FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own carbon data"
  ON carbon_tracking FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Inventory policies
CREATE POLICY "Users can view own inventory"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own inventory"
  ON inventory_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own inventory"
  ON inventory_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own inventory"
  ON inventory_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trips policies
CREATE POLICY "Users can view own trips"
  ON trips FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trips"
  ON trips FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips"
  ON trips FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips"
  ON trips FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Energy usage policies
CREATE POLICY "Users can view own energy usage"
  ON energy_usage FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own energy usage"
  ON energy_usage FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own energy usage"
  ON energy_usage FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own energy usage"
  ON energy_usage FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Meals policies
CREATE POLICY "Users can view own meals"
  ON meals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals"
  ON meals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meals"
  ON meals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meals"
  ON meals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Waste actions policies
CREATE POLICY "Users can view own waste actions"
  ON waste_actions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own waste actions"
  ON waste_actions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own waste actions"
  ON waste_actions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own waste actions"
  ON waste_actions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Badges policies (public read)
CREATE POLICY "Anyone can view badges"
  ON badges FOR SELECT
  TO authenticated
  USING (true);

-- User badges policies
CREATE POLICY "Users can view own badges"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON user_badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Alerts policies
CREATE POLICY "Users can view own alerts"
  ON alerts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts"
  ON alerts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own alerts"
  ON alerts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Shop products policies (public read)
CREATE POLICY "Anyone can view shop products"
  ON shop_products FOR SELECT
  TO authenticated
  USING (true);

-- Community groups policies (public read)
CREATE POLICY "Anyone can view community groups"
  ON community_groups FOR SELECT
  TO authenticated
  USING (true);

-- Challenges policies (public read)
CREATE POLICY "Anyone can view challenges"
  ON challenges FOR SELECT
  TO authenticated
  USING (true);

-- User challenges policies
CREATE POLICY "Users can view own challenges"
  ON user_challenges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges"
  ON user_challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges"
  ON user_challenges FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_carbon_tracking_user_date ON carbon_tracking(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_trips_user_date ON trips(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_energy_usage_user_date ON energy_usage(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_waste_actions_user_date ON waste_actions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_user_read ON alerts(user_id, read);
CREATE INDEX IF NOT EXISTS idx_inventory_expiry ON inventory_items(user_id, expiry_date);
