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
    { id: 'overview', label: 'Ringkasan', icon: <Activity size={16} /> },
    { id: 'progress', label: 'Progres', icon: <BarChart3 size={16} /> },
    { id: 'quality', label: 'Mutu', icon: <ShieldCheck size={16} /> },
    { id: 'financial', label: 'Keuangan', icon: <Wallet size={16} /> },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#1C2D38] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col h-[500px]">
      {/* App Header */}
      <div className="bg-[#0E1B26] border-b border-slate-700 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-bronze p-1.5 rounded text-[#0E1B26]">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Simulasi Renovasi Rumah Tinggal</h3>
            <p className="text-slate-400 text-xs">Data simulasi • ProjectView Demo</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Status</p>
            <p className="text-sm text-emerald-400 font-medium">Sedang Berjalan</p>
          </div>
          <Link href="/projectview" className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded transition-colors">
            Buka Demo ProjectView
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#0E1B26]/50 border-b border-slate-700 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === tab.id 
                ? "border-bronze text-bronze" 
                : "border-transparent text-slate-400 hover:text-white"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 space-y-6">
              <div className="bg-[#0E1B26]/30 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-bronze" /> Progres Keseluruhan
                </h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Target periode ini: 42%</span>
                  <span className="text-white font-medium">Progres aktual: 45%</span>
                </div>
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
                <p className="text-emerald-400 text-xs mt-3">3 poin di atas target periode ini.</p>
              </div>

              <div className="bg-[#0E1B26]/30 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-bronze" /> Aktivitas Terbaru
                </h4>
                <div className="space-y-4">
                  {[
                    { title: 'Pengecoran pelat lantai 2 selesai', time: 'Hari ini, 14:30', type: 'progress' },
                    { title: 'Permintaan persetujuan keramik lantai utama', time: 'Kemarin, 10:15', type: 'decision' },
                    { title: 'Pemeriksaan mutu struktur baja ringan', time: '18 Jul, 09:00', type: 'quality' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        {item.type === 'progress' && <CheckCircle2 size={16} className="text-emerald-500" />}
                        {item.type === 'decision' && <MessageSquare size={16} className="text-blue-500" />}
                        {item.type === 'quality' && <ShieldCheck size={16} className="text-amber-500" />}
                      </div>
                      <div>
                        <p className="text-sm text-white">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0E1B26]/30 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-medium mb-4">Memerlukan Persetujuan Anda</h4>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <p className="text-sm text-blue-100 mb-2">Perubahan Pekerjaan 02 (VO-02)</p>
                  <p className="text-xs text-blue-300 mb-3">Usulan penambahan titik lampu di ruang keluarga.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded w-full transition-colors">
                    Lihat dan Putuskan
                  </button>
                </div>
              </div>

              <div className="bg-[#0E1B26]/30 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-medium mb-4">Status Termin</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Termin 1 — Mobilisasi</span>
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Diterima</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white">Termin 2 — Struktur</span>
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs">Diterima</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Termin 3 — Finishing</span>
                    <span className="text-slate-500 bg-slate-800 px-2 py-0.5 rounded text-xs">Menunggu pembayaran</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab !== 'overview' && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <FileText size={48} className="text-slate-600 mb-4" />
            <h4 className="text-white font-medium text-lg mb-2">Jelajahi Fitur Lengkap</h4>
            <p className="text-slate-400 text-sm max-w-md mb-6">
              Di versi demo, Anda dapat melihat bagaimana TEGAKARA mengelola proyek dengan informasi yang lebih jelas untuk tab {tabs.find(t => t.id === activeTab)?.label}.
            </p>
            <Link href="/projectview" className="bg-bronze hover:bg-bronze/90 text-[#0E1B26] px-6 py-2 rounded-md font-bold transition-colors">
              Buka Demo ProjectView
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
