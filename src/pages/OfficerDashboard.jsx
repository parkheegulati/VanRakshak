import { mockClaims } from '../data/mockData';
import { FileText, CheckCircle2, AlertTriangle, Clock, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function OfficerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('All');

  // For demo, we act as an SDLC officer (Stage 2)
  const myClaims = mockClaims.filter(c => c.stage === 2 || c.stage === 1);
  const pendingCount = myClaims.filter(c => c.status === 'Pending').length;
  const conflictCount = myClaims.filter(c => c.status === 'Conflict' || c.overlap).length;

  const filteredClaims = myClaims.filter(claim => {
    if (filterStage !== 'All' && claim.stage.toString() !== filterStage) return false;
    if (searchTerm && !claim.id.toLowerCase().includes(searchTerm.toLowerCase()) && !claim.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sora text-[var(--color-forest-green)]">Officer Dashboard</h1>
          <p className="text-gray-500 mt-1">SDLC Level (Sub-Divisional Level Committee)</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">My Pending Tasks</p>
            <h3 className="text-3xl font-bold font-sora text-gray-800 mt-1">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
            <Clock size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Approved Today</p>
            <h3 className="text-3xl font-bold font-sora text-gray-800 mt-1">12</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <CheckCircle2 size={24} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 font-medium">Escalated / Conflicts</p>
            <h3 className="text-3xl font-bold font-sora text-gray-800 mt-1">{conflictCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Claim ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-forest-green)] w-full sm:w-64"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
              value={filterStage}
              onChange={(e) => setFilterStage(e.target.value)}
            >
              <option value="All">All Stages</option>
              <option value="1">Gram Sabha (Stage 1)</option>
              <option value="2">SDLC (Stage 2)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Claim ID</th>
                <th className="px-6 py-4">Claimant Name</th>
                <th className="px-6 py-4">Area (Ha)</th>
                <th className="px-6 py-4">Filed Date</th>
                <th className="px-6 py-4">Days Pending</th>
                <th className="px-6 py-4">Current Stage</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold font-sora text-gray-800">{claim.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{claim.name}</div>
                    <div className="text-xs text-gray-500">{claim.village}, {claim.district}</div>
                  </td>
                  <td className="px-6 py-4">{claim.area}</td>
                  <td className="px-6 py-4 text-gray-600">{claim.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${claim.daysPending > 100 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                      {claim.daysPending} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    Stage {claim.stage}
                    {claim.overlap && (
                      <span className="block mt-1 text-xs text-red-500 font-medium flex items-center gap-1">
                        <AlertTriangle size={12} /> AI Conflict Flag
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Review Docs">
                        <FileText size={18} />
                      </button>
                      <button className="px-3 py-1 bg-[var(--color-forest-green)] text-white text-xs font-bold rounded hover:bg-[#153426] transition-colors">
                        Action
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredClaims.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No claims found matching your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
