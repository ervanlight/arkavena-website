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
    title: 'Penilaian Awal Proyek',
    description: 'Kami meninjau jenis pekerjaan, lokasi, kisaran anggaran, target waktu, dan skema pembayaran untuk menilai kecocokan proyek.',
    icon: 'ClipboardList',
    details: [
      'Mengisi formulir kebutuhan proyek.',
      'Pemeriksaan awal jenis pekerjaan, lokasi, anggaran, dan jadwal.',
      
    ]
  },
  {
    id: 'konsultasi-pertama',
    stepNumber: 2,
    title: 'Konsultasi Awal',
    description: 'Kami membahas kebutuhan, prioritas, kendala, dan target proyek bersama pengambil keputusan.',
    icon: 'PhoneCall',
    details: [
      'Pertemuan daring atau tatap muka.',
      'Konfirmasi kebutuhan dan langkah berikutnya.'
    ]
  },
  {
    id: 'survei-lokasi',
    stepNumber: 3,
    title: 'Survei Lokasi & Pengumpulan Data',
    description: 'Tim teknis mengunjungi lokasi untuk mengukur kondisi aktual dan mengidentifikasi kendala yang dapat memengaruhi pekerjaan.',
    icon: 'MapPin',
    details: [
      'Pengukuran dan dokumentasi kondisi lokasi.',
      'Pemeriksaan akses, lingkungan kerja, dan kebutuhan logistik.'
    ]
  },
  {
    id: 'pengajuan-proposal',
    stepNumber: 4,
    title: 'Penyampaian Proposal Awal',
    description: 'Kami menyampaikan gambaran awal ruang lingkup, metode pelaksanaan, kisaran anggaran, dan rencana tahapan pekerjaan.',
    icon: 'FileText',
    details: [
      'Gambaran awal kebutuhan dan ruang lingkup.',
      'Perkiraan anggaran dalam bentuk rentang harga.'
    ]
  },
  {
    id: 'perjanjian-desain',
    stepNumber: 5,
    title: 'Perjanjian Tahap Perencanaan',
    description: 'Jika proposal awal disetujui, proyek dilanjutkan ke tahap perencanaan rinci melalui perjanjian dan biaya yang disepakati.',
    icon: 'PenTool',
    details: [
      'Penandatanganan perjanjian tahap perencanaan.',
      'Pembayaran biaya desain atau perencanaan sesuai kebutuhan proyek.'
    ]
  },
  {
    id: 'pengembangan-desain',
    stepNumber: 6,
    title: 'Perencanaan Detail',
    description: 'Penyusunan gambar kerja, spesifikasi material, serta dokumen teknis yang dibutuhkan sebelum pelaksanaan.',
    icon: 'Compass',
    details: [
      'Pembuatan gambar kerja teknis.',
      'Pemilihan dan persetujuan spesifikasi material.'
    ]
  },
  {
    id: 'penyusunan-rab',
    stepNumber: 7,
    title: 'Penyusunan RAB dan Penawaran Final',
    description: 'RAB dan nilai kontrak disusun berdasarkan gambar, spesifikasi, serta ruang lingkup yang telah disetujui.',
    icon: 'Calculator',
    details: [
      'Perhitungan volume dan biaya setiap pekerjaan.',
      'Penetapan nilai kontrak, termin, dan prosedur perubahan pekerjaan.'
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
