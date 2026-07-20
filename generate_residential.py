import os

base_path = '/Users/macbook/kontraktor-website/src/app/residential'

pages = {
    'bangun-rumah-surabaya': {
        'title': 'Bangun Rumah Baru di Surabaya | TEGAKARA',
        'desc': 'Layanan pembangunan rumah baru di Surabaya dengan definisi ruang lingkup yang jelas, Bill of Quantities (BOQ), dan dokumentasi yang transparan.',
        'hero_title': 'Pembangunan Rumah yang Terdefinisi Sejak Awal',
        'hero_desc': 'Tidak ada asumsi. Tidak ada \'nanti kita lihat\'. Semua ruang lingkup, gambar, dan Bill of Quantities (BOQ) disepakati sebelum pekerjaan dimulai.',
        'img': '/images/hero_residential_bangun_1784553789892.jpg',
        'scopes': [
            ('Perencanaan & BOQ', 'Pembuatan Bill of Quantities yang mendetail berdasarkan gambar kerja (DED).'),
            ('Pekerjaan Sipil & Arsitektur', 'Dari pondasi, struktur beton bertulang, dinding, hingga sentuhan akhir arsitektural (finishing).'),
            ('Mekanikal & Elektrikal (MEP)', 'Instalasi listrik, perpipaan air bersih dan kotor, serta sistem tata udara.')
        ],
        'why': [
            ('Material Terjamin', 'Semua material utama harus melalui proses persetujuan (approval) sebelum dikirim ke proyek.'),
            ('Quality Hold Point', 'Setiap tahapan kritis (misal: sebelum pengecoran) wajib diperiksa dan disetujui bersama.')
        ]
    },
    'renovasi-rumah-surabaya': {
        'title': 'Renovasi Rumah Mayor di Surabaya | TEGAKARA',
        'desc': 'Layanan renovasi rumah skala menengah hingga besar di Surabaya dengan penjadwalan ketat dan minim risiko bongkar-pasang.',
        'hero_title': 'Renovasi Besar Tanpa Kejutan Biaya',
        'hero_desc': 'Renovasi sering kali dipenuhi biaya tak terduga. Kami memulai dengan audit kondisi eksisting untuk mengunci ruang lingkup pekerjaan.',
        'img': '/images/hero_residential_renovasi_1784553779148.jpg',
        'scopes': [
            ('Audit Struktur Eksisting', 'Pemeriksaan kelayakan struktur lama sebelum dibongkar atau disambung.'),
            ('Re-layout Ruangan', 'Perubahan tata letak dinding, pemindahan jalur pipa, dan modifikasi ruang.'),
            ('Pembaruan Fasad & Atap', 'Desain ulang wajah bangunan dan perbaikan/penggantian sistem atap secara menyeluruh.')
        ],
        'why': [
            ('Proteksi Area', 'Area yang tidak direnovasi dilindungi secara maksimal dari debu dan serpihan (debris).'),
            ('ScopeLock Agreement', 'Perubahan pekerjaan di tengah jalan hanya akan dieksekusi jika disetujui tertulis beserta biayanya.')
        ]
    },
    'tambah-lantai-rumah': {
        'title': 'Tambah Lantai Rumah di Surabaya | TEGAKARA',
        'desc': 'Layanan penambahan lantai (ngedak) atau ekstensi vertikal rumah dengan perhitungan struktur yang aman dan teruji.',
        'hero_title': 'Ekspansi Vertikal yang Aman dan Terukur',
        'hero_desc': 'Menambah lantai bukan sekadar mengecor. Ini tentang memastikan pondasi lama Anda mampu menopang beban baru tanpa risiko kegagalan struktur.',
        'img': '/images/hero_residential_tambah_lantai_1784553801629.jpg',
        'scopes': [
            ('Evaluasi Pondasi Eksisting', 'Analisis daya dukung pondasi lama untuk menentukan metode perkuatan (suntik pondasi/mikropil).'),
            ('Pekerjaan Struktur Baja/Beton', 'Penyambungan kolom (stek) dan pembuatan pelat lantai (dak beton atau lantai komposit).'),
            ('Integrasi MEP', 'Menyambung jalur utilitas lantai bawah ke lantai baru dengan mulus tanpa merusak fungsi lama.')
        ],
        'why': [
            ('Keselamatan Struktur Prioritas', 'Kami tidak akan mengerjakan penambahan lantai jika hasil audit menunjukkan struktur lama tidak memenuhi syarat keamanan.'),
            ('Zero Disturbance Plan', 'Metode kerja dirancang agar meminimalkan gangguan, terutama jika rumah lantai bawah masih dihuni.')
        ]
    }
}

template = """import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { CheckCircle2, ShieldCheck, Ruler, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "{title}",
  description: "{desc}",
};

export default function ServicePage() {
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
                <Link href="/residential" className="hover:text-white transition-colors">Residential</Link> 
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
            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-200 h-full">
              <h2 className="text-2xl font-bold font-manrope mb-8 text-[#0E1B26]">Mengapa Pendekatan TEGAKARA Berbeda?</h2>
              <div className="space-y-8">
                {why_jsx}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#1C2D38] py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-bronze/10 via-transparent to-transparent"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <ShieldCheck className="w-16 h-16 text-bronze mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-6 text-white">Siap Memulai Proyek Anda secara Profesional?</h2>
            <p className="text-slate-400 mb-10 text-lg">Diskusikan kebutuhan spesifik Anda bersama tim kami. Dapatkan analisis awal mengenai waktu, biaya, dan tahapan kerja secara transparan.</p>
            <Link href="/assessment" className="inline-block bg-bronze text-[#0E1B26] px-10 py-5 rounded-md font-bold hover:bg-opacity-90 transition-all text-lg shadow-lg hover:shadow-bronze/20">
              Mulai Konsultasi Proyek
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
                <div className="mt-1 bg-bronze/10 p-3 rounded-xl h-fit">
                  <Ruler className="w-6 h-6 text-bronze" />
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
                  <CheckCircle2 className="w-6 h-6 text-[#25775A] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-[#0E1B26] mb-2">{title}</h3>
                    <p className="text-[#68757D] text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>"""
                
    folder_title = " ".join([word.capitalize() for word in slug.split('-')])

    page_content = template.replace('{title}', data['title']).replace('{desc}', data['desc']).replace('{hero_title}', data['hero_title']).replace('{hero_desc}', data['hero_desc']).replace('{img}', data['img']).replace('{scopes_jsx}', scopes_jsx).replace('{why_jsx}', why_jsx).replace('{folder_title}', folder_title)

    os.makedirs(os.path.join(base_path, slug), exist_ok=True)
    with open(os.path.join(base_path, slug, 'page.tsx'), 'w') as f:
        f.write(page_content)

print("Residential pages deepened.")
