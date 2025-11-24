import React from 'react';
import { Wallet, TrendingUp, Star, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-20 bg-cookie-card border-b border-gray-100 dark:border-gray-800 fixed top-0 left-64 right-0 flex items-center justify-between px-8 z-10 transition-colors duration-300">
      {/* Left: Breadcrumb or Title (Optional, empty for now as per design) */}
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {/* Placeholder for breadcrumbs if needed */}
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
    </header>
  );
}
