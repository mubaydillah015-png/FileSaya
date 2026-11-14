# Aset yang Disiapkan Pengguna

Claude tidak bisa mengunduh dari Instagram, TikTok, YouTube, atau situs berita. Jadi foto dan klip asli disiapkan pengguna. Tugas Claude: memberi daftar yang **spesifik** (apa isinya, untuk scene mana, kode filenya), lalu memakai file itu apa adanya.

## Jenis aset dan kodenya

| Kode | Aset | Untuk bagian | Yang dicari | Format |
|---|---|---|---|---|
| `THUMB` | Foto tokoh utama untuk thumbnail | Hook | Wajah jelas, menghadap kamera atau tiga perempat, resolusi tinggi. Ekspresi apa saja, tidak perlu diedit. | JPG atau PNG, minimal 1080 px di sisi pendek. PNG tanpa latar lebih baik. |
| `FOTO-n` | Foto kejadian | TKP, Barang Bukti | Momen kunci berita, misalnya foto saat kejadian atau foto tokoh di lokasi | JPG atau PNG |
| `KLIP-n` | Potongan video berita | TKP | 3–6 detik bagian paling penting saja. Watermark media boleh terlihat, karena menjadi kredit sumber. | MP4, rasio bebas |
| `SS-n` | Screenshot judul artikel atau postingan resmi | TKP, Barang Bukti | Judul berita, nama media, dan tanggal terlihat | PNG, potong rapi di bagian yang penting |
| `SAKSI-n` | Screenshot komentar netizen | Barang Bukti | 2–4 komentar paling tajam atau paling banyak disukai. Sertakan jumlah suka bila ada. | PNG. Atau cukup salin teks komentarnya, nanti digambar ulang. |
| `DATA-n` | Data atau angka | Barang Bukti | Angka resmi, grafik, atau tabel dari sumber berita | Screenshot atau tulis angkanya saja |
| `SUMBER` | Daftar sumber | Semua | Nama media dan tanggal setiap aset | Teks |

## Cara Claude menyusun daftar

1. Setelah storyboard disetujui, buat tabel aset pengguna: `Kode | Aset | Dipakai di scene | Isi yang dicari | Format`.
2. Tulis **isi yang dicari dengan konkret**, misalnya "Foto anggota DPRD memegang foto terbalik, dari Pikiran Rakyat", bukan sekadar "foto kejadian".
3. Tandai mana yang **wajib** dan mana yang **opsional** (bisa diganti ilustrasi kertas).
4. Minta pengguna memberi nama file sesuai kode (`FOTO-1.jpg`, `KLIP-1.mp4`) supaya tidak tertukar.
5. Untuk komentar netizen, samarkan sebagian nama akun di layar (`@kevin***`) kecuali akun publik atau resmi.

## Cara Claude mengolah aset

- **Foto:** potong (crop) ke bagian penting, tempel di dalam bingkai foto TKP. Jangan mengubah wajah.
- **Klip video:** ambil frame terbaik untuk storyboard. Saat render, klip bisa diputar di dalam bingkai foto TKP (lihat `produksi.md`), atau cukup diambil satu atau beberapa frame diam.
- **Screenshot:** tempel sebagai kertas bukti dengan selotip, beri lingkaran merah pada bagian kunci.
- **Komentar:** digambar ulang sebagai kartu saksi supaya rapi dan tetap terbaca di layar kecil.
- **Thumbnail:** kalau PNG belum tanpa latar, latarnya bisa dihapus dengan alat lain oleh pengguna, atau foto ditempel utuh dengan tepi robek.

## Kalau aset belum ada

Pakai placeholder ilustrasi kertas: siluet tokoh, kotak bertuliskan kode aset, atau ikon. Beri tahu pengguna scene mana yang masih placeholder sebelum render final.
