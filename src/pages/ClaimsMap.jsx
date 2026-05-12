import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { Filter, Eye } from 'lucide-react';
import { mockClaims } from '../data/mockData';

// Fix for default Leaflet marker icons not showing in React Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function ClaimsMap() {
  const [filterState, setFilterState] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredClaims = mockClaims.filter(claim => {
    if (filterState !== 'All' && claim.state !== filterState) return false;
    if (filterStatus !== 'All' && claim.status !== filterStatus) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return '#22c55e'; // Green
      case 'Pending': return '#eab308'; // Yellow
      case 'Rejected': return '#ef4444'; // Red
      case 'Conflict': return '#f97316'; // Orange
      default: return '#3b82f6';
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Top Filter Bar */}
      <div className="bg-white p-4 shadow-sm z-10 flex gap-4 items-center flex-wrap">
        <Filter size={20} className="text-gray-400" />
        <select 
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-forest-green)]"
          value={filterState}
          onChange={(e) => setFilterState(e.target.value)}
        >
          <option value="All">All States</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Odisha">Odisha</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
        
        <select 
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-forest-green)]"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Conflict">Conflict</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="flex-1 z-0 relative">
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredClaims.map((claim) => (
            <CircleMarker
              key={claim.id}
              center={[claim.lat, claim.lng]}
              radius={8}
              pathOptions={{
                fillColor: getStatusColor(claim.status),
                color: '#fff',
                weight: 2,
                fillOpacity: 0.9
              }}
            >
              <Popup className="rounded-xl overflow-hidden shadow-lg">
                <div className="min-w-[200px]">
                  <div className="bg-[var(--color-forest-green)] text-white p-3 font-sora font-semibold">
                    {claim.id}
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-bold text-[var(--color-earth-brown)]">{claim.name}</p>
                    <p className="text-sm text-gray-600 my-1">{claim.village}, {claim.district}</p>
                    <p className="text-sm mb-3"><strong>Area:</strong> {claim.area} Hectares</p>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-bold mb-4" 
                          style={{backgroundColor: `${getStatusColor(claim.status)}20`, color: getStatusColor(claim.status)}}>
                      {claim.status}
                    </span>
                    <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <Eye size={16} /> View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Bottom-left Legend */}
        <div className="absolute bottom-6 left-6 z-[400] bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <h4 className="font-sora font-semibold text-sm mb-3 text-gray-800">Map Legend</h4>
          <div className="space-y-2">
            <LegendItem color="#eab308" label="Pending Claims" />
            <LegendItem color="#22c55e" label="Approved Claims" />
            <LegendItem color="#ef4444" label="Rejected Claims" />
            <LegendItem color="#f97316" label="Conflict / Overlap" />
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }}></div>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
  );
}
