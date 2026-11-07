# Gaya Visual

Gayanya potongan kertas (paper cut-out), scrapbook vintage, nuansa animasi misteri ala Bilibili, kertas robek, dan tekstur koran bekas. Rasio 9:16 dengan resolusi 1080×1920.

## Warna (diambil dari logo)

| Nama | Kode | Dipakai untuk |
|---|---|---|
| Merah aksen | `#B5203A` | Kata kunci, cap, lingkaran, coretan, dan layar penuh di momen Papiyyar |
| Gelap logo | `#23262C` | Kotak teks di atas latar merah, garis sayatan |
| Tinta | `#1A1A1A` | Teks utama |
| Kertas | `#F2EDE4` | Latar utama |
| Kraft | `#E8D9B5` | Amplop, map, papan jadwal |
| Papan gabus | `#3B2A1E` sampai `#6B4A2F` | Latar pembuka (TKP) |
| Sepia | `#D9C49A` | Kilas balik |
| Pink terang | `#FF8A9A` | Kata kunci di atas latar gelap |

## Font (Google Fonts, gratis untuk komersial)

- **Caption:** Space Grotesk 600.
- **Kata kunci:** Instrument Serif Italic, berwarna merah.
- **Judul besar:** Anton, huruf kapital.
- **Label kecil:** Special Elite, bergaya mesin ketik, dengan format `// 01 · TKP`.

## Tata letak tetap di setiap frame

Ukuran kerja SVG 360×640, lalu dirender 3 kali lipat.

- Kiri atas: label kecil, misalnya `// 01 · TKP`, `// 02 · kronologi`, `// 03 · edukasi`, `// 04 · twist`, `// 05 · ???`, atau `// penutup`.
- Di bawah label: caption yang muncul kata per kata, dengan kata berikutnya tampil samar. Satu kata kunci di akhir berwarna merah miring. **Maksimal sekitar 28 karakter** supaya tidak terpotong.
- Di bawah caption: judul besar huruf kapital, maksimal sekitar 20 karakter per baris.
- Tengah: ilustrasi kasus.
- Kanan bawah: tokoh Detektif kertas dengan topi fedora berpita merah, jas panjang cokelat, dan kacamata bulat. Posenya berganti mengikuti narasi: angkat kaca pembesar, angkat bahu, tepuk dahi, menunjuk, menyipit, menurunkan kacamata, atau memutar kunci.
- Kanan atas: logo kecil agak transparan di semua scene kecuali penutup.
- Penutup: logo besar ditempel seperti stiker, tombol "IKUTI @PAPIYYAR", stiker "KASUS #N SEGERA", dan kotak komentar.

## Kosakata animasi

Semua di bawah ini contoh, bukan kewajiban. Pilih yang cocok dengan topik.

- **Muncul:** pop dengan pantulan, jatuh dari atas, geser dari samping, atau cap stempel yang membesar lalu menempel.
- **Sorotan:** lingkaran spidol merah yang tergambar, coretan X, benang merah ala papan bukti, atau paku payung.
- **Ketegangan:** layar meredup, lampu berkedip, tanda tanya melayang, atau layar bergetar.
- **Transisi:** potongan langsung dengan sentakan zoom kecil, tirai koran dari samping, atau kertas hitam menutup layar untuk cliffhanger.
- **Ritme:** visual berganti setiap 2–4 detik, dan muncul tepat saat kata itu diucapkan.
- **Gerak halus terus-menerus:** detektif bergoyang pelan dan sesekali berkedip, kamera zoom pelan sekitar 2,5% per scene.

## Momen Papiyyar (selalu paling dramatis)

1. Sayatan diagonal merah putih, terinspirasi garis pada huruf P di logo, membelah layar.
2. Layar berubah merah penuh `#B5203A`.
3. Teks raksasa **PAPIYYAR!** miring, dengan dua huruf Y berwarna gelap seperti di logo.
4. Zoom menghentak ke wajah detektif, efek patah-patah tiga frame, layar bergetar, dan sobekan kertas dari empat sudut.
5. Visual ironi, misalnya timbangan yang patah, kata "DIBOBOL" yang dicoret, atau lampu yang memerintah pintu.
6. Di kata "Cong", ritme berubah, misalnya hening sejenak, suara jangkrik, atau tatapan datar detektif.

## Gambar storyboard

Untuk tahap gambar storyboard, render satu frame momen utama per scene, lalu susun enam scene per lembar dengan label "Scene N · waktu". Cek setiap lembar dengan mata sebelum dikirim (lihat `kesalahan.md`).

## Daftar aset standar

- Logo dan nama akun sudah tersedia di `assets/logo-papiyyar.jpg`.
- Tekstur dibuat oleh `scripts/make_textures.py`.
- Ikon dan ilustrasi berupa vektor buatan sendiri tanpa merek.
- Font dari Google Fonts.
- Efek suara dan musik dibuat dengan kode, kecuali pengguna mengirim sendiri.
- Aset yang biasanya disiapkan pengguna: suara narasi, foto produk afiliasi (untuk MoFu dan BoFu), dan musik bebas royalti kalau ingin lebih bagus.
