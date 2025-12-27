import { Car, Plus, TrendingDown } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DonutChart } from '../components/ui/Chart';
import { ecoMilesData } from '../services/dummyData';

export function EcoMiles() {
  const { weeklyDistance, weeklyEmissions, trips, modeBreakdown } = ecoMilesData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoMiles</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Log Trip
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Distance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weeklyDistance} km
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Emissions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {weeklyEmissions} kg
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Eco Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">72%</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transport Mode Breakdown</CardTitle>
          </CardHeader>
          <CardBody>
            <DonutChart
              data={modeBreakdown.map((item) => ({
                label: item.label,
                value: item.value,
                color: item.color.replace('bg-', ''),
              }))}
            />
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Trips</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {trip.from} → {trip.to}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{trip.date}</p>
                    </div>
                    <Badge variant={trip.emissions === 0 ? 'success' : 'warning'}>
                      {trip.mode}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {trip.distance} km
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {trip.emissions} kg CO₂
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
