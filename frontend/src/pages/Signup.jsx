import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore'; // Adjust the import path as necessary
import bg from '../assets/login.jpeg'; // Make sure this path is correct

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { signup, isSigningUp } = useAuthStore();

  // const validateForm = () => {
  //     if (!formData.fullName.trim()) return toast.error("Full name is required");
  //     if (!formData.email.trim()) return toast.error("Email is required");
  //     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
  //     if (!formData.password) return toast.error("Password is required");
  //     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
  //     return true;
  // };

  const handleSignup = (e) => {
    e.preventDefault();
    // const success = validateForm();
    // if (success === true) 
    signup(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image Section with Gradient Overlay */}
      <div 
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white px-12 w-full">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                TripHub
              </h1>
              <p className="text-xl text-blue-100 font-light leading-relaxed">
                Start your journey with us and explore the world like never before
              </p>
            </div>
            
            <div className="space-y-4 text-blue-100">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Discover amazing destinations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Connect with fellow travelers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                <span>Create unforgettable memories</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-blue-700">TripHub</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-600">Join our community of travelers</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm border border-white/20">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Full Name</label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'name' ? 'transform scale-[1.02]' : ''
                }`}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all duration-300 ${
                    focusedField === 'name' 
                      ? 'border-blue-500 shadow-lg shadow-blue-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <FaUser className={`mr-3 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="w-full outline-none text-gray-700 placeholder-gray-400"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Email Address</label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'email' ? 'transform scale-[1.02]' : ''
                }`}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-blue-500 shadow-lg shadow-blue-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <FaEnvelope className={`mr-3 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      className="w-full outline-none text-gray-700 placeholder-gray-400"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">Password</label>
                <div className={`relative transition-all duration-300 ${
                  focusedField === 'password' ? 'transform scale-[1.02]' : ''
                }`}>
                  <div className={`flex items-center border-2 rounded-xl px-4 py-3 transition-all duration-300 ${
                    focusedField === 'password' 
                      ? 'border-blue-500 shadow-lg shadow-blue-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <FaLock className={`mr-3 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password" 
                      className="w-full outline-none text-gray-700 placeholder-gray-400"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sign Up Button */}
              <button 
                onClick={handleSignup}
                disabled={isSigningUp}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold 
                         hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] 
                         hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                {isSigningUp ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm font-medium">Or continue with</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Login */}
              <div className="flex justify-center gap-4">
                <button type="button" className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-red-300 hover:bg-red-50 transition-all duration-300 transform hover:scale-110">
                  <FaGoogle className="text-red-500" />
                </button>
                <button type="button" className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 transform hover:scale-110">
                  <FaFacebook className="text-blue-600" />
                </button>
                <button type="button" className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-110">
                  <FaApple className="text-gray-800" />
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-6 max-w-sm mx-auto">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { FaEnvelope, FaLock, FaUser, FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// // import { toast } from 'react-toastify';
// import { useAuthStore } from '../store/useAuthStore'; // Adjust the import path as necessary
// import bg from '../assets/login.jpeg'; // Make sure this path is correct


// const  Signup = ()=> {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//  const { signup, isSigningUp } = useAuthStore();

// // const validateForm = () => {
// //     if (!formData.fullName.trim()) return toast.error("Full name is required");
// //     if (!formData.email.trim()) return toast.error("Email is required");
// //     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
// //     if (!formData.password) return toast.error("Password is required");
// //     if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

// //     return true;
// //   };



//   const handleSignup = (e) => {
    
        
//     e.preventDefault();

//     // const success = validateForm();

//     // if (success === true) 
//      signup(formData);


//       };

//   return (
//     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-100">
//       {/* Left - Image Section */}
      
//       <div className="flex flex-col justify-center items-center text-white px-8 w-full min-h-screen"
//               style={{ 
//                 backgroundImage: `url(${bg})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat'
//               }}
//             >
//               {/* <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Travelista Tours</h1>
//               <p className="text-center max-w-sm text-lg font-light">
//                 Travel is the only purchase that enriches you in ways beyond material wealth.
//               </p> */}
//             </div>

//       {/* Right - Signup Form */}
//       <div className="flex items-center justify-center p-8">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
//           <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Join TripHub</h2>
//           <p className="text-center text-gray-500 mb-6">Create an account</p>

//           <div className="mb-4">
//             <label className="text-gray-700 mb-1 block">Name</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaUser className="text-gray-400 mr-2" />
//               <input type="text" placeholder="Your Name" className="w-full outline-none" value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-gray-700 mb-1 block">Email</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaEnvelope className="text-gray-400 mr-2" />
//               <input type="email" placeholder="you@mail.com" className="w-full outline-none" value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-gray-700 mb-1 block">Password</label>
//             <div className="flex items-center border rounded-md px-3 py-2">
//               <FaLock className="text-gray-400 mr-2" />
//               <input type="password" placeholder="********" className="w-full outline-none" value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
//             </div>
//           </div>

//           <button onClick={handleSignup}
//                   className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-4">
//             SIGN UP
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
//             Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//           </p>

//                   </div>
//       </div>
//     </div>
//   );
// }


// export default Signup;