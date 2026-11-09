"""Pemakaian: python3 potong_latar.py gambar.jpg hasil.png [--ambang 150] [--hapus x,y x,y ...]
Membuang latar terang polos (putih/abu-abu) dari gambar siluet atau potret.
Latar diisi dari keempat sudut (flood fill), jadi tulisan terang DI DALAM objek tetap utuh.

PENTING: area latar yang terkurung (misalnya celah antara lengan dan badan) tidak tersambung
ke sudut, jadi tidak ikut terhapus. Jalankan dulu tanpa --hapus: skrip mencetak daftar area
terang yang terkurung (titik, luas). Pilih yang merupakan celah latar (biasanya di tepi objek,
bukan tulisan/nomor), lalu jalankan lagi dengan --hapus x,y untuk titik-titik itu.
Selalu cek hasilnya di atas latar gelap sebelum dipakai.
"""
import argparse
from PIL import Image, ImageDraw, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--ambang', type=int, default=150)
ap.add_argument('--hapus', nargs='*', default=[])
a = ap.parse_args()

im = Image.open(a.src).convert('RGB')
W, H = im.size
m = im.convert('L').point(lambda v: 255 if v > a.ambang else 0)
seeds = [(2, 2), (W - 3, 2), (2, H - 3), (W - 3, H - 3)] + [tuple(map(int, s.split(','))) for s in a.hapus]
for xy in seeds:
    if m.getpixel(xy) == 255:
        ImageDraw.floodfill(m, xy, 128)

# laporkan area terang yang masih terkurung
probe = m.copy(); px = probe.load(); found = []
for y in range(0, H, 2):
    for x in range(0, W, 2):
        if px[x, y] == 255:
            ImageDraw.floodfill(probe, (x, y), 200)
            n = sum(1 for v in probe.getdata() if v == 200)
            ImageDraw.floodfill(probe, (x, y), 10)
            if n > 50:
                found.append((x, y, n))
if found:
    print('Area terang terkurung (x,y luas) - hapus yang merupakan celah latar dengan --hapus x,y:')
    for x, y, n in found:
        print(f'  {x},{y}  {n}')

alpha = m.point(lambda v: 0 if v == 128 else 255)
alpha = alpha.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1))
out = im.copy()
out.putalpha(alpha)
out.save(a.dst)
print('tersimpan', a.dst, out.size)
