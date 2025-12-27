import { Recycle, Plus, TrendingUp } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DonutChart } from '../components/ui/Chart';
import { ecoCycleData } from '../services/dummyData';

export function EcoCycle() {
  const { monthlyWaste, recyclingRate, wasteCategories, recentActions } = ecoCycleData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoCycle</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Log Waste
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Waste</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {monthlyWaste} kg
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Recycling Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {recyclingRate}%
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+12%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Categories</CardTitle>
          </CardHeader>
          <CardBody>
            <DonutChart
              data={wasteCategories.map((item) => ({
                label: item.label,
                value: item.value,
                color: item.color.replace('bg-', ''),
              }))}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {recentActions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {action.type}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {action.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        action.type === 'Recycling'
                          ? 'success'
                          : action.type === 'Composting'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {action.weight} kg
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.items}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
