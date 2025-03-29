import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ThemeToggle from '../components/common/ThemeToggle';
import AddQuoteForm from '../components/quotes/AddQuoteForm';

const Settings: React.FC = () => {
  const { mode, setMode, colors } = useContext(ThemeContext);
  const { user, updateUserPreferences } = useContext(UserContext);
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'en' | 'zh' | 'fr';
    if (user) {
      updateUserPreferences({ language: lang });
    }
  };
  
  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const interval = parseInt(e.target.value);
    if (user) {
      updateUserPreferences({ 
        autoChangeInterval: isNaN(interval) ? null : interval 
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">设置</h1>
        
        <div 
          className="rounded-lg p-6 mb-6"
          style={{ backgroundColor: colors.muted }}
        >
          <h2 className="text-xl font-semibold mb-4">主题</h2>
          <div className="flex items-center">
            <span className="mr-4">选择主题：</span>
            <ThemeToggle currentMode={mode} onChange={setMode} />
          </div>
        </div>
        
        <div 
          className="rounded-lg p-6 mb-6"
          style={{ backgroundColor: colors.muted }}
        >
          <h2 className="text-xl font-semibold mb-4">语言设置</h2>
          <div className="max-w-xs">
            <label className="block mb-2">选择语言</label>
            <select 
              value={user?.preferences.language || 'en'}
              onChange={handleLanguageChange}
              className="w-full p-2 rounded border"
              style={{ backgroundColor: colors.background, borderColor: colors.border }}
            >
              <option value="en">English</option>
              <option value="zh">中文</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
        
        <div 
          className="rounded-lg p-6 mb-6"
          style={{ backgroundColor: colors.muted }}
        >
          <h2 className="text-xl font-semibold mb-4">屏保设置</h2>
          <div className="max-w-xs">
            <label className="block mb-2">自动切换时间</label>
            <select 
              value={user?.preferences.autoChangeInterval?.toString() || ''}
              onChange={handleIntervalChange}
              className="w-full p-2 rounded border"
              style={{ backgroundColor: colors.background, borderColor: colors.border }}
            >
              <option value="">不自动切换</option>
              <option value="10">10秒</option>
              <option value="30">30秒</option>
              <option value="60">1分钟</option>
              <option value="300">5分钟</option>
            </select>
          </div>
        </div>
        
        {/* 新添加的自定义名言表单区块 */}
        <div 
          className="rounded-lg p-6"
          style={{ backgroundColor: colors.muted }}
        >
          <h2 className="text-xl font-semibold mb-4">自定义名言</h2>
          <AddQuoteForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;