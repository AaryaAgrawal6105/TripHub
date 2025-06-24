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
import TripExpenses from './pages/TripExpenses';
import CreateTrip from './pages/CreateTrip'; 
import TripDetails from "./pages/TripDetails";
import AcceptInvite from './pages/AcceptInvite';
import JoinTrip from './pages/JoinTrip';
import TripItinerary from './pages/TripItinerary';
import Trips from './pages/Trips';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ExploreDestination from './pages/ExploreDestination';


function App() {
  const location = useLocation();
  const { authUser } = useAuthStore();
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  const showHomeNavbar = location.pathname === "/";

  return (
    <div className="App">
      {!hideNavbar && (
        <>
          {showHomeNavbar ? <HomeNavbar /> : <Navbar />}
        </>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home/blogs" element={<BlogPage />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/dashboard" />} />
        <Route path="/about" element={<About />} />
        <Route path='/expenses' element={<TripExpenses />} />
        <Route path="/invite" element={<AcceptInvite />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* <Route path="/destinations/:destName" element={<ExploreDestination />} /> */}
        <Route path="/explore" element={<ExploreDestination />} />


        {/* Protected Routes */}  
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/trips" element={authUser ? <Trips /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/create-trip" element={authUser ? <CreateTrip /> : <Navigate to="/login" />} />
        <Route path="/trip/:id" element={authUser ? <TripDetails /> : <Navigate to="/login" />} />
        <Route path="/trip/:tripId/expenses" element={<TripExpenses />} />
        <Route path="/trip/:id/join" element={authUser ? <JoinTrip /> : <Navigate to="/login" />} />
        <Route path="/trip/:id/itinerary" element={authUser ? <TripItinerary /> : <Navigate to="/login" />} />
      </Routes>

      {!hideNavbar && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
