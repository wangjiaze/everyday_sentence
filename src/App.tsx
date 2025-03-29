// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { QuotesProvider } from './context/QuotesContext';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ManageQuotes from './pages/ManageQuotes';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <QuotesProvider>
        <UserProvider>
          <Router>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/manage" element={<ManageQuotes />} />
            </Routes>
          </Router>
        </UserProvider>
      </QuotesProvider>
    </ThemeProvider>
  );
};

export default App;