import { Settings as SettingsIcon, Bell, Globe, Shield, Palette } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../contexts/ThemeContext';

export function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-gray-900 dark:text-white" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <CardTitle>Appearance</CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Theme</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your preferred theme
              </p>
            </div>
            <Button onClick={toggleTheme} variant="outline">
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <CardTitle>Notifications</CardTitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Expiry Alerts
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified when items are about to expire
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Goal Achievements
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Celebrate when you reach your goals
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Community Updates
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Stay updated with community activities
              </p>
            </div>
            <input
              type="checkbox"
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <CardTitle>Goals & Preferences</CardTitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Daily Carbon Goal (kg CO₂)"
            type="number"
            defaultValue="5.0"
            step="0.1"
          />
          <Input
            label="Weekly Carbon Goal (kg CO₂)"
            type="number"
            defaultValue="35.0"
            step="0.1"
          />
          <Input
            label="Monthly Carbon Goal (kg CO₂)"
            type="number"
            defaultValue="150.0"
            step="0.1"
          />
          <Button>Save Goals</Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <CardTitle>Account Security</CardTitle>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <Button variant="outline" fullWidth>
            Change Password
          </Button>
          <Button variant="outline" fullWidth>
            Enable Two-Factor Authentication
          </Button>
          <Button variant="danger" fullWidth>
            Delete Account
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
