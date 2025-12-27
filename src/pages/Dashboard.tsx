import { useEffect, useState } from 'react';
import { TrendingDown, TrendingUp, Target, Zap } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { LineChart, BarChart } from '../components/ui/Chart';
import { Button } from '../components/ui/Button';
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
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-textPrimary dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-textMuted">
            Here's your environmental impact overview
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="primary">
            This Week
          </Button>
          <Button size="sm" variant="outline">
            This Month
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card variant="gradient" className="overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
          <CardBody className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-textMuted mb-1">Today's Impact</p>
                <p className="text-3xl font-bold text-textPrimary dark:text-white mb-2">
                  {carbonSummary.today}
                  <span className="text-lg text-textMuted ml-1">kg CO₂</span>
                </p>
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg w-fit">
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-xs font-semibold text-success">8% better</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card variant="gradient" className="overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16" />
          <CardBody className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-textMuted mb-1">Weekly Total</p>
                <p className="text-3xl font-bold text-textPrimary dark:text-white mb-2">
                  {carbonSummary.week}
                  <span className="text-lg text-textMuted ml-1">kg CO₂</span>
                </p>
                <div className="flex items-center gap-1 px-2 py-1 bg-success/10 rounded-lg w-fit">
                  <TrendingDown className="w-4 h-4 text-success" />
                  <span className="text-xs font-semibold text-success">5% better</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card variant="gradient" className="overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warning/10 rounded-full -mr-16 -mt-16" />
          <CardBody className="relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-textMuted mb-1">Monthly Total</p>
                <p className="text-3xl font-bold text-textPrimary dark:text-white mb-2">
                  {carbonSummary.month}
                  <span className="text-lg text-textMuted ml-1">kg CO₂</span>
                </p>
                <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 rounded-lg w-fit">
                  <TrendingUp className="w-4 h-4 text-warning" />
                  <span className="text-xs font-semibold text-warning">2% higher</span>
                </div>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-warning to-warning/80 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card variant="bordered" className="overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
          <CardBody className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-textMuted mb-1">Monthly Goal</p>
                <p className="text-3xl font-bold text-primary dark:text-primary-light">
                  {progress.toFixed(0)}%
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center shadow-lg animate-float">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-3 bg-card dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-success to-primary-light rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-textMuted">
                {carbonSummary.month} / {carbonSummary.target} kg CO₂
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
          </CardHeader>
          <CardBody>
            <LineChart data={weeklyTrend} color="bg-green-500" />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact by Category</CardTitle>
          </CardHeader>
          <CardBody>
            <BarChart data={categoryBreakdown} />
          </CardBody>
        </Card>
      </div>

      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-eco-lg transition-all transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-success rounded-2xl flex items-center justify-center group-hover:animate-float shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-textPrimary dark:text-white text-center">
                Log Activity
              </span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-eco-lg transition-all transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl flex items-center justify-center group-hover:animate-float shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-textPrimary dark:text-white text-center">
                Set Goals
              </span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-eco-lg transition-all transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center group-hover:animate-float shadow-lg">
                <TrendingDown className="w-7 h-7 text-textPrimary" />
              </div>
              <span className="text-sm font-semibold text-textPrimary dark:text-white text-center">
                View Report
              </span>
            </button>
            <button className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-eco-lg transition-all transform hover:scale-105">
              <div className="w-14 h-14 bg-gradient-to-br from-warning to-danger rounded-2xl flex items-center justify-center group-hover:animate-float shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm font-semibold text-textPrimary dark:text-white text-center">
                Get Tips
              </span>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
