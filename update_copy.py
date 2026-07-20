import os
import re

def update_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()

    for old_str, new_str in replacements:
        if old_str not in content:
            print(f"WARNING: String not found in {filepath}: '{old_str}'")
        content = content.replace(old_str, new_str)

    with open(filepath, 'w') as f:
        f.write(content)

# 1. Update Footer
footer_replacements = [
    ("Membangun dan merawat ruang profesional Anda dengan standar kualitas tinggi, transparansi, dan ketepatan waktu.", "Membangun dan merawat properti dengan proses yang jelas, mutu yang terdokumentasi, dan komunikasi yang terarah."),
    ("Bangun & Renovasi Residensial", "Bangun & Renovasi Rumah"),
    ("Facility Care (B2B)", "Perawatan Gedung & Fasilitas"),
    ("Portfolio Proyek", "Portofolio Proyek"),
    ("ProjectView System", "ProjectView"),
    ("Trust Center", "Legalitas & Standar"),
    ("Dapatkan insight seputar konstruksi dan perawatan fasilitas.", "Dapatkan panduan singkat tentang pembangunan, renovasi, dan perawatan properti."),
    ("Alamat email Anda", "Masukkan alamat email"),
    ("© {currentYear} TEGAKARA. All rights reserved.", "© {currentYear} TEGAKARA. Hak cipta dilindungi.")
]
update_file('/Users/macbook/kontraktor-website/src/components/layout/footer.tsx', footer_replacements)

# 2. Update ProjectView Preview
preview_replacements = [
    ("Renovasi Rumah Tinggal - Pak Budi", "Simulasi Renovasi Rumah Tinggal"),
    ("ID: PRJ-2026-0082 • ProjectView Demo", "Data simulasi • ProjectView Demo"),
    ("Buka Aplikasi", "Buka Demo ProjectView"),
    ("Target: 42%", "Target periode ini: 42%"),
    ("Aktual: 45%", "Progres aktual: 45%"),
    ("▲ +3% dari jadwal. Kinerja sangat baik.", "3 poin di atas target periode ini."),
    ("Pengecoran plat lantai 2 selesai", "Pengecoran pelat lantai 2 selesai"),
    ("Persetujuan material keramik lantai utama", "Permintaan persetujuan keramik lantai utama"),
    ("Inspeksi mutu struktur baja ringan", "Pemeriksaan mutu struktur baja ringan"),
    ("Perlu Tindakan Anda", "Memerlukan Persetujuan Anda"),
    ("Persetujuan Perubahan (VO-02)", "Perubahan Pekerjaan 02 (VO-02)"),
    ("Penambahan titik lampu di ruang keluarga.", "Usulan penambahan titik lampu di ruang keluarga."),
    ("Tinjau Sekarang", "Lihat dan Putuskan"),
    ("Milestone Pembayaran", "Status Termin"),
    ("<span className=\"text-slate-400\">Termin 1 (DP)</span>\n                    <span className=\"text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs\">Lunas</span>", 
     "<span className=\"text-slate-400\">Termin 1 — Mobilisasi</span>\n                    <span className=\"text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs\">Diterima</span>"),
    ("<span className=\"text-white\">Termin 2 (Struktur)</span>\n                    <span className=\"text-bronze bg-bronze/10 px-2 py-0.5 rounded text-xs\">Siap Tagih</span>", 
     "<span className=\"text-white\">Termin 2 — Struktur</span>\n                    <span className=\"text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-xs\">Diterima</span>"),
    ("<span className=\"text-slate-500\">Termin 3 (Finishing)</span>\n                    <span className=\"text-slate-500 bg-slate-800 px-2 py-0.5 rounded text-xs\">Belum</span>", 
     "<span className=\"text-slate-500\">Termin 3 — Finishing</span>\n                    <span className=\"text-slate-500 bg-slate-800 px-2 py-0.5 rounded text-xs\">Menunggu pembayaran</span>"),
    ("bagaimana TEGAKARA mengelola proyek dengan transparansi penuh untuk tab", "bagaimana TEGAKARA mengelola proyek dengan informasi yang lebih jelas untuk tab"),
    ("Lihat Demo ProjectView", "Buka Demo ProjectView")
]
update_file('/Users/macbook/kontraktor-website/src/components/home/projectview-preview.tsx', preview_replacements)

# 3. Update FAQs
faqs_content = """export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  category: string;
  faqs: FaqItem[];
}

export const generalFaqs: FaqItem[] = [
  {
    question: 'Jenis proyek apa saja yang diterima TEGAKARA?',
    answer: 'Kami selektif dalam menerima proyek demi menjaga kualitas layanan. Kami melakukan kualifikasi awal (assessment) untuk memastikan bahwa ekspektasi, nilai, dan budaya kerja antara kami dan klien sejalan. Kami lebih mengutamakan proyek yang menghargai kualitas, transparansi, dan proses terstruktur.'
  },
  {
    question: 'Bagaimana cara memperkirakan biaya pembangunan atau renovasi?',
    answer: 'Biaya sangat bervariasi bergantung pada kompleksitas, lokasi, dan spesifikasi material. Kami tidak memberikan "harga tebakan" per meter persegi tanpa data yang jelas, karena praktik tersebut sering menyesatkan. Kami menyusun Rencana Anggaran Biaya (RAB) terperinci setelah proses desain dan spesifikasi disepakati, memastikan tidak ada biaya tersembunyi.'
  },
  {
    question: 'Bagaimana sistem pembayaran proyek di TEGAKARA?',
    answer: 'Kami menggunakan sistem termin pembayaran yang terkait langsung dengan pencapaian progres fisik (milestones) yang nyata, dikelola melalui sistem ScopeLock kami. Pembayaran dilakukan secara proporsional sesuai dengan bobot pekerjaan yang telah diselesaikan dan disetujui, melindungi arus kas kedua belah pihak.'
  },
  {
    question: 'Apa saja yang termasuk dalam garansi pekerjaan?',
    answer: 'Setiap proyek kami dilindungi oleh Masa Pemeliharaan (Retensi), yang durasinya disesuaikan dengan jenis pekerjaan. Selama masa ini, kami bertanggung jawab penuh atas perbaikan cacat konstruksi (defect) yang disebabkan oleh pengerjaan tanpa biaya tambahan.'
  },
  {
    question: 'Apa perbedaan cara kerja TEGAKARA dengan kontraktor biasa?',
    answer: 'Perbedaan utama kami terletak pada transparansi total melalui ekosistem digital (ProjectView), kejujuran dalam berbisnis, dan kedisiplinan proses. Kami merancang alur kerja yang meminimalkan kejutan negatif di lapangan, dan jika ada masalah, kami menanganinya secara proaktif, bukan menutupinya.'
  },
  {
    question: 'Bagaimana proses perubahan desain atau material selama proyek berjalan?',
    answer: 'Perubahan di tengah jalan (Variation Order) sangat mungkin terjadi. Kami mengelolanya secara tertulis dan transparan melalui aplikasi. Setiap perubahan akan dievaluasi dampaknya terhadap biaya dan waktu, lalu membutuhkan persetujuan Anda sebelum dieksekusi, sehingga Anda memegang kendali penuh atas perubahan tersebut.'
  },
  {
    question: 'Bolehkah saya membeli material utama secara langsung?',
    answer: 'Secara prinsip kami menyarankan agar material disuplai melalui kami untuk menjamin kualitas, ketepatan waktu pengiriman, dan kemudahan klaim garansi. Namun, untuk item tertentu (seperti lampu dekoratif khusus atau perabot lepas), kita dapat mendiskusikannya dan mengatur tanggung jawab secara tertulis.'
  },
  {
    question: 'Bagaimana saya dapat melihat progres proyek?',
    answer: 'Anda akan diberikan akses eksklusif ke ProjectView (melalui web atau perangkat seluler). Di sana, Anda dapat melihat foto harian, laporan progres mingguan, status keuangan, dokumen proyek, hingga rekaman CCTV (jika dipasang), kapan saja dan di mana saja.'
  },
  {
    question: 'Berapa lama proses dari konsultasi hingga pekerjaan dimulai?',
    answer: 'Proses pra-konstruksi (desain, RAB, perizinan) adalah kunci keberhasilan dan tidak bisa diburu-buru. Waktunya berkisar antara 4 hingga 12 minggu, tergantung pada kompleksitas proyek, kecepatan pengambilan keputusan, dan waktu tunggu perizinan setempat.'
  },
  {
    question: 'Apakah TEGAKARA membantu pengurusan PBG dan perizinan terkait?',
    answer: 'Kami dapat membantu proses pengurusan perizinan (PBG) sebagai bagian dari layanan kami, bekerja sama dengan konsultan legal terpercaya kami. Biaya pengurusan akan dicantumkan secara transparan dalam penawaran awal.'
  },
  {
    question: 'Siapa yang bertanggung jawab mengawasi pekerjaan di lokasi?',
    answer: 'Setiap proyek akan dipimpin oleh seorang Site Manager (atau Pelaksana Lapangan) yang didedikasikan dan kompeten. Mereka memastikan pekerjaan harian sesuai dengan gambar kerja, spesifikasi, standar kualitas (Quality Hold Points), serta jadwal yang telah ditetapkan.'
  },
  {
    question: 'Apakah saya perlu datang ke lokasi proyek setiap hari?',
    answer: 'Sama sekali tidak. Ekosistem digital kami (ProjectView) dirancang agar Anda bisa memantau semuanya dari jauh. Anda hanya perlu datang pada saat-saat krusial yang membutuhkan inspeksi bersama (Hold Points) atau jika Anda sekadar ingin menikmati proses berjalannya proyek.'
  }
];

export const residentialFaqs: FaqItem[] = [
  {
    question: 'Apakah TEGAKARA mengerjakan proyek interior/furniture kustom?',
    answer: 'Ya, pekerjaan interior dan built-in furniture sering kali menjadi satu kesatuan dalam layanan bangun baru atau renovasi besar kami. Namun, untuk proyek yang semata-mata hanya interior skala kecil, kami akan mengevaluasinya pada tahap kualifikasi.'
  },
  {
    question: 'Bagaimana jika rumah saya bocor setelah pekerjaan selesai?',
    answer: 'Jika masalah tersebut terjadi dalam masa garansi dan disebabkan oleh ruang lingkup pekerjaan kami, tim kami akan segera memperbaikinya tanpa tambahan biaya. Kami menggunakan sistem waterproofing berstandar tinggi untuk meminimalkan risiko ini.'
  },
  {
    question: 'Bisakah saya tinggal di rumah selama renovasi berlangsung?',
    answer: 'Untuk renovasi sebagian, sangat mungkin. Kami akan memasang partisi pelindung debu dan memisahkan jalur akses pekerja untuk menjaga privasi dan kebersihan area hunian Anda. Namun, untuk renovasi struktural besar, demi keselamatan dan kenyamanan Anda, kami menyarankan Anda pindah sementara.'
  },
  {
    question: 'Apakah layanan HomeCare bisa digunakan jika rumah tidak dibangun oleh TEGAKARA?',
    answer: 'Bisa. Kami akan melakukan inspeksi awal (audit kondisi rumah) sebelum Anda tergabung dalam program HomeCare. Audit ini bertujuan untuk memetakan kondisi eksisting sehingga perawatan dapat dilakukan secara akurat.'
  },
  {
    question: 'Bagaimana penanganan limbah atau puing bekas bongkaran renovasi?',
    answer: 'Manajemen limbah adalah bagian dari standar kerja (SiteFlow) kami. Puing dan sampah proyek akan diangkut secara rutin ke tempat pembuangan akhir yang legal, memastikan area proyek dan lingkungan sekitar tetap rapi dan bersih.'
  }
];

export const facilityCareFaqs: FaqItem[] = [
  {
    question: 'Apakah TEGAKARA menerima panggilan perbaikan darurat untuk fasilitas komersial?',
    answer: 'Untuk klien yang terdaftar dalam kontrak Maintenance berkala, kami menyediakan layanan respon darurat (Emergency Call-out) sesuai Service Level Agreement (SLA). Untuk klien baru, kami akan jadwalkan survei secepat mungkin tergantung ketersediaan tim.'
  },
  {
    question: 'Bisakah pekerjaan dilakukan di malam hari atau akhir pekan agar tidak mengganggu operasional?',
    answer: 'Tentu. Penjadwalan fleksibel (out-of-hours working) adalah standar layanan Facility Care kami. Kami mengutamakan kelancaran operasional bisnis/sekolah Anda sehingga pekerjaan yang berisiko bising, berdebu, atau mengganggu akses akan dilakukan di luar jam sibuk.'
  },
  {
    question: 'Apakah pekerja TEGAKARA mematuhi standar K3 (Keselamatan Kerja) industri?',
    answer: 'Sangat patuh. Keselamatan adalah nilai non-negosiasi kami. Tim kami dibekali APD lengkap, pelatihan K3, dan kami terbiasa mematuhi prosedur Permit to Work (PTW) ketat yang berlaku di area pabrik atau fasilitas komersial berisiko tinggi.'
  },
  {
    question: 'Apa itu Facility Passport?',
    answer: 'Facility Passport adalah rekam medis digital untuk gedung Anda. Kami mendokumentasikan setiap jadwal perawatan, riwayat perbaikan, buku manual peralatan, hingga rencana anggaran pemeliharaan tahunan. Semuanya dapat diakses secara real-time.'
  },
  {
    question: 'Apakah TEGAKARA menangani maintenance sistem MEP (Mekanikal, Elektrikal, Plumbing)?',
    answer: 'Ya, layanan Facility Care kami mencakup perawatan preventif dan perbaikan sistem dasar gedung (MEP), berkoordinasi dengan teknisi spesialis kami untuk memastikan sistem utilitas vital Anda berfungsi optimal tanpa interupsi.'
  }
];

export const allFaqGroups: FaqGroup[] = [
  { category: 'Pertanyaan Umum', faqs: generalFaqs },
  { category: 'Residential', faqs: residentialFaqs },
  { category: 'Facility Care', faqs: facilityCareFaqs },
];
"""
with open('/Users/macbook/kontraktor-website/src/content/faqs.ts', 'w') as f:
    f.write(faqs_content)


# 4. Update page.tsx
page_replacements = [
    # Image alts
    ('alt="Hero Background"', 'alt="" aria-hidden="true"'),
    ('alt="Bangun dan Renovasi Rumah"', 'alt="Fasad rumah dua lantai dengan gaya modern"'),
    ('alt="Facility Care"', 'alt="Perawatan gedung komersial dan fasilitas industri"'),
    
    # Hero Section
    ("Construction & Facility Care — Surabaya", "Konstruksi & Perawatan Properti — Surabaya"),
    # ("Bangun dan rawat properti tanpa <span className=\"text-bronze\">kehilangan kendali.</span>", "Bangun dan rawat properti tanpa <span className=\"text-bronze\">kehilangan kendali.</span>"),
    ("TEGAKARA mengelola ruang lingkup, biaya, progres, mutu, dan perubahan pekerjaan secara terdokumentasi—untuk rumah, sekolah, gedung komersial, dan fasilitas operasional.", 
     "TEGAKARA membantu pemilik rumah dan pengelola gedung mengendalikan ruang lingkup, biaya, progres, mutu, dan perubahan pekerjaan melalui sistem yang jelas dan terdokumentasi."),
    ("Jadwalkan Konsultasi Proyek", "Konsultasikan Proyek"),
    
    # Hero Panel (Inline in page.tsx)
    ("Project Control Panel", "Panel Kendali Proyek"),
    ("Simulasi Pemantauan Proyek", "Simulasi ProjectView"),
    ("Scope Pekerjaan", "Ruang Lingkup"),
    ("Terdokumentasi 100%", "Dokumen dasar telah disetujui"),
    # "Terkunci" (keep as is)
    # "Progres Aktual" (keep as is)
    # "45%" (keep as is)
    ("Inspeksi Mutu", "Pemeriksaan Mutu"),
    ("Struktur Lantai 2", "Struktur lantai 2"),
    ("Menunggu", "Menunggu pemeriksaan"),
    ("Keputusan Klien", "Keputusan Klien"),
    ("Pilihan Keramik Utama", "Pilihan keramik utama"),
    ("1 Pending", "1 perlu persetujuan"),
    ("Termin Pembayaran", "Termin Proyek"),
    ("Milestone #3 Selesai", "Tahap 3 telah diverifikasi"),
    ("Siap Tagih", "Termin berikutnya siap diproses"),
    
    # 4 Principles
    ("Scope Terdokumentasi", "Ruang Lingkup Jelas"),
    ("Progres Berbukti", "Progres Dilengkapi Bukti"),
    ("Perubahan Tertulis", "Perubahan Disetujui Tertulis"),
    ("Garansi Terlacak", "Garansi Tercatat"),
    
    # Section 3 (Services)
    ("Layanan Berbasis Sistem", "Layanan untuk Rumah dan Gedung"),
    ("Pilih layanan yang sesuai dengan kebutuhan properti Anda. Semua dikelola dengan standar dokumentasi dan mutu yang sama.", 
     "Pilih layanan sesuai kebutuhan Anda. Setiap proyek menggunakan standar yang sama untuk perencanaan, dokumentasi progres, pemeriksaan mutu, dan perubahan pekerjaan."),
    ("Realisasikan desain rumah impian Anda dengan standar eksekusi yang terukur. Kami memastikan spesifikasi material sesuai rencana, timeline terjaga, dan setiap perubahan tercatat jelas dalam addendum.",
     "Bangun rumah baru, renovasi besar, atau tambah lantai dengan ruang lingkup, spesifikasi, jadwal, dan perubahan pekerjaan yang dicatat sejak awal.\\n\\nPelaksanaan disesuaikan dengan kondisi lokasi, kesiapan desain, kebutuhan pemilik, dan skema pengadaan yang disepakati."),
    ("Jelajahi Residential", "Lihat Layanan Rumah Tinggal"),
    ("Perawatan terencana untuk sekolah, gedung komersial, dan fasilitas operasional. Dari perbaikan terisolasi hingga renovasi menyeluruh, meminimalkan gangguan pada operasional harian Anda.",
     "Perbaikan dan perawatan terencana untuk sekolah, gedung komersial, gudang, dan fasilitas operasional, dengan pelaksanaan yang diatur agar gangguan kegiatan harian dapat ditekan."),
    ("Jelajahi Facility Care", "Lihat Layanan Facility Care"),
    
    # Section 4 (Problems)
    ("Masalah konstruksi jarang dimulai dari tukang. Masalah dimulai dari <span className=\"text-bronze\">sistem yang tidak jelas.</span>",
     "Banyak masalah konstruksi bukan semata persoalan tenaga lapangan, tetapi <span className=\"text-bronze\">sistem kerja yang tidak jelas.</span>"),
    ("Kami memahami kekhawatiran terbesar Anda saat membangun atau merenovasi. Itulah mengapa kami membangun sistem untuk mencegahnya.",
     "TEGAKARA menggunakan mekanisme kontrol untuk mengurangi risiko biaya, mutu, keterlambatan, dan perubahan yang tidak terdokumentasi sejak awal proyek."),
    ("Biaya membengkak tanpa kendali di tengah jalan.", "Biaya bertambah tanpa penjelasan yang jelas."),
    ("ScopeLock & Variation Order", "ScopeLock & Persetujuan Perubahan"),
    ("Setiap perubahan pekerjaan dihitung dan disepakati tertulis sebelum dieksekusi. Tidak ada tagihan kejutan.", "Setiap perubahan dihitung bersama dampaknya terhadap biaya dan jadwal, kemudian disetujui secara tertulis sebelum dikerjakan."),
    ("Spesifikasi material yang dipasang diturunkan kualitasnya.", "Material atau hasil pekerjaan tidak sesuai dengan spesifikasi yang disepakati."),
    ("Inspeksi Mutu Terbuka", "Persetujuan Material & Pemeriksaan Mutu"),
    ("Semua spesifikasi disepakati di awal. Klien memiliki akses untuk memverifikasi material yang datang ke lokasi.", "Spesifikasi dan sampel disetujui sebelum pengadaan. Material yang tiba serta tahapan penting didokumentasikan sebelum pekerjaan ditutup atau dilanjutkan."),
    ("Proyek ditinggalkan saat pekerjaan belum selesai.", "Pembayaran dan progres pekerjaan tidak berada pada tahap yang sama."),
    ("Pembayaran Berbasis Milestone", "Termin Berdasarkan Tahap Kerja"),
    ("Anda hanya membayar setelah tahap pekerjaan tertentu selesai dan diserahterimakan dengan bukti yang jelas.", "Setiap tahap memiliki ruang lingkup, kebutuhan dana, bukti progres, dan kriteria penyelesaian yang jelas. Pekerjaan tahap berikutnya dimulai setelah termin terkait diterima."),
    ("Tukang bekerja lambat dan tidak ada update progres harian.", "Progres sulit dipantau dan laporan proyek tidak tersusun dengan rapi."),
    ("ProjectView Dashboard", "ProjectView"),
    ("Pantau progres aktual, laporan foto, dan jadwal kerja harian melalui aplikasi, di mana saja Anda berada.", "Lihat progres, foto pekerjaan, jadwal, keputusan, dan perubahan proyek dalam satu portal yang mudah dipahami."),
    ("Struktur bangunan bermasalah setelah serah terima.", "Kesalahan pada pekerjaan penting baru diketahui setelah pekerjaan ditutup."),
    ("Pekerjaan krusial seperti pengecoran tidak akan dilanjutkan sebelum melewati inspeksi standar mutu kami.", "Tahapan penting seperti pembesian, pengecoran, pipa tertanam, kelistrikan, dan waterproofing diperiksa sebelum pekerjaan berikutnya dilanjutkan."),
    ("Kontraktor sulit dihubungi saat masa garansi untuk komplain.", "Keluhan selama masa garansi sulit dicatat dan dipantau penyelesaiannya."),
    ("Sistem Tiket Garansi", "Tiket Garansi Digital"),
    ("Klaim garansi tercatat dalam sistem dan wajib diselesaikan sesuai Service Level Agreement (SLA) kami.", "Setiap laporan dicatat, diperiksa, dan ditindaklanjuti sesuai cakupan serta masa garansi yang tercantum dalam kontrak."),

    # Section 5 (Methodology/System)
    ("Satu sistem untuk mengendalikan proyek dari awal hingga serah terima.", "Satu sistem untuk mengendalikan proyek dari awal hingga serah terima."),
    ("Metodologi kami dirancang untuk menghilangkan wilayah abu-abu dalam manajemen konstruksi.", "Setiap tahap memiliki ruang lingkup, penanggung jawab, bukti pekerjaan, dan persetujuan yang jelas."),
    ("Analisis komprehensif terhadap kondisi eksisting, kebutuhan ruang, dan batasan budget sebelum desain dimulai.", "Peninjauan awal terhadap kondisi lokasi, kebutuhan proyek, risiko, dan kesiapan anggaran sebelum ruang lingkup final disusun."),
    ("Dokumen kontrak mendetail yang mengunci batasan pekerjaan, spesifikasi material, dan standar hasil akhir.", "Dokumen dasar proyek yang menjelaskan pekerjaan yang termasuk, pekerjaan yang tidak termasuk, spesifikasi material, dan prosedur perubahan."),
    ("Jadwal kerja dan termin pembayaran yang terkait langsung dengan pencapaian fisik di lapangan.", "Proyek dibagi menjadi beberapa tahap kerja dengan jadwal, kebutuhan dana, dan kriteria penyelesaian yang jelas."),
    ("Titik henti inspeksi pada tahapan krusial (struktur, pemipaan tertanam, kelistrikan) sebelum pekerjaan ditutup.", "Pemeriksaan pada pekerjaan penting—seperti struktur, pipa tertanam, kelistrikan, dan waterproofing—sebelum pekerjaan ditutup atau dilanjutkan."),
    ("Akses digital 24/7 ke dashboard proyek Anda untuk melihat progres, foto harian, dan status keuangan.", "Portal klien untuk melihat progres per area, foto pekerjaan, keputusan, perubahan, dokumen mutu, dan status termin proyek."),
    ("Masa pemeliharaan terstruktur dengan sistem pelaporan kendala digital yang langsung ditangani tim kami.", "Masa garansi, laporan kendala, inspeksi berkala, dan kebutuhan perawatan dicatat hingga tindak lanjut sesuai ketentuan layanan."),

    # Section 6 (ProjectView Info)
    ("Transparansi Penuh", "Informasi Proyek Lebih Jelas"),
    ("Pantau proyek Anda dalam satu genggaman", "Lihat informasi penting proyek dalam satu tempat"),
    ('ProjectView memberi Anda kendali penuh atas informasi proyek. Tidak perlu lagi bertanya-tanya "sampai mana progres hari ini?" atau "mengapa biaya bertambah?".', 'ProjectView menyusun progres, foto, keputusan, perubahan pekerjaan, dokumen mutu, dan status termin agar informasi proyek lebih mudah dipahami dan ditindaklanjuti.'),
    ("Pelajari Fitur ProjectView", "Lihat Seluruh Fitur ProjectView"),
    
    # Section 7 (Process)
    ("Langkah demi langkah menuju hasil yang pasti", "Langkah kerja yang jelas dari awal hingga pelaksanaan"),
    ("Proses kerja kami dirancang linear untuk mencegah miskomunikasi dan pekerjaan berulang.", "Proses kerja kami disusun berurutan untuk mengurangi miskomunikasi, perubahan yang tidak tercatat, dan pekerjaan ulang."),
    ("Kualifikasi Awal (Assessment)", "Penilaian Awal Proyek"),
    ("Kami mempelajari kebutuhan dasar dan ekspektasi Anda untuk memastikan kecocokan profil proyek dengan layanan kami.", "Kami meninjau jenis pekerjaan, lokasi, kisaran anggaran, target waktu, dan skema pembayaran untuk menilai kecocokan proyek."),
    ("<li>Pengisian kuesioner awal.</li>", "<li>Mengisi formulir kebutuhan proyek.</li>"),
    ("<li>Evaluasi kecocokan nilai dan budget.</li>", "<li>Pemeriksaan awal jenis pekerjaan, lokasi, anggaran, dan jadwal.</li>"),
    ("Konsultasi Perdana (Discovery Call)", "Konsultasi Awal"),
    ("Diskusi mendalam (online/offline) untuk membedah visi proyek, timeline, dan potensi kendala awal.", "Kami membahas kebutuhan, prioritas, kendala, dan target proyek bersama pengambil keputusan."),
    ("<li>Pertemuan dengan konsultan kami.</li>", "<li>Pertemuan daring atau tatap muka.</li>"),
    ("<li>Pemetaan kebutuhan ruang dan fungsi.</li>", "<li>Konfirmasi kebutuhan dan langkah berikutnya.</li>"),
    ("Tim ahli kami mengunjungi lokasi untuk mengumpulkan data riil dan mengidentifikasi potensi kendala teknis.", "Tim teknis mengunjungi lokasi untuk mengukur kondisi aktual dan mengidentifikasi kendala yang dapat memengaruhi pekerjaan."),
    ("<li>Pengukuran dan pemetaan site.</li>", "<li>Pengukuran dan dokumentasi kondisi lokasi.</li>"),
    ("<li>Analisis aksesibilitas dan lingkungan.</li>", "<li>Pemeriksaan akses, lingkungan kerja, dan kebutuhan logistik.</li>"),
    ("Pengajuan Proposal Awal", "Penyampaian Proposal Awal"),
    ("Penyajian konsep awal dan estimasi kasar (Rough Order of Magnitude) berdasarkan hasil diskusi dan survei.", "Kami menyampaikan gambaran awal ruang lingkup, metode pelaksanaan, kisaran anggaran, dan rencana tahapan pekerjaan."),
    ("<li>Presentasi konsep desain/solusi.</li>", "<li>Gambaran awal kebutuhan dan ruang lingkup.</li>"),
    ("<li>Estimasi biaya awal.</li>", "<li>Perkiraan anggaran dalam bentuk rentang harga.</li>"),
    ("Perjanjian Perencanaan (Design & Build)", "Perjanjian Tahap Perencanaan"),
    ("Bila proposal awal disetujui, kita memasuki tahap perencanaan detail yang terikat komitmen.", "Jika proposal awal disetujui, proyek dilanjutkan ke tahap perencanaan rinci melalui perjanjian dan biaya yang disepakati."),
    ("<li>Penandatanganan kontrak desain.</li>", "<li>Penandatanganan perjanjian tahap perencanaan.</li>"),
    ("<li>Pembayaran commitment fee/biaya desain.</li>", "<li>Pembayaran biaya desain atau perencanaan sesuai kebutuhan proyek.</li>"),
    ("Pengembangan Desain Detail", "Perencanaan Detail"),
    ("Penyusunan gambar kerja, spesifikasi material, dan perizinan.", "Penyusunan gambar kerja, spesifikasi material, serta dokumen teknis yang dibutuhkan sebelum pelaksanaan."),
    ("<li>Pembuatan Gambar Kerja (DED).</li>", "<li>Pembuatan gambar kerja teknis.</li>"),
    ("<li>Pemilihan material spesifik.</li>", "<li>Pemilihan dan persetujuan spesifikasi material.</li>"),
    ("Penyusunan RAB Final", "Penyusunan RAB dan Penawaran Final"),
    ("Pembuatan Rencana Anggaran Biaya yang akurat berdasarkan gambar kerja yang telah disetujui.", "RAB dan nilai kontrak disusun berdasarkan gambar, spesifikasi, serta ruang lingkup yang telah disetujui."),
    ("<li>Perhitungan volume pekerjaan terperinci.</li>", "<li>Perhitungan volume dan biaya setiap pekerjaan.</li>"),
    ("<li>Penawaran harga mengikat (Fixed Price).</li>", "<li>Penetapan nilai kontrak, termin, dan prosedur perubahan pekerjaan.</li>"),
    
    # Section 8 (Portfolio)
    ("Bukti Kinerja Kami", "Lihat Proyek yang Telah Kami Kerjakan"),
    ("Kepercayaan klien adalah aset terbesar kami. Kami beroperasi dengan prinsip kerahasiaan untuk proyek tertentu, namun membagikan hasil akhir untuk proyek yang diizinkan.", "Kami hanya menampilkan proyek yang telah mendapat izin publikasi. Informasi proyek lainnya tetap kami jaga sesuai kesepakatan dengan klien."),
    ("Residensial", "Rumah Tinggal"),
    ("Komersial", "Gedung Komersial"),
    
    # Section 9 (Why Choose)
    ("Mengapa klien mempercayakan propertinya pada TEGAKARA?", "Mengapa memilih TEGAKARA?"),
    ("Bukan Janji Manis, Melainkan Kontrak Keras", "Ruang Lingkup Jelas, Bukan Janji Umum"),
    ("Kami tidak menjanjikan 'harga termurah' yang berujung pada penurunan mutu. Kami menawarkan nilai paling masuk akal dengan kontrak ruang lingkup yang mengunci spesifikasi tanpa kompromi diam-diam.", "Ruang lingkup, spesifikasi, jadwal, dan prosedur perubahan dicatat sejak awal. Setiap perubahan dibahas dan disetujui sebelum dikerjakan."),
    ("Pendekatan Proaktif, Bukan Reaktif", "Pekerjaan Penting Diperiksa Sebelum Ditutup"),
    ("Sistem inspeksi (Quality Hold Point) kami mencegah cacat tersembunyi sejak awal, bukan sekadar memperbaikinya setelah menjadi masalah besar di kemudian hari.", "Quality Hold Point digunakan untuk memeriksa tahapan penting sebelum pekerjaan berikutnya dilanjutkan, sehingga risiko kesalahan tersembunyi dapat dikurangi."),
    ("Keputusan Berbasis Data", "Progres Dibuktikan, Bukan Sekadar Dilaporkan"),
    ("Setiap laporan kemajuan dan penagihan didasarkan pada progres fisik di lapangan yang diverifikasi, bukan perkiraan subjektif dari mandor.", "Laporan progres dan status tahap pekerjaan dilengkapi foto, catatan lapangan, serta hasil pemeriksaan yang relevan."),
    ("Garansi Kualitas", "Garansi Sesuai Lingkup Pekerjaan"),
    ("Struktur • Kebocoran • Utilitas", "Cakupan dan masa garansi dijelaskan dalam kontrak."),
    ("Didukung dengan sistem pelacakan tiket garansi digital", "Laporan kendala dapat dicatat dan dipantau melalui tiket garansi digital."),

    # Section 10 (Assessment)
    ("Cocokkan kebutuhan proyek Anda dengan sistem kerja kami.", "Ceritakan kebutuhan proyek Anda."),
    ("Kami selektif dalam menerima proyek untuk memastikan setiap klien mendapatkan standar perhatian dan kontrol kualitas tertinggi.", "Kami meninjau jenis pekerjaan, lokasi, anggaran, jadwal, skema pembayaran, dan kapasitas tim sebelum menerima proyek."),
    ("Mulai Project Assessment", "Mulai Penilaian Proyek"),
    ("Mengisi form assessment hanya memakan waktu 3 menit dan tidak mengikat.", "Formulir singkat ini membantu kami memahami kebutuhan awal proyek Anda dan tidak mengikat."),
    
    # Section 11 (FAQ)
    ("Jawaban transparan untuk pertanyaan yang sering diajukan calon klien.", "Jawaban singkat atas pertanyaan yang paling sering diajukan calon klien."),
    ("Punya pertanyaan lain yang lebih spesifik?", "Masih memiliki pertanyaan tentang proyek Anda?"),
    ("Hubungi Tim Kami", "Hubungi Tim TEGAKARA"),
]
update_file('/Users/macbook/kontraktor-website/src/app/page.tsx', page_replacements)
print("Done updating copy")
