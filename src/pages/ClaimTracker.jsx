import { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, MapPin } from 'lucide-react';
import { mockClaims } from '../data/mockData';

export default function ClaimTracker() {
  const [searchId, setSearchId] = useState('FRA-2847');
  const [activeClaim, setActiveClaim] = useState(mockClaims.find(c => c.id === 'FRA-2847'));
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const claim = mockClaims.find(c => c.id === searchId.toUpperCase());
    if (claim) {
      setActiveClaim(claim);
      setError('');
    } else {
      setActiveClaim(null);
      setError('Claim ID not found. Please try another.');
    }
  };

  const stages = [
    { id: 1, name: 'Gram Sabha (FRC)', officer: 'Village Committee', desc: 'Initial submission and community verification.' },
    { id: 2, name: 'Sub-Divisional Level (SDLC)', officer: 'SDM Officer', desc: 'Spatial verification and document validation.' },
    { id: 3, name: 'District Level (DLC)', officer: 'District Collector', desc: 'Final review and approval processing.' },
    { id: 4, name: 'Final Outcome', officer: 'Title Generation', desc: 'Distribution of land title deed.' }
  ];

  const getStageStatus = (stageId, currentStage, status) => {
    if (stageId < currentStage) return 'completed';
    if (stageId === currentStage && status === 'Rejected') return 'rejected';
    if (stageId === currentStage) return 'in-progress';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold font-sora text-[var(--color-forest-green)]">Track Claim Lifecycle</h1>
        <p className="text-gray-600 mt-2 font-serif">Enter your Claim ID to view real-time status and spatial verification progress.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-12 relative max-w-lg mx-auto">
        <input 
          type="text" 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="e.g., FRA-2847"
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-earth-brown)] font-semibold uppercase text-gray-700"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--color-forest-green)] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[var(--color-earth-brown)] transition-colors">
          Track
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium border border-red-100 max-w-lg mx-auto">
          {error}
        </div>
      )}

      {activeClaim && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-slate-50 p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-bold font-sora text-gray-800">{activeClaim.id}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                  ${activeClaim.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                    activeClaim.status === 'Rejected' ? 'bg-red-100 text-red-700' : 
                    activeClaim.status === 'Conflict' ? 'bg-orange-100 text-orange-700' : 
                    'bg-yellow-100 text-yellow-700'}`}
                >
                  {activeClaim.status}
                </span>
              </div>
              <p className="text-gray-500 font-medium">{activeClaim.name}</p>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Claimed Area</p>
                <p className="font-semibold text-gray-700">{activeClaim.area} Ha</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Location</p>
                <p className="font-semibold text-gray-700 flex items-center gap-1">
                  <MapPin size={14} className="text-[var(--color-earth-brown)]" />
                  {activeClaim.district}, {activeClaim.state}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8">
                {stages.map((stage, index) => {
                  const status = getStageStatus(stage.id, activeClaim.stage, activeClaim.status);
                  
                  return (
                    <div key={stage.id} className="relative flex items-start gap-6">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0
                        ${status === 'completed' ? 'bg-green-500 text-white' : 
                          status === 'in-progress' ? 'bg-[var(--color-amber-accent)] text-white' : 
                          status === 'rejected' ? 'bg-red-500 text-white' : 
                          'bg-gray-100 text-gray-400'}`}
                      >
                        {status === 'completed' ? <CheckCircle2 size={24} /> : 
                         status === 'in-progress' ? <Clock size={24} className="animate-pulse" /> : 
                         status === 'rejected' ? <AlertCircle size={24} /> : 
                         <span className="font-bold text-lg">{stage.id}</span>}
                      </div>
                      
                      <div className={`pt-1.5 ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
                        <div className="flex flex-wrap items-baseline gap-2 mb-1">
                          <h3 className="text-lg font-bold font-sora text-gray-800">{stage.name}</h3>
                          {status === 'in-progress' && activeClaim.daysPending > 0 && (
                            <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                              Pending for {activeClaim.daysPending} days
                            </span>
                          )}
                          {index === 0 && (
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              Filed on: {activeClaim.date}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[var(--color-forest-green)] font-medium mb-1">Officer: {stage.officer}</p>
                        <p className="text-sm text-gray-500">{stage.desc}</p>
                        
                        {/* Optional specific remarks logic */}
                        {status === 'in-progress' && activeClaim.overlap && stage.id === 2 && (
                          <div className="mt-3 p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r text-sm text-orange-800">
                            <strong>AI Alert Flagged:</strong> Spatial overlap detected. Awaiting SDLC manual verification.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
