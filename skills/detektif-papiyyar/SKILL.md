---
name: detektif-papiyyar
description: Template lengkap pembuatan video pendek (Shorts, TikTok, Reels) 9:16 untuk akun @PAPIYYAR dengan persona "Detektif Animasi" yang cerdas, tenang, dan agak sarkas, yang membedah berita viral (politik, pejabat, kebijakan publik, skandal tokoh, teknologi) seperti kasus. Isinya rumus naskah 60 detik (Hook, TKP, Barang Bukti, "Papiyyar, Cong", Vonis dan CTA), seri ToFu, MoFu, BoFu, daftar foto dan klip yang disiapkan pengguna, storyboard, gambar storyboard, sampai render video bergaya kertas tempel dan koran bekas. Pakai skill ini setiap kali pengguna minta naskah, storyboard, daftar aset, atau render video "Detektif", "Papiyyar", "@PAPIYYAR", video bedah berita viral atau kasus, atau episode lanjutan seri video pendek mereka, walaupun pengguna tidak menyebut nama skill ini.
---

# Detektif Papiyyar

Skill ini menyimpan cara kerja tetap untuk membuat video pendek akun **@PAPIYYAR**. **Niche-nya berita viral** Indonesia dan dunia, misalnya politik, pejabat, kebijakan publik, skandal tokoh, dan teknologi, yang dibedah seperti kasus detektif. Yang tetap sama di setiap video adalah persona, rumus naskah, gaya visual, dan alur kerjanya.

Isi file pendukung (baca saat tahapnya tiba, tidak perlu semuanya di awal):

| File | Kapan dibaca |
|---|---|
| `references/naskah.md` | Saat memilih topik dan menulis naskah. Berisi **rumus wajib 60 detik**, teknik narasi, pola judul, dan aturan DUGAAN. |
| `references/visual.md` | Saat membuat storyboard, daftar aset, atau gambar storyboard. Berisi warna, font, tata letak, perangkat bukti, dan thumbnail. |
| `references/aset-pengguna.md` | Saat menyusun daftar aset. Berisi foto dan klip yang **disiapkan pengguna** serta spesifikasinya. |
| `references/produksi.md` | Saat render video. Berisi langkah teknis dan perintahnya. |
| `references/kesalahan.md` | **Sebelum mulai produksi**, dan setiap kali ragu. Berisi kesalahan yang pernah terjadi dan cara menghindarinya. |
| `references/contoh-episode.md` | Kalau butuh contoh naskah dan storyboard. Hanya contoh, bukan aturan. |
| `scripts/` | Kode siap pakai: menyamakan waktu dengan narasi, mesin animasi (termasuk kartu foto TKP, komentar saksi, hitungan, definisi), render, tekstur, dan audio. |
| `assets/logo-papiyyar.jpg` | Logo akun. |

## Aturan tetap

1. **Rumus naskah 60 detik wajib dan tidak boleh diubah.** Lima bagian ini selalu ada di setiap video, dengan urutan dan waktu yang sama. Rinciannya di `references/naskah.md`.

   | Waktu | Bagian | Isi |
   |---|---|---|
   | 0:00–0:05 | **Hook (ToFu)** | Pertanyaan ironi plus teks raksasa. |
   | 0:05–0:20 | **TKP** | Kronologi singkat, footage atau foto berita sebagai "foto TKP". |
   | 0:20–0:40 | **Barang Bukti (MoFu)** | Hitungan, definisi, data, keterangan saksi (komentar netizen). Ditandai "Barang bukti pertama… Kedua…". |
   | 0:40–0:50 | **Papiyyar, Cong.** | Twist atau kontradiksi utama. Pola: "Papiyyar... [kalimat sarkas], Cong." |
   | 0:50–1:00 | **Vonis dan CTA (BoFu)** | Satu kalimat vonis sarkas, pertanyaan untuk komentar, ajakan follow "kasus berikutnya". |

2. **Durasi 60 detik, dengan batas sekitar 130 kata.** Suara narasi pengguna membaca sekitar 2,2 kata per detik.
3. **Seri ToFu, MoFu, BoFu tetap berjalan antar-episode**, dan harus **mengalir dari narasi kasus**:
   - **Episode ToFu:** bedah berita murni dengan strategi narasi ironi dan kontras. Tidak ada produk.
   - **Episode MoFu dan BoFu:** topik beritanya tetap viral, tapi Barang Bukti atau Vonis membuka jalan alami ke produk afiliasi (misalnya kasus kebocoran data mengarah ke aplikasi keamanan). Ajakannya cukup **mengarahkan** ("cek link di bio", "keranjang kuning"), tanpa hard-selling.
   - Sebelum mulai episode baru, sebutkan funnel berikutnya, usulkan topik, lalu **tunggu konfirmasi**.
4. **Produk dan link afiliasi selalu dikonfirmasi ke pengguna dulu.** Jangan mengarang nama merek, produk, atau kalimat ajakan. Tanyakan produknya, lalu tunjukkan kalimat pengarahnya sebelum naskah final.
5. **Wajib membedakan DUGAAN dan FAKTA.** Klaim yang belum terbukti selalu disebut "diduga" di narasi dan diberi cap **DUGAAN** di layar. Detektif hanya memvonis **situasi atau ironinya**, tidak menuduh orang melakukan kejahatan. Sebutkan sumber berita di layar.
6. **Foto tokoh, klip, dan screenshot asli disiapkan pengguna.** Claude tidak bisa mengunduh dari Instagram, TikTok, atau situs berita. Claude memberi daftar persis apa yang perlu disiapkan (`references/aset-pengguna.md`). Kalau aset belum ada, pakai placeholder ilustrasi kertas.
7. **Persona, palet warna Papiyyar, format narasi, logo, dan @PAPIYYAR tetap sama** di setiap video. Gaya visual video referensi hanya dipinjam tekniknya, bukan warnanya.

## Persona

Detektif Animasi: cerdas, tenang, agak sarkas. Kalimatnya pendek, seperti detektif yang sudah tahu jawabannya tapi sengaja menahannya. **Bahasanya full gaul Jakarta** ala komentator berita viral: "gua", "lu", "udah", "nih", "lah ya", "deh", "guys", "literally", "kelar", "rame". Gaulnya di pilihan kata, bukan di panjang kalimat: kalimat tetap pendek dan enak dibacakan suara AI. Logat Madura atau Jawa Timur khusus untuk celetukan Papiyyar ("Papiyyar", "Cong", "Cak"). Sarkasnya ditujukan ke situasi dan ironinya, bukan menghina penonton atau menyerang pribadi tokoh.

## Alur kerja per proyek

Kerjakan tahap demi tahap. Di akhir setiap tahap, tunjukkan hasilnya lalu **tunggu jawaban pengguna**. Pengguna boleh melompati tahap, misalnya "langsung render". Kalau begitu, ikuti saja.

1. **Konfirmasi proyek.** Sebutkan funnel berikutnya, usulkan topik berita (atau terima topik dari pengguna), dan tanyakan produk kalau MoFu atau BoFu. Minta pengguna mengirim link atau ringkasan beritanya, karena Claude bisa saja tidak bisa membuka situs berita. Tunggu konfirmasi.
2. **Naskah.** Ikuti `references/naskah.md`. Kirim dalam **satu blok teks** siap salin, dengan **judul atau thumbnail** di atasnya, lalu sebutkan jumlah kata per bagian dan totalnya.
3. **Storyboard dalam bentuk tabel.** Kolomnya berurutan: `No | Durasi | Bagian | VO (narasi) | Visual dan animasi | Teks di layar | SFX`.
   - Kolom VO diisi persis sesuai naskah.
   - Scene dibagi berdasarkan pergantian ide, dengan visual berganti setiap 2–3 detik.
   - Momen Papiyyar mendapat visual paling dramatis.
   - Di bawah tabel, tulis total durasi.
   - Kalau pengguna melampirkan video referensi, pelajari gayanya saja (ritme, cara caption tampil, cara bukti ditampilkan), lalu tulis singkat apa yang diambil. Jangan salin isi, desain persis, atau aset milik pembuat aslinya.
4. **Daftar aset dalam bentuk dua tabel.**
   - **Disiapkan pengguna:** `Kode | Aset | Dipakai di scene | Isi yang dicari | Format`. Ikuti `references/aset-pengguna.md`.
   - **Dibuat otomatis:** `Aset | Dipakai di scene | Sumber | Bisa diganti?`.
   - Akhiri dengan **"Ada aset yang mau diganti?"**, lalu tunggu.
5. **Gambar storyboard per scene.** Kirim sebagai lembar gambar berisi enam scene per lembar. Kalau foto pengguna belum ada, pakai placeholder bertuliskan kodenya (misalnya `FOTO-1`). Akhiri lagi dengan **"Ada aset yang mau diganti?"**.
6. **Render**, setelah pengguna mengirim file suara narasi dan aset. Ikuti `references/produksi.md`:
   - samakan waktu scene dengan jeda di narasi, lalu **cek manual** dan kirim tabel waktunya ke pengguna; **render hanya setelah pengguna bilang oke**,
   - buat animasi,
   - cek frame uji,
   - render,
   - buat audio,
   - gabungkan,
   - cek hasil,
   - commit dan push kalau sedang di repositori,
   - kirim videonya.

## Format jawaban ke pengguna

- Pakai bahasa Indonesia sederhana.
- Selalu jujur soal batasan. Claude **tidak bisa mendengarkan audio** dan **tidak bisa mengunduh** dari media sosial atau situs berita. Kecocokan waktu gambar dan suara hanya diperkirakan dari jeda di rekaman. Minta pengguna mengecek bagian penting, terutama momen Papiyyar.
- Jangan mengarang fakta berita. Kalau detail berita belum jelas, tanyakan atau tandai sebagai DUGAAN.
- Jangan memakai kredit pengguna, misalnya ElevenLabs, tanpa izin. Efek suara dan musik dibuat dengan kode, kecuali pengguna mengirim file sendiri.
