// src/components/quotes/QuoteCard.tsx
import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share, Calendar, Clock } from 'react-feather';
import { ThemeContext } from '../../context/ThemeContext';
import { Quote } from '../../types/Quote';
import { formatDate } from '../../utils/dateFormatter';

interface QuoteCardProps {
  quote: Quote;
  onFavoriteToggle: (id: string) => void;
  onShare?: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ 
  quote, 
  onFavoriteToggle,
  onShare
}) => {
  const { colors } = useContext(ThemeContext);
  const { id, text, author, addedAt, isFavorite } = quote;
  
  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.3, duration: 0.5 } }
  };
  
  const authorVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.6, duration: 0.5 } }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="quote-card"
        style={{ 
          backgroundColor: colors.background,
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
          borderRadius: '0.5rem',
          padding: '2rem',
          maxWidth: '90%',
          width: '500px',
          position: 'relative'
        }}
        key={id}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="quote-card__time" style={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          <Clock size={14} />
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
        
        <div className="quote-card__date" style={{ 
          position: 'absolute', 
          top: '1rem', 
          right: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.875rem',
          opacity: 0.7
        }}>
          <Calendar size={14} />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        
        <motion.div 
          className="quote-card__content"
          variants={textVariants}
          style={{
            textAlign: 'center',
            marginTop: '2rem',
            marginBottom: '1.5rem'
          }}
        >
          <p className="quote-card__text" style={{
            fontSize: '1.5rem',
            lineHeight: '1.6',
            fontWeight: 'normal'
          }}>{text}</p>
        </motion.div>
        
        <motion.div 
          className="quote-card__author"
          variants={authorVariants}
          style={{
            textAlign: 'right',
            marginBottom: '2rem'
          }}
        >
          <p style={{
            fontSize: '1.25rem',
            fontStyle: 'italic'
          }}>— {author}</p>
        </motion.div>
        
        <div className="quote-card__actions" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <button 
            className="quote-card__favorite"
            onClick={() => onFavoriteToggle(id)}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: isFavorite ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
              color: isFavorite ? '#e74c3c' : 'inherit'
            }}
          >
            <Heart size={20} fill={isFavorite ? '#e74c3c' : 'none'} />
          </button>
          
          {onShare && (
            <button 
              className="quote-card__share"
              onClick={onShare}
              aria-label="Share quote"
              style={{
                padding: '0.5rem',
                borderRadius: '50%'
              }}
            >
              <Share size={20} />
            </button>
          )}
        </div>
        
        <div className="quote-card__added" style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          fontSize: '0.75rem',
          opacity: 0.5
        }}>
          Added: {formatDate(addedAt)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuoteCard;