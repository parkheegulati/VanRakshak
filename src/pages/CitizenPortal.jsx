import { useState } from 'react';
import { Upload, MapPin, Send, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CitizenPortal() {
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    district: '',
    state: '',
    area: '',
    coordinates: '',
  });

  const handleLocationDetect = (e) => {
    e.preventDefault();
    // Simulate GPS detection
    setFormData({...formData, coordinates: '20.145, 83.562'});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Claim submitted successfully! Your tracking ID is: FRA-5012');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-bold font-sora text-[var(--color-forest-green)]">File a Claim</h1>
          <p className="text-gray-500 mt-1 font-serif">Submit a new FRA claim application</p>
        </div>
        
        <div className="flex gap-2">
          {['Eng', 'हिन्दी', 'ଓଡ଼ିଆ', 'मराठी'].map((lang, i) => (
            <button key={lang} className={`text-xs px-2 py-1 rounded ${i === 0 ? 'bg-[var(--color-earth-brown)] text-white font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name of Claimant / FRC</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all"
                placeholder="e.g., Ram Singh"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
              <select required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all bg-white">
                <option value="">Select State</option>
                <option value="chhattisgarh">Chhattisgarh</option>
                <option value="maharashtra">Maharashtra</option>
                <option value="odisha">Odisha</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">District</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all"
                placeholder="District Name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Village</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all"
                placeholder="Village Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Claimed Area (Hectares)</label>
              <input 
                required
                type="number" 
                step="0.1"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all"
                placeholder="e.g., 2.5"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">GPS Coordinates (Optional)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.coordinates}
                  onChange={e => setFormData({...formData, coordinates: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-forest-green)] focus:border-transparent transition-all"
                  placeholder="Latitude, Longitude"
                />
                <button 
                  onClick={handleLocationDetect}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <MapPin size={18} /> Auto Detect
                </button>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload Documents (PDF/JPG)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <Upload size={32} className="mx-auto text-gray-400 group-hover:text-[var(--color-forest-green)] mb-3" />
                <p className="text-sm font-medium text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">Gram Sabha resolution, identity proof, evidence of possession</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-[var(--color-forest-green)] hover:bg-[#153426] text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2 shadow-lg">
              <Send size={20} /> Submit Application
            </button>
          </div>
        </form>
      </div>

      {/* Track Link */}
      <div className="bg-[var(--color-earth-brown)] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4">
          <FileText size={200} />
        </div>
        
        <div className="relative z-10 mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-2xl font-bold font-sora mb-2">Already filed a claim?</h3>
          <p className="text-white/80 max-w-md">Track the real-time status of your application across different verification stages.</p>
        </div>
        
        <Link to="/track" className="relative z-10 bg-white text-[var(--color-earth-brown)] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap">
          Track My Claim
        </Link>
      </div>
    </div>
  );
}
