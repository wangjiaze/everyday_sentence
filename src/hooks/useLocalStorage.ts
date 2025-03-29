// src/hooks/useLocalStorage.ts
import { useCallback } from 'react';

export const useLocalStorage = () => {
  // 使用 useCallback 包装函数以保持稳定引用
  const setItem = useCallback((key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, []);
 
  const getItem = useCallback((key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  }, []);
 
  const removeItem = useCallback((key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }, []);
 
  return { setItem, getItem, removeItem };
};