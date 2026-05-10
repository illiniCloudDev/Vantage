import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api'

const LoginPage = ({setIsLoggedIn}) => {
  const navigate = useNavigate(); //initialize the useNavigate hook

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = api.post('/api/auth/login', {email, password});
      
      if(res.data.success){
        setIsLoggedIn(true);
        console.log('Login Successful');
        navigate('/dashboard')
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');      
    }
  }


  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#1f3764] ">
      <h1 className="text-4xl font-bold text-center mb-20 text-black">Login to Vantage</h1>
      
      <div className="w-full max-w-md">
        <form
        onSubmit={handleLogin} 
        className="bg-[#0d172a] shadow-2xl rounded-3xl px-10 pt-8 pb-10 mb-4 border border-[#1f293a]">
          
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              className="shadow-inner appearance-none border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white leading-tight focus:outline-none focus:border-[#38bdf8] transition-colors" 
              id="email"
              value={email}
              type="email" 
              placeholder="Email"
              onChange={onChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className="shadow-inner appearance-none border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white mb-3 leading-tight focus:outline-none focus:border-[#38bdf8] transition-colors" 
              id="password" 
              type="password"
              value={password}
              onChange={onChange}
              placeholder="**********" 
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="w-full bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0a1120] font-bold py-3 px-4 rounded-xl focus:outline-none transform hover:scale-[1.02] transition-all" 
              type="submit"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')} //navigate to the signup page on click
              className="w-full bg-[#f87338] hover:bg-[#fa9669] text-[#0a1120] font-bold py-3 px-4 rounded-xl focus:outline-none transform hover:scale-[1.02] transition-all" 
              type="button"
            >
              Sign Up
            </button>
            
            <a className="text-center font-bold text-sm text-[#38bdf8] hover:text-[#7dd3fc] transition-colors" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        
        <p className="text-center text-[#475569] text-xs">
          &copy;2026 Vantage Intel. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;