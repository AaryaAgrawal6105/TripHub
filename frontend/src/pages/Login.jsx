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

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Left Side - Image + Quote */}
      <div className="hidden md:flex flex-col justify-center items-center bg-cover bg-center text-white px-8"
           style={{ backgroundImage: `url(${bg})` }}>
        {/* <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Travelista Tours</h1>
        <p className="text-center max-w-sm text-lg font-light">Travel is the only purchase that enriches you in ways beyond material wealth.</p> */}
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl px-8 py-10">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Welcome</h2>
          <p className="text-center text-gray-500 mb-6">Login with Email</p>

          <div className="mb-4">
            <label className="text-gray-700 mb-1 block">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input type="email" placeholder="triphub@mail.com" className="w-full outline-none"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-700 mb-1 block">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <FaLock className="text-gray-400 mr-2" />
              <input type="password" placeholder="********" className="w-full outline-none"
                onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>

          <div className="text-right text-sm text-blue-600 hover:underline cursor-pointer mb-4">
            Forgot your password?
          </div>

          <button onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition mb-4">
            LOGIN
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
            Don’t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Register Now</Link>
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