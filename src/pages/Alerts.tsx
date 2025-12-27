import { Bell, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { alertsData } from '../services/dummyData';

export function Alerts() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'danger':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getAlertBg = (type: string, read: boolean) => {
    if (read) return 'bg-gray-50 dark:bg-gray-800';
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800';
      case 'danger':
        return 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800';
    }
  };

  const unreadCount = alertsData.filter((alert) => !alert.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-gray-900 dark:text-white" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Alerts</h1>
          {unreadCount > 0 && (
            <Badge variant="danger" size="lg">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Mark All Read
          </Button>
          <Button size="sm" variant="ghost">
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {alertsData.map((alert) => (
          <Card
            key={alert.id}
            className={`${getAlertBg(alert.type, alert.read)} ${
              !alert.read ? 'ring-2 ring-offset-2 ring-gray-200 dark:ring-gray-700' : ''
            }`}
          >
            <CardBody>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {alert.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {alert.message}
                      </p>
                    </div>
                    {!alert.read && (
                      <div className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 ml-2 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {alert.date}
                    </span>
                    <Button size="sm" variant="ghost">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {alertsData.length === 0 && (
        <Card>
          <CardBody className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No alerts at the moment</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
