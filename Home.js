import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="h-screen bg-garage-dark bg-cover bg-center flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-park-dark via-park-dark/80 to-transparent"></div>
        
        <div className="relative z-10 container mx-auto px-8 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-park-gold uppercase tracking-[0.3em] font-semibold mb-4">The Chronicles of Space</h2>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight mb-8">
              Where Your <br />
              Legend Rests.
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Experience the next chapter of urban management. 200 slots of meticulously curated sanctuary for your vehicles, managed by intelligence, secured by legacy.
            </p>
            <div className="flex space-x-4">
              <Link to="/signup" className="bg-park-gold text-park-dark px-10 py-4 rounded-md font-bold text-lg hover:bg-yellow-600 transition-all flex items-center">
                Reserve Your Legacy <ChevronRight className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Narrative Features */}
      <div className="bg-park-dark py-24 px-8">
        <div className="container mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Shield className="text-park-gold w-10 h-10" />}
            title="Sovereign Security"
            desc="Every vehicle identified and protected. Admin oversight ensuring only the Elite occupy the slots."
          />
          <FeatureCard 
            icon={<Clock className="text-park-gold w-10 h-10" />}
            title="Timeless Management"
            desc="Automatic reminders and payment tracking. We handle the minutes so you can enjoy the hours."
          />
          <FeatureCard 
            icon={<MapPin className="text-park-gold w-10 h-10" />}
            title="Strategic Allocation"
            desc="200 designated zones. Choose between Permanent residency or Temporary visitation."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:border-park-gold/50 transition-all"
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;
