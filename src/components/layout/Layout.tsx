import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FloatingMenu } from './FloatingMenu';
import { Header } from './Header';
import { InstallPrompt } from '../InstallPrompt';

export function Layout() {
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
