"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight, ArrowLeft, Loader2, CheckCircle, Home, Building } from "lucide-react";
import { submitAssessment } from "@/app/assessment/actions";

const formSchema = z.object({
  serviceType: z.enum(["residential", "facility"]),
  name: z.string().min(2, "Nama wajib diisi"),
  whatsapp: z.string().min(9, "Nomor WhatsApp tidak valid"),
  email: z.string().email("Email tidak valid"),
  city: z.string().min(2, "Kota wajib diisi"),
  address: z.string().min(5, "Alamat wajib diisi").optional(),
  type: z.string().optional(),
  budget: z.string().optional(),
  description: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AssessmentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [utms, setUtms] = useState<Record<string, string>>({});

  useEffect(() => {
    // Capture UTM parameters on load
    const params: Record<string, string> = {};
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    utmKeys.forEach(key => {
      const val = searchParams.get(key);
      if (val) params[key] = val;
    });
    setUtms(params);
  }, [searchParams]);

  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "residential"
    },
    mode: "onBlur"
  });

  const serviceType = watch("serviceType");

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["name", "whatsapp", "email"];
    if (step === 2) fieldsToValidate = ["city"];
    
    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }
    
    setStep((prev) => Math.min(prev + 1, 5));
  };
  
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    
    // Append UTMs
    Object.entries(utms).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const result = await submitAssessment(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      router.push("/terima-kasih");
    } else {
      setError(result.message || "Gagal mengirim data. Coba lagi.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full bg-white rounded-2xl shadow-xl border border-[#C9C3B8] overflow-hidden">
      {/* Progress Bar */}
      {step > 0 && (
        <div className="w-full bg-white h-2">
          <div 
            className="bg-[#E2A63C] h-2 transition-all duration-300" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      )}

      <div className="p-8 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          
          {/* STEP 0: Selection */}
          {step === 0 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="text-center">
                <h2 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-4">Mulai Proyek Anda</h2>
                <p className="text-[#3F4954]">Pilih layanan yang Anda butuhkan untuk melanjutkan</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div 
                  className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${serviceType === 'residential' ? 'border-[#E2A63C] bg-white' : 'border-[#C9C3B8] hover:border-[#E2A63C]/50'}`}
                  onClick={() => setValue("serviceType", "residential")}
                >
                  <Home className={`w-12 h-12 mb-4 ${serviceType === 'residential' ? 'text-[#E2A63C]' : 'text-[#3F4954]'}`} />
                  <h3 className="font-bold text-xl mb-2">Residential</h3>
                  <p className="text-sm text-[#3F4954]">Bangun atau renovasi rumah hunian, kost, atau vila dengan standar tinggi.</p>
                </div>
                
                <div 
                  className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${serviceType === 'facility' ? 'border-[#E2A63C] bg-white' : 'border-[#C9C3B8] hover:border-[#E2A63C]/50'}`}
                  onClick={() => setValue("serviceType", "facility")}
                >
                  <Building className={`w-12 h-12 mb-4 ${serviceType === 'facility' ? 'text-[#E2A63C]' : 'text-[#3F4954]'}`} />
                  <h3 className="font-bold text-xl mb-2">Facility Care</h3>
                  <p className="text-sm text-[#3F4954]">Perawatan, perbaikan, dan manajemen fasilitas untuk sekolah, kantor, atau komersial.</p>
                </div>
              </div>

              <button 
                type="button" 
                onClick={nextStep}
                className="w-full bg-[#14171B] text-white py-4 rounded-lg font-bold flex justify-center items-center hover:bg-[#14171B/90] transition-colors"
              >
                Mulai Assessment <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}

          {/* STEP 1: Contact */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-6">Informasi Kontak</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Nama Lengkap</label>
                <input 
                  {...register("name")}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C]"
                  placeholder="Budi Santoso"
                />
                {errors.name && <p className="text-[#A33C3C] text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Nomor WhatsApp</label>
                <input 
                  {...register("whatsapp")}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C]"
                  placeholder="08123456789"
                />
                {errors.whatsapp && <p className="text-[#A33C3C] text-sm mt-1">{errors.whatsapp.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Email</label>
                <input 
                  {...register("email")}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C]"
                  placeholder="budi@email.com"
                />
                {errors.email && <p className="text-[#A33C3C] text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          )}

          {/* STEP 2: Location/Project Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-6">Detail Lokasi</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Kota / Kabupaten</label>
                <input 
                  {...register("city")}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C]"
                  placeholder="Surabaya"
                />
                {errors.city && <p className="text-[#A33C3C] text-sm mt-1">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Estimasi Anggaran</label>
                <select 
                  {...register("budget")}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C] bg-white"
                >
                  <option value="">Pilih Anggaran</option>
                  <option value="<500m">&lt; Rp 500 Juta</option>
                  <option value="500m-1b">Rp 500 Juta - Rp 1 Milyar</option>
                  <option value="1b-3b">Rp 1 Milyar - Rp 3 Milyar</option>
                  <option value=">3b">&gt; Rp 3 Milyar</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#14171B] mb-2">Keterangan Singkat</label>
                <textarea 
                  {...register("description")}
                  rows={4}
                  className="w-full border border-[#C9C3B8] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E2A63C]"
                  placeholder="Jelaskan secara singkat rencana proyek Anda..."
                />
              </div>
            </div>
          )}

          {/* For brevity, skip steps 3-4 and jump to confirmation in demo */}
          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#25775A] mx-auto mb-4" />
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#14171B] mb-2">Konfirmasi Pengiriman</h2>
              <p className="text-[#3F4954] mb-8">
                Data Anda siap dikirim. Tim TEGAKARA akan meninjau dan menghubungi Anda maksimal 1x24 jam kerja.
              </p>
              
              {error && (
                <div className="bg-[#A33C3C]/10 text-[#A33C3C] p-4 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#E2A63C] text-[#14171B] py-4 rounded-lg font-bold flex justify-center items-center hover:bg-[#A76B1F] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Mengirim...</>
                ) : (
                  "Kirim Assessment"
                )}
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {step > 0 && step < 3 && (
            <div className="flex justify-between mt-12 pt-6 border-t border-[#C9C3B8]">
              <button 
                type="button" 
                onClick={prevStep}
                className="text-[#3F4954] hover:text-[#14171B] font-medium flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="bg-[#14171B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#14171B/90] transition-colors flex items-center"
              >
                Lanjut <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
