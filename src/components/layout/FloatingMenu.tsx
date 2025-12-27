import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Package,
  Car,
  UtensilsCrossed,
  Recycle,
  Users,
  Bell,
  Award,
  ShoppingBag,
  Settings,
} from 'lucide-react';

const menuItems = [
  { name: 'Inventory', path: '/inventory', icon: Package, color: 'from-blue-500 to-blue-600' },
  { name: 'EcoMiles', path: '/ecomiles', icon: Car, color: 'from-cyan-500 to-cyan-600' },
  { name: 'EcoPlate', path: '/ecoplate', icon: UtensilsCrossed, color: 'from-orange-500 to-orange-600' },
  { name: 'EcoCycle', path: '/ecocycle', icon: Recycle, color: 'from-green-500 to-green-600' },
  { name: 'Community', path: '/community', icon: Users, color: 'from-purple-500 to-purple-600' },
  { name: 'Alerts', path: '/alerts', icon: Bell, color: 'from-red-500 to-red-600' },
  { name: 'Badges', path: '/badges', icon: Award, color: 'from-yellow-500 to-yellow-600' },
  { name: 'Shop', path: '/shop', icon: ShoppingBag, color: 'from-pink-500 to-pink-600' },
  { name: 'Settings', path: '/settings', icon: Settings, color: 'from-gray-500 to-gray-600' },
];

export function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-4 top-20 bottom-24 z-50 animate-slide-up">
            <div className="h-full bg-gradient-to-br from-white via-emerald-50/30 to-cyan-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 backdrop-blur-xl rounded-3xl shadow-2xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  More Features
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {menuItems.map((item, index) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all`}>
                      <item.icon className="w-7 h-7 text-white" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-30 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all group"
      >
        <Menu className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
      </button>
    </>
  );
}
