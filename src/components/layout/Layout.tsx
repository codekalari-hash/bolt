import { Outlet, Navigate } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingMenu } from './FloatingMenu';
import { Header } from './Header';
import { InstallPrompt } from '../InstallPrompt';
import { useAuth } from '../../contexts/AuthContext';

export function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      <Header />
      <FloatingMenu />

      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-20 pt-16">
        <div className="px-4 py-6 max-w-2xl mx-auto">
          <Outlet />
        </div>
      </main>

      <BottomNav />
      <InstallPrompt />
    </div>
  );
}
