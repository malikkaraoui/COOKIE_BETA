import React from 'react';
import { LayoutDashboard, ShoppingBasket, Trophy, ChefHat, Settings, LogOut, Sun, Moon } from 'lucide-react';
import Logo from './Logo';

export default function Sidebar({ activeTab, onTabChange, isDarkMode, toggleTheme }) {
  const menuItems = [
    { id: 'marmite', label: 'La Marmite', sub: 'Épargne communautaire', icon: LayoutDashboard },
    { id: 'epicerie', label: 'Épicerie Fine', sub: '30 ingrédients', icon: ShoppingBasket },
    { id: 'recettes', label: 'Recettes Populaires', sub: 'Best-of communauté', icon: Trophy },
    { id: 'mes-recettes', label: 'Mes Recettes', sub: 'Mes créations', icon: ChefHat },
  ];

  return (
    <aside className="w-64 bg-cookie-card h-screen fixed left-0 top-0 border-r border-gray-100 dark:border-gray-800 flex flex-col z-20 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-gray-50">
        <div className="flex-shrink-0">
          <Logo size={48} />
        </div>
        <div>
          <h1 className="font-bold text-lg text-cookie-text leading-tight">$COOKIE</h1>
          <p className="text-xs text-gray-400">Votre épargne communautaire</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group flex items-start gap-3
                ${activeTab === item.id
                  ? 'bg-cookie-orange text-white shadow-lg shadow-orange-200'
                  : 'text-gray-500 dark:text-gray-300 hover:bg-cookie-bg hover:text-cookie-orange dark:hover:text-cookie-orange dark:hover:bg-gray-800'
                }`}
            >
              <Icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <div>
                <div className={`font-bold ${activeTab === item.id ? 'text-white' : 'text-gray-700 group-hover:text-cookie-orange'}`}>
                  {item.label}
                </div>
                <div className={`text-xs ${activeTab === item.id ? 'text-orange-100' : 'text-gray-400'}`}>
                  {item.sub}
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-gray-50 dark:border-gray-800">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 text-gray-400 hover:text-cookie-orange px-4 py-2 w-full transition-colors mb-2"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="text-sm font-medium">
            {isDarkMode ? 'Mode clair' : 'Mode sombre'}
          </span>
        </button>

        <button className="flex items-center gap-3 text-gray-400 hover:text-cookie-orange px-4 py-2 w-full transition-colors">
          <Settings size={20} />
          <span className="text-sm font-medium">Paramètres</span>
        </button>
        <button className="flex items-center gap-3 text-gray-400 hover:text-red-500 px-4 py-2 w-full transition-colors mt-1">
          <LogOut size={20} />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
