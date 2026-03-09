import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogOut } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50 glass-morphism border-b border-park-gold/20 py-4 px-8 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <Car className="text-park-gold w-8 h-8" />
        <span className="text-2xl font-bold tracking-tighter text-white">PARK<span className="text-park-gold">STORY</span></span>
      </Link>
      
      <div className="flex items-center space-x-8">
        {user ? (
          <>
            <span className="text-park-gold italic font-medium">Welcome, {user.name}</span>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-white hover:text-park-gold transition-colors">Dashboard</Link>
            <button 
              onClick={() => { onLogout(); navigate('/'); }}
              className="flex items-center space-x-1 text-red-400 hover:text-red-500 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-white hover:text-park-gold transition-colors">Login</Link>
            <Link to="/signup" className="bg-park-gold text-park-dark px-6 py-2 rounded-full font-bold hover:bg-yellow-600 transition-all gold-shadow">
              Join the Society
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
