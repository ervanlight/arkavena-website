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

# 1. Hero Panel
hero_replacements = [
    ("Project Control Panel", "Panel Kendali Proyek"),
    ("Simulasi Pemantauan Proyek", "Simulasi ProjectView"),
    ("Scope Pekerjaan", "Ruang Lingkup"),
    ("Terdokumentasi 100%", "Dokumen dasar telah disetujui"),
    ("Inspeksi Mutu", "Pemeriksaan Mutu"),
    ("Struktur Lantai 2", "Struktur lantai 2"),
    ("Menunggu", "Menunggu pemeriksaan"),
    ("Keputusan Klien", "Keputusan Klien"),
    ("Pilihan Keramik Utama", "Pilihan keramik utama"),
    ("1 Pending", "1 perlu persetujuan"),
    ("Termin Pembayaran", "Termin Proyek"),
    ("Milestone #3 Selesai", "Tahap 3 telah diverifikasi"),
    ("Siap Tagih", "Termin berikutnya siap diproses")
]
update_file('/Users/macbook/kontraktor-website/src/components/home/hero-panel.tsx', hero_replacements)

# 2. Process
process_replacements = [
    ("Kualifikasi Awal (Assessment)", "Penilaian Awal Proyek"),
    ("Kami mempelajari kebutuhan dasar dan ekspektasi Anda untuk memastikan kecocokan profil proyek dengan layanan kami.", "Kami meninjau jenis pekerjaan, lokasi, kisaran anggaran, target waktu, dan skema pembayaran untuk menilai kecocokan proyek."),
    ("'Pengisian formulir kuesioner digital.',", "'Mengisi formulir kebutuhan proyek.',"),
    ("'Analisis awal cakupan pekerjaan.',", "'Pemeriksaan awal jenis pekerjaan, lokasi, anggaran, dan jadwal.',"),
    ("'Konfirmasi estimasi budget awal.'", ""), # Remove or replace with empty, but since it's an array, let's just replace it and clean it up.
    # Actually, the user asked to replace the bullets completely to just 2 bullets.
    ("'Pengisian formulir kuesioner digital.',\\n      'Analisis awal cakupan pekerjaan.',\\n      'Konfirmasi estimasi budget awal.'", "'Mengisi formulir kebutuhan proyek.',\\n      'Pemeriksaan awal jenis pekerjaan, lokasi, anggaran, dan jadwal.'"),
    
    ("Konsultasi Perdana (Discovery Call)", "Konsultasi Awal"),
    ("Diskusi mendalam untuk memahami visi, tantangan, dan target waktu proyek Anda.", "Kami membahas kebutuhan, prioritas, kendala, dan target proyek bersama pengambil keputusan."),
    ("'Pertemuan daring atau tatap muka.',\\n      'Penyelarasan visi proyek.',\\n      'Penjelasan prosedur dan sistem kerja ARKAVENA.'", "'Pertemuan daring atau tatap muka.',\\n      'Konfirmasi kebutuhan dan langkah berikutnya.'"),
    
    ("Tim ahli kami mengunjungi lokasi untuk mengumpulkan data riil dan mengidentifikasi potensi kendala teknis.", "Tim teknis mengunjungi lokasi untuk mengukur kondisi aktual dan mengidentifikasi kendala yang dapat memengaruhi pekerjaan."),
    ("'Pengukuran dan dokumentasi kondisi eksisting.',\\n      'Identifikasi akses dan logistik proyek.',\\n      'Pemetaan potensi risiko di lapangan.'", "'Pengukuran dan dokumentasi kondisi lokasi.',\\n      'Pemeriksaan akses, lingkungan kerja, dan kebutuhan logistik.'"),
    
    ("Pengajuan Proposal Awal", "Penyampaian Proposal Awal"),
    ("Penyajian konsep awal dan estimasi kasar (Rough Order of Magnitude) berdasarkan hasil diskusi dan survei.", "Kami menyampaikan gambaran awal ruang lingkup, metode pelaksanaan, kisaran anggaran, dan rencana tahapan pekerjaan."),
    ("'Sketsa konsep atau diagram sirkulasi ruang.',\\n      'Estimasi biaya awal (rentang harga).',\\n      'Estimasi timeline kasar.'", "'Gambaran awal kebutuhan dan ruang lingkup.',\\n      'Perkiraan anggaran dalam bentuk rentang harga.'"),
    
    ("Perjanjian Perencanaan (Design & Build)", "Perjanjian Tahap Perencanaan"),
    ("Bila proposal awal disetujui, kita memasuki tahap perencanaan detail yang terikat komitmen.", "Jika proposal awal disetujui, proyek dilanjutkan ke tahap perencanaan rinci melalui perjanjian dan biaya yang disepakati."),
    ("'Penandatanganan kontrak perencanaan.',\\n      'Pembayaran fee desain/perencanaan.',\\n      'Kick-off meeting tahap desain.'", "'Penandatanganan perjanjian tahap perencanaan.',\\n      'Pembayaran biaya desain atau perencanaan sesuai kebutuhan proyek.'"),
    
    ("Pengembangan Desain Detail", "Perencanaan Detail"),
    ("Penyusunan gambar kerja, spesifikasi material, dan perizinan.", "Penyusunan gambar kerja, spesifikasi material, serta dokumen teknis yang dibutuhkan sebelum pelaksanaan."),
    ("'Pembuatan Gambar Kerja (DED).',\\n      'Pemilihan material spesifik.',\\n      'Proses pengurusan izin (jika diperlukan).'", "'Pembuatan gambar kerja teknis.',\\n      'Pemilihan dan persetujuan spesifikasi material.'"),
    
    ("Penyusunan RAB Final", "Penyusunan RAB dan Penawaran Final"),
    ("Pembuatan Rencana Anggaran Biaya yang akurat berdasarkan gambar kerja yang telah disetujui.", "RAB dan nilai kontrak disusun berdasarkan gambar, spesifikasi, serta ruang lingkup yang telah disetujui."),
    ("'Perhitungan volume pekerjaan terperinci.',\\n      'Penawaran harga mengikat (Fixed Price).',\\n      'Review dan persetujuan RAB.'", "'Perhitungan volume dan biaya setiap pekerjaan.',\\n      'Penetapan nilai kontrak, termin, dan prosedur perubahan pekerjaan.'"),
]
update_file('/Users/macbook/kontraktor-website/src/content/process.ts', process_replacements)

# 3. page.tsx assessment section
page_replacements_2 = [
    ("Cocokkan kebutuhan proyek Anda dengan <span className=\"text-bronze\">sistem kerja kami.</span>", "Ceritakan kebutuhan proyek Anda."),
    ("Kami selektif dalam menerima proyek untuk memastikan setiap klien mendapatkan standar perhatian dan kontrol kualitas tertinggi.", "Kami meninjau jenis pekerjaan, lokasi, anggaran, jadwal, skema pembayaran, dan kapasitas tim sebelum menerima proyek."),
    ("Mulai Project Assessment", "Mulai Penilaian Proyek"),
    ("Mengisi form assessment hanya memakan waktu 3 menit dan tidak mengikat.", "Formulir singkat ini membantu kami memahami kebutuhan awal proyek Anda dan tidak mengikat.")
]
update_file('/Users/macbook/kontraktor-website/src/app/page.tsx', page_replacements_2)

# Verify Inspeksi Mutu Terbuka in page.tsx
with open('/Users/macbook/kontraktor-website/src/app/page.tsx', 'r') as f:
    page_content = f.read()

page_content = page_content.replace("Inspeksi Mutu Terbuka", "Persetujuan Material & Pemeriksaan Mutu")
with open('/Users/macbook/kontraktor-website/src/app/page.tsx', 'w') as f:
    f.write(page_content)

print("Done updating copy 2")
