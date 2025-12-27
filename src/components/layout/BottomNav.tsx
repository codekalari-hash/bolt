import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Scan,
  Zap,
  Trophy,
  User,
} from 'lucide-react';

const mainNavItems = [
  { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Scan', path: '/ecoscan', icon: Scan },
  { name: 'Track', path: '/ecowatt', icon: Zap },
  { name: 'Rank', path: '/leaderboard', icon: Trophy },
  { name: 'You', path: '/profile', icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 pb-safe">
      <div className="flex items-center justify-around px-2 py-2">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 relative group min-w-[60px] ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-2xl animate-pulse" />
                )}
                <div className="relative">
                  <item.icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? 'scale-110'
                        : 'group-active:scale-95'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold transition-all ${
                  isActive ? 'opacity-100' : 'opacity-70'
                }`}>
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
