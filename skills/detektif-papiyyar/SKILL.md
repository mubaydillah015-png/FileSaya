---
name: detektif-papiyyar
description: Template lengkap pembuatan video pendek (Shorts, TikTok, Reels) 9:16 untuk akun @PAPIYYAR dengan persona "Detektif Animasi" yang cerdas, tenang, dan agak sarkas. Isinya alur naskah ToFu, MoFu, BoFu berdurasi 60 detik, momen twist "Papiyyar, Cong", storyboard, daftar aset, gambar storyboard, sampai render video bergaya kertas tempel dan koran bekas. Pakai skill ini setiap kali pengguna minta naskah, storyboard, daftar aset, atau render video "Detektif", "Papiyyar", "@PAPIYYAR", video kasus atau misteri edukasi, atau episode lanjutan seri video pendek mereka, walaupun pengguna tidak menyebut nama skill ini.
---

# Detektif Papiyyar

Skill ini menyimpan cara kerja tetap untuk membuat video pendek akun **@PAPIYYAR**. Topiknya boleh apa saja, misalnya keamanan siber, penipuan online, kesehatan, atau keuangan. Yang tetap sama adalah persona, struktur naskah, gaya visual, dan alur kerjanya.

Isi file pendukung (baca saat tahapnya tiba, tidak perlu semuanya di awal):

| File | Kapan dibaca |
|---|---|
| `references/naskah.md` | Saat menulis naskah. Berisi struktur 60 detik, aturan format narasi, dan arti ToFu, MoFu, BoFu. |
| `references/visual.md` | Saat membuat storyboard, daftar aset, atau gambar storyboard. Berisi warna, font, tata letak, dan kosakata animasi. |
| `references/produksi.md` | Saat render video. Berisi langkah teknis dan perintahnya. |
| `references/kesalahan.md` | **Sebelum mulai produksi**, dan setiap kali ragu. Berisi kesalahan yang pernah terjadi dan cara menghindarinya. |
| `references/contoh-episode.md` | Kalau butuh contoh nyata naskah dan storyboard yang sudah disetujui pengguna. Hanya contoh, bukan aturan. |
| `scripts/` | Kode siap pakai: menyamakan waktu dengan narasi, mesin animasi, render, tekstur, dan audio. |
| `assets/logo-papiyyar.jpg` | Logo akun. |

## Aturan tetap

1. **Urutan proyek: ToFu, lalu MoFu, lalu BoFu**, biasanya dalam satu seri topik yang sama. Sebelum mulai proyek baru, sebutkan funnel berikutnya dan usulkan topiknya, lalu **tunggu konfirmasi pengguna**.
2. **Durasi 60 detik, dengan batas sekitar 130 kata.** Suara narasi pengguna membaca sekitar 2,2 kata per detik. Naskah yang lebih panjang langsung membuat video kepanjangan.
3. **Bagian Edukasi berisi dua langkah sederhana.**
   - **ToFu:** dua langkah metode detektif yang bisa langsung dicoba siapa saja, tanpa produk.
   - **MoFu dan BoFu:** penjelasan logis bagaimana produk afiliasi membantu orang awam, disampaikan sehalus mungkin tanpa hard-selling.
4. **Produk afiliasi menunggu instruksi pengguna.** Jangan mengarang nama merek atau produk. Kalau belum ada instruksi, tanyakan dulu sebelum menulis naskah MoFu atau BoFu.
5. **Persona, format narasi, gaya visual, logo, dan @PAPIYYAR tetap sama** di setiap video.
6. **Momen Papiyyar** berisi twist yang menampar logika penonton, ditambah celetukan tipis bernada sarkas berlogat Madura atau Jawa Timur. Pola dasarnya **"Papiyyar... [kalimat sarkas], Cong."**

## Persona

Detektif Animasi: cerdas, tenang, agak sarkas. Kalimatnya pendek dan dingin, seperti detektif yang sudah tahu jawabannya tapi sengaja menahannya. Sarkasnya ditujukan ke situasi, bukan menghina penonton.

## Alur kerja per proyek

Kerjakan tahap demi tahap. Di akhir setiap tahap, tunjukkan hasilnya lalu **tunggu jawaban pengguna**. Pengguna boleh melompati tahap, misalnya "langsung render". Kalau begitu, ikuti saja.

1. **Konfirmasi proyek.** Sebutkan funnel berikutnya, usulkan topik, dan tanyakan produk kalau MoFu atau BoFu. Tunggu konfirmasi.
2. **Naskah.** Ikuti `references/naskah.md`. Kirim dalam **satu blok teks** yang siap disalin, dan sebutkan jumlah katanya.
3. **Storyboard dalam bentuk tabel.** Kolomnya berurutan: `No | Durasi | VO (narasi) | Visual dan animasi | Teks di layar | SFX`.
   - Kolom VO diisi persis sesuai naskah.
   - Scene dibagi berdasarkan pergantian ide.
   - Momen Papiyyar mendapat visual paling dramatis.
   - Di bawah tabel, tulis total durasi.
   - Kalau pengguna melampirkan video referensi, pelajari gayanya saja (font, warna, gerakan teks, ritme, cara caption tampil), lalu tulis singkat apa yang diambil. Jangan salin isi, desain persis, atau aset milik pembuat aslinya.
4. **Daftar aset dalam bentuk tabel.** Kolomnya: `Aset | Dipakai di scene | Sumber (dibuat otomatis) | Bisa diganti?`. Tandai aset yang sebaiknya disiapkan pengguna sendiri. Akhiri dengan pertanyaan **"Ada aset yang mau diganti?"**, lalu tunggu.
5. **Gambar storyboard per scene.** Kirim sebagai lembar gambar berisi enam scene per lembar. Akhiri lagi dengan **"Ada aset yang mau diganti?"**.
6. **Render**, setelah pengguna mengirim file suara narasi. Ikuti `references/produksi.md`:
   - samakan waktu scene dengan jeda di narasi,
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
- Selalu jujur soal batasan. Claude **tidak bisa mendengarkan audio**, jadi kecocokan waktu gambar dan suara hanya diperkirakan dari jeda di rekaman. Minta pengguna mengecek bagian penting, terutama momen Papiyyar.
- Jangan memakai kredit pengguna, misalnya ElevenLabs, tanpa izin. Efek suara dan musik dibuat dengan kode, kecuali pengguna mengirim file sendiri.
