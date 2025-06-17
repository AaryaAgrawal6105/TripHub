import Login from './pages/Login'
import Signup from './pages/Signup'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Profile from './pages/Profile'
import {Navigate} from 'react-router-dom'

function App() {
const {authUser,checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser}

  );



  return (
  
   <div className="App">
      <Routes>
        <Route path="/" element={authUser ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path="/login" element={!authUser ? <Login/> :  <Navigate to='/'></Navigate>} />
        <Route path="/signup"  element={ !authUser ? <Signup/>  :  <Navigate to='/'></Navigate>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
   </div>
      
   
  )
}

export default App
