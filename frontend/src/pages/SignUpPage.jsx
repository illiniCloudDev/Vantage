import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { userName, email, password, confirmPassword } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Sending userName, email, and password to match your register controller
      const res = await axios.post('/api/auth/register', { userName, email, password });
      
      console.log('User Registered:', res.data);
      alert('Account created! Redirecting to login...');
      navigate('/login'); 
    } catch (err) {
      // This will now catch your Mongoose validation errors (like "Please add username")
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Join Vantage</h1>
      
      <div className="w-full max-w-md">
        <form 
          onSubmit={onSubmit} 
          className="bg-[#0d172a] shadow-2xl rounded-3xl px-10 pt-8 pb-10 mb-4 border border-[#1f293a]"
        >
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="userName">
              Username
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="userName" 
              type="text" 
              value={userName}
              onChange={onChange}
              placeholder="JohnAppleSeed" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="email" 
              type="email" 
              value={email}
              onChange={onChange}
              placeholder="name@example.com" 
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="password" 
              type="password" 
              value={password}
              onChange={onChange}
              placeholder="Min. 8 characters" 
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="confirmPassword" 
              type="password" 
              value={confirmPassword}
              onChange={onChange}
              placeholder="••••••••" 
              required
            />
          </div>

          <button 
            className="w-full bg-[#f87338] hover:bg-[#fa9669] text-[#0a1120] font-bold py-3 px-4 rounded-xl transform hover:scale-[1.02] transition-all mb-4" 
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-[#94a3b8]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#38bdf8] hover:underline">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;