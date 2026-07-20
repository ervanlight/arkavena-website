"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle, AlertTriangle, Clock, Camera, FileText, ChevronRight, Activity, DollarSign } from "lucide-react";

export default function DemoDashboard() {
  const [activeScenario, setActiveScenario] = useState<"residential" | "facility">("residential");
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-white text-[#0E1B26] font-inter selection:bg-[#B88A4A] selection:text-white pb-24">
      {/* Header */}
      <div className="bg-[#0E1B26] text-white pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="inline-block bg-[#B88A4A]/20 text-[#B88A4A] px-3 py-1 rounded-full text-sm font-semibold mb-6">
            Data simulasi untuk demonstrasi sistem
          </div>
          <h1 className="text-4xl md:text-5xl font-manrope font-bold mb-4">
            TEGAKARA ProjectView
          </h1>
          <p className="text-[#E8DED0] max-w-2xl text-lg mb-8">
            Informasi proyek yang lebih jelas. Lihat progres, catatan mutu, dan status termin dari mana saja.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveScenario("residential")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeScenario === "residential" ? "bg-[#B88A4A] text-[#0E1B26]" : "bg-[#1C2D38] text-[#E8DED0] hover:bg-[#1C2D38]/80"}`}
            >
              Simulasi Proyek Rumah
            </button>
            <button 
              onClick={() => setActiveScenario("facility")}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeScenario === "facility" ? "bg-[#B88A4A] text-[#0E1B26]" : "bg-[#1C2D38] text-[#E8DED0] hover:bg-[#1C2D38]/80"}`}
            >
              Simulasi Facility Care
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8DED0]">
          
          {/* Navigation */}
          <div className="flex border-b border-[#E8DED0] overflow-x-auto scrollbar-hide">
            {["Overview", "Area/Zone", "Timeline", "Client Decisions", "Variations", "Quality", "Financial", "Documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-4 whitespace-nowrap font-medium text-sm transition-colors ${
                  activeTab === tab.toLowerCase() 
                    ? "border-b-2 border-[#B88A4A] text-[#B88A4A]" 
                    : "text-[#68757D] hover:text-[#0E1B26]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-6">
                  {/* Progress Card */}
                  <div className="bg-white rounded-xl p-6 border border-[#E8DED0]">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-manrope font-bold text-xl text-[#0E1B26]">Overall Progress</h3>
                      <span className="text-2xl font-bold text-[#25775A]">45%</span>
                    </div>
                    <div className="w-full bg-[#E8DED0] rounded-full h-3 mb-4">
                      <div className="bg-[#25775A] h-3 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <div className="flex items-center text-sm text-[#68757D]">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Sesuai Jadwal</span>
                    </div>
                  </div>

                  {/* Current Work */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-6 border border-[#E8DED0] shadow-sm">
                      <h4 className="font-semibold mb-2">Paket Pekerjaan Saat Ini</h4>
                      <p className="text-[#68757D] mb-4">Instalasi MEP Lantai 1, Plesteran Dinding Eksterior</p>
                      <div className="flex items-center text-sm font-medium text-[#B88A4A]">
                        <Activity className="w-4 h-4 mr-2" />
                        Milestone Berikutnya: Pengecoran Atap (12 Nov)
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 border border-[#E8DED0] shadow-sm">
                      <h4 className="font-semibold mb-2">Perlu Tindakan Anda</h4>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-start text-sm">
                          <AlertTriangle className="w-4 h-4 text-[#A76B1F] mr-2 mt-0.5 shrink-0" />
                          <span>Persetujuan Material Keramik (Due: 15 Nov)</span>
                        </li>
                        <li className="flex items-start text-sm">
                          <AlertTriangle className="w-4 h-4 text-[#A76B1F] mr-2 mt-0.5 shrink-0" />
                          <span>Variasi Tambah Daya Listrik (Due: 18 Nov)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Financial Snapshot */}
                  <div className="bg-[#1C2D38] rounded-xl p-6 text-white">
                    <h3 className="font-manrope font-bold text-lg text-[#E8DED0] mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" /> Status Pembayaran
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-[#E8DED0]">Nilai Kontrak</p>
                        <p className="font-semibold">IDR 1,450,000,000</p>
                      </div>
                      <div>
                        <p className="text-sm text-[#E8DED0]">Telah Dibayar (40%)</p>
                        <p className="font-semibold text-[#25775A]">IDR 580,000,000</p>
                      </div>
                      <div className="pt-4 border-t border-[#26333C]">
                        <p className="text-sm text-[#E8DED0]">Tagihan Berikutnya (Termin 3 - 50%)</p>
                        <p className="font-semibold">Estimasi: 25 Nov 2026</p>
                      </div>
                    </div>
                  </div>

                  {/* Quality Snapshot */}
                  <div className="bg-white rounded-xl p-6 border border-[#E8DED0] shadow-sm">
                    <h3 className="font-manrope font-bold text-lg mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-[#25775A]" /> Quality Control
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#68757D]">Inspeksi Selesai</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#68757D]">Temuan Terbuka</span>
                      <span className="font-semibold text-[#A76B1F]">2</span>
                    </div>
                    <button onClick={() => setActiveTab('quality')} className="text-[#B88A4A] text-sm font-medium flex items-center mt-4 hover:underline">
                      Lihat Laporan Kualitas <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "overview" && (
              <div className="py-12 text-center text-[#68757D]">
                <FileText className="w-16 h-16 mx-auto mb-4 text-[#E8DED0]" />
                <h3 className="text-xl font-manrope font-bold text-[#0E1B26] mb-2">Modul {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                <p className="max-w-md mx-auto">
                  Di versi penuh, area ini menampilkan detail interaktif untuk {activeTab}. 
                  Ini adalah data demonstrasi untuk memperlihatkan kapabilitas sistem TEGAKARA.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-manrope font-bold mb-6 text-[#0E1B26]">
            Siap Membangun dengan Transparansi?
          </h2>
          <Link 
            href="/assessment" 
            className="inline-block bg-[#0E1B26] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#1C2D38] transition-colors"
          >
            Gunakan Sistem Ini untuk Proyek Anda
          </Link>
        </div>
      </div>
    </div>
  );
}
