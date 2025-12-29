
import React, { useState, useRef, useEffect } from 'react';
import MapContainer, { MapRef } from './components/MapContainer';
import Sidebar from './components/Sidebar';
import StatsPanel from './components/StatsPanel';

type MainTab = 'ai' | 'map' | 'data';

const App: React.FC = () => {
  const mapRef = useRef<MapRef>(null);
  const [activeTab, setActiveTab] = useState<MainTab>('ai');
  const [mapStyle, setMapStyle] = useState('dark-v11');
  const [traffic, setTraffic] = useState(false);
  const [terrain, setTerrain] = useState(true);

  const handleFocusLandmark = (id: string) => {
    setActiveTab('map');
    setTimeout(() => {
      mapRef.current?.flyToLandmark(id);
    }, 100);
  };

  const handleQueryResponse = (shouldShowMap: boolean, landmarkId?: string) => {
    if (shouldShowMap) {
      setActiveTab('map');
      if (landmarkId) {
        setTimeout(() => {
          mapRef.current?.flyToLandmark(landmarkId);
        }, 100);
      }
    }
  };

  return (
    <div className="w-screen h-screen relative bg-slate-950 text-white overflow-hidden font-sans">
      {/* Main Tab Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight uppercase">HITEC <span className="text-cyan-400">Prime</span></h1>
              <p className="text-[9px] text-slate-500 font-bold tracking-[0.2em]">Geospatial Intelligence</p>
            </div>
          </div>

          <div className="flex gap-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'ai'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'map'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map Visualization
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'data'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Data Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-16 h-full">
        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="h-full">
            <Sidebar onFocusLandmark={handleFocusLandmark} onQueryResponse={handleQueryResponse} />
          </div>
        )}

        {/* Map Visualization Tab */}
        {activeTab === 'map' && (
          <main className="h-full relative">
            <MapContainer 
              ref={mapRef} 
              style={mapStyle} 
              showTraffic={traffic}
              showTerrain={terrain}
            />
            
            {/* Environment Control Dashboard */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-40 items-end">
              <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 p-2.5 rounded-2xl flex gap-1.5 shadow-2xl">
                {[
                  { id: 'dark-v11', label: 'CYBER', icon: '🌙' },
                  { id: 'satellite-streets-v12', label: 'REAL', icon: '🛰️' },
                  { id: 'light-v11', label: 'CORE', icon: '☀️' }
                ].map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setMapStyle(s.id)}
                    className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      mapStyle === s.id 
                        ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30' 
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="block text-lg mb-1">{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setTraffic(!traffic)}
                  className={`px-4 py-3 rounded-xl border backdrop-blur-md transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-lg ${
                    traffic 
                      ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-orange-500/20' 
                      : 'bg-slate-900/90 border-slate-700/50 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${traffic ? 'bg-orange-500 animate-pulse' : 'bg-slate-700'}`}></div>
                  Traffic Data
                </button>
                <button 
                  onClick={() => mapRef.current?.resetView()}
                  className="px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-800/80 backdrop-blur-md transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest shadow-lg"
                >
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                   Reset View
                </button>
              </div>
            </div>
          </main>
        )}

        {/* Data Analytics Tab */}
        {activeTab === 'data' && (
          <div className="h-full overflow-y-auto p-6">
            <StatsPanel />
          </div>
        )}
      </div>
      
      <style>{`
        .maplibregl-popup-content {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .maplibregl-popup-tip {
          border-top-color: #1e3a8a !important;
        }
        .maplibregl-popup-close-button {
          color: white !important;
          font-size: 18px !important;
          padding: 4px 8px !important;
          opacity: 0.8 !important;
        }
        .maplibregl-popup-close-button:hover {
          opacity: 1 !important;
          background: rgba(255,255,255,0.1) !important;
        }
        .landmark-marker {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </div>
  );
};

export default App;
