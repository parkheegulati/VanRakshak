import { NavLink } from 'react-router-dom';
import { Home, Map as MapIcon, ShieldAlert, GitCommit, BarChart3, FileText, UserSquare } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/map', label: 'Claims Map', icon: MapIcon },
  { path: '/alerts', label: 'AI Alerts', icon: ShieldAlert },
  { path: '/track', label: 'Track Claim', icon: GitCommit },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/file-claim', label: 'File Claim', icon: FileText },
  { path: '/officer', label: 'Officer Login', icon: UserSquare },
];

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[var(--color-off-white)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[var(--color-forest-green)] text-white shadow-xl">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-amber-accent)] font-sora">
            VanRakshak
          </h1>
          <p className="text-sm opacity-80 mt-1">FRA WebGIS Platform</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto pb-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--color-earth-brown)] text-white shadow-md'
                      : 'hover:bg-white/10 text-white/80 hover:text-white'
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-y-auto md:pb-0 pb-20">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[var(--color-forest-green)] text-white flex justify-around p-3 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.1)] z-50">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? 'text-[var(--color-amber-accent)]' : 'text-white/60 hover:text-white'
                }`
              }
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
