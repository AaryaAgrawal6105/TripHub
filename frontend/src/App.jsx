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
import Home from './pages/Home';
import HomeNavbar from './components/HomeNavBar';
import BlogPage from './pages/BlogPage';

function App() {
  const location = useLocation(); // 👈 Hook to get current route path
  const { authUser } = useAuthStore();
const checkAuth = useAuthStore(state => state.checkAuth);

useEffect(() => {
  checkAuth();
}, []);


  // Check if we're on login or signup page
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  const showHomeNavbar = location.pathname === "/home";

  return (
    <div className="App">
      {!hideNavbar && (
        <>
          {showHomeNavbar ? <HomeNavbar /> : <Navbar />}
        </>
      )}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/blogs" element={<BlogPage />} />
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
