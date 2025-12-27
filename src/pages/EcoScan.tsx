import { useState } from 'react';
import { Scan, Upload, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface ScannedItem {
  name: string;
  brand: string;
  carbonScore: number;
  expiryDate: string;
  alternatives: Array<{ name: string; carbonScore: number }>;
}

export function EcoScan() {
  const [scannedItem, setScannedItem] = useState<ScannedItem | null>(null);

  const handleScan = () => {
    setScannedItem({
      name: 'Organic Whole Milk',
      brand: 'GreenFarms',
      carbonScore: 2.1,
      expiryDate: '2025-12-30',
      alternatives: [
        { name: 'Oat Milk Alternative', carbonScore: 0.9 },
        { name: 'Local Dairy Milk', carbonScore: 1.8 },
      ],
    });
  };

  const getCarbonRating = (score: number) => {
    if (score < 1.5) return { rating: 'Excellent', variant: 'success' as const, icon: CheckCircle };
    if (score < 3) return { rating: 'Good', variant: 'info' as const, icon: Leaf };
    if (score < 5) return { rating: 'Moderate', variant: 'warning' as const, icon: AlertCircle };
    return { rating: 'High', variant: 'danger' as const, icon: AlertCircle };
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoScan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Scan Product</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Scan className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                  Scan barcode or upload receipt to get carbon impact
                </p>
                <div className="flex gap-3">
                  <Button onClick={handleScan}>
                    <Scan className="w-4 h-4 mr-2" />
                    Scan Barcode
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      How it works
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                      Scan products to see their carbon footprint, expiry dates, and find
                      eco-friendly alternatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {scannedItem && (
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardBody className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {scannedItem.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{scannedItem.brand}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Carbon Score:
                </span>
                <Badge variant={getCarbonRating(scannedItem.carbonScore).variant}>
                  {scannedItem.carbonScore} kg CO₂
                </Badge>
                <Badge variant={getCarbonRating(scannedItem.carbonScore).variant}>
                  {getCarbonRating(scannedItem.carbonScore).rating}
                </Badge>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expires:
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {scannedItem.expiryDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600 dark:text-green-400">
                    3 days remaining
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Better Alternatives
                </h4>
                <div className="space-y-2">
                  {scannedItem.alternatives.map((alt, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {alt.name}
                        </span>
                      </div>
                      <Badge variant="success">{alt.carbonScore} kg CO₂</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button fullWidth variant="primary">
                  Add to Inventory
                </Button>
                <Button fullWidth variant="outline">
                  View Similar
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[
              { name: 'Organic Whole Milk', score: 2.1, date: '2 hours ago' },
              { name: 'Free-Range Eggs', score: 1.8, date: 'Yesterday' },
              { name: 'Whole Grain Bread', score: 0.9, date: '2 days ago' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
                <Badge variant={getCarbonRating(item.score).variant}>
                  {item.score} kg CO₂
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
