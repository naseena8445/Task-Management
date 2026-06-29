import { useMemo, useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Layout from './components/Layout';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const authAxios = axios.create({
  baseURL: API_BASE,
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('task-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('task-user');
    return stored ? JSON.parse(stored) : null;
  });
  const [theme, setTheme] = useState(() => localStorage.getItem('task-theme') || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('task-theme', theme);
  }, [theme]);

  const auth = useMemo(() => ({
    user,
    login(userData, token) {
      localStorage.setItem('task-user', JSON.stringify(userData));
      localStorage.setItem('task-token', token);
      setUser(userData);
    },
    logout() {
      localStorage.removeItem('task-user');
      localStorage.removeItem('task-token');
      setUser(null);
      navigate('/login');
    },
  }), [user, navigate]);

  return (
    <Layout user={user} onLogout={auth.logout} theme={theme} setTheme={setTheme}>
      <Routes>
        <Route path="/" element={user ? <Tasks authAxios={authAxios} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login api={API_BASE} onLogin={auth.login} user={user} />} />
        <Route path="/register" element={<Register api={API_BASE} onRegister={auth.login} user={user} />} />
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} />} />
      </Routes>
    </Layout>
  );
}

export default App;
