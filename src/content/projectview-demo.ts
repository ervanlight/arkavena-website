export interface ProjectViewZone {
  name: string;
  status: 'Belum Dimulai' | 'Sedang Berjalan' | 'Selesai' | 'Tertunda';
  progress: number;
}

export interface ProjectViewActivity {
  date: string;
  title: string;
  description: string;
}

export interface ProjectViewIssue {
  title: string;
  status: 'Terbuka' | 'Dalam Proses' | 'Selesai';
  priority: 'Rendah' | 'Menengah' | 'Tinggi' | 'Kritis';
  description: string;
}

export interface ProjectViewData {
  projectName: string;
  isDemo: boolean;
  type: 'Residential' | 'FacilityCare';
  overallProgress: number;
  startDate: string;
  estimatedCompletion: string;
  zones: ProjectViewZone[];
  recentActivities: ProjectViewActivity[];
  issues: ProjectViewIssue[];
  qualityHoldPoints: { title: string; status: 'Menunggu' | 'Disetujui' | 'Ditolak' }[];
}

export const projectViewDemoResidential: ProjectViewData = {
  projectName: 'Simulasi Proyek Rumah Surabaya',
  isDemo: true,
  type: 'Residential',
  overallProgress: 65,
  startDate: '2026-03-15',
  estimatedCompletion: '2026-09-30',
  zones: [
    { name: 'Fondasi & Struktur Dasar', status: 'Selesai', progress: 100 },
    { name: 'Lantai 1 - Dinding & Atap', status: 'Selesai', progress: 100 },
    { name: 'Lantai 2 - Dinding & Atap', status: 'Sedang Berjalan', progress: 80 },
    { name: 'Kamar Mandi', status: 'Sedang Berjalan', progress: 40 },
    { name: 'Dapur', status: 'Belum Dimulai', progress: 0 },
    { name: 'Eksterior & Fasad', status: 'Belum Dimulai', progress: 0 },
  ],
  recentActivities: [
    { date: '2026-07-18', title: 'Pengecoran dak lantai 2', description: 'Proses pengecoran selesai sesuai jadwal, menunggu masa curing.' },
    { date: '2026-07-15', title: 'Instalasi pipa air kotor', description: 'Jalur perpipaan kamar mandi utama terpasang dan lolos uji tekan.' }
  ],
  issues: [
    { title: 'Perubahan titik stop kontak Kamar Utama', status: 'Dalam Proses', priority: 'Rendah', description: 'Permintaan klien (Variation Order #02) sedang dikerjakan.' }
  ],
  qualityHoldPoints: [
    { title: 'Inspeksi Pembesian Dak', status: 'Disetujui' },
    { title: 'Uji Tekan Pipa Air Bersih', status: 'Menunggu' }
  ]
};

export const projectViewDemoFacilityCare: ProjectViewData = {
  projectName: 'Simulasi Facility Care Sekolah',
  isDemo: true,
  type: 'FacilityCare',
  overallProgress: 100, // Ongoing maintenance format
  startDate: '2026-01-01',
  estimatedCompletion: '2026-12-31',
  zones: [
    { name: 'Gedung A (Kelas 1-3)', status: 'Selesai', progress: 100 },
    { name: 'Gedung B (Laboratorium)', status: 'Sedang Berjalan', progress: 50 },
    { name: 'Fasilitas Olahraga', status: 'Selesai', progress: 100 },
    { name: 'Kantin & Area Terbuka', status: 'Selesai', progress: 100 }
  ],
  recentActivities: [
    { date: '2026-07-19', title: 'Perawatan rutin AC Gedung B', description: 'Pembersihan filter dan pengecekan freon 12 unit AC.' },
    { date: '2026-07-10', title: 'Inspeksi atap paska hujan deras', description: 'Tidak ditemukan kebocoran pada area yang baru di-waterproofing.' }
  ],
  issues: [
    { title: 'Lampu lorong Lab Fisika mati', status: 'Terbuka', priority: 'Menengah', description: 'Tiket servis diterbitkan untuk penggantian ballast lampu.' },
    { title: 'Engsel pintu darurat macet', status: 'Selesai', priority: 'Tinggi', description: 'Perbaikan segera telah dilakukan demi alasan keselamatan.' }
  ],
  qualityHoldPoints: [
    { title: 'Audit Keamanan Semesteran', status: 'Disetujui' },
    { title: 'Sertifikasi Ulang Alat Pemadam Api', status: 'Menunggu' }
  ]
};
