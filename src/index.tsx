// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// 注册Service Worker开启PWA功能
serviceWorkerRegistration.register();