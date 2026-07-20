import os

def update_file(filepath, replacements):
    with open(filepath, 'r') as f:
        content = f.read()

    for old_str, new_str in replacements:
        if old_str not in content:
            print(f"WARNING: String not found in {filepath}: '{old_str}'")
        content = content.replace(old_str, new_str)

    with open(filepath, 'w') as f:
        f.write(content)

# 1. Cara Kerja
cara_kerja_replacements = [
    ("Konstruksi seringkali penuh ketidakpastian. Kami mendesain 14 langkah proses untuk mengunci ruang lingkup, mengendalikan perubahan, dan memastikan kualitas akhir.", "Proyek konstruksi memiliki banyak variabel. Kami merancang 14 langkah kerja untuk mendefinisikan ruang lingkup, mencatat setiap perubahan, dan menjaga standar pelaksanaan."),
    ("Penguncian ruang lingkup untuk mencegah perubahan mayor di kemudian hari.", "Penyepakatan ruang lingkup dasar untuk meminimalkan perubahan yang tidak direncanakan."),
    ("Sistem pengendalian perubahan yang terstruktur jika ada penambahan dari klien.", "Prosedur tertulis untuk setiap perubahan atau penambahan pekerjaan selama proyek berlangsung."),
    ("Sistem pembayaran kami didasarkan pada progres nyata yang dapat diverifikasi (milestone), bukan berdasarkan waktu. Ini memberikan keamanan bagi aliran kas Anda dan memastikan kami selalu termotivasi menyelesaikan pekerjaan.", "Sistem pembayaran kami berbasis termin yang diselaraskan dengan tahapan pekerjaan (milestone). Pekerjaan pada tahap selanjutnya akan dimulai setelah pendanaan termin terkait diterima, menjaga kelancaran proyek bagi kedua belah pihak."),
    ("Setiap perubahan desain atau penambahan pekerjaan di tengah jalan wajib melalui formulir Change Order yang merinci tambahan waktu dan biaya, serta harus ditandatangani sebelum dieksekusi. Tidak ada biaya siluman.", "Setiap usulan perubahan pekerjaan wajib melalui kesepakatan tertulis (Variation Order) yang menjelaskan dampaknya terhadap waktu dan biaya. Pekerjaan tambahan baru dilakukan setelah ada persetujuan.")
]
update_file('/Users/macbook/kontraktor-website/src/app/cara-kerja/page.tsx', cara_kerja_replacements)

# 2. Residensial
residential_replacements = [
    ("Rumah yang dibangun dengan sistem, <br className=\"hidden md:block\" /> bukan sekadar diawasi melalui chat.", "Pembangunan dan renovasi rumah dengan proses yang jelas, <br className=\"hidden md:block\" /> mutu yang terdokumentasi, dan komunikasi yang terarah."),
    ("Kami mengubah cara konstruksi perumahan dijalankan—dari sekadar janji dan kepercayaan buta menjadi proses yang terstruktur, transparan, dan terkendali.", "Kami mendokumentasikan perencanaan, pelaksanaan, dan serah terima rumah Anda dalam satu sistem yang mudah dipantau."),
    ("Mengatasi risiko kondisi tersembunyi dengan mitigasi yang jelas.", "Mengelola risiko kondisi bangunan lama dengan mitigasi yang direncanakan dan dikomunikasikan."),
    ("Siap untuk membangun dengan kepastian?", "Siap membangun dengan proses yang terstruktur?"),
    ("Diskusikan kebutuhan proyek Anda dan biarkan sistem kami mengurus kompleksitas pelaksanaannya.", "Ceritakan kebutuhan proyek Anda dan mari jadwalkan diskusi awal bersama kami.")
]
update_file('/Users/macbook/kontraktor-website/src/app/residential/page.tsx', residential_replacements)

# 3. Facility Care
facility_care_replacements = [
    ("Fasilitas yang rusak menghentikan bisnis Anda. Kami hadir dengan sistem pemeliharaan yang terencana, responsif, dan terdokumentasi.", "Kelancaran operasional sangat bergantung pada kondisi fasilitas. Kami membantu melakukan perawatan secara terencana, responsif, dan terdokumentasi."),
    ("Kami tidak asal memperbaiki. Kami mengaudit fasilitas Anda untuk membedakan perbaikan mana yang mendesak (urgent) dan mana yang bisa direncanakan (planned) agar anggaran Anda efisien.", "Kami meninjau fasilitas Anda terlebih dahulu untuk memetakan perbaikan yang mendesak (urgent) dan perbaikan yang dapat dijadwalkan (planned) agar lebih efisien.")
]
update_file('/Users/macbook/kontraktor-website/src/app/facility-care/page.tsx', facility_care_replacements)

# 4. Tentang
tentang_replacements = [
    ("Dibangun untuk membuat pelaksanaan konstruksi lebih dapat dikendalikan.", "Sistem kerja untuk mengelola pelaksanaan konstruksi yang lebih terarah."),
    ("transparansi proses, definisi spesifikasi yang kaku sebelum eksekusi", "keterbukaan proses, kesepakatan spesifikasi yang jelas sebelum eksekusi"),
    ("TEGAKARA tidak menjual janji berlebihan.", "TEGAKARA fokus pada penyusunan rencana kerja yang realistis."),
    ("mengandalkan ingatan atau komunikasi via chat semata adalah resep untuk kegagalan proyek dan perselisihan.", "mengandalkan komunikasi lisan tanpa dokumentasi sering kali menjadi sumber kesalahpahaman."),
    ("Tidak ada penurunan spesifikasi material secara diam-diam. Semua pergantian harus tertulis.", "Spesifikasi material disesuaikan dengan kesepakatan. Setiap perubahan akan diinformasikan dan membutuhkan persetujuan."),
    ("Transparansi Bill of Quantities (BOQ). Klien berhak tahu apa yang mereka bayar.", "Rencana Anggaran Biaya (RAB) dirinci dengan jelas untuk memudahkan klien memahami cakupan pekerjaannya.")
]
update_file('/Users/macbook/kontraktor-website/src/app/tentang/page.tsx', tentang_replacements)

# 5. ProjectView Demo
projectview_replacements = [
    ("Transparansi penuh atas proyek Anda. Pantau progres, kualitas, dan finansial dari mana saja.", "Informasi proyek yang lebih jelas. Lihat progres, catatan mutu, dan status termin dari mana saja."),
    ("Sesuai Jadwal (On Track)", "Sesuai Jadwal")
]
update_file('/Users/macbook/kontraktor-website/src/components/projectview/DemoDashboard.tsx', projectview_replacements)

# 6. Services
services_replacements = [
    ("Garansi Konstruksi", "Garansi Sesuai Lingkup Pekerjaan"),
    ("Garansi Pekerjaan", "Garansi Sesuai Lingkup Pekerjaan"),
    ("Anggaran sering membengkak tak terkendali", "Biaya bertambah tanpa penjelasan yang jelas"),
    ("Tukang biasa tidak bisa menyelesaikan masalah", "Dibutuhkan tenaga spesialis untuk identifikasi akar masalah"),
    ("Pekerjaan waterproofing yang selalu gagal", "Perbaikan kebocoran yang sering berulang"),
    ("manajemen proyek transparan.", "manajemen proyek yang terstruktur.")
]
update_file('/Users/macbook/kontraktor-website/src/content/services.ts', services_replacements)

# 7. Ecosystem
ecosystem_replacements = [
    ("Ketegangan klien menurun berkat transparansi", "Memudahkan komunikasi melalui informasi yang terpusat"),
    ("Protokol perlindungan ruang lingkup kerja dan termin pembayaran. Memastikan keselarasan antara progres fisik di lapangan dengan komitmen finansial.", "Sistem pencatatan ruang lingkup kerja dan tahapan termin pembayaran. Menyelaraskan antara progres fisik di lapangan dengan tahap pendanaan yang disepakati.")
]
update_file('/Users/macbook/kontraktor-website/src/content/ecosystem.ts', ecosystem_replacements)

print("All updates applied!")
