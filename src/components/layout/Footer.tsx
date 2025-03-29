// src/components/layout/Footer.tsx
import React, { useContext } from 'react';
import { GitHub, Linkedin, Twitter } from 'react-feather';
import { ThemeContext } from '../../context/ThemeContext';

const Footer: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  
  return (
    <footer 
      style={{ backgroundColor: colors.background, borderTop: `1px solid ${colors.border}` }}
      className="py-6"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Vancouver Quotes. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
          <a  
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <GitHub size={20} />
            </a>
            
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            
            <a
              href="#"
              className="text-gray-400 hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;