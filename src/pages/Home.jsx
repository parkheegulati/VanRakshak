import { Link } from 'react-router-dom';
import { Map, FileText, UserSquare, ArrowRight, ShieldCheck, TreePine, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="bg-[var(--color-forest-green)] text-white py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 translate-x-1/3 -translate-y-1/4">
          <TreePine size={400} />
        </div>
        
        <div className="max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-sora leading-tight mb-6 text-[var(--color-amber-accent)]">
            VANRAKSHAK
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-10 font-serif leading-relaxed">
            VanRakshak is an AI-powered WebGIS platform ensuring transparent and efficient 
            implementation of the Forest Rights Act (FRA), empowering communities and enabling data-driven governance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/map" className="flex items-center justify-center gap-2 bg-[var(--color-amber-accent)] hover:bg-[#b8860b] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <Map size={20} /> View Claims Map
            </Link>
            <Link to="/file-claim" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-medium transition-all">
              <FileText size={20} /> File a Claim
            </Link>
            <Link to="/officer" className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white px-6 py-3 rounded-xl font-medium transition-all">
              <UserSquare size={20} /> Officer Login
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Claims Filed" 
            value="14,284" 
            trend="+12% this month"
            icon={<FileText className="text-[var(--color-forest-green)]" size={24} />}
            color="border-l-4 border-l-[var(--color-forest-green)]"
          />
          <StatCard 
            title="Approved Claims" 
            value="8,542" 
            trend="59.8% approval rate"
            icon={<ShieldCheck className="text-[var(--color-amber-accent)]" size={24} />}
            color="border-l-4 border-l-[var(--color-amber-accent)]"
          />
          <StatCard 
            title="Pending Claims" 
            value="5,742" 
            trend="Avg. 42 days pending"
            icon={<AlertTriangle className="text-[var(--color-danger-red)]" size={24} />}
            color="border-l-4 border-l-[var(--color-danger-red)]"
          />
        </div>
      </div>

      {/* Features Overview */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-3xl font-bold font-sora text-[var(--color-forest-green)] mb-12 text-center">Platform Capabilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Interactive WebGIS"
            desc="Visualize claims spatially with overlay of protected areas, historical boundaries, and potential conflict zones."
            linkTo="/map"
          />
          <FeatureCard 
            title="AI Conflict Detection"
            desc="Automated spatial analysis identifying overlaps, anomalies, and potential disputes before they escalate."
            linkTo="/alerts"
          />
          <FeatureCard 
            title="Transparent Tracking"
            desc="End-to-end visibility of claim lifecycle from Gram Sabha submission to final DLC approval outcome."
            linkTo="/track"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon, color }) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg ${color}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-lg bg-slate-50">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-[var(--color-forest-green)] font-sora mt-1">{value}</h3>
        <p className="text-xs text-gray-400 mt-2">{trend}</p>
      </div>
    </div>
  );
}

function FeatureCard({ title, desc, linkTo }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
      <h3 className="text-xl font-bold font-sora text-[var(--color-earth-brown)] mb-3">{title}</h3>
      <p className="text-gray-600 mb-6 leading-relaxed">{desc}</p>
      <Link to={linkTo} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-forest-green)] group-hover:text-[var(--color-amber-accent)] transition-colors">
        Explore <ArrowRight size={16} />
      </Link>
    </div>
  );
}
