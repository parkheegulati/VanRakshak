import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Layers, FileCheck, Clock, ShieldAlert } from 'lucide-react';

const districtData = [
  { name: 'Kalahandi', claims: 1250 },
  { name: 'Bastar', claims: 980 },
  { name: 'Gadchiroli', claims: 850 },
  { name: 'Rayagada', claims: 720 },
  { name: 'Surguja', claims: 650 },
  { name: 'Kandhamal', claims: 590 },
  { name: 'Nandurbar', claims: 510 },
];

const monthlyData = [
  { month: 'Jan', submissions: 400 },
  { month: 'Feb', submissions: 550 },
  { month: 'Mar', submissions: 480 },
  { month: 'Apr', submissions: 610 },
  { month: 'May', submissions: 750 },
  { month: 'Jun', submissions: 820 },
  { month: 'Jul', submissions: 950 },
  { month: 'Aug', submissions: 1100 },
  { month: 'Sep', submissions: 1050 },
  { month: 'Oct', submissions: 1200 },
  { month: 'Nov', submissions: 1350 },
  { month: 'Dec', submissions: 1500 },
];

const statusData = [
  { name: 'Approved', value: 59.8, color: '#22c55e' },
  { name: 'Pending', value: 25.4, color: '#eab308' },
  { name: 'Rejected', value: 10.2, color: '#ef4444' },
  { name: 'Conflict', value: 4.6, color: '#f97316' },
];

export default function Analytics() {
  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-sora text-[var(--color-forest-green)]">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-1">Policymaker overview of FRA implementation performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KpiCard title="Total Claims" value="14,284" icon={<Layers size={24} />} color="text-blue-600" bg="bg-blue-100" />
        <KpiCard title="Approval Rate" value="59.8%" icon={<FileCheck size={24} />} color="text-green-600" bg="bg-green-100" />
        <KpiCard title="Avg. Processing" value="42 Days" icon={<Clock size={24} />} color="text-orange-600" bg="bg-orange-100" />
        <KpiCard title="Conflict Zones" value="657" icon={<ShieldAlert size={24} />} color="text-red-600" bg="bg-red-100" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Submissions Trend */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-sora font-bold text-gray-800 mb-6">Monthly Submissions (12mo Trend)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="submissions" stroke="var(--color-forest-green)" strokeWidth={3} dot={{r: 4, fill: 'var(--color-forest-green)'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-sora font-bold text-gray-800 mb-6">Claims by Status (%)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Performance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="font-sora font-bold text-gray-800 mb-6">Top Districts by Volume</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="claims" fill="var(--color-earth-brown)" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-4 rounded-xl ${bg} ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold font-sora text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
