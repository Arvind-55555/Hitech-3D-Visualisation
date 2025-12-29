
import React, { useState, useRef, useEffect } from 'react';
import { queryCityInfo } from '../services/localAI';
import { ChatMessage, GroundingLink } from '../types';
import { LANDMARKS } from '../constants';

interface SidebarProps {
  onFocusLandmark: (id: string) => void;
  onQueryResponse?: (shouldShowMap: boolean, landmarkId?: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onFocusLandmark, onQueryResponse }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'landmarks'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "System Initialized. I am your Hitech City geospatial intelligence officer. How can I assist your exploration today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await queryCityInfo(input);
      
      // Handle map redirection if needed
      if (response.shouldShowMap && onQueryResponse) {
        onQueryResponse(true, response.landmarkId);
        if (response.landmarkId) {
          setTimeout(() => onFocusLandmark(response.landmarkId!), 200);
        }
      }

      // Simple logic to fly to landmark if mentioned
      const mention = LANDMARKS.find(l => input.toLowerCase().includes(l.name.toLowerCase()) || input.toLowerCase().includes(l.id.replace('-', ' ')));
      if (mention) {
        onFocusLandmark(mention.id);
        if (onQueryResponse) {
          onQueryResponse(true, mention.id);
        }
      }

      setMessages(prev => [...prev, {
        role: 'model',
        content: response.text,
        links: response.links,
        timestamp: Date.now()
      }]);
    } catch (error: any) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: `Error: ${error?.message || 'Failed to process query. Please try again.'}`,
        links: [],
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-96 bg-slate-900/95 backdrop-blur-2xl border-r border-slate-700/50 z-50 flex flex-col shadow-2xl overflow-hidden">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight uppercase">HITEC <span className="text-cyan-400">Prime</span></h1>
            <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em]">Geospatial Intelligence</p>
          </div>
        </div>

        <div className="flex bg-slate-950/50 p-1 rounded-lg mb-4 border border-slate-800">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'chat' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            AI ASSISTANT
          </button>
          <button 
            onClick={() => setActiveTab('landmarks')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'landmarks' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            SITES
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 space-y-6 scroll-smooth">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-cyan-600/90 text-white rounded-tr-none border border-cyan-400/30' 
                      : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                  }`}>
                    {msg.content}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50 flex flex-wrap gap-2">
                        {msg.links.map((link, idx) => (
                          <a key={idx} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-slate-700/50 hover:bg-cyan-500/20 hover:text-cyan-400 px-2 py-1 rounded border border-slate-600 transition-all flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            {link.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-bold text-slate-600 mt-2 uppercase">{msg.role} • {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              ))}
              {isLoading && <div className="text-cyan-500 text-[10px] font-bold animate-pulse uppercase tracking-widest">Processing Satellite Uplink...</div>}
            </div>
            <div className="p-6 bg-slate-950/40 border-t border-slate-800/50">
              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query HITEC intelligence..."
                  className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 pr-14 transition-all"
                />
                <button type="submit" className="absolute right-3 top-3 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg shadow-lg shadow-cyan-600/20 transition-all active:scale-95">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-6 py-4 space-y-3">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Priority Landmarks</h3>
            {LANDMARKS.map(l => (
              <button 
                key={l.id}
                onClick={() => onFocusLandmark(l.id)}
                className="w-full text-left p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute right-0 top-0 h-full w-1 bg-cyan-500 transform translate-x-full group-hover:translate-x-0 transition-transform"></div>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{l.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${l.category === 'Tech' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-purple-500/10 text-purple-500'}`}>{l.category}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">{l.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
