"""Samakan waktu scene dengan narasi tanpa internet/transkripsi.
Pakai: python align_vo.py narasi.mp3 scenes.json > timing.json
scenes.json = daftar teks VO per scene (persis seperti dibacakan), contoh: ["Kalimat scene 1.", "Kalimat scene 2."]
Hasil: bounds (detik awal tiap scene + durasi total) dan waktu mulai tiap potongan kalimat.
Cara kerja: deteksi jeda (silencedetect), lalu cocokkan potongan kalimat (dipisah . , ? ...) ke segmen bicara
dengan pemrograman dinamis berdasarkan jumlah suku kata. cost < ~5 = cocok."""
import re,math,json,subprocess,sys
from functools import lru_cache
A=sys.argv[1]; sc=json.load(open(sys.argv[2]))
o=subprocess.run(['ffmpeg','-i',A,'-af','silencedetect=n=-35dB:d=0.25','-f','null','-'],capture_output=True,text=True).stderr
T=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',A],capture_output=True,text=True).stdout)
st=[float(x) for x in re.findall(r'silence_start: ([\d.]+)',o)];en=[float(x) for x in re.findall(r'silence_end: ([\d.]+)',o)]
segs=[];cur=0
for a,b in zip(st,en):
    if a>cur: segs.append((cur,a))
    cur=b
segs.append((cur,T)); segs=[s for s in segs if s[1]-s[0]>0.2]
units=[]
for si,s in enumerate(sc):
    for m in re.finditer(r'[^.,?!]+(?:\.\.\.|[.,?!])?',s):
        t=m.group().strip()
        if not re.search(r'[a-zA-Z]',t):continue
        end='…' if t.endswith('...') else ('.' if t.endswith(('.','?','!')) else (',' if t.endswith(',') else ''))
        units.append((si,t,end,max(1,len(re.findall(r'[aiueo]+',t.lower())))))
rate=sum(b-a for a,b in segs)/sum(u[3] for u in units)
N=len(units);M=len(segs);pen={'.':0,'…':0.3,',':0.8,'':3};INF=1e9
sys.setrecursionlimit(100000)
@lru_cache(None)
def f(i,j):
    if i==N and j==M: return (0,())
    if i==N or j==M: return (INF,())
    best=(INF,());a,b=segs[j];d=b-a;s=0
    for k in range(i,N):
        s+=units[k][3]; c=(math.log(d/(s*rate)))**2*4+pen[units[k][2]]
        r=f(k+1,j+1)
        if r[0]+c<best[0]: best=(r[0]+c,((i,k),)+r[1])
        if s*rate>d*3:break
    return best
cost,asg=f(0,0)
if cost>=INF: sys.exit('Gagal mencocokkan: cek apakah teks scenes.json sama dengan narasi.')
us={}
for (i,k),(a,b) in zip(asg,segs):
    tot=sum(units[x][3] for x in range(i,k+1));t=a
    for x in range(i,k+1): us[x]=t;t+=(b-a)*units[x][3]/tot
bounds=[0]+[round(max(0,us[min(u for u in range(N) if units[u][0]==si)]-0.15),2) for si in range(1,len(sc))]+[round(T,2)]
json.dump({'cost':round(cost,2),'duration':round(T,2),'bounds':bounds,'phrases':[{'scene':units[x][0]+1,'start':round(us[x],2),'text':units[x][1]} for x in range(N)]},sys.stdout,ensure_ascii=False,indent=1)
