import { useEffect, useState } from 'react';
import { Award, Lock } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../contexts/AuthContext';
import { getUserBadges } from '../services/database';

export function Badges() {
  const { user } = useAuth();
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBadges();
    }
  }, [user]);

  const loadBadges = async () => {
    if (!user) return;

    try {
      const data = await getUserBadges(user.id);
      setBadges(data);
    } catch (error) {
      console.error('Error loading badges:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-textMuted">Loading badges...</div>
      </div>
    );
  }

  const earnedBadges = badges.filter((badge) => badge.earned);
  const lockedBadges = badges.filter((badge) => !badge.earned);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Award className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Badges</h1>
        <Badge variant="success" size="lg">
          {earnedBadges.length} / {badges.length}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earned Badges</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-6 bg-gradient-to-br from-yellow-50 to-green-50 dark:from-yellow-900/20 dark:to-green-900/20 rounded-lg border-2 border-yellow-200 dark:border-yellow-800 transform hover:scale-105 transition-transform"
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {badge.description}
                  </p>
                  <Badge variant="success">Earned {badge.date}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Locked Badges</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedBadges.map((badge) => (
              <div
                key={badge.id}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="text-center">
                  <div className="relative inline-block mb-3">
                    <div className="text-5xl opacity-30">{badge.icon}</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {badge.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {badge.description}
                  </p>
                  {badge.progress !== undefined && (
                    <div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                      <Badge variant="default">{badge.progress}% complete</Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
