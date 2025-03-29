// src/components/layout/Header.tsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Settings, Heart, Home, Database } from 'react-feather';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from '../common/ThemeToggle';

const Header: React.FC = () => {
  const { mode, setMode, colors } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const navLinkClass = (path: string) => `
    flex items-center gap-2 px-3 py-2 rounded-md transition-colors
    ${isActive(path) ? 'text-primary font-medium' : 'hover:text-primary hover:bg-opacity-10 hover:bg-gray-200'}
  `;
  
  return (
    <header 
      style={{ backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}` }}
      className="py-2 px-4 sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Vancouver Quotes
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <Link to="/" className={navLinkClass('/')}>
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          <Link to="/favorites" className={navLinkClass('/favorites')}>
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
          
          <Link to="/manage" className={navLinkClass('/manage')}>
            <Database size={18} />
            <span>管理名言</span>
          </Link>
          
          <Link to="/settings" className={navLinkClass('/settings')}>
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          
          <div className="ml-2 pl-2 border-l" style={{ borderColor: colors.border }}>
            <ThemeToggle currentMode={mode} onChange={setMode} />
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center p-2 rounded-md hover:bg-opacity-10 hover:bg-gray-200"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {menuOpen && (
        <div 
          className="md:hidden absolute left-0 right-0 top-full shadow-md"
          style={{ backgroundColor: colors.background }}
        >
          <nav className="container mx-auto py-2 px-4 flex flex-col">
            <Link 
              to="/" 
              className={`flex items-center gap-2 p-3 my-1 rounded-md ${isActive('/') ? 'text-primary bg-opacity-10 bg-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className={`flex items-center gap-2 p-3 my-1 rounded-md ${isActive('/favorites') ? 'text-primary bg-opacity-10 bg-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
            
            <Link 
              to="/manage" 
              className={`flex items-center gap-2 p-3 my-1 rounded-md ${isActive('/manage') ? 'text-primary bg-opacity-10 bg-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Database size={18} />
              <span>管理名言</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center gap-2 p-3 my-1 rounded-md ${isActive('/settings') ? 'text-primary bg-opacity-10 bg-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
            
            <div className="p-3 mt-2 border-t" style={{ borderColor: colors.border }}>
              <ThemeToggle currentMode={mode} onChange={setMode} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;