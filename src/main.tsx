import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const useTheme = () => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `${newTheme}-theme`;
  };
  
  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, []);
  
  return { theme, toggleTheme };
};

const MainApp = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <StrictMode>
      <div style={{ transition: 'all 0.3s ease' }}>
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: theme === 'light' ? '#6366f1' : '#f8fafc',
            color: theme === 'light' ? '#fff' : '#6366f1',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 1000,
          }}
        >
          {theme === 'light' ? '🌙' : '☀️'} Toggle Theme
        </button>
        <App />
      </div>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<MainApp />);
