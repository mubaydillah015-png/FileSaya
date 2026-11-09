"""Pemakaian: python3 logo_transparan.py logo_asli.jpg logo.png
Membuang latar hitam/gelap dari logo: kecerahan piksel dijadikan transparansi,
lalu gambar dipotong rapat ke area logo. Cocok untuk logo terang di atas latar gelap.
"""
import sys
from PIL import Image, ImageChops

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
r, g, b = im.split()
a = ImageChops.lighter(ImageChops.lighter(r, g), b).point(lambda v: 0 if v < 14 else min(255, int((v - 14) * 1.6)))
out = im.copy()
out.putalpha(a)
out = out.crop(a.getbbox())
out.save(dst)
print('tersimpan', dst, out.size)
