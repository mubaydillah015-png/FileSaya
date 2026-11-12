# Folder Episode

Satu folder per video: `NNN-<Funnel>-<judul-singkat>/` (contoh `001-ToFu-wifi-tetangga/`).
Salin `_template/status.md` saat memulai episode baru.

| File | Dibuat di tahap | Isi |
|---|---|---|
| `status.md` | Awal | Status Cicip 1–4, kredit ElevenLabs, jadwal tayang |
| `naskah.md` | Cicip 1 | Naskah final, jumlah kata, sumber fakta |
| `storyboard.md` | Cicip 2 | Tabel storyboard + daftar aset |
| `preview/` | Cicip 2 | Lembar gambar storyboard (6 scene per lembar) |
| `scenes.json`, `timing.json`, `anim.html` | Render | Bahan render, supaya episode bisa dirender ulang |
| `vo/` | Render | Klip narasi Denas per scene (`01.mp3`, ...) |
| `PAPIYYAR_<Judul>_<NNN>_<Funnel>.mp4` | Cicip 3 | Video final (< 100 MiB) |
| `subtitle.srt` | Cicip 3 | Subtitle |
| `distribusi.json` | Cicip 3/4 | Caption, hashtag, jadwal per platform |

Pekerjaan sementara (frame, part video, wav mentah) tetap di scratchpad, jangan di-commit.
