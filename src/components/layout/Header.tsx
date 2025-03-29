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
  
  return (
    <header 
      style={{ backgroundColor: colors.background, borderBottom: `1px solid ${colors.border}` }}
      className="py-3 px-4 sticky top-0 z-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Vancouver Quotes
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`flex items-center gap-2 ${isActive('/') ? 'text-primary' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/favorites" 
            className={`flex items-center gap-2 ${isActive('/favorites') ? 'text-primary' : ''}`}
          >
            <Heart size={18} />
            <span>Favorites</span>
          </Link>
          <Link 
            to="/manage" 
            className={`flex items-center gap-2 ${isActive('/manage') ? 'text-primary' : ''}`}
          >
            <Database size={18} /> {/* 需要导入 Database 图标 */}
            <span>管理名言</span>
          </Link>
          <Link 
            to="/settings" 
            className={`flex items-center gap-2 ${isActive('/settings') ? 'text-primary' : ''}`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          
          <ThemeToggle currentMode={mode} onChange={setMode} />
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {menuOpen && (
        <div 
          className="md:hidden absolute left-0 right-0 top-full"
          style={{ backgroundColor: colors.background }}
        >
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`flex items-center gap-2 p-2 ${isActive('/') ? 'text-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            
            <Link 
              to="/favorites" 
              className={`flex items-center gap-2 p-2 ${isActive('/favorites') ? 'text-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Heart size={18} />
              <span>Favorites</span>
            </Link>
            
            <Link 
              to="/settings" 
              className={`flex items-center gap-2 p-2 ${isActive('/settings') ? 'text-primary' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
            
            <div className="p-2">
              <ThemeToggle currentMode={mode} onChange={setMode} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;