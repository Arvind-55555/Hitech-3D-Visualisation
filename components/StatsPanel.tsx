
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const employeeData = [
  { name: 'Google', employees: 13000, growth: 8.5 },
  { name: 'Microsoft', employees: 11000, growth: 7.2 },
  { name: 'Amazon', employees: 15000, growth: 9.1 },
  { name: 'Meta', employees: 4000, growth: 5.8 },
  { name: 'TCS', employees: 25000, growth: 6.3 },
  { name: 'Infosys', employees: 18000, growth: 7.5 },
  { name: 'Wipro', employees: 12000, growth: 6.8 },
];

const growthData = [
  { month: 'Jan', growth: 4.2 },
  { month: 'Feb', growth: 5.1 },
  { month: 'Mar', growth: 5.8 },
  { month: 'Apr', growth: 6.5 },
  { month: 'May', growth: 7.2 },
  { month: 'Jun', growth: 7.8 },
];

const sectorData = [
  { name: 'IT Services', value: 45, color: '#06b6d4' },
  { name: 'Product Dev', value: 25, color: '#8b5cf6' },
  { name: 'Startups', value: 15, color: '#10b981' },
  { name: 'Consulting', value: 10, color: '#f59e0b' },
  { name: 'Others', value: 5, color: '#64748b' },
];

const StatsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'growth' | 'sectors'>('overview');

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
      {/* Tab Navigation */}
      <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-2 shadow-2xl sticky top-0 z-10">
        <div className="flex gap-1.5">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'growth', label: 'Growth', icon: '📈' },
            { id: 'sectors', label: 'Sectors', icon: '🏢' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="block text-base mb-1">{tab.icon}</span>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Market Intelligence
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={employeeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tick={{ fill: '#94a3b8' }} angle={-45} textAnchor="end" height={60} />
                  <YAxis stroke="#94a3b8" fontSize={9} tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Bar dataKey="employees" fill="#0891b2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right">Hitech City Employment Data</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Indicators
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Total Tech Parks</span>
                <span className="text-sm font-bold text-white">42+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Innovation Hubs</span>
                <span className="text-sm font-bold text-cyan-400">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Office Occupancy</span>
                <span className="text-sm font-bold text-green-400">92%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
                <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-700">
                <span className="text-xs text-slate-400">Total Workforce</span>
                <span className="text-sm font-bold text-purple-400">98K+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Startups</span>
                <span className="text-sm font-bold text-yellow-400">850+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Avg. Salary</span>
                <span className="text-sm font-bold text-green-400">₹12.5L</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Growth Tab */}
      {activeTab === 'growth' && (
        <>
          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Growth Trends
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="growth" stroke="#10b981" fillOpacity={1} fill="url(#colorGrowth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 text-right">Monthly Growth Rate (%)</p>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-4">Company Growth Rates</h3>
            <div className="space-y-3">
              {employeeData.map((company, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-300 font-medium">{company.name}</span>
                      <span className="text-xs font-bold text-green-400">+{company.growth}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-green-500 h-1.5 rounded-full transition-all" 
                        style={{ width: `${(company.growth / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Sectors Tab */}
      {activeTab === 'sectors' && (
        <>
          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Sector Distribution
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-5 shadow-2xl">
            <h3 className="text-white font-bold mb-4">Sector Breakdown</h3>
            <div className="space-y-3">
              {sectorData.map((sector, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sector.color }}></div>
                    <span className="text-xs text-slate-300">{sector.name}</span>
                  </div>
                  <span className="text-sm font-bold text-white">{sector.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      
      <div className="bg-cyan-600/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-4 shadow-2xl">
        <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">Upcoming Event</h4>
        <p className="text-white text-sm font-medium">Global AI Summit 2025</p>
        <p className="text-cyan-300/70 text-[10px] mt-1">HICC, Novotel Hyderabad</p>
      </div>
    </div>
  );
};

export default StatsPanel;
