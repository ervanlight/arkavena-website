'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Wallet,
  Activity,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export function ProjectViewPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Activity size={14} /> },
    { id: 'progress', label: 'Progress', icon: <BarChart3 size={14} /> },
    { id: 'quality', label: 'Quality', icon: <ShieldCheck size={14} /> },
    { id: 'financial', label: 'Financial', icon: <Wallet size={14} /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#14171B] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col h-[500px] font-inter text-sm">
      {/* App Header */}
      <div className="bg-[#14171B] border-b border-white/10 px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-800 p-1.5 rounded text-[#3F4954]">
            <Activity size={16} />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Simulasi Renovasi Rumah Tinggal</h3>
            <p className="text-[#3F4954] text-xs">ProjectView Demo</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-[#3F4954]">Status</p>
            <p className="text-xs text-emerald-400 font-medium">In Progress</p>
          </div>
          <Link href="/projectview" className="bg-[#C9C3B8]/20 hover:bg-white text-[#14171B] text-xs font-medium px-3 py-1.5 rounded-md transition-colors">
            Open Demo
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#14171B]/50 border-b border-white/10 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 transition-colors",
              activeTab === tab.id 
                ? "border-zinc-300 text-white" 
                : "border-transparent text-[#3F4954] hover:text-[#3F4954]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-[#14171B]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-1 md:col-span-2 space-y-5">
              <div className="bg-[#14171B]/50 border border-white/10 rounded-lg p-5">
                <h4 className="text-[#3F4954] font-medium mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <BarChart3 size={14} /> Overall Progress
                </h4>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#3F4954]">Target: 42%</span>
                  <span className="text-[#3F4954] font-medium">Actual: 45%</span>
                </div>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-zinc-400 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-[#3F4954] text-xs mt-3">+3% ahead of schedule.</p>
              </div>

              <div className="bg-[#14171B]/50 border border-white/10 rounded-lg p-5">
                <h4 className="text-[#3F4954] font-medium mb-4 flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Clock size={14} /> Recent Activity
                </h4>
                <div className="space-y-4">
                  {[
                    { title: 'Pengecoran pelat lantai 2 selesai', time: 'Today, 14:30', type: 'progress' },
                    { title: 'Permintaan persetujuan keramik', time: 'Yesterday, 10:15', type: 'decision' },
                    { title: 'Pemeriksaan mutu struktur baja', time: '18 Jul, 09:00', type: 'quality' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-0.5">
                        {item.type === 'progress' && <CheckCircle2 size={14} className="text-[#3F4954]" />}
                        {item.type === 'decision' && <MessageSquare size={14} className="text-[#3F4954]" />}
                        {item.type === 'quality' && <ShieldCheck size={14} className="text-[#3F4954]" />}
                      </div>
                      <div>
                        <p className="text-xs text-[#3F4954]">{item.title}</p>
                        <p className="text-[11px] text-[#3F4954]">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#14171B]/50 border border-white/10 rounded-lg p-5">
                <h4 className="text-[#3F4954] font-medium mb-3 text-xs uppercase tracking-wider">Action Required</h4>
                <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-md p-3">
                  <p className="text-xs text-zinc-200 font-medium mb-1">Variation Order 02 (VO-02)</p>
                  <p className="text-[11px] text-[#3F4954] mb-3 leading-relaxed">Penambahan titik lampu di ruang keluarga.</p>
                  <button className="bg-[#C9C3B8]/20 hover:bg-white text-[#14171B] text-xs px-3 py-1.5 rounded w-full transition-colors font-medium">
                    Review
                  </button>
                </div>
              </div>

              <div className="bg-[#14171B]/50 border border-white/10 rounded-lg p-5">
                <h4 className="text-[#3F4954] font-medium mb-3 text-xs uppercase tracking-wider">Payment Terms</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#3F4954]">Termin 1 — Mobilisasi</span>
                    <span className="text-emerald-500 font-medium">Paid</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#3F4954]">Termin 2 — Struktur</span>
                    <span className="text-emerald-500 font-medium">Paid</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#3F4954]">Termin 3 — Finishing</span>
                    <span className="text-[#3F4954]">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'overview' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <FileText size={32} className="text-zinc-700 mb-4" />
            <h4 className="text-[#3F4954] font-medium text-sm mb-2">Explore {tabs.find(t => t.id === activeTab)?.label}</h4>
            <p className="text-[#3F4954] text-xs max-w-sm mb-6 leading-relaxed">
              This demo environment illustrates how ARKAVENA structures project documentation.
            </p>
            <Link href="/projectview" className="bg-[#C9C3B8]/20 hover:bg-white text-[#14171B] px-4 py-2 rounded-md text-xs font-medium transition-colors">
              Open Full Demo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
