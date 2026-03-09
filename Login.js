import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      onLogin(res.data);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garage-dark bg-cover bg-center flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-park-dark/80 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md glass-morphism rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-park-gold italic">Continue your story with ParkStory</p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="email" 
                required 
                className="w-full bg-park-accent border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-park-gold transition-colors"
                placeholder="you@regal.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Security Phrase</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                type="password" 
                required 
                className="w-full bg-park-accent border border-gray-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-park-gold transition-colors"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-park-gold text-park-dark font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-yellow-600 transition-all gold-shadow active:scale-[0.98]"
          >
            {loading ? 'Authenticating...' : (
              <>
                <span>Enter Terminal</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-400">
          New to the facility? <Link to="/signup" className="text-park-gold hover:underline font-semibold">Request Entry</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
