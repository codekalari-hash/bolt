import { supabase } from '../lib/supabase';

export async function getCarbonSummary(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data: todayData } = await supabase
    .from('carbon_tracking')
    .select('daily_total')
    .eq('user_id', userId)
    .eq('date', today);

  const { data: weekData } = await supabase
    .from('carbon_tracking')
    .select('daily_total')
    .eq('user_id', userId)
    .gte('date', weekAgo);

  const { data: monthData } = await supabase
    .from('carbon_tracking')
    .select('daily_total')
    .eq('user_id', userId)
    .gte('date', monthAgo);

  const todayTotal = todayData?.reduce((sum, item) => sum + Number(item.daily_total), 0) || 0;
  const weekTotal = weekData?.reduce((sum, item) => sum + Number(item.daily_total), 0) || 0;
  const monthTotal = monthData?.reduce((sum, item) => sum + Number(item.daily_total), 0) || 0;

  return {
    today: todayTotal,
    week: weekTotal,
    month: monthTotal,
    target: 150,
  };
}

export async function getWeeklyTrend(userId: string) {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data } = await supabase
    .from('carbon_tracking')
    .select('date, daily_total')
    .eq('user_id', userId)
    .gte('date', weekAgo)
    .order('date', { ascending: true });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const result = days.map((label, index) => {
    const date = new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const dayData = data?.filter(d => d.date === dateStr);
    const value = dayData?.reduce((sum, item) => sum + Number(item.daily_total), 0) || 0;
    return { label, value };
  });

  return result;
}

export async function getCategoryBreakdown(userId: string) {
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data } = await supabase
    .from('carbon_tracking')
    .select('category, daily_total')
    .eq('user_id', userId)
    .gte('date', monthAgo);

  const categories = {
    transport: 0,
    energy: 0,
    food: 0,
    waste: 0,
  };

  data?.forEach(item => {
    categories[item.category as keyof typeof categories] += Number(item.daily_total);
  });

  const total = Object.values(categories).reduce((sum, val) => sum + val, 0);

  return [
    { label: 'Transport', value: Math.round((categories.transport / total) * 100) || 0, color: 'bg-blue-500' },
    { label: 'Energy', value: Math.round((categories.energy / total) * 100) || 0, color: 'bg-yellow-500' },
    { label: 'Food', value: Math.round((categories.food / total) * 100) || 0, color: 'bg-green-500' },
    { label: 'Waste', value: Math.round((categories.waste / total) * 100) || 0, color: 'bg-red-500' },
  ];
}

export async function getInventoryItems(userId: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('user_id', userId)
    .order('expiry_date', { ascending: true });

  if (error) throw error;

  return data?.map(item => {
    const daysUntilExpiry = item.expiry_date
      ? Math.ceil((new Date(item.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      ...item,
      daysUntilExpiry,
    };
  }) || [];
}

export async function getTrips(userId: string) {
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data || [];
}

export async function getMeals(userId: string) {
  const { data, error } = await supabase
    .from('meals')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data || [];
}

export async function getWasteActions(userId: string) {
  const { data, error } = await supabase
    .from('waste_actions')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data || [];
}

export async function getUserBadges(userId: string) {
  const { data: allBadges } = await supabase
    .from('badges')
    .select('*');

  const { data: userBadges } = await supabase
    .from('user_badges')
    .select('*, badge:badges(*)')
    .eq('user_id', userId);

  const earnedBadgeIds = new Set(userBadges?.map(ub => ub.badge_id) || []);

  return allBadges?.map(badge => {
    const userBadge = userBadges?.find(ub => ub.badge_id === badge.id);
    return {
      ...badge,
      earned: earnedBadgeIds.has(badge.id),
      progress: userBadge?.progress || 0,
      date: userBadge?.earned_at,
    };
  }) || [];
}

export async function getAlerts(userId: string) {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function markAlertAsRead(alertId: string) {
  const { error } = await supabase
    .from('alerts')
    .update({ read: true })
    .eq('id', alertId);

  if (error) throw error;
}

export async function getShopProducts() {
  const { data, error } = await supabase
    .from('shop_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getCommunityGroups() {
  const { data, error } = await supabase
    .from('community_groups')
    .select('*')
    .order('member_count', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getChallenges() {
  const { data, error } = await supabase
    .from('challenges')
    .select('*')
    .order('ends_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getUserChallenges(userId: string) {
  const { data, error } = await supabase
    .from('user_challenges')
    .select('*, challenge:challenges(*)')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
}
