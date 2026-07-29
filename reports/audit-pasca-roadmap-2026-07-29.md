# Audit Menyeluruh Pasca-Roadmap 00–12

Tanggal: 29 Juli 2026
Sifat: **AUDIT SAJA — tidak ada satu pun perbaikan yang dikerjakan di fase ini.**
Cakupan: seluruh situs (halaman baru dari 12 batch + halaman legacy), diperiksa
sebagai satu kesatuan, bukan per-batch.

Kondisi yang diaudit: branch `main` (yang sekarang live di produksi), plus
PR #16 (Batch 12) dan PR #17 yang masih terbuka.

---

## Ringkasan untuk Owner (baca ini dulu)

Dari sisi **isi tulisan dan struktur data**, situs ini sangat rapi. 12 batch
menghasilkan 122 halaman yang konsisten: panjang artikel antar cluster hanya
beda tipis (rata-rata 928–1.042 kata), jumlah FAQ seragam (5 per panduan),
tidak ada tabrakan kata kunci antar halaman baru, dan semua validasi otomatis
lolos. Kekhawatiran tentang "gaya nulis beda karena dikerjakan di sesi
berbeda" ternyata **tidak terbukti** — konsistensinya bagus.

Masalahnya ada di **lapisan tampilan dan halaman lama**, yang tidak pernah
masuk cakupan batch manapun. Ada 5 temuan Critical, dan tiga di antaranya
membuat situs terlihat rusak di mata pengunjung **sekarang juga**:

1. Sebuah pintu belakang teknis di situs bisa dipakai siapa saja tanpa
   password (risiko keamanan/biaya).
2. **31 halaman panduan yang sudah live menampilkan kotak gambar kosong/rusak**
   di bagian paling atas halaman.
3. **Tulisan judul di kotak ajakan-menghubungi dan judul kolom footer warnanya
   sama persis dengan latar belakangnya** — jadi benar-benar tidak terbaca, di
   semua halaman.

Ketiganya bukan hal kecil: itu yang pertama kali dilihat calon klien.

Soal ambisi "kelas dunia" — fondasinya sudah ada (struktur konten, SEO teknis,
aksesibilitas dasar seperti skip-link dan dukungan *reduced motion* sudah
benar). Yang belum ada adalah lapisan *finishing*: tidak ada animasi transisi
antar halaman, tidak ada efek loading yang halus, tombol-tombol di HP masih
terlalu kecil untuk jempol, dan 64 halaman memakai satu gambar placeholder
yang identik. Detailnya di kategori **Quality Upgrade**.

**Koreksi laporan saya sebelumnya:** di PR #17 saya menulis tombol WhatsApp
"sebelumnya tidak muncul dan sekarang baru muncul". Itu **keliru**. Setelah
dicek ke produksi, tombol WhatsApp sudah tampil sejak sebelumnya dan nomornya
sudah benar (`6285128071580`) — jadi penggantian environment variable yang
saya lakukan efeknya nol. Yang benar-benar berubah dari PR #17 hanya data
JSON-LD (alamat, telepon, email, tahun berdiri untuk Google). Mohon maaf atas
ketidakakuratan itu.

---

# 1. CRITICAL
*Harus segera diperbaiki — situs berisiko atau terlihat rusak.*

### C1. Pintu belakang `/api/revalidate` bisa dipakai siapa saja tanpa password
**Lokasi:** `src/app/api/revalidate/route.ts` baris 8

Kode ini seharusnya mengecek password rahasia sebelum mengizinkan seseorang
"menyegarkan" halaman situs. Tapi password rahasianya (`REVALIDATION_SECRET`)
**tidak pernah dipasang** di Vercel. Akibatnya, pengecekannya jadi
"kosong dibandingkan dengan kosong" — yang artinya lolos.

Saya sudah membuktikan ini langsung ke situs produksi (dengan cara yang aman,
tanpa merusak apa pun): mengirim permintaan **tanpa password sama sekali**
tetap diterima sistem.

**Dampak ke pengunjung/bisnis:** siapa pun di internet yang tahu alamat ini
bisa terus-menerus memaksa situs membangun ulang halamannya. Efeknya situs
jadi lambat untuk pengunjung asli, dan tagihan Vercel bisa membengkak karena
dihitung per pemakaian. Ini bukan kebocoran data pribadi, tapi ini pintu yang
harusnya terkunci dan sekarang terbuka.

**Rekomendasi:** tolak permintaan kalau `REVALIDATION_SECRET` belum dipasang
(jangan diloloskan), lalu pasang nilainya di Vercel. Kalau fitur ini memang
tidak dipakai sama sekali, hapus saja filenya — itu paling aman.

---

### C2. 31 halaman panduan yang sudah live menampilkan gambar rusak
**Lokasi:** semua `content/guides/*.mdx` (kolom `hero.image`), ditampilkan
oleh `src/components/content/content-shell.tsx`

Setiap halaman panduan menunjuk ke file gambar seperti
`/images/guides/biaya-bangun-kos/hero.webp` — tapi **file-file itu tidak
pernah dibuat**. Total 57 halaman panduan terkena, **31 di antaranya sudah
live dan sudah masuk Google**.

Sudah saya buktikan langsung ke produksi: alamat gambarnya balik dengan status
404 (tidak ditemukan), dan saat halaman dibuka di HP, yang muncul adalah kotak
putih kosong setinggi ~190px dengan ikon gambar rusak di pojok.

**Dampak ke pengunjung/bisnis:** ini kelihatan tepat di bagian atas halaman,
persis setelah judul — jadi hal pertama yang dilihat calon klien setelah
membaca judul adalah kotak kosong yang rusak. Kesannya situs tidak terurus.
Selain itu, waktu link panduan dibagikan lewat WhatsApp atau Facebook,
gambar preview-nya juga kosong, jadi link-nya terlihat tidak meyakinkan dan
lebih jarang diklik.

**Rekomendasi:** dua pilihan — (a) cepat: arahkan sementara semua panduan ke
placeholder yang sudah ada dan terbukti jalan, supaya tidak ada yang rusak;
(b) benar: siapkan gambar asli per panduan. Saya sarankan (a) dulu hari ini,
(b) menyusul. Ditambah satu pengecekan otomatis supaya ke depan tidak ada
halaman yang bisa dipublikasikan sambil menunjuk gambar yang tidak ada.

---

### C3. Judul di dalam kotak gelap tidak terbaca — warnanya sama dengan latarnya
**Lokasi:** `src/app/globals.css` baris 59–65, berdampak ke
`src/components/content/blocks/CTA.tsx` dan `src/components/layout/footer.tsx`

Ada satu aturan gaya global yang memaksa **semua** judul (h1–h6) berwarna
gelap. Aturan ini menang melawan pengaturan "teks putih" di kotak-kotak
berlatar gelap. Hasilnya, judul yang seharusnya putih justru jadi gelap di
atas latar gelap.

Yang terkena, terukur langsung dari situs live:
- Judul kolom footer **"Layanan", "Perusahaan", "Newsletter"** — rasio kontras
  **1.00**, artinya warnanya *persis sama* dengan latar belakang. Benar-benar
  tak terlihat. Ini muncul di **setiap halaman situs**.
- Judul kotak ajakan menghubungi **"Bahas kebutuhan proyek Anda"** — rasio
  1.27 (standar minimum 3.0). Ini ada di setiap halaman layanan, sektor,
  wilayah, panduan, dan proyek.

**Dampak ke pengunjung/bisnis:** footer terlihat seperti daftar link acak
tanpa pengelompokan, karena judul kelompoknya hilang. Dan yang lebih merugikan:
kotak ajakan menghubungi — elemen yang justru dibuat untuk mengubah pembaca
jadi calon klien — kehilangan kalimat pembukanya. Pengunjung cuma lihat
tombol tanpa konteks.

**Rekomendasi:** ubah aturan global itu supaya tidak memaksa warna saat judul
berada di dalam kotak gelap (mis. hanya mengatur warna default di area terang,
atau tambahkan pengecualian eksplisit di komponen CTA dan footer).

---

### C4. Logo dan menu tidak terlihat di bagian atas semua halaman konten
**Lokasi:** `src/components/layout/header.tsx` baris 43–70

Menu atas dibuat transparan saat halaman belum di-scroll, dengan logo putih
dan tulisan menu terang — desain ini cocok untuk **halaman depan** yang
latarnya gelap. Tapi semua halaman konten (layanan, panduan, sektor, wilayah)
latarnya krem terang. Jadi logo putih di atas krem hampir tidak kelihatan.
Terukur: rasio kontras **1.22** untuk menu aktif (minimum 4.5).

Terlihat jelas di screenshot: logo ARKAVENA menumpuk dan menyatu dengan
tulisan breadcrumb "Beranda › Panduan".

**Dampak ke pengunjung/bisnis:** pengunjung yang mendarat dari Google langsung
ke halaman panduan (ini mayoritas trafik SEO) melihat halaman **tanpa logo yang
terbaca dan tanpa menu yang jelas** sampai mereka scroll. Mereka tidak langsung
tahu ini situs siapa, dan sulit menjelajah ke halaman layanan. Ini kehilangan
kepercayaan dan kehilangan konversi di detik-detik pertama.

**Rekomendasi:** buat menu atas menyesuaikan latar halaman — beri latar solid
di halaman konten, atau pakai logo versi gelap saat latar terang.

---

### C5. Menu atas menutupi bagian atas isi halaman
**Lokasi:** `src/app/layout.tsx` (`<main>` tanpa jarak atas) vs
`src/components/layout/header.tsx` (menu `fixed`, tinggi 72px)

Menu atas "menempel" di layar dengan tinggi 72px, tapi area isi halaman hanya
diberi jarak atas 48px. Selisih ~24px membuat baris pertama isi halaman
tersembunyi di balik menu. Terukur langsung: menu memang menimpa breadcrumb.

**Dampak ke pengunjung/bisnis:** di HP, baris navigasi kecil ("Beranda ›
Panduan ›") tertimpa logo, jadi berantakan dan sebagian tidak bisa diklik.
Terlihat seperti situs yang belum selesai dikerjakan.

**Rekomendasi:** samakan jarak atas area isi dengan tinggi menu (mis. beri
`padding-top` setinggi header), dan uji di HP maupun desktop.

---

# 2. IMPORTANT
*Berdampak nyata ke pengalaman, SEO, atau konversi — pengunjung kemungkinan besar merasakannya.*

### I1. Halaman lama bersaing dengan halaman baru di Google (kanibalisasi)
**Lokasi:** `src/app/residential/*`, `src/app/facility-care/*`

Halaman lama seperti `/residential/bangun-rumah-surabaya` dan
`/facility-care/maintenance-gedung` **tidak punya penanda "jangan diindeks"**
sama sekali, dan dilink dari footer di setiap halaman. Padahal topiknya sama
persis dengan halaman baru `/layanan/bangun-rumah` dan
`/layanan/building-maintenance` — dan nanti juga dengan landing page iklan
`/lp/bangun-rumah-surabaya` (Batch 12).

Jadi untuk satu topik yang sama bisa ada **tiga halaman berbeda** yang boleh
diindeks Google.

Catatan penting: semua audit kanibalisasi di Batch 02–12 hanya membandingkan
halaman baru dengan halaman baru. Halaman lama tidak pernah ikut diperiksa,
jadi masalah ini lolos 12 batch berturut-turut.

**Dampak ke pengunjung/bisnis:** Google jadi bingung halaman mana yang paling
pantas ditampilkan untuk pencarian "bangun rumah surabaya". Kekuatan SEO
terpecah ke beberapa halaman, sehingga tidak ada satu pun yang naik tinggi.
Pengunjung juga bisa mendarat di halaman lama yang isinya lebih tipis dan
tidak seragam dengan halaman baru.

**Rekomendasi:** putuskan mana yang jadi halaman resmi per topik, lalu halaman
lama diarahkan (redirect) atau ditandai `noindex` + `canonical` ke halaman
baru. Ini butuh keputusan owner dulu karena menyangkut halaman produksi.

---

### I2. Footer masih menunjuk ke struktur situs yang lama
**Lokasi:** `src/components/layout/footer.tsx`

Setelah 12 batch membangun 76 halaman baru, footer **sama sekali tidak
menautkan** ke `/layanan`, `/sektor`, `/wilayah`, maupun `/panduan`. Isinya
hanya link lama: `/residential`, `/facility-care`, `/portfolio`,
`/projectview`, `/trust-center`.

**Dampak ke pengunjung/bisnis:** footer adalah tempat orang mencari "apa lagi
yang ada di situs ini". Sekarang footer justru menuntun pengunjung menjauh
dari 76 halaman terbaik yang baru dibangun, dan menuntun mereka ke halaman
lama. Google juga membaca link footer sebagai sinyal halaman penting — jadi
sinyal itu sekarang salah arah.

**Rekomendasi:** susun ulang footer mengikuti struktur baru, sisakan link lama
seperlunya saja.

---

### I3. 14 halaman sektor tidak pernah ditautkan dari isi artikel mana pun
**Lokasi:** semua `content/sectors/*.mdx`

Saya menghitung tautan yang benar-benar ditulis di dalam badan artikel.
Hasilnya: halaman layanan dapat banyak (contoh `/layanan/bangun-bangunan-komersial`
28 tautan masuk, `/layanan/design-and-build` 24), tapi **seluruh 14 halaman
sektor dapat nol**.

Halaman sektor hanya bisa ditemukan lewat hub `/sektor` dan modul "konten
terkait" otomatis. Validasi rutin tidak menangkap ini karena validasi
menghitung relasi di frontmatter, bukan tautan yang benar-benar ditulis di
artikel.

**Dampak ke pengunjung/bisnis:** halaman sektor (kos, ruko, gudang, klinik,
dll) adalah halaman yang paling dekat dengan cara calon klien menyebut
kebutuhannya. Karena tidak pernah disebut di dalam artikel, pembaca yang lagi
serius membaca panduan tidak pernah diarahkan ke sana. Di mata Google, halaman
tanpa tautan dari isi artikel juga dianggap kurang penting.

**Rekomendasi:** sisipkan tautan ke halaman sektor secara alami di dalam
panduan dan layanan yang relevan.

---

### I4. Banner cookie tidak pernah muncul, dan tombol "Tolak" tidak berfungsi
**Lokasi:** `src/components/shared/cookie-consent.tsx` baris 12

Banner cookie hanya muncul kalau variabel `NEXT_PUBLIC_ANALYTICS_ID` terisi.
Masalahnya, **nama variabel itu tidak dipakai di mana pun** di seluruh kode —
yang dipakai untuk memuat pelacakan adalah `NEXT_PUBLIC_GTM_ID` dan
`NEXT_PUBLIC_GA_MEASUREMENT_ID`. Jadi banner-nya tidak akan pernah tampil.

Lebih jauh: kalaupun tampil, menekan **"Tolak" tidak menghentikan pelacakan
apa pun**. Tombol itu hanya menyimpan catatan di browser; skrip Google tetap
dimuat tanpa syarat.

**Dampak ke pengunjung/bisnis:** begitu nanti ID Google Analytics dipasang,
situs langsung melacak semua pengunjung **tanpa pernah meminta izin**, dan
pengunjung yang menolak pun tetap dilacak. Selain soal kepercayaan, ini
berisiko dari sisi kepatuhan privasi kalau nanti ada pengunjung dari luar
negeri. Untuk bisnis yang menjual kepercayaan dan dokumentasi, ini kontras
dengan citra yang dibangun.

**Rekomendasi:** perbaiki nama variabelnya, dan buat pemuatan skrip Google
benar-benar menunggu persetujuan pengunjung.

---

### I5. Nama variabel analytics tidak konsisten di 4 tempat — owner berisiko salah pasang
**Lokasi:** `.env.example`, `src/config/features.ts`, `src/app/layout.tsx`,
`src/lib/landing/analytics.ts`

Ada empat nama berbeda untuk hal yang mirip:

| Nama | Dipakai di | Benar-benar memuat skrip? |
|---|---|---|
| `NEXT_PUBLIC_GA4_ID` | `.env.example`, `features.ts` | **Tidak** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `layout.tsx`, adapter Batch 12 | Ya |
| `NEXT_PUBLIC_GTM_ID` | `layout.tsx`, adapter Batch 12 | Ya |
| `NEXT_PUBLIC_ANALYTICS_ID` | banner cookie saja | Tidak ada di mana pun |

**Dampak ke pengunjung/bisnis:** `.env.example` adalah file yang biasanya jadi
panduan "isi apa saja". File itu menyebut `NEXT_PUBLIC_GA4_ID` — kalau nanti
diisi sesuai petunjuk itu, **tidak akan terjadi apa-apa**: tidak ada data
masuk ke Google Analytics, dan bisa berhari-hari tidak sadar bahwa pelacakan
tidak jalan sementara iklan sudah berjalan dan uang sudah keluar.

**Rekomendasi:** samakan jadi satu nama, dan perbarui `.env.example` supaya
sesuai kenyataan. Ini sebaiknya dibereskan **sebelum** ID Google dipasang.

---

### I6. Tombol dan link terlalu kecil untuk jempol di HP
**Lokasi:** `header.tsx` (tombol menu), breadcrumb, footer, modul konten terkait

Diukur langsung di layar HP 375px: ada **17 elemen yang bisa diklik berukuran
di bawah 44×44 piksel**, yaitu ukuran minimum yang disarankan Apple dan Google.
Yang paling penting: **tombol menu (hamburger) hanya 36×36**. Link breadcrumb
dan link footer hanya setinggi 17px.

**Dampak ke pengunjung/bisnis:** di HP, tombol sekecil itu sering meleset saat
ditekan, apalagi sambil berjalan atau satu tangan. Mengingat mayoritas
pencarian lokal datang dari HP, ini langsung mengurangi jumlah orang yang
berhasil menjelajah situs. Rasanya juga "kurang halus" dibanding aplikasi/situs
modern yang biasa mereka pakai.

**Rekomendasi:** perbesar area sentuh (bukan harus memperbesar ikonnya —
cukup tambah padding di sekelilingnya) minimal 44×44.

---

### I7. Warna teks abu-abu terlalu tipis untuk dibaca nyaman
**Lokasi:** `globals.css` / warna `#68757D`, `#B88A4A`, tombol utama

Terukur di halaman live:

| Elemen | Kontras | Minimum |
|---|---|---|
| Ringkasan di bawah judul (18px) | 3.88 | 4.5 |
| Label kecil "PANDUAN BANGUNAN KOMERSIAL" | 2.54 | 4.5 |
| Teks pada tombol utama (putih di atas emas) | 3.10 | 4.5 |
| Teks paragraf di footer | 1.96 | 4.5 |

**Dampak ke pengunjung/bisnis:** teks abu tipis di atas latar krem terlihat
"elegan" di layar laptop bagus dalam ruangan, tapi jadi sulit dibaca di HP di
bawah cahaya matahari — kondisi yang sangat umum untuk kontraktor/klien yang
sedang di lapangan. Yang paling merugikan: **teks di tombol utama** juga
termasuk yang kurang kontras, padahal itu tombol yang paling ingin diklik.

**Rekomendasi:** gelapkan sedikit warna abu untuk teks isi, dan perkuat
kontras teks di tombol utama. Estetikanya tetap bisa dijaga.

---

### I8. Formulir lead belum punya pengaman anti-spam
**Lokasi:** `src/app/api/lead/route.ts` (dari PR #16, belum di-merge)

Formulir sudah punya *honeypot* (jebakan sederhana untuk bot), tapi **belum ada
pembatasan jumlah pengiriman** dari satu pengirim. Siapa pun bisa mengirim
ribuan permintaan berturut-turut.

**Dampak ke pengunjung/bisnis:** begitu nanti webhook lead aktif, WhatsApp atau
inbox owner bisa dibanjiri lead palsu. Selain mengganggu, lead asli jadi
tenggelam di antara sampah — dan itu berarti kehilangan calon klien sungguhan.

**Rekomendasi:** tambahkan pembatasan sederhana (mis. maksimal beberapa kiriman
per menit per alamat IP) sebelum webhook diaktifkan.

---

### I9. Dua bug kecil di komponen dasar
**Lokasi:** `src/components/ui/checkbox.tsx` baris 11,
`src/components/shared/cookie-consent.tsx` baris 16

- **Checkbox**: memanggil fungsi internal React secara kondisional. Ini bisa
  membuat React error dan **membuat halaman blank** kalau komponen ini dipakai
  kadang dengan `id` dan kadang tanpa `id` di layar yang sama.
- **Cookie consent**: mengubah state langsung di dalam efek, yang membuat
  banner berkedip saat muncul.

**Dampak ke pengunjung/bisnis:** checkbox dipakai di form assessment. Kalau
error-nya kena, pengunjung melihat halaman kosong dan langsung pergi.
Kemungkinannya kecil, tapi akibatnya fatal.

**Rekomendasi:** panggil fungsi React-nya tanpa syarat lalu pilih nilai
setelahnya; untuk banner, hitung kondisinya saat render awal.

---

# 3. QUALITY UPGRADE
*Bukan bug — ini yang membedakan "sudah benar" dengan "terasa kelas dunia".*

### Q1. 64 halaman memakai satu gambar placeholder yang sama persis
**Lokasi:** `hero.image: /images/placeholders/hero.png` di 64 file MDX

Selain 57 panduan yang gambarnya rusak (C2), **64 halaman lain memakai satu
file gambar yang identik**. Jadi praktis seluruh situs cuma punya dua kondisi:
gambar rusak, atau gambar generik yang sama di mana-mana.

**Dampak:** pengunjung yang membuka 3–4 halaman langsung merasa "kok gambarnya
itu-itu terus" — kesannya isi situs dangkal dan template-an, padahal tulisannya
justru sangat berkualitas. Untuk bisnis konstruksi, foto adalah bukti
kemampuan. Situs kompetitor kelas atas menang telak di sini bukan karena
tulisannya lebih baik, tapi karena mereka menunjukkan hasil kerja nyata.

**Rekomendasi:** ini investasi tertinggi dampaknya. Foto proyek asli (bahkan
foto HP yang rapi) per kategori jauh lebih kuat daripada ilustrasi generik.
Bisa bertahap: mulai dari 10 halaman layanan utama.

---

### Q2. Tidak ada efek loading — halaman terasa "nge-freeze" lalu muncul mendadak
**Lokasi:** tidak ada satu pun `loading.tsx` di `src/app/` (hanya ada 1
`not-found.tsx`, dan tidak ada `error.tsx` sama sekali)

Situs modern menampilkan kerangka abu-abu (*skeleton*) saat konten dimuat.
Situs ini tidak punya sama sekali.

**Dampak:** saat pengunjung menekan link, layar terasa diam sesaat lalu isi
muncul sekaligus. Di koneksi HP yang lambat, jeda diam itu terasa seperti
"situsnya nge-hang", dan sebagian orang menekan tombol kembali sebelum halaman
sempat muncul. Ditambah lagi, karena tidak ada `error.tsx`, kalau ada satu
error kecil pengunjung akan melihat halaman error mentah bawaan sistem — bukan
halaman yang ramah berlogo Arkavena.

**Rekomendasi:** tambahkan skeleton untuk hub dan halaman konten, plus satu
halaman error ber-branding.

---

### Q3. Tidak ada transisi antar halaman
**Lokasi:** global

Perpindahan antar halaman terjadi seketika tanpa animasi. Ada dasar yang bagus
(`fade-in` sudah ada, `prefers-reduced-motion` sudah dihormati), tapi belum
dipakai untuk transisi halaman.

**Dampak:** perpindahan terasa "patah" seperti situs lama, bukan mengalir
seperti aplikasi. Ini salah satu hal yang paling terasa membedakan situs
premium dari situs biasa, meski pengunjung tidak bisa menyebut apa persisnya.

**Rekomendasi:** transisi halus (150–250ms) saat pindah halaman.

---

### Q4. Tidak ada tombol ajakan yang menetap di layar HP
**Lokasi:** hanya ada tombol WhatsApp melayang; tidak ada CTA kontekstual

Tombol WhatsApp melayang sudah ada, tapi isinya generik untuk semua halaman.
Saat pengunjung membaca panduan sepanjang 1.000 kata di HP, tidak ada ajakan
yang menyesuaikan topik yang sedang dibaca sampai mereka scroll ke paling
bawah.

**Dampak:** pembaca yang sudah tertarik di tengah artikel harus scroll jauh ke
bawah untuk menemukan cara menghubungi. Sebagian tidak melakukannya, dan minat
itu hilang begitu saja.

**Rekomendasi:** batang CTA tipis yang muncul setelah pengunjung membaca ~40%
artikel, berisi ajakan sesuai topik halaman.

---

### Q5. Tombol WhatsApp melayang menutupi teks di HP
**Lokasi:** `src/components/shared/whatsapp-floating-button.tsx`

Terlihat di screenshot: tombol hijau menutupi sebagian tulisan
"Data per 2026-…" di bagian bawah halaman. Selain itu, tombol ini dan banner
cookie sama-sama memakai lapisan `z-50` dan sama-sama di bawah layar — begitu
banner cookie nanti diperbaiki (I4), keduanya akan **saling menimpa** di HP.

**Dampak:** informasi tertutup tombol terlihat ceroboh. Dan nanti kalau banner
cookie menimpa tombol WhatsApp, jalur kontak utama malah terhalang.

**Rekomendasi:** beri ruang aman di bawah isi halaman, dan atur agar banner
cookie menggeser posisi tombol, bukan menimpanya.

---

### Q6. Judul terlalu besar di HP — isi terdorong jauh ke bawah
**Lokasi:** `globals.css` (`h1` mulai 2rem) + `content-shell.tsx`

Di layar 375px, judul panduan bisa memakan **5 baris**. Digabung dengan
breadcrumb 2 baris, ringkasan 4 baris, dan kotak gambar 190px, pengunjung
harus scroll cukup jauh sebelum melihat kalimat isi yang pertama.

**Dampak:** di HP, layar pertama nyaris tidak berisi informasi yang menjawab
pertanyaan pengunjung — padahal layar pertama itu yang menentukan mereka
bertahan atau kembali ke Google.

**Rekomendasi:** kecilkan sedikit ukuran judul khusus di HP, dan rapatkan
jarak antar elemen di bagian atas.

---

### Q7. Belum ada efek gambar yang halus saat dimuat
**Lokasi:** `content-shell.tsx`, `ProjectGallery.tsx`, `BeforeAfter.tsx`

Gambar dimuat tanpa *placeholder blur*. Standar modern menampilkan versi buram
lalu menajam.

**Dampak:** gambar "muncul mendadak" dan bisa membuat teks bergeser. Dengan
efek buram, halaman terasa lebih tenang dan mahal.

**Rekomendasi:** aktifkan `placeholder="blur"` setelah gambar asli tersedia.

---

### Q8. Footer dimuat sebagai komponen interaktif padahal isinya statis
**Lokasi:** `src/components/layout/footer.tsx` baris 1 (`"use client"`)

Footer ditandai interaktif hanya karena ada satu kolom newsletter, padahal
sisanya teks biasa. Akibatnya kode footer ikut dikirim ke browser di **setiap
halaman**.

**Dampak:** menambah sedikit beban muat di setiap halaman tanpa manfaat.
Kecil, tapi terasa terutama di HP dengan koneksi lambat.

**Rekomendasi:** pisahkan form newsletter jadi komponen kecil tersendiri.

---

# 4. NICE-TO-HAVE
*Poles kecil, boleh ditunda.*

### N1. Halaman `/faq` praktis tidak bisa ditemukan
Tidak ada di menu atas, tidak ada di footer, dan tidak ditautkan dari artikel
mana pun. Pengunjung hanya bisa sampai ke sana lewat Google.
**Rekomendasi:** tautkan dari footer.

### N2. `/api/health` membocorkan info lingkungan server
`src/app/api/health/route.ts` mengembalikan `NODE_ENV`. Risikonya sangat kecil,
tapi tidak ada gunanya ditampilkan ke publik.
**Rekomendasi:** hapus field itu.

### N3. 55 peringatan kode (lint) — semuanya di halaman lama
Rinciannya: 22 variabel tak terpakai, 18 tanda kutip yang belum di-escape,
10 penggunaan tipe `any`, 5 lainnya. **Tidak satu pun berada di kode yang
dibangun selama Batch 00–12** — semuanya di halaman legacy (`residential`,
`facility-care`, `assessment`, `projectview`) dan komponen UI lama. Jumlahnya
juga **tidak bertambah** selama 12 batch.
**Rekomendasi:** yang layak diperbaiki hanya 3 yang sudah masuk kategori di
atas (checkbox, cookie-consent, dan `<a>` di admin). Sisanya aman diabaikan.

### N4. Template proyek tidak menampilkan FAQ
`ProjectTemplate.tsx` tidak merender FAQ, padahal template lain merender.
Saat ini tidak berdampak karena **ketujuh halaman proyek memang punya 0 FAQ**.
Perlu diingat kalau nanti FAQ proyek diisi.

### N5. Judul halaman panduan agak panjang untuk hasil pencarian Google
Beberapa judul terpotong di hasil pencarian. Dampaknya kecil.

---

# Lampiran A — Status Konten Terkini (agar tidak kehilangan jejak)

**Total 122 halaman konten** (di luar 4 halaman contoh/fixture):
- 🟢 **76 live & terindeks Google**
- 🟡 **42 masih `review`** (bisa dibuka lewat URL, tapi disembunyikan dari Google)
- Plus **4 landing page iklan** di PR #16 yang belum di-merge

### Yang menunggu **keputusan/approval owner** (tinggal disetujui):
| Kelompok | Jumlah | Catatan |
|---|---|---|
| Panduan Batch 10 (manajemen risiko) | 9 | 2 di antaranya perlu review kontrak terpisah |
| Panduan Batch 11 (maintenance & design) | 14 | 9 perlu review teknis/kontrak terpisah |
| Panduan biaya komersial Batch 09 | 3 | perlu review teknis terpisah |
| Hub `/proyek` | 1 | menunggu ada proyek yang tayang |

### Yang **terblokir menunggu data dari owner** (belum bisa disetujui):
| Kelompok | Jumlah | Yang dibutuhkan |
|---|---|---|
| Halaman proyek | 7 | foto proyek, hasil terukur, izin publikasi klien |
| Halaman wilayah | 8 | fakta lokal terverifikasi (`localFactsVerified`) |

### Data teknis yang masih ditunggu dari owner:
| Item | Status | Efek kalau belum diisi |
|---|---|---|
| `LEAD_WEBHOOK_URL` | belum ada | formulir lead belum bisa mengirim ke mana pun |
| ID Google Analytics / GTM | belum ada | tidak ada data pengunjung yang terekam |
| Koordinat lokasi (lat/long) | belum ada | Google Maps/lokal SEO belum optimal |
| NIB / SBU / IUJK | belum terdaftar | tidak ditampilkan (memang sengaja dikosongkan) |

### PR yang masih terbuka:
- **PR #16** — Batch 12 (landing page iklan + pelacakan konversi)
- **PR #17** — data bisnis + copy halaman terima kasih

---

# Lampiran B — Yang Ternyata Sudah Bagus

Supaya gambarannya seimbang, ini yang diperiksa dan hasilnya **baik**:

- **Konsistensi tulisan antar batch** — rata-rata panjang panduan 928–1.042
  kata di semua cluster, jumlah FAQ seragam 5. Kekhawatiran "gaya beda karena
  beda sesi" tidak terbukti.
- **Transisi framing harga** — `biaya-bangun-rumah-per-meter` (pakai angka)
  dan `biaya-renovasi-rumah` (pakai kategori) ternyata **tidak terasa
  janggal**, karena masing-masing menjelaskan alasan pendekatannya dan
  keduanya berujung ke ajakan konsultasi yang sama.
- **Struktur 6 template** — Service, Sector, Location, Guide semuanya memakai
  susunan blok yang identik. Benar-benar terasa satu keluarga desain.
- **Tidak ada tumpang tindih kata kunci** antar 122 halaman baru.
- **Semua 21 gambar punya alt text.** Tidak ada satu pun yang kosong.
- **Aksesibilitas dasar sudah benar**: skip-link ada, `focus-visible` ada,
  `prefers-reduced-motion` dihormati, `scroll-behavior: smooth` aktif.
- **Tidak ada scroll horizontal** di HP — tata letak responsif tidak pecah.
- **Ukuran kode wajar**: total 1,1 MB, tidak ada pembengkakan dari akumulasi
  12 batch.
- **Tidak ada rantai/loop redirect.**
- **Keamanan halaman admin sudah benar** — middleware menjaga semua `/admin/*`
  dan tidak bisa dijadikan pintu redirect ke situs luar.
- **Aturan "jangan mengarang data" dipatuhi konsisten** — `geo`, NIB/SBU/IUJK,
  dan `legalName` semuanya tetap kosong dan otomatis dibuang dari data Google,
  bukan ditebak.

---

# Usulan Urutan Pengerjaan

Kalau owner ingin dampak terbesar dengan usaha paling kecil:

**Gelombang 1 — hari ini/besok (situs terlihat rusak):**
C1 (keamanan), C2 (gambar rusak, pakai solusi cepat dulu), C3 (teks tak
terbaca), C4 + C5 (menu atas). Semuanya perbaikan kode kecil, tidak menyentuh
isi tulisan.

**Gelombang 2 — sebelum iklan dinyalakan:**
I5 (nama variabel analytics — wajib sebelum pasang ID Google), I4 (izin
cookie), I8 (anti-spam lead). Kalau iklan jalan sebelum ini beres, uang keluar
tanpa data yang bisa dibaca.

**Gelombang 3 — keputusan strategis owner:**
I1 (halaman lama vs baru) dan I2 (footer). Ini butuh keputusan owner, bukan
sekadar eksekusi teknis.

**Gelombang 4 — investasi kualitas:**
Q1 (foto asli) dampaknya paling besar untuk kesan profesional, lalu Q2/Q3/Q4
untuk kehalusan, lalu I6/I7 untuk kenyamanan di HP.
