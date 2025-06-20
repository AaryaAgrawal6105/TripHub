import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

const { login } = useAuthStore(); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    // console.log('Logging in with:', email, password);

    e.preventDefault();

    login({email, password}, navigate);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-pulse delay-700"></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-purple-300/15 rounded-full blur-md animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-20 h-20 bg-indigo-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-white/20 rotate-45 animate-bounce delay-300"></div>
          <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-blue-200/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-purple-200/25 rotate-12 animate-bounce delay-1000"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-lg px-8">
          {/* Logo Container with Glow Effect */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Welcome Back to
              </span>
              <br />
              <span className="text-white font-extrabold text-5xl tracking-wide">
                TripHub
              </span>
            </h1>
            <p className="text-lg font-light text-white/90 leading-relaxed max-w-md mx-auto">
              Continue your journey with us and explore breathtaking destinations around the world
            </p>
          </div>
          
       

          
         
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-4 lg:p-8 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-40 h-40 border border-blue-200 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 border border-purple-200 rounded-full"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TripHub
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Sign In
              </span>
            </h2>
            <p className="text-gray-600 font-medium text-lg">Welcome back! Please enter your details</p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 hover:shadow-3xl transition-all duration-500 hover:bg-white relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              {/* Email Field */}
              <div className="mb-6">
                <label className="text-gray-700 font-semibold mb-3 block text-sm tracking-wide">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/80 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400 font-medium"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="text-gray-700 font-semibold mb-3 block text-sm tracking-wide">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <FaLock className="text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
                  </div>
                  <input 
                    type="password"
                    placeholder="Enter your password" 
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/80 hover:bg-white focus:bg-white text-gray-800 placeholder-gray-400 font-medium"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right mb-6">
                <a 
                  href="/forgot-password" 
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 relative group"
                >
                  Forgot your password?
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </div>

              {/* Login Button */}
              <button 
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl hover:shadow-2xl relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    'SIGN IN TO TRIPHUB'
                  )}
                </span>
              </button>

              {/* Enhanced Divider */}
              <div className="flex items-center my-8">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm">
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all duration-200 relative group"
                >
                  Create Account
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </p>
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