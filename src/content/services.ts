export interface ServiceData {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  painPoints: string[];
  ctaText: string;
  ctaUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export const residentialServices: ServiceData[] = [
  {
    slug: 'bangun-rumah',
    title: 'Bangun Rumah',
    shortDescription: 'Pembangunan rumah tinggal dari nol dengan standar kualitas tinggi dan manajemen proyek yang terstruktur.',
    fullDescription: 'Layanan pembangunan rumah menyeluruh yang dirancang untuk memberikan ketenangan pikiran. Dari persiapan lahan hingga serah terima kunci, setiap tahapan dikelola dengan disiplin dan dapat dipantau langsung melalui ProjectView.',
    iconName: 'Home',
    features: ['Manajemen Proyek Terpadu', 'Laporan Progres Real-time', 'Kontrol Kualitas Ketat', 'Garansi Sesuai Lingkup Pekerjaan'],
    painPoints: ['Biaya bertambah tanpa penjelasan yang jelas', 'Progres terlambat dari jadwal', 'Kualitas material tidak sesuai kesepakatan'],
    ctaText: 'Mulai Rencana Pembangunan',
    ctaUrl: '/assessment?service=bangun-rumah',
    seoTitle: 'Jasa Bangun Rumah Profesional | ARKAVENA',
    seoDescription: 'Jasa bangun rumah dengan manajemen proyek transparan dan standar kualitas terbaik oleh ARKAVENA.'
  },
  {
    slug: 'renovasi-besar',
    title: 'Renovasi Besar',
    shortDescription: 'Transformasi hunian Anda dengan perencanaan matang dan eksekusi yang presisi.',
    fullDescription: 'Renovasi menyeluruh membutuhkan keahlian khusus untuk mengintegrasikan struktur lama dan baru. Kami menangani perubahan layout, peremajaan sistem utilitas, dan peningkatan estetika dengan meminimalkan gangguan pada area yang tidak direnovasi.',
    iconName: 'Wrench',
    features: ['Analisis Struktur Existing', 'Proteksi Area Kerja', 'Jadwal Kerja Terukur', 'Pembersihan Harian'],
    painPoints: ['Rumah kotor dan berantakan berlarut-larut', 'Biaya tersembunyi yang muncul di tengah jalan', 'Hasil akhir tidak rapi'],
    ctaText: 'Konsultasikan Renovasi',
    ctaUrl: '/assessment?service=renovasi-besar',
    seoTitle: 'Jasa Renovasi Rumah Terpercaya | ARKAVENA',
    seoDescription: 'Renovasi rumah profesional dengan hasil rapi dan minim gangguan. Hubungi ARKAVENA sekarang.'
  },
  {
    slug: 'tambah-lantai',
    title: 'Tambah Lantai',
    shortDescription: 'Penambahan area vertikal yang aman secara struktural tanpa harus membangun ulang seluruh rumah.',
    fullDescription: 'Perluasan ruang ke atas (tambah lantai) menuntut perhitungan struktur yang akurat. Kami memastikan fondasi dan struktur eksisting mampu menopang beban tambahan, menjaga keamanan keluarga Anda untuk jangka panjang.',
    iconName: 'Layers',
    features: ['Audit Struktur Menyeluruh', 'Penguatan Fondasi', 'Metode Kerja Aman', 'Integrasi Sistem MEP'],
    painPoints: ['Khawatir rumah ambruk karena struktur tidak kuat', 'Terganggunya rutinitas selama proses', 'Bocor pada area sambungan'],
    ctaText: 'Cek Kelayakan Struktur',
    ctaUrl: '/assessment?service=tambah-lantai',
    seoTitle: 'Jasa Tambah Lantai Rumah | ARKAVENA',
    seoDescription: 'Tambah lantai aman dengan perhitungan struktur akurat dari ARKAVENA.'
  },
  {
    slug: 'perbaikan-remedial',
    title: 'Perbaikan dan Remedial',
    shortDescription: 'Penanganan masalah struktural, kebocoran membandel, dan cacat bangunan lainnya.',
    fullDescription: 'Tim spesialis kami mengidentifikasi akar masalah, bukan sekadar gejala permukaan. Kami memberikan solusi perbaikan permanen untuk isu-isu kompleks seperti retak struktur, penurunan tanah, atau masalah rembes yang terus berulang.',
    iconName: 'ShieldAlert',
    features: ['Diagnosis Akar Masalah', 'Metode Perbaikan Tepat Guna', 'Penggunaan Material Khusus', 'Garansi Sesuai Lingkup Pekerjaan'],
    painPoints: ['Bocor yang tak kunjung sembuh', 'Retak dinding yang semakin melebar', 'Dibutuhkan tenaga spesialis untuk identifikasi akar masalah'],
    ctaText: 'Jadwalkan Inspeksi',
    ctaUrl: '/assessment?service=perbaikan-remedial',
    seoTitle: 'Jasa Perbaikan & Remedial Bangunan | ARKAVENA',
    seoDescription: 'Solusi tuntas untuk masalah bangunan membandel seperti bocor dan retak struktur.'
  },
  {
    slug: 'homecare',
    title: 'HomeCare',
    shortDescription: 'Layanan pemeliharaan preventif dan perbaikan ringan berkala untuk menjaga nilai hunian Anda.',
    fullDescription: 'Program perawatan rumah berlangganan atau on-demand. Mencegah kerusakan besar dengan pengecekan dan perawatan rutin pada sistem atap, perpipaan, kelistrikan, dan elemen arsitektural lainnya.',
    iconName: 'Heart',
    features: ['Inspeksi Berkala', 'Laporan Kondisi Rumah', 'Respon Cepat', 'Teknisi Tersertifikasi'],
    painPoints: ['Sulit mencari tukang handal untuk perbaikan kecil', 'Kerusakan kecil yang menjadi besar karena dibiarkan', 'Tidak ada riwayat perbaikan'],
    ctaText: 'Daftar Program HomeCare',
    ctaUrl: '/assessment?service=homecare',
    seoTitle: 'Layanan Perawatan Rumah (HomeCare) | ARKAVENA',
    seoDescription: 'Jaga kondisi rumah tetap prima dengan layanan HomeCare berkala dari ARKAVENA.'
  }
];

export const facilityCareServices: ServiceData[] = [
  {
    slug: 'maintenance-sekolah',
    title: 'Maintenance Sekolah',
    shortDescription: 'Pemeliharaan fasilitas pendidikan yang mengutamakan keselamatan dan kenyamanan siswa.',
    fullDescription: 'Kami memahami bahwa lingkungan sekolah membutuhkan standar keamanan ekstra. Layanan kami dirancang untuk beroperasi dengan gangguan minimal pada kegiatan belajar mengajar, mencakup perawatan gedung, fasilitas olahraga, hingga sanitasi.',
    iconName: 'GraduationCap',
    features: ['Jadwal Kerja Fleksibel (Luar Jam Sekolah)', 'Clearances Keamanan Tim', 'Audit Keselamatan Fasilitas', 'Perbaikan Cepat Tepat'],
    painPoints: ['Pekerjaan yang mengganggu proses belajar', 'Material berbahaya bagi anak-anak', 'Fasilitas rusak yang membahayakan siswa'],
    ctaText: 'Konsultasi Perawatan Sekolah',
    ctaUrl: '/assessment?service=maintenance-sekolah',
    seoTitle: 'Layanan Maintenance Sekolah & Kampus | ARKAVENA',
    seoDescription: 'Pemeliharaan fasilitas pendidikan yang aman dan minim gangguan. Hubungi ARKAVENA Facility Care.'
  },
  {
    slug: 'maintenance-gedung',
    title: 'Maintenance Gedung',
    shortDescription: 'Solusi perawatan komprehensif untuk perkantoran dan ruang komersial.',
    fullDescription: 'Menjaga operasional gedung tetap optimal adalah kunci bisnis Anda. Kami mengelola perawatan preventif dan korektif untuk arsitektur, lanskap, dan sistem dasar bangunan, memastikan kenyamanan tenant dan pengunjung.',
    iconName: 'Building',
    features: ['Service Level Agreement (SLA)', 'Manajemen Aset (Facility Passport)', 'Inspeksi Rutin', 'Laporan Kinerja Transparan'],
    painPoints: ['Kerusakan yang menghentikan operasional bisnis', 'Biaya perawatan yang tidak terprediksi', 'Penurunan nilai aset bangunan'],
    ctaText: 'Optimalkan Perawatan Gedung',
    ctaUrl: '/assessment?service=maintenance-gedung',
    seoTitle: 'Maintenance Gedung & Komersial | ARKAVENA',
    seoDescription: 'Perawatan gedung perkantoran dan komersial terpercaya untuk operasional bisnis yang lancar.'
  },
  {
    slug: 'waterproofing-atap',
    title: 'Waterproofing dan Atap',
    shortDescription: 'Sistem perlindungan cuaca tingkat industri untuk melindungi investasi properti Anda.',
    fullDescription: 'Kebocoran pada fasilitas komersial bisa berakibat fatal pada aset dan operasional. Kami menyediakan solusi waterproofing presisi tinggi dan perbaikan atap dengan teknologi terkini, disertai garansi jangka panjang.',
    iconName: 'Umbrella',
    features: ['Audit Termal/Kelembaban', 'Material High-Grade Industri', 'Pelaksanaan Tepat Cuaca', 'Garansi Anti Bocor'],
    painPoints: ['Rembes yang merusak mesin/barang di dalam', 'Perbaikan kebocoran yang sering berulang', 'Sulit menemukan titik pasti kebocoran'],
    ctaText: 'Atasi Masalah Kebocoran',
    ctaUrl: '/assessment?service=waterproofing-atap',
    seoTitle: 'Jasa Waterproofing & Perbaikan Atap Industri | ARKAVENA',
    seoDescription: 'Solusi tuntas masalah kebocoran atap dan waterproofing untuk fasilitas industri & komersial.'
  },
  {
    slug: 'minor-works-industri',
    title: 'Minor Works Industri',
    shortDescription: 'Pekerjaan sipil ringan dan modifikasi fasilitas untuk mendukung dinamika industri.',
    fullDescription: 'Modifikasi ruang, perbaikan lantai pabrik, pembuatan struktur ringan pendukung operasional, hingga pengecatan epoksi. Eksekusi cepat, mematuhi standar K3 (Keselamatan dan Kesehatan Kerja) yang ketat.',
    iconName: 'Factory',
    features: ['Kepatuhan K3 Industri', 'Eksekusi Cepat (Fast-track)', 'Koordinasi Izin Kerja (PTW)', 'Material Tahan Banting'],
    painPoints: ['Kontraktor tidak paham prosedur safety pabrik', 'Pekerjaan molor yang menghambat produksi', 'Hasil kerja tidak tahan kondisi industri'],
    ctaText: 'Rencanakan Minor Works',
    ctaUrl: '/assessment?service=minor-works-industri',
    seoTitle: 'Kontraktor Minor Works Industri | ARKAVENA',
    seoDescription: 'Pekerjaan sipil dan modifikasi fasilitas pabrik/industri dengan standar K3 yang ketat.'
  }
];
