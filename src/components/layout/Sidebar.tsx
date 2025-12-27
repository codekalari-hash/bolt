import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Scan,
  Package,
  Car,
  Zap,
  UtensilsCrossed,
  Recycle,
  Trophy,
  Users,
  Bell,
  Award,
  ShoppingBag,
  User,
  Settings,
  Leaf,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'EcoScan', path: '/ecoscan', icon: Scan },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'EcoMiles', path: '/ecomiles', icon: Car },
  { name: 'EcoWatt', path: '/ecowatt', icon: Zap },
  { name: 'EcoPlate', path: '/ecoplate', icon: UtensilsCrossed },
  { name: 'EcoCycle', path: '/ecocycle', icon: Recycle },
  { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { name: 'Community', path: '/community', icon: Users },
  { name: 'Alerts', path: '/alerts', icon: Bell },
  { name: 'Badges', path: '/badges', icon: Award },
  { name: 'Shop', path: '/shop', icon: ShoppingBag },
  { name: 'Profile', path: '/profile', icon: User },
  { name: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-30 h-screen w-72 bg-gradient-to-b from-white to-card dark:from-gray-800 dark:to-gray-900 shadow-2xl transition-all duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-eco animate-float">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  EcoSphere
                </h1>
                <p className="text-xs text-textMuted">Track your impact</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pb-4 space-y-2 scrollbar-thin">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg transform scale-[1.02]'
                      : 'text-textPrimary dark:text-gray-300 hover:bg-card dark:hover:bg-gray-800 hover:translate-x-1'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-primary/10 group-hover:bg-primary/20'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-textPrimary dark:text-white">
                  Your Impact
                </p>
                <p className="text-xs text-textMuted">Level 12</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
