import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { useAuthStore } from './store/useAuthStore';

import Navbar from './components/Navbar';
import HomeNavbar from './components/HomeNavBar';
import Footer from './components/Footer';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Home from './pages/Home';
import About from './pages/About';
import BlogPage from './pages/BlogPage';
import CreateTrip from './pages/CreateTrip'; 
import TripDetails from "./pages/TripDetails";

function App() {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

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
        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/home/blogs" element={<BlogPage />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />

        {/* Protected Routes */}
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/create-trip" element={authUser ? <CreateTrip /> : <Navigate to="/login" />} />
        <Route path="/trip/:id" element={authUser ? <TripDetails /> : <Navigate to="/login" />} />
      </Routes>

      {!hideNavbar && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
