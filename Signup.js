import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, UserCheck } from 'lucide-react';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', contact: '', address: '', role: 'customer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      onSignup(res.data);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-garage-dark bg-cover bg-center flex items-center justify-center p-4 py-24">
      <div className="absolute inset-0 bg-park-dark/80 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-xl glass-morphism rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">New Resident Registration</h2>
          <p className="text-park-gold italic">Begin your journey in our sanctuary</p>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg mb-6 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="text" required className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="email" required className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Security Code</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="password" required className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="text" required className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Residential Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="text" required className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Access Mode</label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <select className="w-full bg-park-accent border border-gray-700 rounded-xl py-2.5 pl-10 text-white focus:outline-none focus:border-park-gold" 
                  value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                  <option value="customer">Customer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="col-span-full bg-park-gold text-park-dark font-bold py-4 rounded-xl flex items-center justify-center space-x-2 hover:bg-yellow-600 gold-shadow">
            {loading ? 'Processing...' : 'Complete Initialization'}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already a resident? <Link to="/login" className="text-park-gold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
