// src/components/quotes/AddQuoteForm.tsx
import React, { useState, useContext } from 'react';
import { useQuotes } from '../../hooks/useQuotes';
import { ThemeContext } from '../../context/ThemeContext';

const AddQuoteForm: React.FC = () => {
  const { addCustomQuote } = useQuotes();
  const { colors } = useContext(ThemeContext);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState<'en' | 'zh' | 'fr'>('en');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !author.trim()) return;
    
    addCustomQuote({
      text,
      author,
      language,
      tags: [],
      isFavorite: false,
      source: '用户添加'
    });
    
    // 重置表单
    setText('');
    setAuthor('');
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="p-4 rounded-lg"
      style={{ backgroundColor: colors.muted }}
    >
      <h3 className="text-lg font-semibold mb-4">添加自定义名言</h3>
      
      <div className="mb-4">
        <label className="block mb-1">名言内容</label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full p-2 rounded border"
          style={{ backgroundColor: colors.background, borderColor: colors.border }}
          required
          rows={3}
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">作者</label>
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="w-full p-2 rounded border"
          style={{ backgroundColor: colors.background, borderColor: colors.border }}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-1">语言</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as 'en' | 'zh' | 'fr')}
          className="w-full p-2 rounded border"
          style={{ backgroundColor: colors.background, borderColor: colors.border }}
        >
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="fr">Français</option>
        </select>
      </div>
      
      <button
        type="submit"
        className="px-4 py-2 rounded"
        style={{ backgroundColor: colors.primary, color: '#fff' }}
      >
        添加名言
      </button>
    </form>
  );
};

export default AddQuoteForm;