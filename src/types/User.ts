 
// src/types/User.ts
import { ThemeMode } from './Theme';

export interface User {
  id: string;
  username: string;
  email: string;
  preferences: {
    theme: ThemeMode;
    language: 'en' | 'zh' | 'fr';
    notificationsEnabled: boolean;
    notificationTime: string | null;
    autoChangeInterval: number | null;
  };
  stats: {
    favoritesCount: number;
    lastActive: string;
    customQuotesCount: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}