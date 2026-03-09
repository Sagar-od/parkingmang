import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Search, CreditCard, Filter, X } from 'lucide-react';

const AdminDashboard = () => {
  const [slots, setSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: '', plateNumber: '', vehicleType: 'Permanent', slotNumber: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/parking/slots', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSlots(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/parking/assign', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsModalOpen(false);
      fetchSlots();
      setFormData({ email: '', plateNumber: '', vehicleType: 'Permanent', slotNumber: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Action failed');
    }
  };

  const handleRemove = async (slot) => {
    if (window.confirm('Are you sure you want to remove this legacy vehicle?')) {
      try {
        await axios.delete(`http://localhost:5000/api/parking/remove/${slot}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSlots();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleExtendPayment = async (slot) => {
    try {
      await axios.patch(`http://localhost:5000/api/parking/payment/${slot}`, { monthsToAdd: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSlots();
      alert(`Slot #${slot} payment extended by 1 month.`);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSlots = slots.filter(s => {
    const matchesSearch = s.vehicleDetails?.plateNumber?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.slotNumber.toString() === searchTerm;
    const matchesFilter = filterType === 'All' || 
                          (filterType === 'Occupied' && s.occupied) || 
                          (filterType === 'Vacant' && !s.occupied) ||
                          (filterType === 'Overdue' && s.vehicleDetails?.paymentStatus === 'Overdue');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-24 pb-12 px-8 min-h-screen bg-park-dark">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold border-l-4 border-park-gold pl-4">Estate Management</h1>
            <p className="text-gray-400 mt-2">Overseeing 200 slots of meticulously assigned sanctuary.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-park-gold text-park-dark font-bold px-6 py-3 rounded-lg flex items-center space-x-2 hover:scale-105 transition-transform gold-shadow"
          >
            <Plus size={20} />
            <span>Assign New Vehicle</span>
          </button>
        </header>

        {/* Dashboard Tools */}
        <div className="glass-morphism rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" placeholder="Search by Slot or Plate Number..." 
              className="w-full bg-park-accent border border-gray-700/50 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-park-gold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="text-park-gold" size={20} />
            <select 
              className="bg-park-accent border border-gray-700/50 rounded-xl py-3 px-6 text-white outline-none focus:border-park-gold"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Slots</option>
              <option value="Occupied">Occupied</option>
              <option value="Vacant">Vacant</option>
              <option value="Overdue">Overdue Payment</option>
            </select>
          </div>
        </div>

        {/* Visual Slot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-3 max-h-[600px] overflow-y-auto custom-scrollbar p-2">
          {filteredSlots.map(slot => (
            <div 
              key={slot.slotNumber}
              className={`relative h-24 rounded-xl flex flex-col items-center justify-center transition-all border shrink-0
                ${slot.occupied ? 'bg-park-accent border-park-gold/40' : 'bg-transparent border-gray-700 hover:border-park-gold/20'}
              `}
            >
              <span className="text-xs font-bold text-gray-500 mb-1">{slot.slotNumber.toString().padStart(3, '0')}</span>
              {slot.occupied ? (
                <>
                  <span className="text-xs text-park-gold font-mono">{slot.vehicleDetails.plateNumber}</span>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {slot.vehicleDetails.paymentStatus === 'Overdue' && (
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    )}
                  </div>
                  <div className="absolute -bottom-2 flex space-x-1 opacity-100 group">
                     {/* Show buttons on hover in real UI, here they are static for ease */}
                     <button onClick={() => handleRemove(slot.slotNumber)} className="p-1 bg-red-900/80 rounded hover:bg-red-700"><Trash2 size={12} /></button>
                     <button onClick={() => handleExtendPayment(slot.slotNumber)} className="p-1 bg-green-900/80 rounded hover:bg-green-700"><CreditCard size={12} /></button>
                  </div>
                </>
              ) : (
                <span className="text-[10px] text-gray-600 uppercase tracking-widest">Available</span>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
            <div className="relative w-full max-w-md glass-morphism rounded-3xl p-8 border border-park-gold/30">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsModalOpen(false)}><X /></button>
              <h2 className="text-2xl font-bold mb-6 text-white">Assign Sanctuary</h2>
              <form onSubmit={handleAssign} className="space-y-4">
                <div>
                  <label className="text-xs text-park-gold uppercase tracking-widest block mb-1">User Email</label>
                  <input required className="w-full bg-park-accent border border-gray-700 rounded-lg p-2.5 text-white" 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-park-gold uppercase tracking-widest block mb-1">Plate Number</label>
                    <input required className="w-full bg-park-accent border border-gray-700 rounded-lg p-2.5 text-white" 
                      value={formData.plateNumber} onChange={e => setFormData({...formData, plateNumber: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-xs text-park-gold uppercase tracking-widest block mb-1">Slot No (1-200)</label>
                    <input required type="number" min="1" max="200" className="w-full bg-park-accent border border-gray-700 rounded-lg p-2.5 text-white" 
                      value={formData.slotNumber} onChange={e => setFormData({...formData, slotNumber: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-park-gold uppercase tracking-widest block mb-1">Vehicle Residency Type</label>
                  <select className="w-full bg-park-accent border border-gray-700 rounded-lg p-2.5 text-white" 
                    value={formData.vehicleType} onChange={e => setFormData({...formData, vehicleType: e.target.value})}>
                    <option value="Permanent">Permanent Resident</option>
                    <option value="Temporary">Temporary Guest</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-park-gold text-park-dark font-bold py-3 pt-4 rounded-xl mt-4 gold-shadow">
                  Authorize Entry
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
