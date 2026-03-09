import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Car, CreditCard, Bell, MapPin, Calendar, Info } from 'lucide-react';

const CustomerDashboard = () => {
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/parking/my-vehicle', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVehicle(res.data);
    } catch (err) {
      console.log('No vehicle found or error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="pt-32 text-center text-park-gold">Consulting the archives...</div>;

  return (
    <div className="pt-24 pb-12 px-8 min-h-screen bg-park-dark">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Profile Info */}
          <div className="flex-1 space-y-8">
            <header>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Personal Sanctuary</h1>
              <p className="text-gray-400 mt-1">Status of your legacy residency at ParkStory.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
              <InfoCard icon={<Info className="text-park-gold" />} title="ID Credentials" value={user.customerId} />
              <InfoCard icon={<MapPin className="text-park-gold" />} title="Registered Address" value={user.address} />
              <InfoCard icon={<Calendar className="text-park-gold" />} title="Registry Date" value={new Date(user.createdAt).toLocaleDateString()} />
              <InfoCard icon={<CreditCard className="text-park-gold" />} title="Financial Authority" value={vehicle?.paymentStatus === 'Paid' ? 'In Good Standing' : (vehicle ? 'Action Required' : 'None Assigned')} color={vehicle?.paymentStatus === 'Paid' ? 'text-green-400' : 'text-red-400'} />
            </div>

            {vehicle ? (
              <div className="glass-morphism rounded-3xl overflow-hidden">
                <div className="bg-park-gold/10 p-6 border-b border-park-gold/20 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <Car className="text-park-gold w-8 h-8" />
                    <h2 className="text-2xl font-bold text-white">Verified Vehicle</h2>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold ${vehicle.vehicleType === 'Permanent' ? 'bg-park-gold text-park-dark' : 'bg-gray-700 text-white'}`}>
                    {vehicle.vehicleType}
                  </span>
                </div>
                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                  <Stat label="Slot Number" value={`#${vehicle.slotNumber}`} sub="Reserved Space" />
                  <Stat label="Plate Number" value={vehicle.plateNumber} sub="Unique Identity" />
                  <Stat label="Paid Until" value={new Date(vehicle.paidUntil).toLocaleDateString()} sub="Expiration Cycle" />
                </div>
              </div>
            ) : (
              <div className="p-12 border-2 border-dashed border-gray-700 rounded-3xl text-center">
                <p className="text-gray-500 text-lg">No vehicle has been assigned to your lineage yet. Please contact the Estate Admin.</p>
              </div>
            )}
          </div>

          {/* Side Notifications Channel */}
          <div className="w-full md:w-80 space-y-6">
            <div className="glass-morphism rounded-3xl p-6 border border-park-gold/20 flex flex-col h-[500px]">
              <div className="flex items-center space-x-2 mb-6 text-park-gold">
                <Bell size={20} />
                <h3 className="text-xl font-bold">The Oracle Channel</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                {vehicle?.notifications?.length > 0 ? (
                  [...vehicle.notifications].reverse().map((note, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border-l-2 border-park-gold animate-in fade-in slide-in-from-right-4">
                      <p className="text-sm text-gray-200 mb-2 leading-relaxed">{note.message}</p>
                      <span className="text-[10px] text-gray-500">{new Date(note.date).toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 italic text-center mt-20">Silence follows serenity. No alerts found.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, value, color = "text-white" }) => (
  <div className="bg-park-accent/50 p-6 rounded-2xl border border-gray-800">
    <div className="flex items-center space-x-3 mb-2">
      {icon}
      <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{title}</span>
    </div>
    <p className={`text-lg font-semibold truncate ${color}`}>{value}</p>
  </div>
);

const Stat = ({ label, value, sub }) => (
  <div>
    <p className="text-xs text-park-gold uppercase tracking-tighter mb-1">{label}</p>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    <p className="text-[10px] text-gray-500 italic">{sub}</p>
  </div>
);

export default CustomerDashboard;
