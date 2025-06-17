import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from 'react'
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-[#1e3c72] to-[#2a5298]">
      {/* Left Section – Image or Illustration */}
      <div className="hidden md:flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/800x600/?travel,adventure')" }}>
        <div className="text-white text-3xl font-bold text-center p-10 backdrop-blur-sm bg-black/30 rounded-xl">
          ✈️ Plan your next journey with <span className="text-yellow-300">TripHub</span>
        </div>
      </div>

      {/* Right Section – Login Form */}
      <div className="flex items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl px-8 py-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Welcome Back 👋</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            Log In
          </button>
          <p className="text-sm text-center text-gray-500 mt-4">
            New to TripHub?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}


// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     console.log(email, password);
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
//       {/* Left Image Section Image Not Visible */}
      
//       <div className="hidden md:flex flex-col justify-center items-center bg-cover bg-center text-white px-8"
//            style={{ backgroundImage: "url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bucketlistly.blog%2Fposts%2Fmost-beautiful-travel-photos&psig=AOvVaw3uVnufy6GD9K067B_Ux4XV&ust=1750229732387000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJigxv_v940DFQAAAAAdAAAAABAE')" }}>
//         <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">TripHub</h1>
//         <p className="text-center max-w-sm text-lg font-light">Travel is the only purchase that enriches you in ways beyond material wealth</p>
//       </div>

//       {/* Right Login Section */}
//       <div className="flex items-center justify-center p-8 relative">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Welcome</h2>
//           <p className="text-center text-gray-500 mb-6">Login with Email</p>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-1">Email</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaEnvelope className="text-gray-400 mr-2" />
//               <input
//                 type="email"
//                 placeholder="triphub@mail.com"
//                 className="w-full outline-none"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-1">Password</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaLock className="text-gray-400 mr-2" />
//               <input
//                 type="password"
//                 placeholder="********"
//                 className="w-full outline-none"
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Forgot password */}
//           <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
//             Forgot your password?
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-4"
//           >
//             LOGIN
//           </button>

//           {/* Divider */}
//           <div className="flex items-center mb-4">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-2 text-gray-400 text-sm">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Social Buttons */}
//           <div className="flex justify-center gap-4 mb-4">
//             <button className="text-gray-600 hover:text-blue-500">
//               <FaGoogle size={22} />
//             </button>
//             <button className="text-gray-600 hover:text-blue-700">
//               <FaFacebook size={22} />
//             </button>
//             <button className="text-gray-600 hover:text-black">
//               <FaApple size={22} />
//             </button>
//           </div>

//           {/* Register link */}
//           <p className="text-sm text-center text-gray-500">
//             Don’t have an account? <span className="text-blue-600 hover:underline cursor-pointer">Register Now</span>
//           </p>

//           {/* Cityscape Image or Bottom Decoration */}
//           <img
//             src="https://i.imgur.com/kYFyAzJ.png"
//             alt="city graphic"
//             className="mt-8 mx-auto w-32 opacity-60"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }