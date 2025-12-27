import { supabase } from '../lib/supabase';

export async function getCarbonSummary(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const { data: todayData } = await supabase
    .from('carbon_logs')
    .select('carbon_amount')
    .eq('user_id', userId)
    .gte('date', today);

  const { data: weekData } = await supabase
    .from('carbon_logs')
    .select('carbon_amount')
    .eq('user_id', userId)
    .gte('date', weekAgo);

  const { data: monthData } = await supabase
    .from('carbon_logs')
    .select('carbon_amount')
    .eq('user_id', userId)
    .gte('date', monthAgo);

  const today_sum = todayData?.reduce((sum, log) => sum + log.carbon_amount, 0) || 0;
  const week_sum = weekData?.reduce((sum, log) => sum + log.carbon_amount, 0) || 0;
  const month_sum = monthData?.reduce((sum, log) => sum + log.carbon_amount, 0) || 0;

  return {
    today: Math.round(today_sum * 10) / 10,
    week: Math.round(week_sum * 10) / 10,
    month: Math.round(month_sum * 10) / 10,
    target: 150,
  };
}

export async function getWeeklyTrend(userId: string) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, index) => ({
    label: day,
    value: Math.random() * 30,
  }));
}

export async function getCategoryBreakdown(userId: string) {
  return [
    { label: 'Transport', value: 45, color: '#10b981' },
    { label: 'Energy', value: 30, color: '#3b82f6' },
    { label: 'Food', value: 15, color: '#f59e0b' },
    { label: 'Waste', value: 10, color: '#ef4444' },
  ];
}

export async function getInventoryItems(userId: string) {
  const { data, error } = await supabase
    .from('inventory_items')
    .select('*')
    .eq('user_id', userId)
    .order('expiry_date', { ascending: true });

  if (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }

  return (data || []).map(item => {
    const expiryDate = new Date(item.expiry_date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      id: item.id,
      name: item.name,
      category: item.category || 'Others',
      quantity: item.quantity,
      unit: item.unit || 'pcs',
      carbonScore: item.carbon_score || 0,
      expiryDate: expiryDate.toLocaleDateString(),
      daysUntilExpiry,
    };
  });
}
