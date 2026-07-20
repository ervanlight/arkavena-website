import React from "react";
import AssessmentForm from "@/components/assessment/AssessmentForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mulai Proyek | TEGAKARA",
  description: "Assessment awal untuk layanan konstruksi dan facility care TEGAKARA",
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-white font-inter selection:bg-[#B88A4A] selection:text-white pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-manrope font-bold text-[#0E1B26] mb-4">
            Beritahu Kami Visi Anda
          </h1>
          <p className="text-[#68757D] max-w-2xl mx-auto text-lg">
            Isi form singkat ini untuk membantu kami memahami kebutuhan Anda. 
            Proses ini memakan waktu kurang dari 3 menit.
          </p>
        </div>
        
        <AssessmentForm />
      </div>
    </div>
  );
}
