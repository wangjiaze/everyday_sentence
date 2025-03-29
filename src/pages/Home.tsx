// src/pages/Home.tsx
import React, { useEffect, useContext } from 'react';
import { useQuotes } from '../hooks/useQuotes';
import { UserContext } from '../context/UserContext';
import Screensaver from '../components/Screensaver';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home: React.FC = () => {
  const { state, fetchQuotes, getRandomQuote } = useQuotes();
  const { user } = useContext(UserContext);

  useEffect(() => {
    // 只在组件挂载时获取引言
    fetchQuotes().then(() => {
      if (state.quotes.length > 0 && !state.currentQuote) {
        getRandomQuote();
      }
    });
  }, [fetchQuotes, state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Screensaver />
      </main>
      <Footer />
    </div>
  );
};

export default Home;