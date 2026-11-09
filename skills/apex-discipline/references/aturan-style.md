# Aturan Style "Apex Discipline"

Ini aturan visual yang disepakati selama revisi. Warna, font, logo, dan handle **diambil dari jawaban pengguna di Tahap 0**; kode warna di bawah hanya contoh dari video pertama.

## Format

- Rasio 9:16. Desain dibuat di kanvas 300×533 px, lalu direkam dengan `deviceScaleFactor: 3.6` → 1080×1920.
- 30 fps, H.264, audio AAC 192 kbps.
- Video full-bleed: tiap scene memenuhi layar. **Tidak ada kartu, kotak, atau kontainer** di sekitar teks atau gambar dalam video.
- "Kartu" hanya dipakai di lembar storyboard/preview: frame 9:16 bersudut sedikit membulat dengan label kecil nomor scene + waktu di kiri atas. Label ini tidak ikut ke video final.

## Warna (peran)

| Peran | Contoh video pertama |
|---|---|
| Warna dasar / latar | Pitch Black `#060606` |
| Warna teks | Sharp White `#F5F5F5` |
| Warna aksen | Metallic Gold — gradasi `#FFE48A → #E8AB1F → #B57F0E`, inti `#E8AB1F` |
| Teks redup | Abu-abu `#5a5a5a` |

- Samakan warna aksen dengan warna logo pengguna (ambil sampel warna dari logo).
- Maksimal satu warna aksen. Jangan memakai warna lain dari referensi (misalnya hijau atau merah).

## Tipografi

- Font judul: sans-serif geometris sangat tebal (weight 900), **UPPERCASE**, jarak baris rapat (≈1.04).
- Font angka besar: versi kondensed tebal.
- Muat font dari Google Fonts, lalu pastikan termuat (`document.fonts.check`) sebelum render.
- Teks utama di tengah horizontal, margin kiri-kanan 14–18 px (ukuran desain).
- Bayangan teks gelap lembut (`0 2px 14px rgba(0,0,0,.9)`) agar terbaca di atas gambar.
- Jaga teks bawah minimal ±30 px dari tepi bawah supaya tidak menimpa handle.

## Penekanan kata

- Hanya 1–2 kata kunci per kalimat yang diberi warna aksen (gradasi emas + glow).
- Kata yang "mati" atau "hilang" (misalnya *dies*, *mood*) berubah abu-abu redup setelah muncul.
- Untuk kalimat yang dibantah, boleh dicoret dengan garis tipis lalu dipudarkan.
- Di animasi, beri tanda aksen **per kata**: `*STAY* *DISCIPLINED.*`, bukan `*STAY DISCIPLINED.*`.

## Glow

- Glow hanya untuk warna aksen: `drop-shadow(0 0 9–10px rgba(aksen,.35–.45))`.
- Sumber cahaya di B-roll (lampu, api, garis grafis) boleh glow aksen; teks putih tidak diberi glow.
- Satu "kilau" (pita cahaya miring) menyapu kata klimaks sekali saja.
- Lingkaran cahaya samar warna aksen di belakang objek utama, sangat tipis.

## Gerakan teks

- Teks muncul **per kata**, mengikuti suara. Kata terakhir sudah muncul saat ±70% klausa diucapkan (jangan terlambat).
- `pop` (umum): muncul 0,16 detik, sedikit naik + mengecil dari 118% ke 100%.
- `slam` (kata kunci/klimaks): dari 190% ke 100% dalam 0,18 detik + guncangan kamera singkat + dentuman.
- `fade` (scene hening): memudar pelan 0,5 detik, tanpa gerakan.
- Teks berganti tepat di ketukan atau di awal klausa berikutnya.

## Caption kecil (gaya karaoke)

- Satu kata yang sedang diucapkan, huruf kecil, tebal, ukuran kecil (12 px desain), di tengah atas (top ±34 px).
- Garis aksen pendek (18×2 px) di bawahnya.
- Caption berbeda dari teks judul: caption mengikuti setiap kata; judul hanya menampilkan inti kalimat.
- Sembunyikan caption saat penutup logo.

## Visual / B-roll

- Faceless, gelap, kontras tinggi, film grain di seluruh video, vignette di tepi.
- Kamera: tiap scene masuk dengan "settle" (105% → 100% dalam 0,25 detik) lalu push-in pelan ±6%.
- Ganti scene cepat (2–5 detik), potong keras di jeda antar kalimat; whoosh pelan di sebagian potongan.
- Gambar arsip/masa lalu: hampir hitam-putih + sepia, lebih gelap, goresan film, sedikit getar dan kedip.
- Gambar siluet dari pengguna: buang latar terang, tempatkan di latar gelap dengan rim light aksen tipis.
- Sisakan satu scene hening (tanpa musik, teks kecil, kamera diam) sebelum klimaks — kontrasnya membuat klimaks terasa.
- Klimaks: potong ke hitam, satu kata raksasa warna aksen, kilatan putih singkat, dentuman paling besar.

## Ikon dan kursor

- Tidak memakai ikon, ilustrasi datar, atau kursor/pointer di video. Gayanya sinematik, bukan antarmuka aplikasi.
- Jangan menyalin ikon, maskot, atau ilustrasi dari video referensi.
- Ikon hanya ditambahkan jika pengguna memintanya.

## Logo dan handle

- Logo pengguna dibuat PNG transparan (`scripts/logo_transparan.py`).
- Watermark: logo kecil (30 px desain, opasitas 55%) di kanan atas semua scene kecuali penutup.
- Handle: teks kecil (9 px desain, putih 50%) di tengah bawah semua scene kecuali penutup.
- Penutup: setelah tagline, layar gelap → logo besar di tengah dengan glow aksen, handle putih tebal di bawahnya, tahan ±2–3 detik, lalu fade ke hitam.

## Audio

- Narasi: suara pria berat, sinematik (dari pengguna atau ElevenLabs).
- Musik: instrumental gelap tanpa vokal, mengecil otomatis saat narasi (sidechain), naik di klimaks dan ajakan akhir, hening di scene hening.
- SFX mengikuti kata kunci: sub-boom di pembuka/klimaks/penutup, impact di kata yang dihentak, whoosh di potongan, riser sebelum klimaks, efek realistis sesuai visual.
- Loudness akhir −14 LUFS, puncak −1,5 dB.
