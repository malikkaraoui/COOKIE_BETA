import { useEffect } from 'react'
import React, { useState } from 'react';
import './App.css';
import AppLayout from './components/AppLayout';
import Marmite from './pages/Marmite';
import EpicerieFine from './pages/EpicerieFine';
import RecettesPopulaires from './pages/RecettesPopulaires';
import MesRecettes from './pages/MesRecettes';

function App() {
  const [activeTab, setActiveTab] = useState('marmite');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (activeTab) {
      case 'marmite':
        return <Marmite />;
      case 'epicerie':
        return <EpicerieFine />;
      case 'recettes':
        return <RecettesPopulaires />;
      case 'mes-recettes':
        return <MesRecettes />;
      default:
        return <Marmite />;
    }
  };

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isDarkMode={isDarkMode}
      toggleTheme={toggleTheme}
    >
      {renderContent()}
    </AppLayout>
  );
}

export default App;
