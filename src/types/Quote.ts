// src/types/Quote.ts
export interface Quote {
    id: string;
    text: string;
    author: string;
    source?: string;
    tags: string[];
    language: 'en' | 'zh' | 'fr';
    addedAt: string;
    isFavorite: boolean;
  }
  
  export interface QuotesState {
    quotes: Quote[];
    favorites: string[];
    currentQuote: Quote | null;
    isLoading: boolean;
    error: string | null;
    language: 'en' | 'zh' | 'fr';
  }
  
  export interface QuotesContextType {
    state: QuotesState;
    fetchQuotes: () => Promise<void>;
    getRandomQuote: () => void;
    toggleFavorite: (id: string) => void;
    setLanguagePreference: (lang: 'en' | 'zh' | 'fr') => void;
    addCustomQuote: (quote: Omit<Quote, 'id' | 'addedAt'>) => void;
  } 
