import Login from './pages/Login';
import Signup from './pages/Signup';
import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/useAuthStore';
import Navbar from './components/Navbar';

function App() {
  const location = useLocation(); // 👈 Hook to get current route path
  const { authUser, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Check if we're on login or signup page
  const hideNavbar = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />} 

      <Routes>
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
