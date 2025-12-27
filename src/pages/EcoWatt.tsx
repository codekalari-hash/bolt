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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoWatt</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Usage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Usage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {summary.monthlyUsage} kWh
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Cost</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${summary.monthlyCost}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">vs Last Month</p>
                <p className={`text-2xl font-bold ${summary.changePercentage > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                  {summary.changePercentage > 0 ? '+' : ''}{summary.changePercentage}%
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trend</CardTitle>
        </CardHeader>
        <CardBody>
          <LineChart data={dailyTrend} color="bg-yellow-500" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appliance Breakdown</CardTitle>
        </CardHeader>
        <CardBody>
          {appliances.length > 0 ? (
            <BarChart
              data={appliances.map((a) => ({
                label: a.name,
                value: a.usage,
                color: 'bg-yellow-500',
              }))}
            />
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No appliance data available. Add your first energy usage entry to see breakdown.
            </p>
          )}
        </CardBody>
      </Card>

      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <CardTitle>Energy Saving Tips</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-300">
            <li>• Unplug devices when not in use to reduce phantom power</li>
            <li>• Use LED bulbs - they use 75% less energy than incandescent</li>
            <li>• Set AC to 24°C to balance comfort and efficiency</li>
            <li>• Run dishwasher only when full to maximize efficiency</li>
          </ul>
        </CardBody>
      </Card>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add Energy Usage
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Appliance Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g., Air Conditioner"
                  value={formData.appliance_name}
                  onChange={(e) => setFormData({ ...formData, appliance_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usage (kWh)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={formData.usage_kwh}
                  onChange={(e) => setFormData({ ...formData, usage_kwh: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cost ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="e.g., 2.15"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" variant="primary" fullWidth>
                  Add Usage
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
