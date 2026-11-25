# _SISTEM — Studio Editing Video

> **Baca ini dulu di setiap sesi baru.** Semua aturan di bawah wajib diikuti oleh asisten (Claude).

## Siapa & di mana

- **Pengguna** bekerja dari tablet **Samsung Galaxy Tab S10 FE** (Android), tanpa komputer.
- **Studio berjalan di server cloud Claude** (Linux). Tablet hanya menjadi "layar": pengguna mengirim bahan lewat chat atau link, lalu menerima .mp4 final lewat chat.
- Folder di tablet pengguna (`Penyimpanan Internal/edit pakai AI/…`) **tidak pernah disentuh**. Struktur di bawah adalah salinannya di cloud.

## Folder pengguna (nama persis, jangan diubah)

| Peran | Nama folder | Lokasi di cloud |
|---|---|---|
| Folder utama | `edit pakai AI` | `/home/user/FileSaya/edit pakai AI` |
| Folder hasil | `Hasil final` | `edit pakai AI/Hasil final` |
| Folder bahan | `Baham edit` (memang ditulis dengan "m") | `edit pakai AI/Baham edit` |
| Folder referensi | `Referensi` | `edit pakai AI/Referensi` |

## ATURAN (wajib)

1. **Jangan membuat ulang, mengganti nama, atau memindahkan** ketiga folder pengguna. Kalau ada yang tidak ditemukan, **berhenti dan tanyakan ke pengguna**. Jangan membuatnya sendiri.
2. **Semua file harus berada di dalam folder utama.** Tidak boleh ada file tools, cache, atau file sementara di luar folder utama (misalnya `~/.cache`, `~/.npm`, `/tmp`). Selalu jalankan tools setelah `source _SISTEM/studio.sh`.
3. Kalau ada tool yang tetap memaksa menyimpan file di luar folder utama, **berhenti dan beri tahu pengguna**. Jangan lanjut diam-diam.
4. Folder hasil, bahan, dan referensi harus **selalu bersih**. Jangan menaruh tools, project, konfigurasi, caption, audio sementara, thumbnail, `.json`, `.srt`, `.part`, `.gitkeep`, atau subfolder apa pun di dalamnya.
5. **`Hasil final`** hanya berisi video **.mp4 yang sudah selesai diedit**. Render dikerjakan di `_SISTEM/kerja`, lalu hanya .mp4 finalnya yang dipindahkan ke `Hasil final`.
6. **`Baham edit`** hanya untuk dibaca. Jangan menambah, mengubah, atau menghapus apa pun. *(Pengecualian: memasukkan file bahan yang dikirim pengguna, hanya atas permintaan pengguna.)*
7. **`Referensi`** hanya berisi .mp4 hasil yt-dlp: satu video menjadi satu file .mp4, tanpa thumbnail, subtitle, atau metadata. File sementara yt-dlp berada di `_SISTEM/kerja/yt-dlp`.
8. Hasil tes instalasi disimpan di `_SISTEM/tes`, **bukan** di `Hasil final`.
9. Folder tools didaftarkan ke PATH pengguna (lewat `~/.bashrc`, yang memanggil `studio.sh`).
10. Pakai tools **portable** (zip/tar atau dibangun dari kode sumber). Jangan pakai installer sistem, `apt`, atau `npm install -g`.
11. Jangan commit video atau tools ke GitHub (batasnya 100 MB per file). Yang di-commit hanya skrip, konfigurasi, project, dan README.

## Isi `_SISTEM`

```
_SISTEM/
├── studio.sh        → WAJIB di-source: PATH + semua lokasi cache/temp
├── pasang-ulang.sh  → memasang ulang semua tools (kalau server cloud diganti)
├── tes-semua.sh     → uji coba semua tools, menulis tes/laporan-tes.txt
├── config/          → konfigurasi tools (yt-dlp, npm, hyperframes)
├── tools/
│   ├── node/        → Node.js portable (bin/node, npm, npx)
│   ├── ffmpeg/      → FFmpeg statis (bin/ffmpeg, ffprobe, ffplay)
│   ├── whisper/     → whisper.cpp: bin/whisper-cli, models/ggml-small.bin, src/
│   └── yt-dlp/      → yt-dlp (biner tunggal)
├── projects/
│   ├── remotion-studio/     → project Remotion (src/Root.tsx, src/TesStudio.tsx)
│   └── hyperframes-studio/  → project HyperFrames (tes-studio/index.html)
├── cache/           → semua cache (lihat tabel di bawah)
├── kerja/           → file sementara: audio ekstrak, caption, render setengah jadi, thumbnail
│   └── tmp/         → TMPDIR untuk semua tools
└── tes/             → hasil tes instalasi + laporan-tes.txt
```

## Lokasi semua cache

Semuanya diatur di `studio.sh`.

| Cache | Lokasi | Diatur lewat |
|---|---|---|
| npm | `_SISTEM/cache/npm` | `npm_config_cache`, `config/npmrc` |
| npm global prefix | `_SISTEM/cache/npm-global` | `npm_config_prefix` |
| Browser render Remotion | `_SISTEM/cache/remotion-browser` | `remotion.config.ts` → `setBrowserExecutable` |
| Browser render HyperFrames | `_SISTEM/cache/hyperframes/chrome` | `HYPERFRAMES_CACHE_DIR` |
| Cache/konfigurasi HyperFrames lainnya | `_SISTEM/cache/hyperframes`, `_SISTEM/config/hyperframes` | `HYPERFRAMES_*` |
| Puppeteer / Playwright | `_SISTEM/cache/puppeteer`, `_SISTEM/cache/playwright` | `PUPPETEER_CACHE_DIR`, `PLAYWRIGHT_BROWSERS_PATH` |
| Node compile cache | `_SISTEM/cache/node-compile-cache` | `NODE_COMPILE_CACHE` |
| yt-dlp | `_SISTEM/cache/yt-dlp` | `config/yt-dlp/config` |
| XDG (cache/data/state umum) | `_SISTEM/cache/xdg-*` | `XDG_*_HOME` |
| File sementara (TMPDIR/TEMP/TMP) | `_SISTEM/kerja/tmp` | `TMPDIR`, `REMOTION_TMPDIR` |
| File sementara yt-dlp | `_SISTEM/kerja/yt-dlp` | `config/yt-dlp/config` |

`studio.sh` juga meng-*unset* `PUPPETEER_EXECUTABLE_PATH`, `CHROME_PATH`, dan `CHROME_BIN`, supaya render tidak memakai Chrome sistem yang berada di luar folder utama.

## Memulai sesi baru

```bash
source "/home/user/FileSaya/edit pakai AI/_SISTEM/studio.sh"
```

Kalau tools hilang (server cloud baru), pasang ulang lalu uji:

```bash
bash "/home/user/FileSaya/edit pakai AI/_SISTEM/pasang-ulang.sh"
```

```bash
bash "/home/user/FileSaya/edit pakai AI/_SISTEM/tes-semua.sh"
```

`pasang-ulang.sh` akan **berhenti** kalau folder pengguna tidak ada. Tanyakan ke pengguna sebelum membuat salinannya di cloud.

## Cara memakai tiap tool

**FFmpeg (potong, gabung, konversi)**
```bash
ffmpeg -ss 00:00:10 -to 00:00:30 -i "$STUDIO_BAHAN/video.mp4" -c:v libx264 -c:a aac "$STUDIO_KERJA/potong.mp4"
ffmpeg -f concat -safe 0 -i "$STUDIO_KERJA/daftar.txt" -c copy "$STUDIO_KERJA/gabung.mp4"
ffmpeg -i "$STUDIO_BAHAN/video.mp4" -vn -ar 16000 -ac 1 "$STUDIO_KERJA/audio.wav"
```

**Whisper (suara menjadi caption)**
```bash
whisper-cli -m "$WHISPER_MODEL" -f "$STUDIO_KERJA/audio.wav" -l id -osrt -of "$STUDIO_KERJA/caption"
```
Pakai `-l id` untuk bahasa Indonesia, `-l auto` untuk deteksi otomatis. Tambahan `-ml 42 -sow` membuat baris caption lebih pendek, cocok untuk Shorts.
Model lain bisa dipasang dengan `bash pasang-ulang.sh medium`, lalu set `WHISPER_MODEL`.

**yt-dlp (unduh video referensi)**
```bash
yt-dlp "LINK_VIDEO"
```
Hasilnya otomatis satu file .mp4 di `Referensi`, dengan file sementara di `_SISTEM/kerja/yt-dlp` (lihat `config/yt-dlp/config`).
⚠️ Saat ini **YouTube diblokir jaringan cloud**. Butuh izin jaringan tambahan (lihat Catatan).

**Remotion (edit video pakai kode, React)**
```bash
cd "$STUDIO/projects/remotion-studio"
npx remotion render src/index.ts TesStudio "$STUDIO_KERJA/render.mp4"
mv "$STUDIO_KERJA/render.mp4" "$STUDIO_HASIL/Judul Video.mp4"   # hanya kalau sudah final
```

**HyperFrames (motion graphics & 3D, HTML + GSAP)**
```bash
cd "$STUDIO/projects/hyperframes-studio"
npx hyperframes init nama-video --example blank --resolution portrait --non-interactive --skip-skills
cd nama-video && npx hyperframes lint && npx hyperframes render -o "$STUDIO_KERJA/render.mp4"
```
GSAP dipakai dari file lokal (`assets/gsap.min.js`, disalin dari `../node_modules/gsap/dist/`), bukan dari CDN.

## Alur kerja standar

1. Pengguna mengirim bahan (lampiran chat atau link Google Drive). Bahan disimpan apa adanya.
2. Semua proses (ekstrak audio, caption, render) dikerjakan di `_SISTEM/kerja`.
3. Hanya .mp4 final yang dipindahkan ke `Hasil final`, lalu dikirim ke pengguna lewat chat.
4. Bersihkan `_SISTEM/kerja` dari file yang tidak dipakai lagi.

## Catatan

- Jaringan cloud (environment "File Saya") sudah diizinkan untuk: remotion.media, storage.googleapis.com, googlechromelabs.github.io, huggingface.co (+ CDN), drive.google.com, drive.usercontent.google.com, fonts.googleapis.com, dan fonts.gstatic.com. GitHub, nodejs.org, npm, dan PyPI sudah bisa diakses dari awal.
- **YouTube** butuh akses jaringan "unrestricted" (server video YouTube memakai banyak nama host `*.googlevideo.com`), dan YouTube juga sering memblokir server cloud. Belum diaktifkan.
- Satu-satunya perubahan di luar folder utama adalah satu baris di `~/.bashrc` yang memanggil `studio.sh` (padanan "daftarkan ke PATH pengguna"). Tidak ada file tools di sana.
