# Produksi: dari Narasi sampai Video Jadi

Butuh: Python 3 dengan numpy dan Pillow, Node dengan Playwright (Chromium), dan ffmpeg. Semua skrip ada di `scripts/`. Kerjakan di folder sementara (scratchpad), bukan di repositori.

## 0. Siapkan folder kerja

```bash
mkdir -p kerja && cd kerja
python3 <skill>/scripts/make_textures.py .
cp <skill>/assets/logo-papiyyar.jpg .
cp <skill>/scripts/anim_template.html anim.html
```

## 1. Cek narasi

```bash
ffprobe -v error -show_entries format=duration -of csv=p=0 narasi.mp3
```

Kalau durasinya jauh dari 60 detik, beri tahu pengguna, tapi tetap ikuti panjang narasinya.

## 2. Samakan waktu scene dengan narasi

1. Tulis `scenes.json`, yaitu daftar teks narasi per scene **persis** sesuai naskah dan storyboard.
2. Jalankan skrip penyamaan waktu:

   ```bash
   python3 <skill>/scripts/align_vo.py narasi.mp3 scenes.json > timing.json
   ```

3. Baca hasilnya:
   - `cost` di bawah sekitar 5 berarti cocok.
   - `bounds` adalah awal tiap scene. Masukkan ke `const B=[...]` di `anim.html`.
   - `phrases[].start` adalah waktu tiap potongan kalimat. Pakai untuk memunculkan elemen tepat saat kata diucapkan, misalnya cap, coretan, atau zoom.

## 3. Tulis animasi scene

Buka `anim.html`. Bagian `const S=[]` berisi **contoh** scene dari episode Rumah Pintar. Ganti dengan scene dari storyboard baru, satu `S.push(()=>...)` per scene.

- **Waktu:** semua angka waktu adalah detik absolut video, bukan detik di dalam scene.
- **Elemen muncul:** `A(svg, waktu, jenis)`. Jenisnya `pop`, `fade`, `up`, `down`, `left`, `right`, atau `stamp`.
- **Caption:** `caption('teks awal', 'kata kunci.', '', terang, waktuMulai)`. Maksimal sekitar 28 karakter.
- **Judul:** `head('JUDUL', waktu, y, ukuran, warna)`.
- **Detektif:** `D([[waktu,'pose'],...], x, y, skala)`. Posenya `idle`, `mag`, `shrug`, `palm`, `point`, `squint`, `glasses`, atau `key`.
- **Contoh scene yang bisa ditiru:**
  - Momen Papiyyar: lihat scene ke-11 di template (layar merah, sayatan, sentakan zoom, efek patah-patah, getar).
  - Penutup: lihat scene ke-13 (kotak komentar, logo stiker, IKUTI @PAPIYYAR, KASUS #N SEGERA).
  - Elemen bertahap: lihat struk log, daftar perangkat, dan grafik jam.

## 4. Frame uji (wajib dilihat)

```bash
node <skill>/scripts/test_frames.js anim.html 1.5 5 12 20 ...
```

Pilih satu waktu di setiap scene, di saat elemen sudah lengkap. **Lihat `test_sheet.jpg`** dan perbaiki teks terpotong, tumpukan elemen, atau ikon yang hilang. Ulangi sampai bersih.

**Untuk tahap gambar storyboard** (sebelum ada narasi), pakai perkiraan waktu dari tabel storyboard, render satu frame per scene, lalu susun enam per lembar dengan judul "Scene N · waktu".

## 5. Render penuh (4 proses paralel, sekitar 1 menit per 10 detik video)

```bash
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 narasi.mp3)
(for i in 0 1 2 3; do node <skill>/scripts/render.js anim.html $DUR $i 4 & done; wait; echo ALLDONE) > render.log 2>&1 &
```

Jalankan di latar belakang. Tunggu sampai `render.log` berisi `ALLDONE`, atau sampai muncul `ERR`.

## 6. Efek suara dan musik

1. Salin `audio_template.py`, lalu ubah bagian **CUES**, yaitu daftar `(waktu, efek)`. Ambil waktunya dari `timing.json` dan kolom SFX di storyboard.
2. Ubah juga bagian **MUSIK**:
   - musik tegang mulai dari twist,
   - musik mati saat momen Papiyyar dan saat jeda dramatis,
   - musik penutup di bagian akhir.
3. Jalankan:

   ```bash
   python3 audio_template.py $DUR
   ```

## 7. Gabungkan suara

Musik otomatis mengecil saat narasi berbicara. Perintah ini wajib memakai `asplit`, karena satu label tidak boleh dipakai dua kali.

```bash
ffmpeg -v error -y -i narasi.mp3 -i sfx.wav -i music.wav -filter_complex "[0:a]aresample=44100,aformat=channel_layouts=mono,asplit[vo1][vo2];[1:a]volume=0.32[sf];[2:a]volume=0.45[mu];[mu][vo2]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[mud];[vo1][sf][mud]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]" -map "[out]" -ar 44100 -ac 2 mix.wav
```

## 8. Gabungkan video dan audio, lalu cek

```bash
printf "file 'part0.mp4'\nfile 'part1.mp4'\nfile 'part2.mp4'\nfile 'part3.mp4'\n" > list.txt
ffmpeg -v error -y -f concat -safe 0 -i list.txt -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart HASIL.mp4
ffprobe -v error -show_entries format=duration,size:stream=width,height -of compact HASIL.mp4
```

Ambil beberapa frame dari video jadi untuk dicek, terutama momen Papiyyar:

```bash
ffmpeg -i HASIL.mp4 -vf "select='eq(n\,FRAME1)+eq(n\,FRAME2)',scale=270:-1,tile=5x1" -frames:v 1 -vsync 0 cek.jpg
```

## 9. Simpan dan kirim

- Kalau sedang di repositori, salin video ke folder kerja dengan nama `PAPIYYAR_<Judul>_<NoEpisode>_<Funnel>.mp4`, lalu commit dan push ke branch kerja. Batas GitHub 100 MiB per file.
- Kirim video ke pengguna.
- Laporkan durasi, ringkasan isi, dan batasannya: kecocokan suara tidak didengar langsung, dan efek suara serta musik dibuat dengan kode. Lalu tanyakan langkah berikutnya sesuai urutan funnel.
