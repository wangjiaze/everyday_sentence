// src/context/ThemeContext.tsx
import React, { createContext, ReactNode } from 'react';
import { ThemeMode, ThemeColors, ThemeContext as ThemeContextType } from '../types/Theme';
import { useTheme } from '../hooks/useTheme';

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  colors: {
    background: '#ffffff',
    foreground: '#1a1a1a',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    muted: '#f5f5f5',
    border: '#e0e0e0'
  }
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useTheme();
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};