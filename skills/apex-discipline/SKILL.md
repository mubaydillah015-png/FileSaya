---
name: apex-discipline
description: Template lengkap untuk membuat video pendek vertikal (YouTube Shorts, Reels, TikTok) bergaya sinematik gelap dengan tipografi raksasa, dari naskah sampai render MP4. Alurnya tetap - tanya kebutuhan, naskah, rincian aset, storyboard tabel, preview gambar per scene, persetujuan, baru render. Gunakan skill ini setiap kali pengguna minta dibuatkan naskah video pendek, storyboard, preview scene, atau render video Shorts/Reels/TikTok bergaya "Apex Discipline", motivasi/disiplin/stoik, faceless B-roll, atau menyebut "Apex Discipline", "video seperti kemarin", "style yang sama", walau topiknya berbeda.
---

# Apex Discipline — Template Video Pendek Sinematik

Skill ini menyimpan cara kerja yang sudah disetujui pengguna untuk satu video yang selesai dan disukai. Tujuannya: video berikutnya, dengan topik apa pun, punya gaya dan alur yang sama tanpa perlu menjelaskan ulang.

Baca juga:
- `references/aturan-style.md` — semua aturan visual (teks, glow, caption, kartu, ikon, audio). Baca sebelum membuat storyboard.
- `references/kesalahan.md` — kesalahan yang pernah terjadi dan cara menghindarinya. Baca sebelum render.
- `references/contoh-proyek.md` — contoh lengkap satu video (naskah, storyboard, waktu scene). Hanya contoh, bukan aturan.
- `assets/contoh/anim-contoh.html` — mesin animasi yang dipakai di video contoh. Salin dan ubah isinya untuk video baru.

## Kebiasaan pengguna (selalu ikuti)

- **Bahasa sederhana.** Jawab dalam Bahasa Indonesia yang mudah dipahami. Hindari istilah teknis; kalau terpaksa, jelaskan singkat.
- **Storyboard selalu dalam bentuk tabel.**
- **Jangan render sebelum pengguna bilang setuju** ("oke", "sudah oke", "silahkan render"). Membuat gambar preview boleh; membuat video final atau suara final tidak.
- **Revisi hanya scene yang disebut.** Setelah revisi, tampilkan lagi gambarnya, lalu tanya lagi. Jangan mengubah scene lain diam-diam.
- **Satu langkah, satu persetujuan.** Selesaikan tahap yang diminta, tampilkan hasilnya, lalu berhenti dan tunggu.
- Akhiri tiap tahap dengan pertanyaan penutup yang jelas (lihat tiap tahap di bawah).

## Alur kerja

### Tahap 0 — Tanya kebutuhan (selalu di awal)

Sebelum menulis apa pun, tanyakan hal-hal berikut. **Jangan sebutkan contoh, pilihan, atau nilai bawaan** di pertanyaannya — biarkan pengguna menjawab sendiri. Tanyakan sekaligus dalam satu pesan, bernomor:

1. Suara narasi: sudah ada file suaranya atau belum?
2. Font yang ingin dipakai?
3. Warna dasar?
4. Warna teks?
5. Warna aksen?
6. Latar: memakai gambar/video atau warna?
7. Logo?
8. Nama akun sosial media (handle)?
9. Tujuan unggah (platform)?
10. Durasi video? (tanyakan hanya jika belum ada file suara; jika suara sudah ada, durasi mengikuti panjang suara)

Juga pastikan topik/judul, target penonton, dan tipe konten jika pengguna belum menyebutkannya. Jika pengguna menjawab "seperti kemarin" atau "sama seperti sebelumnya", pakai nilai dari `references/contoh-proyek.md` dan sebutkan nilai yang dipakai.

### Tahap 1 — Naskah

Ikuti instruksi naskah dari pengguna. Pola yang sudah disetujui:
- Bahasa naskah sesuai permintaan (contoh sebelumnya: Inggris), nada tegas, tanpa motivasi klise.
- Format siap untuk ElevenLabs: hanya kalimat yang dibaca. Tanpa judul, label scene, emoji, tanda kurung, catatan visual, atau markdown.
- Kalimat pendek, satu ide per kalimat. Angka ditulis dengan huruf. Singkatan ditulis penuh.
- Koma = jeda pendek, titik = jeda panjang. Pisahkan Hook, Isi, Penutup dengan satu baris kosong.
- Urutan: pembuka menarik → isi → ajakan/tagline di akhir.
- Kirim dalam satu blok teks mentah.
- Perkiraan panjang: ±2,2 kata per detik untuk suara berat dan pelan (45 detik ≈ 100 kata). Sampaikan bahwa durasi final mengikuti file suara.
- Untuk tokoh nyata, pakai fakta yang umum dan aman; jangan mengarang kutipan.

### Tahap 2 — Storyboard (tabel)

Jika pengguna mengirim video/gambar referensi, pelajari dulu (ambil beberapa frame dengan ffmpeg, lihat sebagai gambar). Tiru **gaya**nya saja: jenis font, warna, gerakan teks, ritme ganti scene, cara caption. Jangan menyalin isi, desain persis, ikon, ilustrasi, atau logo pembuatnya. Jika referensi tidak bisa dibuka, katakan dan lanjut dengan gaya di skill ini.

Kolom tabel, berurutan:

| No | Durasi | VO (narasi) | Visual dan animasi | Teks di layar | SFX |

- Kolom VO diisi persis sesuai naskah.
- Tandai bagian di kolom No (HOOK / nama bagian isi / CTA / PENUTUP).
- Satu scene ≈ 2–5 detik, satu ide naskah per scene.
- Jelaskan animasi dengan bahasa sederhana: suasana visual, kata mana yang diberi warna aksen, transisi.
- Di bawah tabel: total durasi, lalu ringkasan "yang diambil dari referensi".
- Jangan render. Tutup dengan meminta pengguna mengecek.

### Tahap 3 — Rincian aset (tabel)

Kolom: | Aset | Dipakai di scene | Sumber (dari pengguna / dibuat otomatis / ikon) | Bisa diganti? |

Sertakan semua: logo, ikon, gambar/footage per scene, font, warna (dengan kode hex), musik latar, setiap efek suara, dan suara narasi. Kelompokkan (Brand, Visual/B-roll, Grafis otomatis, Audio). Tandai ★ aset yang sebaiknya disiapkan pengguna sendiri, lalu ringkas daftar ★ di bawah tabel. Jujur soal batasan alat: misalnya jika koneksi ElevenLabs tidak bisa membuat musik, katakan musik perlu dari pengguna. Tutup dengan: **"Ada aset yang mau diganti?"** lalu tunggu.

### Tahap 4 — Gambar storyboard / preview

1. Buat halaman HTML berisi semua frame 9:16 (ukuran desain 300×533 px) memakai aturan style, lalu screenshot dengan Playwright.
2. Hasil: satu gambar gabungan semua scene berurutan (bernomor + waktu di pojok frame) dan, untuk preview, gambar per scene ukuran 1080×1920 (`deviceScaleFactor: 3.6`).
3. Selama aset asli belum ada, pakai ilustrasi siluet sederhana sebagai pengganti B-roll, dan sebutkan bahwa itu pengganti.
4. Lihat sendiri hasil screenshot sebelum dikirim (cek teks tertutup, tumpang tindih, font termuat).
5. Kirim gambarnya, lalu tanya: **"Sudah oke? Kalau ada yang mau diubah, sebutkan nomor scene-nya."**
6. Revisi hanya scene yang disebut → tampilkan lagi gambarnya → tanya lagi. Ulangi sampai pengguna bilang oke.

### Tahap 5 — Render (hanya setelah disetujui)

1. **Ukur suara dulu.** `scripts/cari_jeda.sh suara.mp3` memberi durasi dan potongan-potongan suara. Cocokkan potongan dengan klausa naskah (biasanya satu potongan = satu kalimat atau satu klausa berkoma). Jika durasi suara berbeda dari rencana, beri tahu pengguna dan sesuaikan semua waktu scene ke suara.
2. **Siapkan animasi.** Salin `assets/contoh/anim-contoh.html` ke folder kerja, lalu ubah:
   - `SEG` = daftar klausa dengan waktu mulai/selesai dari langkah 1.
   - `CUTS` = waktu ganti scene (di tengah jeda antar kalimat).
   - `H` = teks di layar per scene (`*kata*` = warna aksen, `~kata~` = memudar abu-abu, `|` = baris baru).
   - Markup SVG/gambar tiap scene dan blok efek per scene (`if(sc===n){...}`).
   - Warna, font, logo, handle sesuai jawaban Tahap 0.
3. **Tes dulu** beberapa detik kunci dengan `scripts/preview.js` dan lihat hasilnya sebelum render penuh.
4. **Render gambar bergerak:** `node scripts/render.js anim.html video_only.mp4` (30 fps, 1080×1920). Jalankan di latar belakang dan pantau log; ±5 menit untuk 60 detik.
5. **Audio:** pakai musik dari pengguna jika ada. Jika tidak ada, buat latar pengganti dan SFX dengan `scripts/sfx_contoh.py` (ubah daftar waktu kejadian sesuai scene) dan beri tahu bahwa itu pengganti sementara.
6. **Gabung:** `scripts/gabung_audio.sh video_only.mp4 suara.mp3 latar.wav hasil.mp4` — musik otomatis mengecil saat narasi, loudness −14 LUFS.
7. **Cek hasil:** ambil beberapa frame dari MP4 final dan lihat; cek durasi dan ukuran. Kirim video, lalu laporkan singkat: durasi, apa yang berubah dari rencana, dan hal yang masih perlu diganti (musik pengganti, risiko hak cipta, batas durasi platform).

Simpan semua file (naskah, storyboard, preview, render, sumber) ke repo/folder kerja dan commit bila bekerja di repo.

## Alat bantu di `scripts/`

| File | Fungsi |
|---|---|
| `cari_jeda.sh` | Durasi suara + daftar potongan bicara (dari jeda) untuk menyusun `SEG` |
| `render.js` | Merekam halaman animasi frame per frame jadi MP4 1080×1920 |
| `preview.js` | Screenshot halaman animasi di detik tertentu (cek cepat / preview per scene) |
| `gabung_audio.sh` | Menggabungkan video + narasi + musik/SFX dengan ducking dan normalisasi |
| `sfx_contoh.py` | Contoh pembuat musik latar gelap + SFX sintetis; ubah daftar waktunya |
| `logo_transparan.py` | Membuang latar hitam/gelap dari logo jadi PNG transparan |
| `potong_latar.py` | Membuang latar terang polos dari gambar siluet/potret |
