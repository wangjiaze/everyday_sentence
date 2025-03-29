// src/hooks/useQuotes.ts
import { useContext, useCallback } from 'react';
import { QuotesContext } from '../context/QuotesContext';
import { useLocalStorage } from './useLocalStorage';
import { Quote } from '../types/Quote';
import { v4 as uuidv4 } from 'uuid';

export const useQuotes = () => {
  const context = useContext(QuotesContext);
  const { setItem, getItem } = useLocalStorage();
  
  if (!context) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  
  const { state, dispatch } = context;
  
  const fetchQuotes = useCallback(async () => {
    // 避免重复加载
    if (state.quotes.length > 0 && !state.isLoading) {
      return;
    }
    
    try {
      dispatch({ type: 'FETCH_QUOTES_START' });
      
      // First try to get from local storage
      const cachedQuotes = getItem('quotes');
      
      if (cachedQuotes) {
        dispatch({ 
          type: 'FETCH_QUOTES_SUCCESS', 
          payload: JSON.parse(cachedQuotes) 
        });
        return;
      }
      
      // Fallback to default quotes
      const defaultQuotes: Quote[] = [
        {
          id: uuidv4(),
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          tags: ["work", "passion"],
          language: "en",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "In the middle of difficulty lies opportunity.",
          author: "Albert Einstein",
          tags: ["opportunity", "challenge"],
          language: "en",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        
        // 添加更多的中文名言
        {
          id: uuidv4(),
          text: "万事开头难，但更难的是坚持到底。",
          author: "佚名",
          tags: ["persistence", "beginning"],
          language: "zh",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "Life is what happens when you're busy making other plans.",
          author: "John Lennon",
          tags: ["life", "planning"],
          language: "en",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "生活中最重要的事情是明确什么对你最重要，然后有勇气说不去做其他的事。",
          author: "史蒂夫·乔布斯",
          tags: ["priority", "courage", "focus"],
          language: "zh",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "不要把命运的齿轮，交在别人的手里。",
          author: "罗曼·罗兰",
          tags: ["destiny", "control"],
          language: "zh",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "The best way to predict the future is to create it.",
          author: "Peter Drucker",
          tags: ["future", "creation", "motivation"],
          language: "en",
          addedAt: new Date().toISOString(),
          isFavorite: false
        },
        {
          id: uuidv4(),
          text: "我们终将浮沉，不如沉着。",
          author: "张嘉佳",
          tags: ["calmness", "life"],
          language: "zh",
          addedAt: new Date().toISOString(),
          isFavorite: false
        }
      ];
      
      setItem('quotes', JSON.stringify(defaultQuotes));
      
      dispatch({ 
        type: 'FETCH_QUOTES_SUCCESS', 
        payload: defaultQuotes 
      });
    } catch (error) {
      dispatch({ 
        type: 'FETCH_QUOTES_FAILURE', 
        payload: error instanceof Error ? error.message : 'Failed to fetch quotes' 
      });
    }
  }, [dispatch, getItem, setItem, state.quotes.length, state.isLoading]);
  
  const getRandomQuote = useCallback(() => {
    if (state.quotes.length === 0) {
      return;
    }
    
    // Filter quotes by selected language
    const filteredQuotes = state.quotes.filter(
      (quote: Quote) => quote.language === state.language
    );
    
    if (filteredQuotes.length === 0) {
      // If no quotes in selected language, use all quotes
      const randomIndex = Math.floor(Math.random() * state.quotes.length);
      dispatch({ type: 'SET_CURRENT_QUOTE', payload: state.quotes[randomIndex] });
    } else {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      dispatch({ type: 'SET_CURRENT_QUOTE', payload: filteredQuotes[randomIndex] });
    }
  }, [state.quotes, state.language, dispatch]);
  
  const toggleFavorite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    
    // Update local storage
    const updatedQuotes = state.quotes.map((quote: Quote) => 
      quote.id === id ? { ...quote, isFavorite: !quote.isFavorite } : quote
    );
    
    setItem('quotes', JSON.stringify(updatedQuotes));
    
    // Update favorites list
    const quote = state.quotes.find((q: Quote) => q.id === id);
    if (quote) {
      const favorites = state.favorites.includes(id)
        ? state.favorites.filter((favId: string) => favId !== id)
        : [...state.favorites, id];
        
      setItem('favorites', JSON.stringify(favorites));
      dispatch({ type: 'SET_FAVORITES', payload: favorites });
    }
  }, [state.quotes, state.favorites, dispatch, setItem]);
  
  const setLanguagePreference = useCallback((lang: 'en' | 'zh' | 'fr') => {
    dispatch({ type: 'SET_LANGUAGE', payload: lang });
    setItem('language', lang);
    
    // Get a new quote in the selected language
    getRandomQuote();
  }, [dispatch, getRandomQuote, setItem]);
  
  const addCustomQuote = useCallback((quote: Omit<Quote, 'id' | 'addedAt'>) => {
    const newQuote: Quote = {
      ...quote,
      id: uuidv4(),
      addedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_QUOTE', payload: newQuote });
    
    // Update local storage
    const updatedQuotes = [...state.quotes, newQuote];
    setItem('quotes', JSON.stringify(updatedQuotes));
  }, [state.quotes, dispatch, setItem]);
  
  const deleteQuote = useCallback((id: string) => {
    // 更新状态
    dispatch({ type: 'DELETE_QUOTE', payload: id });
    
    // 更新本地存储
    const updatedQuotes = state.quotes.filter((quote: Quote) => quote.id !== id);
    setItem('quotes', JSON.stringify(updatedQuotes));
    
    // 如果删除的是当前显示的名言，则获取一个新的
    if (state.currentQuote && state.currentQuote.id === id) {
      getRandomQuote();
    }
  }, [state.quotes, state.currentQuote, dispatch, setItem, getRandomQuote]);

  const importQuotes = useCallback((quotesData: {text: string, author: string, language: 'en' | 'zh' | 'fr'}[]) => {
    const newQuotes = quotesData.map(item => ({
      id: uuidv4(),
      text: item.text,
      author: item.author,
      language: item.language,
      tags: [],
      addedAt: new Date().toISOString(),
      isFavorite: false
    }));
    
    const updatedQuotes = [...state.quotes, ...newQuotes];
    dispatch({ type: 'FETCH_QUOTES_SUCCESS', payload: updatedQuotes });
    setItem('quotes', JSON.stringify(updatedQuotes));
  }, [state.quotes, dispatch, setItem]);




  return {
    state,
    fetchQuotes,
    getRandomQuote,
    toggleFavorite,
    setLanguagePreference,
    addCustomQuote,
    deleteQuote,
    importQuotes
  };
};