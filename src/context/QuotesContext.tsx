// src/context/QuotesContext.tsx
import React, { createContext, useReducer, ReactNode, useEffect } from 'react';
import { Quote, QuotesState } from '../types/Quote';
import { useLocalStorage } from '../hooks/useLocalStorage';

type QuotesAction = 
  | { type: 'FETCH_QUOTES_START' }
  | { type: 'FETCH_QUOTES_SUCCESS', payload: Quote[] }
  | { type: 'FETCH_QUOTES_FAILURE', payload: string }
  | { type: 'SET_CURRENT_QUOTE', payload: Quote }
  | { type: 'TOGGLE_FAVORITE', payload: string }
  | { type: 'SET_FAVORITES', payload: string[] }
  | { type: 'SET_LANGUAGE', payload: 'en' | 'zh' | 'fr' }
  | { type: 'ADD_QUOTE', payload: Quote }
  | { type: 'DELETE_QUOTE', payload: string }; 

interface QuotesContextProps {
  state: QuotesState;
  dispatch: React.Dispatch<QuotesAction>;
}

const initialState: QuotesState = {
  quotes: [],
  favorites: [],
  currentQuote: null,
  isLoading: false,
  error: null,
  language: 'zh'
};

export const QuotesContext = createContext<QuotesContextProps | undefined>(undefined);

const quotesReducer = (state: QuotesState, action: QuotesAction): QuotesState => {
  switch (action.type) {
    case 'FETCH_QUOTES_START':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_QUOTES_SUCCESS':
      return {
        ...state,
        quotes: action.payload,
        isLoading: false
      };
    case 'FETCH_QUOTES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'SET_CURRENT_QUOTE':
      return {
        ...state,
        currentQuote: action.payload
      };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        quotes: state.quotes.map(quote => 
          quote.id === action.payload 
            ? { ...quote, isFavorite: !quote.isFavorite } 
            : quote
        ),
        currentQuote: state.currentQuote?.id === action.payload
          ? { ...state.currentQuote, isFavorite: !state.currentQuote.isFavorite }
          : state.currentQuote
      };
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.payload
      };
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload
      };
    case 'ADD_QUOTE':
      return {
        ...state,
        quotes: [...state.quotes, action.payload]
      };
    case 'DELETE_QUOTE':
      return {
        ...state,
        quotes: state.quotes.filter(quote => quote.id !== action.payload),
        favorites: state.favorites.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};

interface QuotesProviderProps {
  children: ReactNode;
}

export const QuotesProvider: React.FC<QuotesProviderProps> = ({ children }) => {
  const { getItem } = useLocalStorage();
  const [state, dispatch] = useReducer(quotesReducer, initialState);
  
  // Load saved preferences on initial render
  useEffect(() => {
    const savedFavorites = getItem('favorites');
    if (savedFavorites) {
      dispatch({ type: 'SET_FAVORITES', payload: JSON.parse(savedFavorites) });
    }
    
    const savedLanguage = getItem('language') as 'en' | 'zh' | 'fr' | null;
    if (savedLanguage) {
      dispatch({ type: 'SET_LANGUAGE', payload: savedLanguage });
    }
  }, [getItem]);
  
  return (
    <QuotesContext.Provider value={{ state, dispatch }}>
      {children}
    </QuotesContext.Provider>
  );
};