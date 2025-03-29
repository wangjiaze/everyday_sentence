// src/components/Screensaver.tsx
import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useQuotes } from '../hooks/useQuotes';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import QuoteCard from './quotes/QuoteCard';
import LoadingSpinner from './common/LoadingSpinner';
import ThemeToggle from './common/ThemeToggle';
import { Quote } from '../types/Quote';

const gradientAnimation = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Screensaver: React.FC = () => {
  const { state, getRandomQuote, toggleFavorite } = useQuotes();
  const { colors, mode, setMode } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  const [isActive, setIsActive] = useState(true);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  
  // Check for user inactivity
  useEffect(() => {
    const activityHandler = () => {
      setIsActive(true);
      setLastActivity(Date.now());
    };
    
    const inactivityCheck = setInterval(() => {
      if (Date.now() - lastActivity > 60000) { // 1 minute
        setIsActive(false);
      }
    }, 10000); // Check every 10 seconds
    
    // Set up event listeners for user activity
    const events = ['mousedown', 'touchstart', 'mousemove', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, activityHandler);
    });
    
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, activityHandler);
      });
      clearInterval(inactivityCheck);
    };
  }, [lastActivity]);
  
  // Auto change quotes based on user preferences
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (user?.preferences.autoChangeInterval && isActive) {
      interval = setInterval(() => {
        getRandomQuote();
      }, user.preferences.autoChangeInterval * 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user, isActive, getRandomQuote]);
  
  // Handle wake lock (prevent screen from sleeping)
  useEffect(() => {
    let wakeLock: any = null;
    
    const requestWakeLock = async () => {
      try {
        // @ts-ignore - TypeScript doesn't know about the Wake Lock API yet
        if ('wakeLock' in navigator) {
          // @ts-ignore
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch (err) {
        console.error('Wake Lock error:', err);
      }
    };
    
    if (isActive) {
      requestWakeLock();
    }
    
    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [isActive]);
  
  // Handle share functionality
  const handleShare = async () => {
    if (!state.currentQuote) return;
    
    const shareData = {
      title: 'Vancouver Quotes',
      text: `"${state.currentQuote.text}" — ${state.currentQuote.author}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        alert('Quote copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const getQuoteBackground = (quote: Quote) => {
    // 根据语言或情感选择不同的渐变背景
    if (quote.language === 'zh') {
      return 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)';
    } else if (quote.language === 'en') {
      return 'linear-gradient(135deg, #134e5e, #71b280, #2c3e50)';
    } else {
      return 'linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)';
    }
  };

  return (
    <>
      <style>{gradientAnimation}</style>
      
      <div 
        className="screensaver"
        style={{ 
          background: state.currentQuote ? getQuoteBackground(state.currentQuote) : colors.background,
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 1.5s ease'
        }}
        onClick={() => getRandomQuote()}
      >
        <div className="screensaver__controls" style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10
        }}>
          <ThemeToggle currentMode={mode} onChange={setMode} />
        </div>
        
        {state.isLoading ? (
          <LoadingSpinner size="large" />
        ) : state.currentQuote ? (
          <QuoteCard 
            quote={state.currentQuote} 
            onFavoriteToggle={toggleFavorite}
            onShare={handleShare}
          />
        ) : (
          <motion.div 
            className="screensaver__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              maxWidth: '80%'
            }}
          >
            <p style={{ fontSize: '1.25rem' }}>
              Tap anywhere to see an inspiring quote
            </p>
          </motion.div>
        )}
        
        <div className="screensaver__instructions" style={{
          position: 'absolute',
          bottom: '1rem',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          <p>Tap to change quote</p>
        </div>
      </div>
    </>
  );
};

export default Screensaver;