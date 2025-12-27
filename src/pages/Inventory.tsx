import { useState, useEffect } from 'react';
import { Search, AlertTriangle, Package } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { getInventoryItems } from '../services/database';

export function Inventory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadInventory();
    }
  }, [user]);

  const loadInventory = async () => {
    if (!user) return;

    try {
      const data = await getInventoryItems(user.id);
      setItems(data);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Dairy', 'Meat', 'Vegetables', 'Bakery', 'Others'];

  const filteredItems = items.filter(
    (item) =>
      (categoryFilter === 'All' || item.category === categoryFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const expiringItems = items.filter((item) => item.daysUntilExpiry <= 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-textMuted">Loading inventory...</div>
      </div>
    );
  }

  const getExpiryBadge = (days: number) => {
    if (days <= 1) return { variant: 'danger' as const, text: 'Expires soon!' };
    if (days <= 3) return { variant: 'warning' as const, text: `${days} days left` };
    return { variant: 'default' as const, text: `${days} days left` };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory</h1>
        <Button>
          <Package className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {expiringItems.length > 0 && (
        <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <CardBody>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-300">
                  {expiringItems.length} item(s) expiring soon
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-400 mt-1">
                  {expiringItems.map((item) => item.name).join(', ')}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  size="sm"
                  variant={categoryFilter === category ? 'primary' : 'outline'}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardBody>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                </div>
                <Badge variant={getExpiryBadge(item.daysUntilExpiry).variant}>
                  {getExpiryBadge(item.daysUntilExpiry).text}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Quantity:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Carbon:</span>
                  <Badge variant="info">{item.carbonScore} kg CO₂</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Expires:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.expiryDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" fullWidth>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" fullWidth>
                  Remove
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No items found</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
