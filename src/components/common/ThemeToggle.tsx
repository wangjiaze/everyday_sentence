// src/components/common/ThemeToggle.tsx
import React from 'react';
import { Sun, Moon, Monitor } from 'react-feather';
import { ThemeMode } from '../../types/Theme';

interface ThemeToggleProps {
  currentMode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentMode, onChange }) => {
  const handleToggle = () => {
    // Rotate through the theme modes
    if (currentMode === 'light') {
      onChange('dark');
    } else if (currentMode === 'dark') {
      onChange('system');
    } else {
      onChange('light');
    }
  };
  
  const getIcon = () => {
    switch (currentMode) {
      case 'light':
        return <Sun size={20} />;
      case 'dark':
        return <Moon size={20} />;
      case 'system':
        return <Monitor size={20} />;
    }
  };
  
  const getLabel = () => {
    switch (currentMode) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
    }
  };
  
  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-500 transition-colors"
      aria-label={`Toggle theme mode. Current mode: ${currentMode}`}
    >
      {getIcon()}
      <span className="text-sm">{getLabel()}</span>
    </button>
  );
};

export default ThemeToggle;