# Panduan Pakai Pabrik Papiyyar

Cara menjalankan produksi video Papiyyar dari Tab S10 FE (atau HP/laptop).

## 1. Memulai sesi produksi

1. Buka **aplikasi Claude** (atau claude.ai/code di browser) → menu **Code**.
2. Pilih repo **mubaydillah015-png/FileSaya**.
3. Ketik perintah. Contoh:

| Kebutuhan | Ketik |
|---|---|
| Produksi mingguan (disarankan) | `detektif-papiyyar: batch minggu ini, 3 video` |
| Satu video dengan topik sendiri | `detektif-papiyyar: kasus lowongan kerja palsu, ToFu` |
| Lanjutan seri | `detektif-papiyyar: lanjut MoFu dari episode 001` |
| Minta ide | `detektif-papiyyar: usulkan 5 topik kasus untuk seri baru` |

Claude otomatis membaca `CLAUDE.md` (SOP) dan skill `detektif-papiyyar` (resep), jadi aturan tidak perlu diulang.

## 2. Mencicipi (review)

Claude berhenti di setiap Cicip dan menunggu jawaban Anda.

| Cicip | Yang Anda lihat | Contoh jawaban |
|---|---|---|
| 1 · Naskah | Naskah tiap video + jumlah kata | `oke semua` · `video 2 hook-nya kurang nendang` |
| 2 · Preview | Lembar gambar per scene | `oke` · `revisi video 1 scene 4, detektifnya di kiri` |
| 3 · Video final | File video + durasi | `oke` · `momen Papiyyar video 3 kurang dramatis` |
| 4 · Caption afiliasi (MoFu/BoFu) | Caption + link per platform | `oke` · `ganti produk ke Review CV by AI` |

Tips:
- Sebut **nomor video dan nomor scene** saat revisi. Claude hanya mengubah bagian yang disebut.
- Sebelum membuat suara, Claude menyebut **perkiraan kredit ElevenLabs**. Jawab `oke` kalau setuju.
- Ketik `langsung saja` kalau ingin melewati pertanyaan dan memakai pilihan default.

## 3. Hasil tersimpan di mana

- Tiap video punya folder sendiri di `episode/`, contoh `episode/001-ToFu-lowongan-palsu/`.
- Isinya: naskah, storyboard, preview, video final, subtitle, dan `distribusi.json` (caption, hashtag, jadwal per platform).
- Status tiap episode bisa dicek di `status.md` di folder itu.

Selama fase distribusi otomatis belum aktif, Claude memberikan **paket siap salin** per platform dan file video untuk Anda unggah atau jadwalkan sendiri.

## 4. Mengubah pengaturan

Cara paling mudah: minta saja ke Claude, misalnya `tambahkan produk Shopee: <nama> <link>` atau `ganti jam posting TikTok jadi 18:00`.

| Yang diubah | File |
|---|---|
| Produk afiliasi dan link | `config/produk-afiliasi.json` |
| Hashtag, gaya caption, jam posting, jadwal funnel mingguan | `config/distribusi.json` |
| Alur kerja, titik review, aturan biaya | `CLAUDE.md` |
| Persona, naskah, visual, render | `.claude/skills/detektif-papiyyar/` |

## 5. Hemat kuota

- **Cicil 3–4 video per sesi**, supaya cukup sekali mencicipi per tahap.
- Revisi sebanyak mungkin di **Cicip 1 dan 2**. Revisi di tahap ini gratis kredit ElevenLabs, sedangkan revisi setelah suara dibuat memakan kredit.
- Kalau kuota Claude Pro habis di tengah batch, lanjutkan nanti dengan `lanjutkan batch yang tadi`. Status setiap episode tersimpan di `status.md`.
