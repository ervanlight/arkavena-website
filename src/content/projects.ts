export interface Project {
  slug: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  scope: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'rumah-tinggal-citraland',
    title: 'Pembangunan Rumah Tinggal Modern Minimalis',
    category: 'Residensial',
    location: 'CitraLand, Surabaya',
    imageUrl: '/images/house_renovation_1784551967214.jpg',
    scope: 'Desain & Konstruksi Sipil, Arsitektur, MEP',
    duration: '8 Bulan',
    challenge: 'Klien menginginkan tata letak ruang terbuka (open plan) tanpa kolom di tengah ruang keluarga yang luas, serta membutuhkan tingkat kedap suara yang tinggi karena lokasi rumah berada di jalan utama perumahan.',
    solution: 'Kami menggunakan struktur baja komposit untuk menopang bentang lebar tanpa kolom tengah. Untuk insulasi suara, kami mengaplikasikan dinding lapis ganda dengan rockwool dan menggunakan jendela uPVC double-glass.',
    results: [
      'Struktur bentang 12 meter berhasil dibangun tanpa lendutan melebihi toleransi.',
      'Kebisingan dari jalan raya berkurang hingga 45 desibel di dalam ruangan.',
      'Proyek selesai tepat waktu sesuai jadwal awal tanpa ada penambahan biaya (Overrun 0%).'
    ]
  },
  {
    slug: 'gedung-perkantoran-surabaya',
    title: 'Fasad & Perawatan Gedung Perkantoran',
    category: 'Komersial',
    location: 'Pusat Kota Surabaya',
    imageUrl: '/images/commercial_building_1784551986230.jpg',
    scope: 'Renovasi Fasad, Waterproofing, Pengecatan Eksterior',
    duration: '3 Bulan',
    challenge: 'Gedung berusia 15 tahun mengalami kebocoran di beberapa titik saat hujan deras. Fasad lama terlihat kusam dan perlu peremajaan tanpa menghentikan aktivitas operasional kantor di dalamnya.',
    solution: 'Pekerjaan dilakukan secara parsial per zona pada akhir pekan dan malam hari. Kami mengupas lapisan fasad lama, menyuntikkan (injeksi) PU pada retakan struktural, dan melapisi ulang dengan cat eksterior tahan cuaca bergaransi.',
    results: [
      'Kebocoran tuntas 100% setelah diuji dengan water test selama 24 jam.',
      'Operasional kantor klien tidak terganggu selama masa perbaikan.',
      'Tampilan fasad kembali modern dan memberikan citra positif bagi perusahaan klien.'
    ]
  },
  {
    slug: 'fasilitas-sekolah-sidoarjo',
    title: 'Pemeliharaan Fasilitas Sekolah & Lapangan',
    category: 'Sekolah',
    location: 'Sidoarjo',
    imageUrl: '/images/school_facility_1784552005374.jpg',
    scope: 'Perbaikan Toilet, Plafon, dan Pengecatan Lapangan Basket',
    duration: '1 Bulan (Masa Libur Sekolah)',
    challenge: 'Seluruh pekerjaan harus diselesaikan dalam waktu libur semester yang sangat ketat (4 minggu) agar tidak mengganggu aktivitas belajar mengajar di semester baru.',
    solution: 'Kami mengerahkan dua tim paralel (tim sipil untuk toilet/plafon dan tim aplikator untuk lapangan). Proses pemesanan material (PO) diselesaikan 2 minggu sebelum libur dimulai untuk menghindari jeda tunggu (idle time).',
    results: [
      'Pekerjaan selesai 3 hari lebih cepat dari tenggat waktu.',
      'Standar kebersihan (clearing) dijaga ketat sehingga sekolah siap digunakan pada hari pertama masuk.',
      'Diterapkan sistem material anti-slip pada toilet untuk keamanan siswa.'
    ]
  },
  {
    slug: 'waterproofing-pabrik-gresik',
    title: 'Waterproofing Atap Pabrik Industri',
    category: 'Komersial',
    location: 'Kawasan Industri Gresik',
    imageUrl: '/images/industrial_facility_1784552026672.jpg',
    scope: 'Waterproofing Membran Bakar dan Perbaikan Talang',
    duration: '2 Bulan',
    challenge: 'Atap pabrik seluas 2.000 m2 mengalami korosi dan rembesan yang membahayakan mesin produksi di bawahnya. Area kerja berada di ketinggian dengan paparan angin kencang.',
    solution: 'Penerapan standar K3 (HSE) yang ketat dengan penggunaan body harness dan jaring pengaman. Kami mengaplikasikan membran bakar 3mm pada area dak beton dan pelapisan polyurethane pada sambungan talang metal.',
    results: [
      'Zero accident (Nihil kecelakaan kerja) selama proyek berlangsung.',
      'Area produksi di bawahnya 100% aman dari tetesan air selama musim hujan.',
      'Masa garansi pekerjaan diberikan selama 5 tahun dengan kunjungan audit tahunan.'
    ]
  }
];
