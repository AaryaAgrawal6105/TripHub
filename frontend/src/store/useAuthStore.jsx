import { create } from 'zustand'
import { axiosInstance } from '../api';
import { toast } from 'react-toastify';

const BASE_URL = "http://localhost:5000"
export const useAuthStore = create((set, get) =>
({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    // isUpdatingProfile: false,



    checkAuth: async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return set({ authUser: null });

  try {
    const res = await axiosInstance.get('/auth/check-auth');
    console.log(res.data.user);
    set({ authUser: res.data.user });
  } catch (error) {
    console.log("Auth check failed", error.message);
    localStorage.removeItem('authToken');
    set({ authUser: null });
  }
},

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!gmailRegex.test(data.email)) {
                toast.error("Please enter a valid Gmail address");
                return;
            }
            const response = await axiosInstance.post('/auth/register', data);
            // console.log("response in the signup", response)
            set({ authUser: response.data })
            toast.success("Account created successfully");
            console.log("Redirecting to dashboard...");
            navigate('/dashboard');
        }
        catch (error) {
            const errorMsg =
                error.response?.data?.msg ||
                error.message ||
                "Signup failed";
            toast.error(errorMsg);
        } finally { set({ isSigningUp: false }) }
    },
    login: async (data, navigate) => {
  set({ isLogginIn: true });
  try {
    const response = await axiosInstance.post('/auth/login', data);

    const token = response.data.token; 
    localStorage.setItem('authToken', token);

    set({ authUser: response.data.user });  

    toast.success("Logged in successfully");
    navigate('/');  
  } catch (error) {
    const errorMsg = error.response?.data?.msg || error.message || "Login failed";
    toast.error(errorMsg);
  } finally {
    set({ isLogginIn: false });
  }
},

    logout: async () => {
        try {
            await axiosInstance.post('auth/logout');
            set({ authUser: null });
            localStorage.removeItem('authToken');
          
            
            toast.success('logged out successfully ')
           
        } catch (error) {
            toast.error("unable to logout")
        }
    },
    // updateProfile: async (data) => {
    //     set({ isUpdatingProfile: true });
    //     try {
    //         const res = await axiosInstance.put('/auth/update', data);
    //         set({ authUser: res.data });
    //         toast.success('profile pic updated successfully');

    //     } catch (error) {
    //         toast.error('unable to upload the profile pic')
    //     } finally {
    //         set({ isUpdatingProfile: false })
    //     }
    // },

})

)