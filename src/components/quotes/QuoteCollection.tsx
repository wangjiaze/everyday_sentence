// src/components/quotes/QuoteCollection.tsx
import React, { useContext } from 'react';
import { useQuotes } from '../../hooks/useQuotes';
import { Quote } from '../../types/Quote';
import { ThemeContext } from '../../context/ThemeContext';
import { Heart, Share, Trash2 } from 'react-feather';

interface QuoteCollectionProps {
  quotes: Quote[];
  showActions?: boolean;
  showDelete?: boolean;
  onDelete?: (id: string) => void;
}

const QuoteCollection: React.FC<QuoteCollectionProps> = ({ 
  quotes, 
  showActions = true, 
  showDelete = false,
  onDelete
}) => {
  const { toggleFavorite } = useQuotes();
  const { colors } = useContext(ThemeContext);
  
  // Handle sharing quote
  const handleShare = async (quote: Quote) => {
    const shareData = {
      title: 'Vancouver Quotes',
      text: `"${quote.text}" — ${quote.author}`,
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
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {quotes.map(quote => (
        <div 
          key={quote.id} 
          style={{ 
            backgroundColor: colors.background,
            borderRadius: '0.5rem',
            boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)`,
            border: `1px solid ${colors.border}`,
            padding: '1.5rem'
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ 
              fontSize: '1.25rem',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>"{quote.text}"</p>
            
            <p style={{ 
              fontSize: '1rem',
              fontStyle: 'italic',
              textAlign: 'right'
            }}>— {quote.author}</p>
          </div>
          
          {showActions && (
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '1rem'
            }}>
              <button
                onClick={() => toggleFavorite(quote.id)}
                aria-label={quote.isFavorite ? "Remove from favorites" : "Add to favorites"}
                style={{
                  padding: '0.5rem',
                  backgroundColor: quote.isFavorite ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
                  borderRadius: '50%',
                  color: quote.isFavorite ? '#e74c3c' : 'inherit'
                }}
              >
                <Heart size={18} fill={quote.isFavorite ? '#e74c3c' : 'none'} />
              </button>
              
              <button
                onClick={() => handleShare(quote)}
                aria-label="Share quote"
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%'
                }}
              >
                <Share size={18} />
              </button>
              
              {showDelete && onDelete && (
                <button
                  onClick={() => onDelete(quote.id)}
                  aria-label="Delete quote"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '50%',
                    color: '#e74c3c'
                  }}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuoteCollection;