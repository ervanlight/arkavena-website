'use client';

import { CheckCircle2, AlertCircle, Clock, ShieldCheck, CreditCard } from 'lucide-react';

export function HeroPanel() {

  return (
    <div className="w-full max-w-md rounded-xl bg-[#1C2D38]/80 backdrop-blur-md border border-white/10 p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <div className="w-24 h-24 rounded-full border border-white/20 -mt-10 -mr-10"></div>
        <div className="w-16 h-16 rounded-full border border-white/20 absolute top-4 right-4"></div>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-white font-manrope font-semibold text-lg">Panel Kendali Proyek</h3>
          <p className="text-slate-400 text-xs">Simulasi ProjectView</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {/* Scope Status */}
        <div className="flex items-center gap-4 bg-[#0E1B26]/50 p-3 rounded-lg border border-white/5">
          <div className="p-2 bg-blue-500/10 rounded-md text-blue-400">
            <CheckCircle2 size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Ruang Lingkup</p>
            <p className="text-xs text-slate-400">Dokumen dasar telah disetujui</p>
          </div>
          <span className="text-xs font-semibold text-blue-400">Terkunci</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 bg-[#0E1B26]/50 p-3 rounded-lg border border-white/5">
          <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-400">
            <Clock size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Progres Aktual</p>
            <div className="w-full bg-slate h-1.5 rounded-full mt-1.5">
              <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-400">45%</span>
        </div>

        {/* Quality Hold Point */}
        <div className="flex items-center gap-4 bg-[#0E1B26]/50 p-3 rounded-lg border border-white/5">
          <div className="p-2 bg-amber-500/10 rounded-md text-amber-400">
            <ShieldCheck size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Pemeriksaan Mutu</p>
            <p className="text-xs text-slate-400">Struktur lantai 2</p>
          </div>
          <span className="text-xs font-semibold text-amber-400">Menunggu pemeriksaan</span>
        </div>

        {/* Decisions */}
        <div className="flex items-center gap-4 bg-[#0E1B26]/50 p-3 rounded-lg border border-white/5">
          <div className="p-2 bg-purple-500/10 rounded-md text-purple-400">
            <AlertCircle size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Keputusan Klien</p>
            <p className="text-xs text-slate-400">Pilihan keramik utama</p>
          </div>
          <span className="text-xs font-semibold text-purple-400">1 perlu persetujuan</span>
        </div>
        
        {/* Payment */}
        <div className="flex items-center gap-4 bg-[#0E1B26]/50 p-3 rounded-lg border border-white/5">
          <div className="p-2 bg-bronze/10 rounded-md text-bronze">
            <CreditCard size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Termin Proyek</p>
            <p className="text-xs text-slate-400">Tahap 3 telah diverifikasi</p>
          </div>
          <span className="text-xs font-semibold text-bronze">Termin berikutnya siap diproses</span>
        </div>
      </div>
    </div>
  );
}
