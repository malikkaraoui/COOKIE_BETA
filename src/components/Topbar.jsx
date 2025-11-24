import React from 'react';
import { Wallet, TrendingUp, Star, Bell, Gift, Zap, Trophy } from 'lucide-react';

export default function Topbar() {
  const percentage = 35;
  const nextReward = "5 nouveaux ingrédients";
  const xpRemaining = 450;

  return (
    <header className="bg-cookie-card border-b border-gray-100 dark:border-gray-800 fixed top-0 left-64 right-0 z-10 transition-colors duration-300 flex flex-col">
      {/* Top Section: KPIs and Profile */}
      <div className="h-20 flex items-center justify-between px-8">
        {/* Left: Breadcrumb or Title */}
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          {/* Placeholder */}
        </div>

        {/* Center: KPIs */}
        <div className="flex items-center gap-4">
          <div className="bg-cookie-bg px-4 py-2 rounded-xl flex items-center gap-3">
            <Wallet className="text-cookie-orange" size={20} />
            <div>
              <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total épargné</div>
              <div className="font-bold text-cookie-text">28 500 €</div>
            </div>
          </div>

          <div className="bg-green-50 px-4 py-2 rounded-xl flex items-center gap-3">
            <TrendingUp className="text-green-600" size={20} />
            <div>
              <div className="text-xs text-green-600 uppercase font-bold tracking-wider">Performance</div>
              <div className="font-bold text-green-600">+8.7%</div>
            </div>
          </div>

          <div className="bg-yellow-50 px-4 py-2 rounded-xl flex items-center gap-3">
            <Star className="text-yellow-600" size={20} fill="currentColor" />
            <div>
              <div className="text-xs text-yellow-600 uppercase font-bold tracking-wider">Étoiles</div>
              <div className="font-bold text-yellow-600">4.5</div>
            </div>
          </div>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
            <div className="text-right">
              <div className="font-bold text-sm text-cookie-text">Chef Chef</div>
              <div className="text-xs text-gray-400">12 recettes</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-cookie-orange-soft flex items-center justify-center text-cookie-orange font-bold">
              CC
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Progression Bar */}
      <div className="px-8 pb-4 group relative">
        <div className="flex justify-between items-end mb-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Trophy size={14} className="text-yellow-500" />
            Maîtrise Culinaire Financière
          </h3>
          <span className="text-sm font-black text-yellow-500">{percentage}%</span>
        </div>

        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.3)] transition-all duration-1000 ease-out relative"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse" />
          </div>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute top-full left-8 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0 pointer-events-none z-20">
          <div className="bg-gray-900 text-white text-xs rounded-xl py-3 px-5 inline-flex items-center gap-5 shadow-2xl border border-gray-800 relative">
            <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 rotate-45 border-t border-l border-gray-800"></div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-yellow-500/20">
                <Gift size={14} className="text-yellow-400" />
              </div>
              <span>Prochain gain : <span className="font-bold text-yellow-400">{nextReward}</span></span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-blue-500/20">
                <Zap size={14} className="text-blue-400" />
              </div>
              <span>dans <span className="font-bold text-white">{xpRemaining} XP</span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
