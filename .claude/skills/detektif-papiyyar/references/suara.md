# Suara Narasi: ElevenLabs "Denas"

Narasi Papiyyar dibuat dengan ElevenLabs, bukan rekaman sendiri. Paket pengguna: **Starter** (kredit terbatas, sekitar 30 ribu per bulan, cek di akun). Karena itu aturan hemat di bawah **wajib**.

## Data suara

| Hal | Nilai |
|---|---|
| Nama | Denas - high class catchy story teller |
| voice_id | `arwfiAiEfIHHZCwcYYx2` |
| Bahasa | Indonesia (`id`) |
| Kecepatan baca | sekitar **1,85 kata per detik** termasuk jeda antar scene (diukur dari episode lama 117 detik) |

Kalau voice_id ini gagal, cari ulang dengan `creative_list_voices` (search "Denas"). Jangan menebak voice_id dari ingatan.

## Aturan hemat kredit (WAJIB)

1. Suara baru dibuat **setelah naskah disetujui** (Cicip 1) **dan** preview gambar disetujui (Cicip 2). Tidak ada coba-coba suara.
2. Sebelum generate, laporkan perkiraan kredit: jumlah karakter seluruh teks VO (1 karakter ≈ 1 kredit). Contoh: "Perkiraan 820 kredit untuk 13 scene."
3. **Satu klip per scene, satu take.** Kalau tool memberi beberapa variasi, ambil variasi pertama kecuali pengguna memilih lain. Jangan menjalankan ulang generate untuk "mencoba lagi".
4. Revisi suara **hanya** untuk scene yang disebut pengguna.
5. Efek suara dan musik tetap dibuat dengan kode (`audio_template.py`), bukan ElevenLabs.
6. Setelah selesai, laporkan kredit yang benar-benar terpakai dan catat di `episode/<folder>/status.md`.

## Cara membuat

1. Dari storyboard yang disetujui, ambil teks VO tiap scene **persis**.
2. Boleh menambah audio tag di depan teks sesuai emosi, secukupnya: `[low, mysterious]`, `[sarcastic]`, `[whispering]`, `[shouting, surprised]`. Momen Papiyyar biasanya `[sarcastic]`.
3. Buat satu flow ElevenLabs per episode (`creative_create_flow`), lalu satu generate per scene dengan voice_id Denas.
4. Unduh tiap klip ke folder kerja `vo/` dengan nama urut `01.mp3`, `02.mp3`, dan seterusnya.
5. Gabungkan dan hitung waktu:

   ```bash
   python3 <skill>/scripts/gabung_vo.py vo 0.35 > timing.json
   ```

   - Menghasilkan `narasi.wav` (di folder induk `vo/`) dan `timing.json`.
   - `bounds` di `timing.json` = awal tiap scene, langsung dipakai untuk `const B=[...]` di `anim.html`.
   - Untuk waktu kata di dalam scene (cap, coretan, zoom), boleh tetap memakai `align_vo.py narasi.wav scenes.json`.

## Gerbang durasi 60 detik

Setelah `gabung_vo.py`, baca `total`:

- **55–65 detik:** lanjut render.
- **Kurang dari 55 detik:** tambah jeda (argumen kedua, maksimal 0,8) terutama sebelum Momen Papiyyar dan Cliffhanger.
- **Lebih dari 65 detik:** kurangi jeda (minimal 0,2). Kalau masih lebih, ringkas kalimat di Eksplorasi Kasus, minta persetujuan pengguna, lalu generate ulang **hanya** scene itu. Jangan mempercepat suara lebih dari 1,1×.
- Laporkan durasi akhir ke pengguna sebelum render.
