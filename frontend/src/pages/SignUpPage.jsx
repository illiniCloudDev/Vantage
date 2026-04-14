import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
    return(
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Join Vantage</h1>
      
      <div className="w-full max-w-md">
        <form className="bg-[#0d172a] shadow-2xl rounded-3xl px-10 pt-8 pb-10 mb-4 border border-[#1f293a]">
          
          <div className="mb-4">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="email" 
              type="email" 
              placeholder="name@company.com" 
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
              placeholder="••••••••" 
            />
          </div>

          <div className="mb-8">
            <label className="block text-[#94a3b8] text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input 
              className="shadow-inner border border-[#1f293a] rounded-xl w-full py-3 px-4 bg-[#0a1120] text-white focus:outline-none focus:border-[#f87338] transition-colors" 
              id="confirm-password" 
              type="password" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            className="w-full bg-[#f87338] hover:bg-[#fa9669] text-[#0a1120] font-bold py-3 px-4 rounded-xl transform hover:scale-[1.02] transition-all mb-4" 
            type="button"
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