import { mockAlerts, mockClaims } from '../data/mockData';
import { ShieldAlert, AlertTriangle, Info, Map as MapIcon, ArrowRight } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function AIAlerts() {
  const highAlerts = mockAlerts.filter(a => a.severity === 'High').length;

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'High': return <ShieldAlert size={20} className="text-red-600" />;
      case 'Medium': return <AlertTriangle size={20} className="text-orange-600" />;
      case 'Low': return <Info size={20} className="text-blue-600" />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Left side - Map View */}
      <div className="w-full md:w-1/2 h-64 md:h-full relative z-0 border-r border-gray-200">
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mockClaims.filter(c => c.status === 'Conflict' || c.overlap || c.protected).map((claim) => (
            <CircleMarker
              key={claim.id}
              center={[claim.lat, claim.lng]}
              radius={10}
              pathOptions={{
                fillColor: '#ef4444',
                color: '#fff',
                weight: 2,
                fillOpacity: 0.8
              }}
            >
              <Popup>
                <strong>{claim.id}</strong><br/>
                Status: {claim.status}
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
        
        <div className="absolute top-4 left-4 z-[400] bg-white p-3 rounded-lg shadow-md flex items-center gap-2 border border-gray-100">
          <MapIcon size={20} className="text-[var(--color-forest-green)]" />
          <span className="font-sora font-semibold text-sm">Conflict Zones</span>
        </div>
      </div>

      {/* Right side - Alerts Feed */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-slate-50 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-sora text-[var(--color-forest-green)]">AI Detection Feed</h2>
          <p className="text-sm text-gray-500 mt-1 font-serif">Automated spatial and document analysis</p>
          
          <div className="mt-4 inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-red-100">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            {highAlerts} Critical Alerts Detected
          </div>
        </div>

        <div className="space-y-4 pb-20 md:pb-0">
          {mockAlerts.map(alert => (
            <div key={alert.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <h3 className="font-bold text-gray-800">{alert.title}</h3>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {alert.message}
              </p>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500">AI Confidence:</div>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${alert.confidence > 90 ? 'bg-green-500' : alert.confidence > 75 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                      style={{width: `${alert.confidence}%`}}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-gray-700">{alert.confidence}%</span>
                </div>
                
                <button className="text-[var(--color-forest-green)] hover:text-[var(--color-amber-accent)] text-sm font-bold flex items-center gap-1 transition-colors">
                  Review <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
