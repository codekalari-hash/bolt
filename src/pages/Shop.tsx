import { useEffect, useState } from 'react';
import { ShoppingBag, Star, Leaf } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getShopProducts } from '../services/database';

export function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getShopProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-textMuted">Loading shop...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EcoShop</h1>
        </div>
        <Button variant="outline">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Cart (0)
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardBody>
          <div className="flex items-center gap-3">
            <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Every purchase makes a difference
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                All products are eco-friendly and help reduce your carbon footprint
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <CardBody>
              <div className="mb-3">
                <Badge variant="info" size="sm">
                  {product.category}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {product.description}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <Leaf className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Saves {product.carbonSaved}g CO₂/year
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
