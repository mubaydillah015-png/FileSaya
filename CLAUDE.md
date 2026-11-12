# Papiyyar Studio: SOP Pabrik Konten

Repositori ini adalah "dapur" produksi video pendek akun **@PAPIYYAR**. Claude Code adalah kepala dapur, pengguna adalah pemilik yang mencicipi. Semua jawaban ke pengguna memakai bahasa Indonesia sederhana.

## Pembagian peran

| Peran | Di sistem | Lokasi |
|---|---|---|
| Buku resep | Skill `detektif-papiyyar` (persona, naskah, visual, render) | `.claude/skills/detektif-papiyyar/` |
| Papan menu | Produk afiliasi, hashtag, jam posting | `config/` |
| Pengisi suara | ElevenLabs suara "Denas" | `references/suara.md` di skill |
| Lemari arsip | Satu folder per episode | `episode/` |
| Kurir | Buffer/Metricool (belum dipilih), video lewat Google Drive | `config/distribusi.json` |

Standar tetap: **video 9:16, 60 detik (55–65), naskah 105–115 kata, suara ElevenLabs Denas.** File `arsip/` hanya untuk referensi lama (versi 105–120 detik), **jangan dipakai** sebagai aturan.

## Alur produksi

Pengguna memulai sesi dengan perintah seperti: `detektif-papiyyar: batch minggu ini, 3 video` atau `detektif-papiyyar: kasus <topik>, ToFu`.

Produksi **dicicil 3–4 video per sesi**, lalu dijadwalkan untuk seminggu. Kerjakan tiap tahap untuk semua video dalam batch sekaligus, supaya pengguna cukup mencicipi sekali per tahap.

```
0. Rencana batch   ➔ usulkan topik + funnel tiap video (ikuti urutan seri ToFu ➔ MoFu ➔ BoFu
                     dan jadwal_mingguan di config/distribusi.json). Tunggu konfirmasi.
1. Naskah          ➔ 🧑‍💼 CICIP 1: naskah semua video disetujui
2. Storyboard + gambar preview per scene ➔ 🧑‍💼 CICIP 2: visual disetujui
3. Suara Denas (laporkan perkiraan kredit dulu) ➔ gerbang durasi ➔ render + musik + SFX
                   ➔ 🧑‍💼 CICIP 3: video final disetujui
4. Paket distribusi per platform (caption, judul, hashtag, jam tayang)
     ├─ ToFu       ➔ langsung siap jadwal
     └─ MoFu/BoFu  ➔ 🧑‍💼 CICIP 4: caption + link afiliasi dicek pengguna
5. Serah ke kurir  ➔ (fase distribusi belum aktif: untuk sementara serahkan paket
                     siap salin + file video ke pengguna)
```

Aturan titik review:
- Jangan melompati Cicip. Kalau pengguna bilang "langsung saja", ikuti, tapi tetap tunjukkan hasilnya.
- Revisi **hanya** bagian/scene/video yang disebut pengguna.
- Kalau perlu titik review tambahan, **tanyakan dulu** ke pengguna.

## Aturan biaya

- **ElevenLabs (paket Starter, kredit terbatas):** hanya untuk narasi, satu take per scene, setelah Cicip 1 dan 2. Selalu sebutkan perkiraan kredit sebelum generate dan kredit terpakai sesudahnya. Detail di `references/suara.md`.
- **Claude Pro (batas pemakaian):** render 4 proses paralel, jangan render ulang seluruh video kalau hanya satu scene berubah; cek frame uji dulu.
- Musik dan SFX dibuat dengan kode.

## Produk afiliasi

- Hanya pakai produk dari `config/produk-afiliasi.json` yang `"aktif": true`.
- Kalau MoFu/BoFu dan tidak ada produk aktif yang cocok, **tanyakan ke pengguna**. Jangan mengarang merek.
- Link afiliasi hanya muncul di caption/deskripsi, tidak dibacakan di narasi, dan selalu lewat Cicip 4.

## Paket distribusi

Ikuti `config/distribusi.json` (jumlah hashtag, gaya caption, jam tayang WIB, aturan link per platform). Simpan sebagai `episode/<folder>/distribusi.json`:

```json
{
  "episode": "003", "funnel": "ToFu", "judul": "...",
  "jadwal_wib": "2026-11-17T19:00",
  "video_file": "PAPIYYAR_<Judul>_003_ToFu.mp4",
  "platform": {
    "tiktok":          {"caption": "...", "hashtag": ["#Papiyyar", "..."]},
    "instagram_reels": {"caption": "...", "hashtag": []},
    "youtube_shorts":  {"judul": "...", "deskripsi": "...", "hashtag": []},
    "facebook_reels":  {"caption": "...", "hashtag": []},
    "threads":         {"teks": "...", "tag": "..."},
    "wa_channel":      {"teks": "..."}
  },
  "link_afiliasi": null,
  "status_review": "menunggu Cicip 4 | disetujui"
}
```

## Folder episode

Satu folder per video: `episode/<NNN>-<Funnel>-<judul-singkat>/`, contoh `episode/001-ToFu-wifi-tetangga/`. Isi dan aturan lengkap ada di `episode/README.md`. Kerjakan render di scratchpad, lalu salin hanya hasil akhir ke folder episode.

## Git

- Commit setelah setiap Cicip disetujui, dengan pesan jelas (contoh: `Ep 003: naskah disetujui`).
- Video final boleh di-commit kalau di bawah 100 MiB (104.857.600 byte).
- Jangan menyimpan password, token, atau API key di repo.
