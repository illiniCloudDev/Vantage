import { Link, useNavigate } from 'react-router-dom';
import { ChartArea } from 'lucide-react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false); // Update the login state
    navigate('/'); // Redirect to home page after logout
  };

  return (
    <nav className="border-b border-[#1f293a] py-4 bg-[#0d172a]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand - Always Shows */}
        <Link to="/" className="flex items-center gap-2">
          <ChartArea className="text-[#38bdf8] w-7 h-7" /> 
          <span className="text-3xl font-bold text-white tracking-tight">Vantage</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          {/* Conditional Links */}
          {isLoggedIn ? (
            // LOGGED IN VIEW
            <>
              <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link to="/market" className="hover:text-white">Market News</Link>
              <button onClick={handleLogout} className="px-5 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition">
                Logout
              </button>
            </>
          ) : (
            // LOGGED OUT VIEW
            <>
              <Link to="#investing" className="hover:text-white">Investing</Link>
              <Link to="#markets" className="hover:text-white">Markets</Link>
              <Link to="/login" className="px-5 py-2 border border-[#38bdf8] rounded-full text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0a1120] transition">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;