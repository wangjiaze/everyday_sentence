// src/pages/Favorites.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuotes } from '../hooks/useQuotes';
import Header from '../components/layout/Header';
import QuoteCollection from '../components/quotes/QuoteCollection';

const Favorites: React.FC = () => {
  const { state, fetchQuotes } = useQuotes();
  
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);
  
  const favoriteQuotes = state.quotes.filter(quote => quote.isFavorite);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Favorite Quotes</h1>
        
        {favoriteQuotes.length > 0 ? (
          <QuoteCollection quotes={favoriteQuotes} />
        ) : (
          <div className="text-center py-12">
            <p className="mb-4">You don't have any favorite quotes yet.</p>
            <Link to="/" className="text-primary hover:underline">
              Go back to discover quotes
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;