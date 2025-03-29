// src/hooks/useTheme.ts
import { useState, useEffect, useCallback } from 'react';
import { ThemeMode, ThemeColors } from '../types/Theme';
import { useLocalStorage } from './useLocalStorage';

const lightColors: ThemeColors = {
  background: '#ffffff',
  foreground: '#1a1a1a',
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  muted: '#f5f5f5',
  border: '#e0e0e0'
};

const darkColors: ThemeColors = {
  background: '#1a1a2e',
  foreground: '#ffffff',
  primary: '#3498db',
  secondary: '#2ecc71',
  accent: '#e74c3c',
  muted: '#252525',
  border: '#404040'
};

export const useTheme = () => {
  const { getItem, setItem } = useLocalStorage();
  const savedTheme = getItem('theme') as ThemeMode | null;
  const [mode, setMode] = useState<ThemeMode>(savedTheme || 'system');
  const [colors, setColors] = useState<ThemeColors>(lightColors);
  
  const applyTheme = useCallback((themeMode: ThemeMode) => {
    // Determine if should use dark mode
    let shouldUseDarkMode = false;
    
    if (themeMode === 'dark') {
      shouldUseDarkMode = true;
    } else if (themeMode === 'system') {
      shouldUseDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme colors
    const newColors = shouldUseDarkMode ? darkColors : lightColors;
    setColors(newColors);
    
    // Apply to document
    document.documentElement.setAttribute('data-theme', shouldUseDarkMode ? 'dark' : 'light');
    
    // Set meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newColors.background);
    }
  }, []);
  
  const changeTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    setItem('theme', newMode);
    applyTheme(newMode);
  }, [applyTheme, setItem]);
  
  // Listen for system theme changes
  useEffect(() => {
    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        applyTheme('system');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [mode, applyTheme]);
  
  // Apply theme on initial load
  useEffect(() => {
    applyTheme(mode);
  }, [mode, applyTheme]);
  
  return { mode, setMode: changeTheme, colors };
};