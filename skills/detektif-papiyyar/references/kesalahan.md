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

6. **Skor `align_vo.py` bagus (cost 2,0) tapi scene 2–9 tetap meleset 1–2,5 detik** di episode QRIS #2. Penyebabnya kalimat pendek dan ekspresif di awal ("Damn broo!!!"), sehingga skrip salah memasangkan potongan kalimat ke potongan suara.
   **Cara menghindari:** jangan percaya skor saja. Setelah `align_vo.py`, jalankan `silencedetect` (`-25dB`, `d=0.1`), lalu cocokkan manual setiap kalimat dengan potongan suara di antara jeda: panjang kalimat harus masuk akal (sekitar 0,15 detik per suku kata), dan jeda kecil harus jatuh di koma. Tampilkan tabel waktu ke pengguna dan **jangan render sebelum pengguna bilang oke**.

## Tata letak dan visual

7. **Caption terpotong di tepi kanan** karena lebih dari sekitar 30 karakter.
   **Cara menghindari:** caption di layar maksimal sekitar 28 karakter dan boleh lebih pendek dari narasi. Narasi tetap utuh, yang dipendekkan hanya teks layarnya.
8. **Teks "50 RIBU vs BELASAN JUTA" tertutup garis sayatan** di momen Papiyyar.
   **Cara menghindari:** teks di atas latar merah atau sayatan selalu diberi kotak gelap `#23262C` di belakangnya.
9. **Zoom ke satu objek ikut menggeser seluruh grup**, sehingga struk log menutupi judul.
   **Cara menghindari:** zoom hanya objek yang dituju, jangan grup yang berisi banyak elemen.
10. **Elemen saling tumpuk**, misalnya ikon kamera di atas angka "0", atau judul koran di atas label.
   **Cara menghindari:** setelah menulis scene, selalu render frame uji di beberapa titik waktu, susun jadi satu lembar, lalu **lihat gambarnya** sebelum render penuh.
11. **Ikon tidak muncul** karena bentuk SVG salah, misalnya ikon bulan.
    **Cara menghindari:** frame uji juga menangkap masalah ini. Pakai bentuk sederhana, misalnya bulan dari dua lingkaran.
12. **Tekstur kertas terlalu bernoda, mirip loreng.**
    **Cara menghindari:** pakai `make_textures.py` dengan noda rendah. Nilainya sudah benar di skrip.
13. **Teks melebar keluar dari kotak**, misalnya pertanyaan di kotak komentar.
    **Cara menghindari:** lebarkan kotak atau kecilkan huruf, lalu cek di frame uji.

## Berita, fakta, dan aset asli

14. **Gaya referensi (Issei) kadang menyebut tuduhan yang belum terbukti** seolah fakta, misalnya "mata-mata".
    **Cara menghindari:** klaim yang belum terbukti wajib memakai "diduga" di narasi dan cap DUGAAN di layar. Vonis ditujukan ke ironi atau situasi, bukan menuduh orang berbuat kejahatan.
15. **Mencoba mengunduh dari Instagram, TikTok, atau situs berita**, dan gagal karena jaringan sesi diblokir.
    **Cara menghindari:** jangan buang waktu. Minta pengguna mengirim file atau ringkasan beritanya, dan pakai placeholder sampai aset datang.
16. **Cap DUGAAN menutupi wajah di foto TKP.**
    **Cara menghindari:** atur `capPos` di `fotoTKP()` ke bagian foto yang kosong, lalu cek di frame uji.
17. **Foto atau frame klip kosong di hasil render**, karena file belum sempat termuat.
    **Cara menghindari:** perkecil foto (lebar sekitar 1080 px), pecah klip menjadi frame JPG, dan selalu cek frame uji di scene yang memakai foto.
18. **Mengedit wajah tokoh asli supaya terlihat menghina** (meniru thumbnail referensi).
    **Cara menghindari:** foto tokoh dipakai apa adanya. Dramanya dari teks, coretan, dan komposisi.
19. **Rumus naskah diubah atau bagiannya tertukar.**
    **Cara menghindari:** lima bagian rumus (Hook, TKP, Barang Bukti, Papiyyar, Vonis dan CTA) wajib dan urutannya tetap. Hitung kata per bagian sebelum mengirim.
20. **Merek atau link afiliasi ditulis tanpa konfirmasi.**
    **Cara menghindari:** tanyakan produknya dan tunjukkan kalimat pengarahnya ke pengguna sebelum naskah final.

21. **Tulisan "IKUTI @PAPIYYAR" terbaca "KUTI"** karena serpihan kertas di penutup digambar di atas tombol.
    **Cara menghindari:** serpihan selalu digambar paling awal (di belakang), tombol minimal lebar 196. Cek penutup dengan close-up sebelum render.

## Audio

22. **Efek suara pecah atau terlalu keras** karena puncaknya hampir tiga kali batas.
    **Cara menghindari:** normalisasi lalu lunakkan puncaknya. Ini sudah ada di `audio_template.py`.
23. **Error numpy "operands could not be broadcast"** saat menjumlahkan dua suara yang panjangnya berbeda.
    **Cara menghindari:** pakai fungsi `mix()` di template.
24. **Error ffmpeg "Stream specifier matches no streams"** karena label yang sama dipakai dua kali.
    **Cara menghindari:** gandakan dulu dengan `asplit`. Perintahnya ada di `produksi.md`.
25. **Kredit ElevenLabs hampir terpakai untuk efek suara.**
    **Cara menghindari:** buat efek suara dan musik dengan kode. Pakai ElevenLabs hanya kalau pengguna setuju.

## Repositori dan pengiriman

26. **Salah bilang video sekitar 100 MB tidak bisa di-push.** Batas GitHub adalah 100 **MiB** per file, yaitu 104.857.600 byte, jadi file 96,9 MiB masih bisa.
    **Cara menghindari:** cek ukuran dalam byte sebelum menyimpulkan. Kalau di atas batas, turunkan kualitas (CRF lebih tinggi) atau pakai Git LFS.
27. **Hook pengingat meminta commit karena ada file yang belum disimpan.**
    **Cara menghindari:** setelah video jadi, commit dan push ke branch kerja. Nama file mengikuti pola `PAPIYYAR_<Judul>_<NoEpisode>_<Funnel>.mp4`.

## Etika referensi

28. **Video referensi memakai maskot dan desain milik orang lain.**
    **Cara menghindari:** ambil gayanya saja, seperti font, warna, ritme, dan cara caption tampil. Tokoh detektif, ikon, dan isi dibuat sendiri.
