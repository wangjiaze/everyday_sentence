import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const NotFound: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">页面未找到</p>
      <p className="mb-8">您请求的页面不存在或已被移动。</p>
      
      <Link 
        to="/" 
        className="px-4 py-2 rounded-md"
        style={{ backgroundColor: colors.primary, color: '#fff' }}
      >
        返回首页
      </Link>
    </div>
  );
};

export default NotFound; 
