import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore'; 
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/login.jpeg'; // Adjust the path as necessary

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthStore(); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // console.log('Logging in with:', email, password);

    e.preventDefault();

    login({email, password}, navigate);
  };

  // Simulated background image URL - replace with your actual image
  const bgImage = bg;

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-cover bg-center text-white px-8 relative overflow-hidden"
           style={{ backgroundImage: `url(${bgImage})` }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-purple-900/80 to-indigo-900/90"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-md">
          {/* Logo/Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-base font-light text-white/90 leading-relaxed">
              Continue your journey with us and explore destinations
            </p>
          </div>
          
          {/* Feature Pills */}
          <div className="flex justify-center gap-2">
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-xs font-medium text-white/90">🔒 Secure</span>
            </div>
            <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              <span className="text-xs font-medium text-white/90">⚡ Fast</span>
            </div>
          </div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-16 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-700"></div>
        <div className="absolute top-1/2 right-8 w-12 h-12 bg-purple-400/15 rounded-full blur-md animate-pulse delay-1000"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-4 lg:p-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Sign In
              </span>
            </h2>
            <p className="text-gray-600 font-medium">Welcome back! Please enter your details</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl transition-all duration-300 hover:bg-white/95">
            
            {/* Email Field */}
            <div className="mb-4">
              <label className="text-gray-700 font-semibold mb-2 block text-sm">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input 
                  type="email" 
                  placeholder="triphub@mail.com" 
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/80 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="text-gray-700 font-semibold mb-2 block text-sm">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <FaLock className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input 
                  type="password"
                  placeholder="********" 
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 bg-gray-50/80 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right mb-5">
              <Link 
                to="/forgot-password" 
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              LOGIN
            </button>

            {/* Divider */}
            <div className="flex items-center my-5">
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <span className="mx-3 text-gray-500 text-xs font-semibold bg-white px-3 py-1 rounded-full border border-gray-200">
                or continue with
              </span>
              <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex justify-center gap-3 mb-5">
              <FaGoogle size={22} className="cursor-pointer text-gray-600 hover:text-red-500 transition-colors" />
              <FaFacebook size={22} className="cursor-pointer text-gray-600 hover:text-blue-700 transition-colors" />
              <FaApple size={22} className="cursor-pointer text-gray-600 hover:text-black transition-colors" />
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                Register Now
              </Link>
            </p>
          </div>

          {/* Security Footer */}
          <div className="text-center mt-4">
            <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore'; 
// // import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import bg from '../assets/login.jpeg'; // Adjust the path as necessary

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { login } = useAuthStore(); 
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     // console.log('Logging in with:', email, password);

//     e.preventDefault();

//     login({email, password}, navigate);
//   };

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
//       {/* Left Side - Image + Quote */}
//       <div className="hidden md:flex flex-col justify-center items-center bg-cover bg-center text-white px-8"
//            style={{ backgroundImage: `url(${bg})` }}>
//         {/* <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Travelista Tours</h1>
//         {<p className="text-center max-w-sm text-lg font-light">Travel is the only purchase that enriches you in ways beyond material wealth.</p> */}
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="flex items-center justify-center p-8">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Welcome</h2>
//           <p className="text-center text-gray-500 mb-6">Login with Email</p>

//           <div className="mb-4">
//             <label className="text-gray-700 mb-1 block">Email</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaEnvelope className="text-gray-400 mr-2" />
//               <input type="email" placeholder="triphub@mail.com" className="w-full outline-none"
//                 onChange={(e) => setEmail(e.target.value)} />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-gray-700 mb-1 block">Password</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaLock className="text-gray-400 mr-2" />
//               <input type="password" placeholder="********" className="w-full outline-none"
//                 onChange={(e) => setPassword(e.target.value)} />
//             </div>
//           </div>

//           <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
//           <Link to="/forgot-password">Forgot your password?</Link>
//         </div>


//           <button onClick={handleLogin}
//                   className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-4">
//             LOGIN
//           </button>

//           <div className="flex items-center mb-4">
//             <hr className="flex-grow border-gray-300" />
//             <span className="mx-2 text-gray-400 text-sm">OR</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           <div className="flex justify-center gap-4 mb-4">
//             <FaGoogle size={22} className="cursor-pointer text-gray-600 hover:text-red-500" />
//             <FaFacebook size={22} className="cursor-pointer text-gray-600 hover:text-blue-700" />
//             <FaApple size={22} className="cursor-pointer text-gray-600 hover:text-black" />
//           </div>

//           <p className="text-sm text-center text-gray-500">
//             Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Register Now</Link>
//           </p>

          
//         </div>
//       </div>
//     </div>
//   );
// }



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