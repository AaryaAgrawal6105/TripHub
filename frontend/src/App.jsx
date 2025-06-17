import Login from './pages/Login'
import Signup from './pages/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Dashboard from './pages/Dashboard'
import './App.css'

import Profile from './pages/Profile'
function App() {

  return (
  
   <div className="App">
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
   </div>
      
   
  )
}

export default App
