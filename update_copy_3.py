import os
import re

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Step 1
    content = re.sub(
        r"details: \[\s*'Pengisian formulir kuesioner digital\.',\s*'Analisis awal cakupan pekerjaan\.',\s*'Konfirmasi estimasi budget awal\.'\s*\]",
        "details: [\n      'Mengisi formulir kebutuhan proyek.',\n      'Pemeriksaan awal jenis pekerjaan, lokasi, anggaran, dan jadwal.'\n    ]",
        content
    )
    
    # Step 2
    content = re.sub(
        r"details: \[\s*'Pertemuan daring atau tatap muka\.',\s*'Penyelarasan visi proyek\.',\s*'Penjelasan prosedur dan sistem kerja ARKAVENA\.'\s*\]",
        "details: [\n      'Pertemuan daring atau tatap muka.',\n      'Konfirmasi kebutuhan dan langkah berikutnya.'\n    ]",
        content
    )
    
    # Step 3
    content = re.sub(
        r"details: \[\s*'Pengukuran dan dokumentasi kondisi eksisting\.',\s*'Identifikasi akses dan logistik proyek\.',\s*'Pemetaan potensi risiko di lapangan\.'\s*\]",
        "details: [\n      'Pengukuran dan dokumentasi kondisi lokasi.',\n      'Pemeriksaan akses, lingkungan kerja, dan kebutuhan logistik.'\n    ]",
        content
    )
    
    # Step 4
    content = re.sub(
        r"details: \[\s*'Sketsa konsep atau diagram sirkulasi ruang\.',\s*'Estimasi biaya awal \(rentang harga\)\.',\s*'Estimasi timeline kasar\.'\s*\]",
        "details: [\n      'Gambaran awal kebutuhan dan ruang lingkup.',\n      'Perkiraan anggaran dalam bentuk rentang harga.'\n    ]",
        content
    )
    
    # Step 5
    content = re.sub(
        r"details: \[\s*'Penandatanganan kontrak perencanaan\.',\s*'Pembayaran fee desain/perencanaan\.',\s*'Kick-off meeting tahap desain\.'\s*\]",
        "details: [\n      'Penandatanganan perjanjian tahap perencanaan.',\n      'Pembayaran biaya desain atau perencanaan sesuai kebutuhan proyek.'\n    ]",
        content
    )
    
    # Step 6
    content = re.sub(
        r"details: \[\s*'Pembuatan Gambar Kerja \(DED\)\.',\s*'Pemilihan material spesifik\.',\s*'Proses pengurusan izin \(jika diperlukan\)\.'\s*\]",
        "details: [\n      'Pembuatan gambar kerja teknis.',\n      'Pemilihan dan persetujuan spesifikasi material.'\n    ]",
        content
    )
    
    # Step 7
    content = re.sub(
        r"details: \[\s*'Perhitungan volume pekerjaan terperinci\.',\s*'Penawaran harga mengikat \(Fixed Price\)\.',\s*'Review dan persetujuan RAB\.'\s*\]",
        "details: [\n      'Perhitungan volume dan biaya setiap pekerjaan.',\n      'Penetapan nilai kontrak, termin, dan prosedur perubahan pekerjaan.'\n    ]",
        content
    )
    
    with open(filepath, 'w') as f:
        f.write(content)

update_file('/Users/macbook/kontraktor-website/src/content/process.ts')
print("Done updating copy 3")
