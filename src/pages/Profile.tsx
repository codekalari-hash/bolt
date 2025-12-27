import { User, Award, TrendingDown, Calendar, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { userData } from '../services/dummyData';

export function Profile() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="space-y-6 pb-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
          Profile
        </h1>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardBody>
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {userData.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.email}</p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="success" size="lg">
                  Level {userData.level}
                </Badge>
                <Badge variant="info" size="lg">
                  Rank #{userData.rank}
                </Badge>
              </div>
              <Button fullWidth>Edit Profile</Button>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stats Overview</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Carbon Saved
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.totalCarbonSaved} kg
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Member Since
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.joinDate}
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Current Level
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {userData.level}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Global Rank
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  #{userData.rank}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Goals</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Daily Target
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData.goals.daily} kg CO₂
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Weekly Target
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData.goals.weekly} kg CO₂
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Monthly Target
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData.goals.monthly} kg CO₂
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
