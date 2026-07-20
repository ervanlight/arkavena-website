export interface FaqItem {
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
