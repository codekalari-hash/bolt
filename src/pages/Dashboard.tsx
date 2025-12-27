import { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp, Target, Zap } from 'lucide-react';
import { LineChart, BarChart } from '../components/ui/Chart';
import { useAuth } from '../contexts/AuthContext';
import { getCarbonSummary, getWeeklyTrend, getCategoryBreakdown } from '../services/database';

export function Dashboard() {
  const { user } = useAuth();
  const [carbonSummary, setCarbonSummary] = useState({ today: 0, week: 0, month: 0, target: 150 });
  const [weeklyTrend, setWeeklyTrend] = useState<Array<{ label: string; value: number }>>([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState<Array<{ label: string; value: number; color: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      const [summary, trend, breakdown] = await Promise.all([
        getCarbonSummary(user.id),
        getWeeklyTrend(user.id),
        getCategoryBreakdown(user.id),
      ]);

      setCarbonSummary(summary);
      setWeeklyTrend(trend);
      setCategoryBreakdown(breakdown);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const progress = (carbonSummary.month / carbonSummary.target) * 100;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-textMuted">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 blur-3xl -z-10" />
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Impact Today
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Making the world greener, one step at a time
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Today's Carbon</p>
                <p className="text-5xl font-bold bg-gradient-to-br from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  {carbonSummary.today}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">kg CO₂ saved</p>
              </div>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform">
                <TrendingDown className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-2xl w-fit">
              <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">8% better than yesterday</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-blue-200/50 dark:border-blue-800/50 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{carbonSummary.week}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">kg CO₂</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-purple-200/50 dark:border-purple-800/50 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{carbonSummary.month}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">kg CO₂</p>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-600/20 blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 border border-orange-200/50 dark:border-orange-800/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Monthly Goal</p>
                <p className="text-4xl font-bold bg-gradient-to-br from-orange-500 to-pink-600 bg-clip-text text-transparent">
                  {progress.toFixed(0)}%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse">
                <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-pink-600 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                {carbonSummary.month} / {carbonSummary.target} kg CO₂
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-600/20 blur-xl" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-green-200/50 dark:border-green-800/50 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Weekly Trend</h3>
            <LineChart data={weeklyTrend} color="bg-emerald-500" />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 blur-xl" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-cyan-200/50 dark:border-cyan-800/50 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Impact by Category</h3>
            <BarChart data={categoryBreakdown} />
          </div>
        </div>
      </div>
    </div>
  );
}
