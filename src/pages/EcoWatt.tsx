import { useState, useEffect } from 'react';
import { Zap, TrendingUp, DollarSign, Lightbulb, Plus, X } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { LineChart, BarChart } from '../components/ui/Chart';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import {
  getEnergyUsageSummary,
  getEnergyDailyTrend,
  getApplianceBreakdown,
  addEnergyUsage,
} from '../services/database';

export function EcoWatt() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState({ monthlyUsage: 0, monthlyCost: 0, changePercentage: 0 });
  const [dailyTrend, setDailyTrend] = useState<Array<{ label: string; value: number }>>([]);
  const [appliances, setAppliances] = useState<Array<{ name: string; usage: number; percentage: number }>>([]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    appliance_name: '',
    usage_kwh: '',
    cost: '',
  });

  useEffect(() => {
    if (user) {
      loadEnergyData();
    }
  }, [user]);

  const loadEnergyData = async () => {
    if (!user) return;

    try {
      const [summaryData, trendData, applianceData] = await Promise.all([
        getEnergyUsageSummary(user.id),
        getEnergyDailyTrend(user.id),
        getApplianceBreakdown(user.id),
      ]);

      setSummary(summaryData);
      setDailyTrend(trendData);
      setAppliances(applianceData);
    } catch (error) {
      console.error('Error loading energy data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addEnergyUsage(user.id, {
        date: formData.date,
        appliance_name: formData.appliance_name,
        usage_kwh: parseFloat(formData.usage_kwh),
        cost: parseFloat(formData.cost),
      });

      setShowModal(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        appliance_name: '',
        usage_kwh: '',
        cost: '',
      });
      loadEnergyData();
    } catch (error) {
      console.error('Error adding energy usage:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
          EcoWatt
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 border border-yellow-200/50 dark:border-yellow-800/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">Monthly Usage</p>
                <p className="text-4xl font-bold bg-gradient-to-br from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {summary.monthlyUsage}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">kWh consumed</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform">
                <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/20 blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-green-200/50 dark:border-green-800/50 shadow-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <DollarSign className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Monthly Cost</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${summary.monthlyCost}</p>
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${summary.changePercentage > 0 ? 'from-red-500/20 to-orange-600/20' : 'from-green-500/20 to-emerald-600/20'} blur-xl group-hover:blur-2xl transition-all`} />
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-gray-200/50 dark:border-gray-800/50 shadow-xl">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg mb-3 bg-gradient-to-br ${summary.changePercentage > 0 ? 'from-red-500 to-orange-600' : 'from-green-500 to-emerald-600'}`}>
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">vs Last Month</p>
              <p className={`text-2xl font-bold ${summary.changePercentage > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                {summary.changePercentage > 0 ? '+' : ''}{summary.changePercentage}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 blur-xl" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-amber-200/50 dark:border-amber-800/50 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Daily Usage Trend</h3>
            <LineChart data={dailyTrend} color="bg-yellow-500" />
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-600/20 blur-xl" />
          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-5 border border-orange-200/50 dark:border-orange-800/50 shadow-xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Appliance Breakdown</h3>
            {appliances.length > 0 ? (
              <BarChart
                data={appliances.map((a) => ({
                  label: a.name,
                  value: a.usage,
                  color: 'bg-orange-500',
                }))}
              />
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No appliance data available. Add your first energy usage entry to see breakdown.
              </p>
            )}
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 blur-xl" />
          <div className="relative bg-blue-500/10 dark:bg-blue-900/20 backdrop-blur-xl rounded-3xl p-5 border border-blue-200/50 dark:border-blue-800/50 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Lightbulb className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Energy Saving Tips</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Unplug devices when not in use to reduce phantom power</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Use LED bulbs - they use 75% less energy than incandescent</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Set AC to 24°C to balance comfort and efficiency</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Run dishwasher only when full to maximize efficiency</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Add Energy Usage
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Appliance Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Air Conditioner"
                  value={formData.appliance_name}
                  onChange={(e) => setFormData({ ...formData, appliance_name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Usage (kWh)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={formData.usage_kwh}
                  onChange={(e) => setFormData({ ...formData, usage_kwh: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-0 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Cost ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2.15"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-0 transition-all"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
                >
                  Add Usage
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
