export interface EcosystemComponent {
  id: string;
  name: string;
  description: string;
  audience: 'Klien' | 'Internal' | 'Keduanya';
  keyBenefits: string[];
}

export const ecosystemData: EcosystemComponent[] = [
  {
    id: 'website-assessment',
    name: 'Website & Assessment',
    description: 'Titik masuk digital pertama bagi klien. Berisi informasi komprehensif, edukasi, dan sistem kualifikasi awal (Assessment) yang menghemat waktu kedua belah pihak.',
    audience: 'Klien',
    keyBenefits: ['Kualifikasi lead otomatis', 'Transparansi informasi layanan', 'Proses onboarding yang terstruktur']
  },
  {
    id: 'buildtrust-os',
    name: 'BuildTrust OS',
    description: 'Sistem operasi pusat (ERP internal) yang mengelola semua data operasional, dari penjadwalan, keuangan, logistik, hingga manajemen SDM.',
    audience: 'Internal',
    keyBenefits: ['Pusat data tunggal (Single Source of Truth)', 'Otomatisasi alur kerja', 'Manajemen arus kas real-time']
  },
  {
    id: 'siteflow',
    name: 'SiteFlow',
    description: 'Aplikasi pendamping lapangan untuk Site Manager dan tim proyek. Mengelola tugas harian, pelaporan kualitas, absensi, dan komunikasi lapangan.',
    audience: 'Internal',
    keyBenefits: ['Laporan lapangan yang terstandardisasi', 'Manajemen Quality Hold Points', 'Pemantauan produktivitas harian']
  },
  {
    id: 'projectview',
    name: 'ProjectView',
    description: 'Portal klien yang memberikan visibilitas penuh atas proyek mereka secara real-time. Menampilkan progres, dokumen, foto, dan status keuangan.',
    audience: 'Klien',
    keyBenefits: ['Ketegangan klien menurun berkat transparansi', 'Akses mudah ke seluruh riwayat proyek', 'Persetujuan digital yang sah']
  },
  {
    id: 'facility-passport',
    name: 'Facility Passport',
    description: 'Rekam medis digital pasca-konstruksi untuk aset/bangunan. Berisi dokumen as-built, riwayat pemeliharaan, jadwal servis, dan manual peralatan.',
    audience: 'Keduanya',
    keyBenefits: ['Peralihan mulus dari konstruksi ke pemeliharaan', 'Perencanaan anggaran maintenance', 'Peningkatan nilai aset jangka panjang']
  },
  {
    id: 'scopelock',
    name: 'ScopeLock',
    description: 'Protokol perlindungan ruang lingkup kerja dan termin pembayaran. Memastikan keselarasan antara progres fisik di lapangan dengan komitmen finansial.',
    audience: 'Keduanya',
    keyBenefits: ['Menghindari perselisihan tagihan', 'Tata kelola Variation Order yang jelas', 'Perlindungan adil bagi klien dan kontraktor']
  }
];
