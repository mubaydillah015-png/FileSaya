"""Buat tekstur latar 1080x1920: paper.png, cork.png, sepia.png, dark.png.
Pakai: python make_textures.py <folder_output>"""
import sys,os,numpy as np
from PIL import Image, ImageFilter
out=sys.argv[1] if len(sys.argv)>1 else '.'; os.makedirs(out,exist_ok=True)
rng=np.random.default_rng(5); size=(1080,1920)
def tex(base,amp,blotch,cell,fname):
    n=rng.normal(0,1,(size[1],size[0]))
    a=(np.asarray(Image.fromarray(((n*40)+128).clip(0,255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.6))).astype(float)-128)/40
    b=rng.normal(0,1,(size[1]//cell,size[0]//cell));b=np.asarray(Image.fromarray(((b*40)+128).clip(0,255).astype('uint8')).resize(size,Image.BICUBIC)).astype(float)/128-1
    a=a+b*blotch
    Image.fromarray(np.stack([base[c]+a*amp for c in range(3)],-1).clip(0,255).astype('uint8')).save(os.path.join(out,fname))
tex((242,237,228),5,0.5,120,'paper.png')   # noda rendah, jangan dinaikkan (jadi loreng)
tex((92,64,40),22,1.5,40,'cork.png')
tex((217,196,154),8,1.0,80,'sepia.png')
tex((17,17,17),5,1.0,80,'dark.png')
print('tekstur dibuat di',out)
