import os

base_path = '/Users/macbook/kontraktor-website/src/app/facility-care'

pages = {
    'maintenance-gedung': {
        'title': 'Perawatan & Pemeliharaan Gedung | ARKAVENA',
        'desc': 'Layanan maintenance gedung komersial untuk menjaga operasional berjalan lancar dengan sistem work order yang terdokumentasi.',
        'hero_title': 'Pemeliharaan Gedung Komersial yang Terukur',
        'hero_desc': 'Perawatan bangunan tidak seharusnya reaktif. Kami menyediakan layanan terencana untuk menjaga nilai aset dan kenyamanan tenant Anda tanpa mengganggu operasional harian.',
        'img': '/images/commercial_building_1784551986230.jpg',
        'scopes': [
            ('Pengecekan Fasad & Eksterior', 'Inspeksi sealant kaca, pembersihan fasad (gondola/rope access), dan pengecatan ulang.'),
            ('Pekerjaan MEP Skala Menengah', 'Perawatan instalasi air, perbaikan panel listrik minor, dan tata letak pencahayaan.'),
            ('Perawatan Interior', 'Pengecatan ruangan, perbaikan plafon bocor, dan perawatan lantai lobi.')
        ],
        'why': [
            ('Work Order Digital', 'Status pekerjaan bisa dipantau langsung, menghindari miskomunikasi atau pekerjaan yang terlupakan.'),
            ('Sistem Penjadwalan Cerdas', 'Pekerjaan yang menimbulkan kebisingan atau debu dijadwalkan di luar jam operasional tenant.')
        ]
    },
    'maintenance-sekolah': {
        'title': 'Perbaikan & Maintenance Sekolah | ARKAVENA',
        'desc': 'Layanan perawatan fasilitas pendidikan dengan penjadwalan khusus saat libur semester untuk meminimalisasi gangguan belajar mengajar.',
        'hero_title': 'Fasilitas Pendidikan yang Aman dan Terawat',
        'hero_desc': 'Sekolah membutuhkan lingkungan yang aman bagi siswa. Kami mengkhususkan diri pada perbaikan fasilitas dengan memanfaatkan waktu libur semester secara optimal.',
        'img': '/images/school_facility_1784552005374.jpg',
        'scopes': [
            ('Peremajaan Fasilitas Olahraga', 'Pelapisan ulang (resurfacing) lapangan basket/futsal dengan material anti-slip standar olahraga.'),
            ('Perbaikan Area Sanitasi', 'Renovasi toilet siswa dan guru dengan spesifikasi material yang tahan penggunaan intens (heavy-duty).'),
            ('Keselamatan Bangunan', 'Perbaikan railing tangga, perbaikan atap ruang kelas, dan penyempurnaan sirkulasi udara.')
        ],
        'why': [
            ('Zero Disturbance saat Kelas Aktif', 'Mobilisasi material besar dan pekerjaan berat dikunci pada jadwal liburan sekolah.'),
            ('Material Ramah Anak', 'Penggunaan cat non-toxic dan material finishing bersudut tumpul untuk area bermain.')
        ]
    },
    'waterproofing-dan-atap': {
        'title': 'Waterproofing & Perbaikan Atap | ARKAVENA',
        'desc': 'Solusi kebocoran atap dan dak beton industri maupun komersial dengan garansi pekerjaan yang jelas.',
        'hero_title': 'Tuntaskan Kebocoran Atap Secara Permanen',
        'hero_desc': 'Kebocoran bukan sekadar air yang menetes, melainkan risiko kerusakan mesin produksi dan dokumen penting. Kami mengatasi kebocoran dari sumbernya.',
        'img': '/images/hero_facility_waterproofing_1784553830435.jpg',
        'scopes': [
            ('Waterproofing Dak Beton', 'Aplikasi membran bakar, polyurethane (PU), atau cementitious waterproofing tergantung kondisi paparan sinar matahari dan genangan.'),
            ('Perbaikan Atap Pabrik (Metal Roof)', 'Penanganan korosi, penggantian insulasi atap (glasswool), dan perbaikan sealant talang jurai.'),
            ('Injeksi Beton', 'Penanganan retak struktural pada basement atau dinding penahan tanah (retaining wall) menggunakan sistem injeksi PU.')
        ],
        'why': [
            ('Water Test Wajib', 'Semua pekerjaan waterproofing tidak akan diserahterimakan sebelum lolos uji genang air (water test) 1x24 jam.'),
            ('Garansi Tertulis', 'Kami memberikan garansi pemeliharaan khusus waterproofing yang tercantum resmi di dalam kontrak.')
        ]
    },
    'minor-works-industri': {
        'title': 'Minor Works & Perbaikan Fasilitas Industri | ARKAVENA',
        'desc': 'Layanan pekerjaan sipil minor untuk kawasan industri dan pabrik dengan kepatuhan tinggi terhadap standar K3/HSE.',
        'hero_title': 'Pekerjaan Sipil Industri yang Mematuhi HSE',
        'hero_desc': 'Kami mengerti bahwa di kawasan industri, standar keselamatan (Safety) sama pentingnya dengan hasil konstruksi itu sendiri. Tim kami tersertifikasi dan terbiasa dengan regulasi pabrik.',
        'img': '/images/hero_facility_industri_1784553840673.jpg',
        'scopes': [
            ('Pembuatan Pondasi Mesin', 'Pengecoran pondasi beton bertulang (reinforced concrete) dengan spesifikasi mutu tinggi untuk menahan getaran mesin industri.'),
            ('Perbaikan Lantai Gudang', 'Aplikasi epoxy lantai industri yang tahan terhadap bahan kimia dan beban forklift (heavy traffic).'),
            ('Konstruksi Fasilitas Pendukung', 'Pembuatan pos satpam, ruang genset, perbaikan saluran drainase pabrik, dan dinding pembatas.')
        ],
        'why': [
            ('Prosedur K3 Lengkap', 'Seluruh pekerja dilengkapi APD standar, dan pekerjaan selalu didahului dengan Job Safety Analysis (JSA).'),
            ('Sertifikasi Alat & Pekerja', 'Operator alat berat dan perancah (scaffolding) memiliki SIO (Surat Izin Operator) yang valid.')
        ]
    }
}

template = """import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "{title}",
  description: "{desc}",
};

export default function FacilityServicePage() {
  return (
    <main className="min-h-screen bg-white text-[#0E1B26]">
      <section className="relative overflow-hidden z-0 bg-[#0E1B26] text-white py-24 px-6 min-h-[70vh] flex items-center">
        <Image 
          src="{img}"
          alt="Hero Background"
          fill
          className="object-cover opacity-30 mix-blend-overlay pointer-events-none"
          priority
        />
        <div className="relative z-10 w-full">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-sm text-bronze font-semibold uppercase tracking-wider mb-6 flex items-center gap-2">
                <Link href="/facility-care" className="hover:text-white transition-colors">Facility Care</Link> 
                <span className="text-slate-500">/</span> {folder_title}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope leading-tight mb-8 text-white max-w-4xl">
                {hero_title}
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
                {hero_desc}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeIn direction="left">
            <h2 className="text-3xl font-bold font-manrope mb-8 text-[#0E1B26]">Ruang Lingkup Pekerjaan</h2>
            <div className="space-y-8">
              {scopes_jsx}
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="bg-[#1C2D38] text-white p-10 rounded-2xl h-full border border-slate-700 shadow-xl shadow-slate-900/10">
              <h2 className="text-2xl font-bold font-manrope mb-8 text-[#E8DED0]">Standar & Jaminan ARKAVENA</h2>
              <div className="space-y-8">
                {why_jsx}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#E8DED0] py-24 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <ShieldCheck className="w-16 h-16 text-[#0E1B26] mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-6 text-[#0E1B26]">Amankan Aset Bisnis Anda</h2>
            <p className="text-[#68757D] mb-10 text-lg">Jangan biarkan kerusakan minor menghentikan operasi bisnis Anda. Jadwalkan audit kondisi gedung hari ini.</p>
            <Link href="/assessment" className="inline-block bg-[#0E1B26] text-white px-10 py-5 rounded-md font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg">
              Jadwalkan Audit Fasilitas
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
"""

for slug, data in pages.items():
    scopes_jsx = ""
    for title, desc in data['scopes']:
        scopes_jsx += f"""
              <div className="flex gap-4">
                <div className="mt-1 bg-slate-100 p-3 rounded-xl h-fit border border-slate-200">
                  <Ruler className="w-6 h-6 text-[#0E1B26]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0E1B26] mb-2">{title}</h3>
                  <p className="text-[#68757D] leading-relaxed">{desc}</p>
                </div>
              </div>"""

    why_jsx = ""
    for title, desc in data['why']:
        why_jsx += f"""
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-bronze shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>"""
                
    folder_title = " ".join([word.capitalize() for word in slug.split('-')])

    page_content = template.replace('{title}', data['title']).replace('{desc}', data['desc']).replace('{hero_title}', data['hero_title']).replace('{hero_desc}', data['hero_desc']).replace('{img}', data['img']).replace('{scopes_jsx}', scopes_jsx).replace('{why_jsx}', why_jsx).replace('{folder_title}', folder_title)

    os.makedirs(os.path.join(base_path, slug), exist_ok=True)
    with open(os.path.join(base_path, slug, 'page.tsx'), 'w') as f:
        f.write(page_content)

print("Facility Care pages deepened.")
