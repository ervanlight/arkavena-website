export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: 'kualifikasi-awal',
    stepNumber: 1,
    title: 'Kualifikasi Awal (Assessment)',
    description: 'Kami mempelajari kebutuhan dasar dan ekspektasi Anda untuk memastikan kecocokan profil proyek dengan layanan kami.',
    icon: 'ClipboardList',
    details: [
      'Pengisian formulir kuesioner digital.',
      'Analisis awal cakupan pekerjaan.',
      'Konfirmasi estimasi budget awal.'
    ]
  },
  {
    id: 'konsultasi-pertama',
    stepNumber: 2,
    title: 'Konsultasi Perdana (Discovery Call)',
    description: 'Diskusi mendalam untuk memahami visi, tantangan, dan target waktu proyek Anda.',
    icon: 'PhoneCall',
    details: [
      'Pertemuan daring atau tatap muka.',
      'Penyelarasan visi proyek.',
      'Penjelasan prosedur dan sistem kerja TEGAKARA.'
    ]
  },
  {
    id: 'survei-lokasi',
    stepNumber: 3,
    title: 'Survei Lokasi & Pengumpulan Data',
    description: 'Tim ahli kami mengunjungi lokasi untuk mengumpulkan data riil dan mengidentifikasi potensi kendala teknis.',
    icon: 'MapPin',
    details: [
      'Pengukuran dan dokumentasi kondisi eksisting.',
      'Identifikasi akses dan logistik proyek.',
      'Pemetaan potensi risiko di lapangan.'
    ]
  },
  {
    id: 'pengajuan-proposal',
    stepNumber: 4,
    title: 'Pengajuan Proposal Awal',
    description: 'Penyajian konsep awal dan estimasi kasar (Rough Order of Magnitude) berdasarkan hasil diskusi dan survei.',
    icon: 'FileText',
    details: [
      'Sketsa konsep atau diagram sirkulasi ruang.',
      'Estimasi biaya awal (rentang harga).',
      'Estimasi timeline kasar.'
    ]
  },
  {
    id: 'perjanjian-desain',
    stepNumber: 5,
    title: 'Perjanjian Perencanaan (Design & Build)',
    description: 'Bila proposal awal disetujui, kita memasuki tahap perencanaan detail yang terikat komitmen.',
    icon: 'PenTool',
    details: [
      'Penandatanganan kontrak perencanaan.',
      'Pembayaran fee desain/perencanaan.',
      'Kick-off meeting tahap desain.'
    ]
  },
  {
    id: 'pengembangan-desain',
    stepNumber: 6,
    title: 'Pengembangan Desain Detail',
    description: 'Penyusunan gambar kerja, spesifikasi material, dan perizinan.',
    icon: 'Compass',
    details: [
      'Pembuatan Gambar Kerja (DED).',
      'Pemilihan material spesifik.',
      'Proses pengurusan izin (jika diperlukan).'
    ]
  },
  {
    id: 'penyusunan-rab',
    stepNumber: 7,
    title: 'Penyusunan RAB Final',
    description: 'Pembuatan Rencana Anggaran Biaya yang akurat berdasarkan gambar kerja yang telah disetujui.',
    icon: 'Calculator',
    details: [
      'Perhitungan volume pekerjaan terperinci.',
      'Penawaran harga mengikat (Fixed Price).',
      'Review dan persetujuan RAB.'
    ]
  },
  {
    id: 'kontrak-konstruksi',
    stepNumber: 8,
    title: 'Penandatanganan Kontrak Konstruksi',
    description: 'Pengesahan dokumen kerja sama untuk tahap pelaksanaan fisik bangunan.',
    icon: 'CheckSquare',
    details: [
      'Review pasal-pasal kontrak.',
      'Penjadwalan termin pembayaran (ScopeLock).',
      'Tanda tangan dokumen resmi.'
    ]
  },
  {
    id: 'persiapan-proyek',
    stepNumber: 9,
    title: 'Persiapan & Mobilisasi (Pre-Construction)',
    description: 'Penyiapan area kerja, pengaturan logistik, dan briefing tim lapangan.',
    icon: 'Truck',
    details: [
      'Pemasangan proteksi area kerja.',
      'Mobilisasi peralatan dan material awal.',
      'Briefing K3 untuk seluruh pekerja.'
    ]
  },
  {
    id: 'pelaksanaan-konstruksi',
    stepNumber: 10,
    title: 'Pelaksanaan Konstruksi',
    description: 'Pekerjaan fisik berjalan sesuai jadwal dan spesifikasi, dipantau melalui aplikasi.',
    icon: 'Hammer',
    details: [
      'Pelaksanaan pekerjaan harian.',
      'Update progres real-time via ProjectView.',
      'Inspeksi Quality Hold Points berkala.'
    ]
  },
  {
    id: 'pengendalian-kualitas',
    stepNumber: 11,
    title: 'Pengendalian Kualitas (Quality Control)',
    description: 'Pengecekan ketat pada setiap tahap krusial sebelum melanjutkan ke tahap berikutnya.',
    icon: 'ShieldCheck',
    details: [
      'Inspeksi berlapis oleh Site Manager.',
      'Dokumentasi hasil tes material.',
      'Penanganan segera terhadap temuan minor.'
    ]
  },
  {
    id: 'serah-terima',
    stepNumber: 12,
    title: 'Serah Terima (Handover)',
    description: 'Penyerahan hasil pekerjaan setelah semua kriteria kualitas terpenuhi.',
    icon: 'Key',
    details: [
      'Inspeksi bersama dan pembuatan Defect List.',
      'Perbaikan minor akhir (Snagging).',
      'Penandatanganan Berita Acara Serah Terima (BAST).'
    ]
  },
  {
    id: 'masa-retensi',
    stepNumber: 13,
    title: 'Masa Pemeliharaan (Retensi)',
    description: 'Periode garansi di mana kami bertanggung jawab atas cacat pekerjaan yang mungkin muncul.',
    icon: 'Wrench',
    details: [
      'Respon cepat terhadap laporan klien.',
      'Perbaikan tanpa biaya tambahan untuk cacat konstruksi.',
      'Serah terima final (BAST 2).'
    ]
  },
  {
    id: 'maintenance-continuation',
    stepNumber: 14,
    title: 'Layanan Lanjutan (Facility Passport)',
    description: 'Transisi ke program pemeliharaan preventif jangka panjang untuk menjaga nilai aset.',
    icon: 'RefreshCcw',
    details: [
      'Penyerahan dokumen As-Built dan panduan.',
      'Penawaran program HomeCare/Facility Care.',
      'Akses seumur hidup ke riwayat proyek digital.'
    ]
  }
];
