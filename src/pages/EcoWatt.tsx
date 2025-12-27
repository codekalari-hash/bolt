import { Zap, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { LineChart, BarChart } from '../components/ui/Chart';
import { ecoWattData } from '../services/dummyData';

export function EcoWatt() {
  const { monthlyUsage, monthlyCost, dailyTrend, appliances } = ecoWattData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoWatt</h1>

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
                  {monthlyUsage} kWh
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
                  ${monthlyCost}
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+5%</p>
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
          <BarChart
            data={appliances.map((a) => ({
              label: a.name,
              value: a.usage,
              color: 'bg-yellow-500',
            }))}
          />
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
    </div>
  );
}
