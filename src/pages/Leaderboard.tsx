import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardBody, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { leaderboardData } from '../services/dummyData';

export function Leaderboard() {
  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaderboardData.slice(0, 3).map((user) => (
          <Card
            key={user.rank}
            className={`${
              user.rank === 1 ? 'ring-2 ring-yellow-500' : ''
            } transform hover:scale-105 transition-transform`}
          >
            <CardBody>
              <div className="text-center">
                <div className="mb-3">
                  <Trophy className={`w-12 h-12 mx-auto ${getMedalColor(user.rank)}`} />
                </div>
                <div className="text-4xl mb-2">{user.avatar}</div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {user.score}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">points</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  {getChangeIcon(user.change)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {Math.abs(user.change)} from last week
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Rankings</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                  user.name === 'You'
                    ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      user.rank <= 3
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {user.rank}
                  </div>
                  <div className="text-2xl">{user.avatar}</div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {getChangeIcon(user.change)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {user.change > 0 ? '+' : ''}
                        {user.change} positions
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="success" size="lg">
                  {user.score}
                </Badge>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
