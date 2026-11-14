# Gaya Visual

Gayanya potongan kertas (paper cut-out), scrapbook vintage, papan bukti detektif, kertas robek, dan tekstur koran bekas. Rasio 9:16 dengan resolusi 1080×1920. Foto dan klip berita asli dari pengguna ditempel di atas kertas seperti **foto TKP** di papan bukti.

## Warna (diambil dari logo, tetap dipakai)

| Nama | Kode | Dipakai untuk |
|---|---|---|
| Merah aksen | `#B5203A` | Kata kunci, cap, lingkaran, coretan, dan layar penuh di momen Papiyyar |
| Gelap logo | `#23262C` | Kotak teks di atas latar merah, kartu kata kunci, garis sayatan |
| Tinta | `#1A1A1A` | Teks utama |
| Kertas | `#F2EDE4` | Latar utama |
| Kraft | `#E8D9B5` | Amplop, map, label bukti, kotak hitungan |
| Papan gabus | `#3B2A1E` sampai `#6B4A2F` | Latar TKP dan papan bukti |
| Sepia | `#D9C49A` | Kilas balik |
| Pink terang | `#FF8A9A` | Kata kunci di atas latar gelap |

Palet ini tidak diganti meniru video referensi (kertas lecek abu-abu). Yang dipinjam hanya tekniknya.

## Font (Google Fonts, gratis untuk komersial)

- **Caption:** Space Grotesk 600.
- **Kata kunci:** Instrument Serif Italic, berwarna merah.
- **Judul besar dan thumbnail:** Anton, huruf kapital.
- **Label kecil:** Special Elite, bergaya mesin ketik, dengan format `// 01 · TKP`.

## Tata letak tetap di setiap frame

Ukuran kerja SVG 360×640, lalu dirender 3 kali lipat.

- Kiri atas: label kecil sesuai bagian rumus: `// 01 · HOOK`, `// 02 · TKP`, `// 03 · BARANG BUKTI`, `// 04 · PAPIYYAR`, `// 05 · VONIS`.
- Di bawah label: caption yang muncul kata per kata, dengan satu kata kunci berwarna merah miring. **Maksimal sekitar 28 karakter**.
- Di bawah caption: judul besar huruf kapital, maksimal sekitar 20 karakter per baris.
- Tengah: **kartu bukti** (foto atau klip TKP, komentar saksi, hitungan, definisi) atau ilustrasi kertas.
- Kanan bawah: tokoh Detektif kertas dengan topi fedora berpita merah, jas panjang cokelat, dan kacamata bulat. Posenya berganti mengikuti narasi: angkat kaca pembesar, angkat bahu, tepuk dahi, menunjuk, menyipit, atau menurunkan kacamata. Detektif tidak boleh menutupi wajah tokoh di foto.
- Kanan atas: logo kecil agak transparan di semua scene kecuali penutup.
- Penutup: logo besar ditempel seperti stiker, tombol "IKUTI @PAPIYYAR", stiker "KASUS #N SEGERA", dan kotak komentar.

## Perangkat bukti (dari riset video referensi, digambar ulang gaya Papiyyar)

Fungsi pembantu tersedia di `scripts/anim_template.html`.

| Perangkat | Dipakai di | Bentuk Papiyyar | Fungsi |
|---|---|---|---|
| **Foto TKP** | TKP, Barang Bukti | Foto atau frame klip pengguna di dalam bingkai putih ala polaroid, ditempel selotip, bayangan jatuh, label sumber di bawah ("SUMBER: CNN Indonesia"), nomor bukti, cap **DUGAAN** bila perlu | `fotoTKP()` |
| **Keterangan saksi** | Barang Bukti | Kartu komentar netizen gaya kertas dengan nama akun disamarkan sebagian (`@akun***`), satu kalimat kunci digaris bawah merah. Latar papan gabus agak gelap supaya kartunya menonjol | `saksi()` |
| **Kotak hitungan** | Barang Bukti | Kertas kraft dengan baris hitungan yang muncul satu per satu, hasil akhir dilingkari spidol merah | `hitung()` |
| **Definisi** | Barang Bukti | Kartu kamus kertas, kata yang dibahas tebal, bagian kalimat penting di-highlight merah | `definisi()` |
| **Kartu kata kunci** | Hook, Papiyyar, Vonis | Layar gelap `#23262C` penuh, satu atau dua kata Anton raksasa, muncul dengan cap atau hentakan. Bisa langsung disusul visual hiperbola (ledakan kertas, petir coretan) | `kartuKunci()` |
| **Label perbandingan** | Barang Bukti, Papiyyar | Dua foto berdampingan dengan tag kecil di atas masing-masing, misalnya "MURID SD" vs "WAKIL RAKYAT", benang merah di antaranya | `fotoTKP()` + `tag()` |
| **Grafik atau data** | Barang Bukti | Digambar ulang sebagai vektor kertas (garis merah turun, angka dilingkari), sumber data ditulis kecil | Vektor |
| **Penanda seri** | Hook | Map kraft bertuliskan "KASUS [TOPIK] #N" dicap | Vektor |

## Thumbnail atau frame pertama (0:00–0:02)

- **Foto tokoh asli dari pengguna**, di-cutout (latar dihapus) atau ditempel sebagai foto dengan tepi robek, ukuran besar di tengah.
- Latar papan gabus atau kertas koran gelap, plus coretan merah dramatis.
- Teks raksasa Anton bertumpuk 2–4 baris dari pola judul, satu atau dua kata berwarna merah `#B5203A` di atas kotak gelap.
- Label kecil bergaya tulisan tangan untuk kontras, misalnya "adab anak SD" vs "adab wakil rakyat".
- Logo Papiyyar kecil di pojok, detektif mengintip dari kanan bawah dengan kaca pembesar.
- Jangan mengedit wajah tokoh supaya terlihat menghina (lidah, bentuk wajah, dan sejenisnya). Dramanya cukup dari teks, coretan, dan komposisi.

## Kosakata animasi

Semua di bawah ini contoh, bukan kewajiban. Pilih yang cocok dengan topik.

- **Muncul:** pop dengan pantulan, jatuh dari atas, geser dari samping, atau cap stempel yang membesar lalu menempel. Foto TKP jatuh lalu ditempel selotip.
- **Sorotan:** lingkaran spidol merah, coretan X, benang merah ala papan bukti, paku payung, atau zoom pelan ke bagian foto yang penting.
- **Ketegangan:** layar meredup, lampu berkedip, tanda tanya melayang, atau layar bergetar.
- **Transisi:** potongan langsung dengan sentakan zoom kecil, tirai koran dari samping, atau kertas hitam menutup layar.
- **Ritme:** visual berganti setiap **2–3 detik**, dan muncul tepat saat kata itu diucapkan. Kata yang ditekankan boleh muncul besar sendirian di tengah layar sesaat.
- **Gerak halus terus-menerus:** detektif bergoyang pelan dan sesekali berkedip, kamera zoom pelan sekitar 2,5% per scene, foto TKP bergerak pelan (efek Ken Burns).

## Momen Papiyyar (selalu paling dramatis)

1. Sayatan diagonal merah putih, terinspirasi garis pada huruf P di logo, membelah layar.
2. Layar berubah merah penuh `#B5203A`.
3. Teks raksasa **PAPIYYAR!** miring, dengan dua huruf Y berwarna gelap seperti di logo.
4. Zoom menghentak ke wajah detektif, efek patah-patah tiga frame, layar bergetar, dan sobekan kertas dari empat sudut.
5. Visual kontradiksi: dua foto TKP dibenturkan, kata kunci dicoret, atau timbangan yang patah.
6. Di kata "Cong", ritme berubah, misalnya hening sejenak, suara jangkrik, atau tatapan datar detektif.

## Gambar storyboard

Render satu frame momen utama per scene, lalu susun enam scene per lembar dengan label "Scene N · waktu". Kalau foto pengguna belum ada, pakai kotak placeholder bertuliskan kodenya (`FOTO-1`, `KLIP-2`, `SAKSI-1`). Cek setiap lembar dengan mata sebelum dikirim (lihat `kesalahan.md`).

## Daftar aset standar

- Logo dan nama akun sudah tersedia di `assets/logo-papiyyar.jpg`.
- Tekstur dibuat oleh `scripts/make_textures.py`.
- Ikon dan ilustrasi berupa vektor buatan sendiri tanpa merek.
- Font dari Google Fonts.
- Efek suara dan musik dibuat dengan kode, kecuali pengguna mengirim sendiri.
- Aset yang disiapkan pengguna: lihat `aset-pengguna.md`.
