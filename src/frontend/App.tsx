import React from 'react';
import { usePortfolioStore } from './stores/usePortfolioStore';
import { Briefcase, Code, User, Mail, Moon, Sun, Terminal } from 'lucide-react';
import { cn } from './lib/utils';

export const App: React.FC = () => {
  const { activeTab, setActiveTab, isDarkMode, toggleDarkMode } = usePortfolioStore();

  return (
    <div className={cn("min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans", isDarkMode ? "dark" : "")}>
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-6 h-6 text-emerald-400" />
            <span className="font-bold text-lg tracking-tight">POSTLAIN <span className="text-xs text-slate-400 font-mono font-normal">| Ngô Phúc</span></span>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'projects', label: 'Projects', icon: Code },
              { id: 'contact', label: 'Contact', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-slate-800 text-emerald-400 shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={toggleDarkMode}
              className="p-2 ml-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {activeTab === 'overview' && (
          <section className="space-y-6">
            <div className="p-8 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-emerald-400 font-mono text-sm tracking-wider uppercase font-semibold">Engineering Portfolio</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-white">
                Ngô Phúc (POSTLAIN)
              </h1>
              <p className="text-slate-300 mt-4 max-w-2xl text-base sm:text-lg leading-relaxed">
                Fullstack Software Engineer & Music Producer. Chuyên sâu về kiến trúc Edge Computing (Cloudflare Workers), Modern Frontend (React, Tailwind, Zustand) và hệ thống cơ sở dữ liệu typesafe (Hono, Drizzle ORM, Zod).
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500 font-mono">
        © 2026 Ngô Phúc (POSTLAIN). Governed by Aileron Protocol & UI/UX Pro Max.
      </footer>
    </div>
  );
};
