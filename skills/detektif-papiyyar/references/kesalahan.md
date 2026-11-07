# Kesalahan yang Pernah Terjadi dan Cara Menghindarinya

Baca file ini sebelum produksi. Setiap poin pernah benar-benar terjadi.

## Naskah dan durasi

1. **Naskah kepanjangan, video jadi 2:44 padahal targetnya 2:00.** Naskah 360 kata dibaca sekitar 2,2 kata per detik.
   **Cara menghindari:** patuhi batas sekitar 130 kata untuk 60 detik, hitung jumlah kata sebelum mengirim naskah, dan sebutkan perkiraan durasinya ke pengguna.
2. **Produk afiliasi tidak pernah disebut, tapi brief bilang "produk di atas".**
   **Cara menghindari:** jangan mengarang. Untuk MoFu dan BoFu, tanyakan produknya. Kalau pengguna minta lanjut tanpa produk, pakai jenis alat tanpa merek.

## Waktu gambar dan suara

3. **Waktu scene dihitung dari proporsi jumlah huruf, hasilnya meleset sampai 4 detik.**
   **Cara menghindari:** pakai `scripts/align_vo.py`. Skrip ini mencocokkan potongan kalimat dengan jeda di rekaman. Skor (cost) di bawah sekitar 5 berarti cocok. Kalau skornya tinggi, cek apakah naskah di skrip sama persis dengan yang dibacakan.
4. **Model transkripsi (Whisper atau faster-whisper) tidak bisa diunduh** karena jaringan memblokir HuggingFace.
   **Cara menghindari:** jangan buang waktu mencoba. Langsung pakai `align_vo.py`, yang tidak butuh internet.
5. **Claude tidak bisa mendengarkan audio.**
   **Cara menghindari:** katakan terus terang. Minta pengguna mengecek titik penting, misalnya momen Papiyyar dan zoom.

## Tata letak dan visual

6. **Caption terpotong di tepi kanan** karena lebih dari sekitar 30 karakter.
   **Cara menghindari:** caption di layar maksimal sekitar 28 karakter dan boleh lebih pendek dari narasi. Narasi tetap utuh, yang dipendekkan hanya teks layarnya.
7. **Teks "50 RIBU vs BELASAN JUTA" tertutup garis sayatan** di momen Papiyyar.
   **Cara menghindari:** teks di atas latar merah atau sayatan selalu diberi kotak gelap `#23262C` di belakangnya.
8. **Zoom ke satu objek ikut menggeser seluruh grup**, sehingga struk log menutupi judul.
   **Cara menghindari:** zoom hanya objek yang dituju, jangan grup yang berisi banyak elemen.
9. **Elemen saling tumpuk**, misalnya ikon kamera di atas angka "0", atau judul koran di atas label.
   **Cara menghindari:** setelah menulis scene, selalu render frame uji di beberapa titik waktu, susun jadi satu lembar, lalu **lihat gambarnya** sebelum render penuh.
10. **Ikon tidak muncul** karena bentuk SVG salah, misalnya ikon bulan.
    **Cara menghindari:** frame uji juga menangkap masalah ini. Pakai bentuk sederhana, misalnya bulan dari dua lingkaran.
11. **Tekstur kertas terlalu bernoda, mirip loreng.**
    **Cara menghindari:** pakai `make_textures.py` dengan noda rendah. Nilainya sudah benar di skrip.
12. **Teks melebar keluar dari kotak**, misalnya pertanyaan di kotak komentar.
    **Cara menghindari:** lebarkan kotak atau kecilkan huruf, lalu cek di frame uji.

## Audio

13. **Efek suara pecah atau terlalu keras** karena puncaknya hampir tiga kali batas.
    **Cara menghindari:** normalisasi lalu lunakkan puncaknya. Ini sudah ada di `audio_template.py`.
14. **Error numpy "operands could not be broadcast"** saat menjumlahkan dua suara yang panjangnya berbeda.
    **Cara menghindari:** pakai fungsi `mix()` di template.
15. **Error ffmpeg "Stream specifier matches no streams"** karena label yang sama dipakai dua kali.
    **Cara menghindari:** gandakan dulu dengan `asplit`. Perintahnya ada di `produksi.md`.
16. **Kredit ElevenLabs hampir terpakai untuk efek suara.**
    **Cara menghindari:** buat efek suara dan musik dengan kode. Pakai ElevenLabs hanya kalau pengguna setuju.

## Repositori dan pengiriman

17. **Salah bilang video sekitar 100 MB tidak bisa di-push.** Batas GitHub adalah 100 **MiB** per file, yaitu 104.857.600 byte, jadi file 96,9 MiB masih bisa.
    **Cara menghindari:** cek ukuran dalam byte sebelum menyimpulkan. Kalau di atas batas, turunkan kualitas (CRF lebih tinggi) atau pakai Git LFS.
18. **Hook pengingat meminta commit karena ada file yang belum disimpan.**
    **Cara menghindari:** setelah video jadi, commit dan push ke branch kerja. Nama file mengikuti pola `PAPIYYAR_<Judul>_<NoEpisode>_<Funnel>.mp4`.

## Etika referensi

19. **Video referensi memakai maskot dan desain milik orang lain.**
    **Cara menghindari:** ambil gayanya saja, seperti font, warna, ritme, dan cara caption tampil. Tokoh detektif, ikon, dan isi dibuat sendiri.
