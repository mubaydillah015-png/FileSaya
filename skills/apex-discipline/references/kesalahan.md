# Kesalahan yang Pernah Terjadi dan Cara Menghindarinya

| Kesalahan | Akibat | Cara menghindari |
|---|---|---|
| Durasi direncanakan 45 detik, tapi file suara 59,8 detik | Semua waktu scene meleset; video jadi 63,5 detik | Ukur file suara dulu (`cari_jeda.sh`) sebelum menyusun waktu. Beri tahu pengguna jika lewat batas platform (TikTok/Reels 60 detik). |
| Model transkripsi (Whisper/Vosk) tidak bisa diunduh karena jaringan diblokir | Tidak ada timestamp per kata | Pakai deteksi jeda (`silencedetect`), cocokkan potongan suara dengan klausa naskah. Caption per kata dibagi rata per panjang kata. Sampaikan bahwa caption bisa meleset sedikit. |
| Penanda aksen untuk beberapa kata sekaligus (`*STAY DISCIPLINED.*`) | Tanda bintang tampil di layar, warna tidak jalan | Tandai per kata: `*STAY* *DISCIPLINED.*`. |
| Kata terakhir judul muncul tepat di akhir kalimat | Terasa terlambat | Selesaikan kemunculan kata di ±70% durasi klausa. |
| Teks atas menutupi wajah pada foto pengguna | Fokus gambar hilang | Selalu cek screenshot preview; geser gambar (misalnya turun ±58 px desain) atau pindahkan teks. |
| Latar siluet hanya dibuang dari sudut gambar | Celah latar di antara lengan dan badan tetap putih dan ikut masuk ke video | Baca daftar "area terang terkurung" yang dicetak `potong_latar.py`, hapus celahnya dengan `--hapus x,y`, lalu cek hasilnya di atas latar gelap. |
| Teks bawah terlalu dekat dengan handle | Tumpang tindih | Jaga teks bawah ≥30 px dari tepi bawah. |
| Filter ffmpeg memakai satu aliran audio dua kali | Error "matches no streams" | Pakai `asplit` untuk menggandakan aliran narasi (sudah ada di `gabung_audio.sh`). |
| Perintah Bash panjang dengan heredoc + backtick diblok oleh pengaman | Perintah tidak berjalan | Tulis skrip ke file dengan alat Write, lalu jalankan file-nya. |
| Koneksi ElevenLabs terbatas tidak bisa membuat musik | Tidak ada musik latar | Minta musik dari pengguna. Jika belum ada, buat latar sintetis pengganti dan katakan dengan jelas bahwa itu sementara. |
| Gambar tokoh nyata, foto asli, atau logo klub dipakai | Risiko klaim hak cipta | Ingatkan pengguna dengan singkat. Tetap ikuti pilihan pengguna, dan tawarkan untuk menyamarkan logo. |
| Ilustrasi pengganti dianggap footage final | Harapan pengguna tidak sesuai | Selalu sebut bahwa ilustrasi hanyalah pengganti B-roll sampai aset asli tersedia. |
| Mengubah scene lain saat revisi | Pengguna harus cek ulang semuanya | Revisi hanya scene yang disebut. Tambahan global (misalnya handle) boleh diterapkan ke semua scene jika memang itu permintaannya. |
| Render sebelum disetujui | Melanggar kebiasaan pengguna | Berhenti setelah preview. Render hanya setelah pengguna bilang oke. |
| Lupa melihat hasil sebelum kirim | Kesalahan kecil lolos | Lihat screenshot/frame hasil sendiri sebelum mengirim ke pengguna. |
