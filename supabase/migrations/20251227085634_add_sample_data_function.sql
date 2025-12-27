/*
  # Add Sample Data Population Function

  ## Purpose
  Automatically populate new user accounts with sample data for demo purposes.
  This helps users immediately see the app's features with realistic data.

  ## Changes
  1. Creates a function to generate sample data for new users
  2. Creates a trigger that runs when a new profile is created
  3. Sample data includes:
     - Carbon tracking entries (last 30 days)
     - Inventory items (5 items with varying expiry dates)
     - Trips (recent transportation logs)
     - Energy usage records
     - Meals
     - Waste actions
     - Alert notifications

  ## Security
  - Function runs with SECURITY DEFINER to bypass RLS
  - Only inserts data for the newly created user
  - Triggered automatically on profile creation
*/

-- Function to populate sample data for new users
CREATE OR REPLACE FUNCTION populate_sample_data_for_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert sample carbon tracking data for the past 30 days
  INSERT INTO carbon_tracking (user_id, date, daily_total, category)
  SELECT
    NEW.id,
    (CURRENT_DATE - days)::date,
    (3.5 + random() * 2)::numeric(10,2),
    CASE (random() * 3)::int
      WHEN 0 THEN 'transport'
      WHEN 1 THEN 'energy'
      WHEN 2 THEN 'food'
      ELSE 'waste'
    END
  FROM generate_series(0, 29) AS days;

  -- Insert sample inventory items
  INSERT INTO inventory_items (user_id, name, category, quantity, unit, expiry_date, carbon_score)
  VALUES
    (NEW.id, 'Organic Milk', 'Dairy', 2, 'liter', CURRENT_DATE + 3, 2.1),
    (NEW.id, 'Free-Range Eggs', 'Dairy', 12, 'pieces', CURRENT_DATE + 9, 1.8),
    (NEW.id, 'Whole Grain Bread', 'Bakery', 1, 'loaf', CURRENT_DATE + 1, 0.9),
    (NEW.id, 'Fresh Spinach', 'Vegetables', 500, 'grams', CURRENT_DATE + 2, 0.4),
    (NEW.id, 'Chicken Breast', 'Meat', 750, 'grams', CURRENT_DATE + 4, 4.2);

  -- Insert sample trips
  INSERT INTO trips (user_id, date, from_location, to_location, distance, mode, emissions)
  VALUES
    (NEW.id, CURRENT_DATE, 'Home', 'Office', 12.5, 'Car', 2.1),
    (NEW.id, CURRENT_DATE - 1, 'Office', 'Gym', 3.2, 'Bicycle', 0),
    (NEW.id, CURRENT_DATE - 1, 'Gym', 'Home', 8.7, 'Public Transport', 0.8),
    (NEW.id, CURRENT_DATE - 2, 'Home', 'Shopping Mall', 15.3, 'Car', 2.5);

  -- Insert sample energy usage
  INSERT INTO energy_usage (user_id, date, usage_kwh, cost, appliance_name)
  SELECT
    NEW.id,
    (CURRENT_DATE - days)::date,
    (10 + random() * 5)::numeric(10,2),
    (1.7 + random() * 0.8)::numeric(10,2),
    CASE (random() * 4)::int
      WHEN 0 THEN 'Air Conditioner'
      WHEN 1 THEN 'Refrigerator'
      WHEN 2 THEN 'Water Heater'
      WHEN 3 THEN 'Lighting'
      ELSE 'Others'
    END
  FROM generate_series(0, 6) AS days;

  -- Insert sample meals
  INSERT INTO meals (user_id, name, date, meal_type, carbon_score, distance, is_local)
  VALUES
    (NEW.id, 'Grilled Chicken Salad', CURRENT_DATE, 'Lunch', 3.2, 5.2, true),
    (NEW.id, 'Vegetable Stir Fry', CURRENT_DATE - 1, 'Dinner', 1.8, 2.1, true),
    (NEW.id, 'Beef Burger', CURRENT_DATE - 1, 'Lunch', 5.4, 12.5, false);

  -- Insert sample waste actions
  INSERT INTO waste_actions (user_id, date, action_type, items, weight)
  VALUES
    (NEW.id, CURRENT_DATE, 'Recycling', 'Paper, Plastic', 1.2),
    (NEW.id, CURRENT_DATE - 1, 'Composting', 'Food scraps', 0.8),
    (NEW.id, CURRENT_DATE - 2, 'Recycling', 'Glass bottles', 2.1);

  -- Insert sample alerts
  INSERT INTO alerts (user_id, type, title, message, read)
  VALUES
    (NEW.id, 'warning', 'Item Expiring Soon', 'Whole Grain Bread expires in 1 day', false),
    (NEW.id, 'success', 'Goal Achieved', 'You met your weekly carbon reduction goal!', false),
    (NEW.id, 'info', 'New Challenge', 'Join the Plastic-Free Week challenge', true);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run the function when a new profile is created
DROP TRIGGER IF EXISTS trigger_populate_sample_data ON profiles;
CREATE TRIGGER trigger_populate_sample_data
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION populate_sample_data_for_user();

-- Insert sample badges (these are shared across all users)
INSERT INTO badges (name, description, icon, requirement)
VALUES
  ('Early Adopter', 'Joined EcoSphere in its first month', '🌟', 'Sign up'),
  ('Carbon Reducer', 'Reduced carbon footprint by 20%', '📉', 'Reduce emissions by 20%'),
  ('Recycling Champion', 'Recycled 100kg of waste', '♻️', 'Recycle 100kg'),
  ('Green Commuter', 'Used eco-friendly transport for 30 days', '🚴', '30 days of eco transport'),
  ('Zero Waste Hero', 'Achieved 90% recycling rate', '🌍', '90% recycling rate'),
  ('Community Leader', 'Organized 5 community events', '👥', 'Organize 5 events')
ON CONFLICT (name) DO NOTHING;

-- Insert sample shop products
INSERT INTO shop_products (name, description, price, carbon_saved, image_url, category, rating)
VALUES
  ('Reusable Water Bottle', 'Stainless steel, 750ml capacity', 24.99, 156, 'https://images.pexels.com/photos/3737117/pexels-photo-3737117.jpeg?auto=compress&cs=tinysrgb&w=400', 'Essentials', 4.8),
  ('Bamboo Cutlery Set', 'Travel-friendly, includes pouch', 15.99, 89, 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400', 'Kitchen', 4.6),
  ('Solar Power Bank', '20000mAh, dual USB ports', 45.99, 234, 'https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=400', 'Electronics', 4.7),
  ('Organic Cotton Tote Bag', 'Large capacity, machine washable', 12.99, 67, 'https://images.pexels.com/photos/7262942/pexels-photo-7262942.jpeg?auto=compress&cs=tinysrgb&w=400', 'Bags', 4.9),
  ('Beeswax Food Wraps', 'Set of 5, various sizes', 18.99, 112, 'https://images.pexels.com/photos/6621460/pexels-photo-6621460.jpeg?auto=compress&cs=tinysrgb&w=400', 'Kitchen', 4.5),
  ('LED Smart Bulbs', 'Pack of 4, app controlled', 34.99, 445, 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400', 'Home', 4.7)
ON CONFLICT DO NOTHING;

-- Insert sample community groups
INSERT INTO community_groups (name, description, category, member_count)
VALUES
  ('Zero Waste Warriors', 'Community focused on reducing waste to zero', 'Waste', 1234),
  ('Green Commuters', 'Promoting eco-friendly transportation', 'Transport', 892),
  ('Plant-Based Pioneers', 'Exploring sustainable eating habits', 'Food', 1567)
ON CONFLICT DO NOTHING;

-- Insert sample challenges
INSERT INTO challenges (title, description, participant_count, ends_at)
VALUES
  ('Plastic-Free Week', 'Go one week without single-use plastics', 567, NOW() + INTERVAL '3 days'),
  ('Bike to Work', 'Cycle to work for 5 consecutive days', 423, NOW() + INTERVAL '1 week'),
  ('Meatless Monday', 'Four weeks of plant-based Mondays', 891, NOW() + INTERVAL '2 weeks')
ON CONFLICT DO NOTHING;
