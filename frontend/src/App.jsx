import Login from './pages/Login'
import Signup from './pages/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Profile from './pages/Profile'
function App() {

  return (
  
   <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
   </div>
      
   
  )
}

export default App
