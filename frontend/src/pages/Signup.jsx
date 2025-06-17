import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore'; // Adjust the import path as necessary


const  Signup = ()=> {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
 const { signup, isSigningUp } = useAuthStore();

// const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

//     return true;
//   };



  const handleSignup = (e) => {
    
        
    e.preventDefault();

    // const success = validateForm();

    // if (success === true) 
     signup(formData);


      };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left - Image Section */}
      <div className="hidden md:flex flex-col justify-center items-center bg-cover bg-center text-white px-8"
           style={{ backgroundImage: "url('https://source.unsplash.com/800x600/?adventure,travel')" }}>
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Travelista Tours</h1>
        <p className="text-center max-w-sm text-lg font-light">Explore the world together with unforgettable trips.</p>
      </div>

      {/* Right - Signup Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Join TripHub</h2>
          <p className="text-center text-gray-500 mb-6">Create an account</p>

          <div className="mb-4">
            <label className="text-gray-700 mb-1 block">Name</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaUser className="text-gray-400 mr-2" />
              <input type="text" placeholder="Your Name" className="w-full outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-1 block">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" placeholder="you@mail.com" className="w-full outline-none"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-1 block">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" placeholder="********" className="w-full outline-none"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>

          <button onClick={handleSignup}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-4">
            SIGN UP
          </button>

          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <FaGoogle size={22} className="cursor-pointer text-gray-600 hover:text-red-500" />
            <FaFacebook size={22} className="cursor-pointer text-gray-600 hover:text-blue-700" />
            <FaApple size={22} className="cursor-pointer text-gray-600 hover:text-black" />
          </div>

          <p className="text-sm text-center text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>

                  </div>
      </div>
    </div>
  );
}


export default Signup;