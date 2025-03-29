// src/pages/ManageQuotes.tsx
import React, { useState } from 'react';
import { useQuotes } from '../hooks/useQuotes';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Quote } from '../types/Quote';
import { Trash2, Heart, Plus } from 'react-feather';

const ManageQuotes: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const { state, toggleFavorite, addCustomQuote, deleteQuote, importQuotes } = useQuotes();
  
  
  // 状态用于新名言表单
  const [newQuote, setNewQuote] = useState({
    text: '',
    author: '',
    language: 'zh' as 'en' | 'zh' | 'fr'
  });
  
  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.text.trim() || !newQuote.author.trim()) return;
    
    addCustomQuote({
      text: newQuote.text,
      author: newQuote.author,
      language: newQuote.language,
      tags: [],
      isFavorite: false,
      source: '用户添加'
    });
    
    // 重置表单
    setNewQuote({
      text: '',
      author: '',
      language: 'zh'
    });
  };
  
  // 删除名言的功能
  const handleDelete = (id: string) => {
    // 这里需要在useQuotes中添加删除功能
    if (confirm('确定要删除这条名言吗？')) {
      // deleteQuote(id); // 需要在useQuotes中实现
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">名言管理</h1>
          <QuotesImporter onImport={importQuotes} />
        {/* 添加名言表单 */}
        <div 
          className="rounded-lg p-6 mb-8"
          style={{ backgroundColor: colors.muted }}
        >
          <h2 className="text-xl font-semibold mb-4">添加新名言</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">名言内容:</label>
              <textarea
                value={newQuote.text}
                onChange={(e) => setNewQuote({...newQuote, text: e.target.value})}
                className="w-full p-2 rounded border"
                style={{ backgroundColor: colors.background, borderColor: colors.border }}
                required
                rows={3}
              />
            </div>
            
            <div>
              <label className="block mb-1">作者:</label>
              <input
                type="text"
                value={newQuote.author}
                onChange={(e) => setNewQuote({...newQuote, author: e.target.value})}
                className="w-full p-2 rounded border"
                style={{ backgroundColor: colors.background, borderColor: colors.border }}
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">语言:</label>
              <select
                value={newQuote.language}
                onChange={(e) => setNewQuote({...newQuote, language: e.target.value as any})}
                className="w-full p-2 rounded border"
                style={{ backgroundColor: colors.background, borderColor: colors.border }}
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 rounded flex items-center"
              style={{ backgroundColor: colors.primary, color: '#fff' }}
            >
              <Plus size={18} className="mr-2" />
              添加名言
            </button>
          </form>
        </div>
        
        {/* 名言列表 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">所有名言 ({state.quotes.length})</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ backgroundColor: colors.muted }}>
                  <th className="p-3 text-left border" style={{ borderColor: colors.border }}>内容</th>
                  <th className="p-3 text-left border" style={{ borderColor: colors.border }}>作者</th>
                  <th className="p-3 text-center border" style={{ borderColor: colors.border }}>语言</th>
                  <th className="p-3 text-center border" style={{ borderColor: colors.border }}>收藏</th>
                  <th className="p-3 text-center border" style={{ borderColor: colors.border }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {state.quotes.map((quote: Quote) => (
                  <tr key={quote.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td className="p-3 border" style={{ borderColor: colors.border }}>{quote.text}</td>
                    <td className="p-3 border" style={{ borderColor: colors.border }}>{quote.author}</td>
                    <td className="p-3 text-center border" style={{ borderColor: colors.border }}>
                      {quote.language === 'zh' ? '中文' : 
                       quote.language === 'en' ? 'English' : 'Français'}
                    </td>
                    <td className="p-3 text-center border" style={{ borderColor: colors.border }}>
                      <button 
                        onClick={() => toggleFavorite(quote.id)}
                        className="p-1 rounded-full"
                      >
                        <Heart 
                          size={18} 
                          fill={quote.isFavorite ? '#e74c3c' : 'none'} 
                          stroke={quote.isFavorite ? '#e74c3c' : 'currentColor'}
                        />
                      </button>
                    </td>
                    <td className="p-3 text-center border" style={{ borderColor: colors.border }}>
                      <button 
                        onClick={() => handleDelete(quote.id)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};


const QuotesImporter: React.FC<{ onImport: (quotes: any[]) => void }> = ({ onImport }) => {
  const { colors } = useContext(ThemeContext);
  const [importText, setImportText] = useState('');
  const [language, setLanguage] = useState<'en' | 'zh' | 'fr'>('zh');
  
  const handleImport = () => {
    const lines = importText.split('\n').filter(line => line.trim());
    const quotes = [];
    
    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 < lines.length) {
        quotes.push({
          text: lines[i].trim(),
          author: lines[i + 1].trim(),
          language
        });
      }
    }
    
    if (quotes.length > 0) {
      onImport(quotes);
      setImportText('');
      alert(`成功导入 ${quotes.length} 条名言`);
    }
  };
  
  return (
    <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: colors.muted }}>
      <h2 className="text-xl font-semibold mb-4">批量导入名言</h2>
      <p className="mb-2">格式：每条名言占两行，第一行为名言内容，第二行为作者</p>
      
      <textarea
        value={importText}
        onChange={e => setImportText(e.target.value)}
        className="w-full p-2 rounded border mb-4"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
        rows={10}
        placeholder="不以物喜，不以己悲。
范仲淹
海内存知己，天涯若比邻。
王勃"
      ></textarea>
      
      <div className="flex mb-4 items-center">
        <label className="mr-4">语言：</label>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as any)}
          className="p-2 rounded border"
          style={{ backgroundColor: colors.background, borderColor: colors.border }}
        >
          <option value="zh">中文</option>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      
      <button
        onClick={handleImport}
        className="px-4 py-2 rounded"
        style={{ backgroundColor: colors.primary, color: '#fff' }}
      >
        导入名言
      </button>
    </div>
  );
};


export default ManageQuotes;