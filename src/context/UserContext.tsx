// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types/User';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserContextProps {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  updateUserPreferences: () => {}
});

export const UserProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // 问题可能在这个useEffect
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setAuthState({
            user: parsedUser,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (e) {
          removeItem('user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Invalid user data'
          });
        }
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    };

    checkAuth();
    // 添加依赖数组，防止无限循环
  }, [getItem, removeItem]); // 只在这些函数引用变化时重新运行

  // 登录功能（简化版）
  const login = async (email: string, password: string) => {
    // 真实应用中应该调用API
    // 这里仅作为演示
    const mockUser: User = {
      id: '1',
      username: 'user',
      email,
      preferences: {
        theme: 'system',
        language: 'en',
        notificationsEnabled: false,
        notificationTime: null,
        autoChangeInterval: 30
      },
      stats: {
        favoritesCount: 0,
        lastActive: new Date().toISOString(),
        customQuotesCount: 0
      }
    };

    setItem('user', JSON.stringify(mockUser));
    setAuthState({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
  };

  // 更新用户首选项
  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (!authState.user) return;

    // 创建一个更新后的用户对象
    const updatedUser = {
      ...authState.user,
      preferences: {
        ...authState.user.preferences,
        ...preferences
      }
    };

    // 更新本地存储
    setItem('user', JSON.stringify(updatedUser));
    
    // 更新状态
    setAuthState({
      ...authState,
      user: updatedUser
    });
  };

  // 登出功能
  const logout = () => {
    removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  return (
    <UserContext.Provider value={{
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      login,
      logout,
      updateUserPreferences
    }}>
      {children}
    </UserContext.Provider>
  );
};