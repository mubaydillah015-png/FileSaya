"""Buat efek suara (sfx.wav) dan musik latar (music.wav) dengan kode, tanpa kredit apa pun.
Pakai: edit bagian CUES dan MUSIK di bawah, lalu: python audio_template.py <durasi_detik>
Waktu cue = detik absolut, ambil dari align_vo.py (phrases.start).
"""
import sys
import numpy as np, wave
SR=44100; T=float(sys.argv[1]) if len(sys.argv)>1 else 60.0; N=int(SR*T)
rng=np.random.default_rng(1)
def t_(d): return np.arange(int(SR*d))/SR
def env(d,a=0.005,r=None):
    t=t_(d); e=np.minimum(1,t/a); 
    return e*np.exp(-t/(r or d/4))
def lp(x,k=0.1):
    y=np.zeros_like(x);acc=0
    # vectorized one-pole via cumulative trick is hard; use convolution with exp kernel
    n=int(4/k); ker=k*(1-k)**np.arange(n); return np.convolve(x,ker)[:len(x)]
def hp(x,k=0.1): return x-lp(x,k)
noise=lambda d: rng.normal(0,1,int(SR*d))
def mix(*a):
    n=max(len(x) for x in a); o=np.zeros(n)
    for x in a: o[:len(x)]+=x
    return o
def pop(): t=t_(.09); f=500+900*t/.09; return np.sin(2*np.pi*np.cumsum(f)/SR)*env(.09,.002,.03)*.8
def thud(f0=90,d=.25): t=t_(d); f=f0*(1+1.5*np.exp(-t*30)); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(d,.002,d/3)
def stamp(): return mix(thud(110,.22)*.9,lp(noise(.08),.3)*env(.08,.001,.02)*.6)
def click(): return mix(hp(noise(.02),.3)*env(.02,.0005,.004)*.9,np.sin(2*np.pi*2500*t_(.02))*env(.02,.0005,.005)*.3)
def whoosh(d=.35):
    x=noise(d); k=np.linspace(.02,.25,len(x)); y=lp(x,.08)*1.0
    e=np.sin(np.pi*np.linspace(0,1,len(x)))**2; return y*e*.9
def rip(d=.28): x=hp(noise(d),.2); m=(rng.random(len(x))>.6).astype(float); m=lp(m,.01)*3; return x*m*np.sin(np.pi*np.linspace(0,1,len(x)))*.7
def tape(): return rip(.18)*.6
def ding(): t=t_(.8); return (np.sin(2*np.pi*1320*t)+.4*np.sin(2*np.pi*2640*t))*env(.8,.002,.25)*.35
def creak(): t=t_(.9); f=180+40*np.sin(2*np.pi*3*t)+60*t; ph=np.cumsum(f)/SR; x=((ph%1)*2-1); return lp(x,.15)*np.sin(np.pi*t/.9)*.35
def ticks(n=10,d=1.4): out=np.zeros(int(SR*d)); 
def tickseq(n,d):
    out=np.zeros(int(SR*d)+2000)
    for i in range(n): s=int(i*d/n*SR); c=click(); out[s:s+len(c)]+=c*.8
    return out
def printer(d=1.5): t=t_(d); x=np.sign(np.sin(2*np.pi*95*t))*.5*(0.6+0.4*np.sign(np.sin(2*np.pi*7*t))); return lp(x,.2)*np.minimum(1,t/.05)*np.minimum(1,(d-t)/.05)*.25
def scribble(d=.4): x=lp(noise(d),.35); m=(np.sin(2*np.pi*14*t_(d))>0)*1.0; return hp(x,.1)*lp(m,.02)*np.sin(np.pi*t_(d)/d)*.6
def bass(d=.9,f0=60): t=t_(d); f=f0*(1+np.exp(-t*12)); return np.tanh(2*np.sin(2*np.pi*np.cumsum(f)/SR))*env(d,.003,d/2.5)*.9
def snore(d=2.0): t=t_(d); return lp(noise(d),.03)*(np.sin(np.pi*t/d*2)**2)*.6
def steps(n=4,d=1.2):
    out=np.zeros(int(SR*d)+20000)
    for i in range(n): s=int(i*d/n*SR); x=mix(thud(70,.12)*.5,lp(noise(.05),.2)*env(.05,.001,.015)*.3); out[s:s+len(x)]+=x
    return out
def domino(n=9,d=1.6):
    out=np.zeros(int(SR*d)+5000)
    for i in range(n): s=int(i*d/n*SR); c=mix(click()*.7,thud(300,.04)*.3); out[s:s+len(c)]+=c
    return out
def siren(d=.9): t=t_(d); f=750+250*np.sign(np.sin(2*np.pi*3.3*t)); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.sin(np.pi*t/d)*.3
def buzz(d=.35): t=t_(d); return lp(np.sign(np.sin(2*np.pi*140*t)),.3)*env(d,.003,d)*.35
def snip(): return mix(hp(noise(.05),.4)*env(.05,.0005,.01)*.8,np.sin(2*np.pi*3200*t_(.05))*env(.05,.0005,.008)*.3)
def piano(f=440,d=1.6): t=t_(d); return sum(np.sin(2*np.pi*f*k*t)/k**1.5 for k in range(1,6))*env(d,.003,.45)*.35
def slash(): x=hp(noise(.18),.35); return x*np.linspace(1,0,len(x))**2*np.minimum(1,t_(.18)/.005)*.9
def drop(d=1.3): t=t_(d); f=140*np.exp(-t*2.2)+30; return np.tanh(1.8*np.sin(2*np.pi*np.cumsum(f)/SR))*env(d,.002,d/2)*1.0
def scratch(d=.35): t=t_(d); x=noise(d); f=np.abs(np.sin(2*np.pi*6*t)); return hp(x,.05)*f*np.sin(np.pi*t/d)*.5
def clang(d=1.2): t=t_(d); return sum(np.sin(2*np.pi*f*t)*a for f,a in [(523,1),(1187,.6),(1733,.5),(2411,.35),(3301,.2)])*env(d,.001,.3)*.3
def crickets(d=1.2):
    t=t_(d); g=(np.sin(2*np.pi*14*t)>.3)*(np.sin(2*np.pi*1.6*t)>-.2); return np.sin(2*np.pi*4600*t)*lp(g.astype(float),.05)*.12
def heart(): a=thud(55,.18); out=np.zeros(int(SR*.6)); out[:len(a)]+=a; s=int(.22*SR); out[s:s+len(a)]+=a*.7; return out*.9
def breath(d=1.2): return lp(noise(d),.05)*np.sin(np.pi*t_(d)/d)**2*.35
def notif(): a=np.sin(2*np.pi*988*t_(.12))*env(.12,.002,.05); b=np.sin(2*np.pi*1319*t_(.25))*env(.25,.002,.08); out=np.zeros(int(SR*.4)); out[:len(a)]+=a; s=int(.1*SR); out[s:s+len(b)]+=b; return out*.45
def jingle(d=.6):
    out=np.zeros(int(SR*d))
    for i in range(7): s=int(rng.random()*(d-.15)*SR); f=3000+rng.random()*3000; x=np.sin(2*np.pi*f*t_(.15))*env(.15,.001,.03); out[s:s+len(x)]+=x*.18
    return out
def loading(d=2.4):
    out=np.zeros(int(SR*d)+5000)
    for i in range(8): s=int(i*d/8*SR); x=np.sin(2*np.pi*(600+i*80)*t_(.06))*env(.06,.002,.02)*.25; out[s:s+len(x)]+=x
    return out
def swell(d=1.5,f=110): t=t_(d); return (np.sin(2*np.pi*f*t)+.5*np.sin(2*np.pi*f*1.5*t))*np.sin(np.pi*t/d)**2*.25
def riser(d=5): t=t_(d); return mix(lp(noise(d),.05)*(t/d)**2*.4,np.sin(2*np.pi*(80+60*t/d)*t)*(t/d)*.15)

# ===================== CUES (CONTOH episode ToFu, ganti sesuai storyboard) =====================
# Daftar efek: pop, stamp, click, whoosh(d), rip(d), tape, ding, creak, tickseq(n,d), printer(d), scribble(d),
# bass(d,f0), snore(d), steps(n,d), domino(n,d), siren(d), buzz(d), snip, piano(f,d), slash, drop, scratch(d),
# clang, crickets(d), heart, breath(d), notif, jingle, loading(d), swell(d,f), riser(d), thud(f0,d)
# Momen Papiyyar biasanya: slash + drop + scratch + clang di awal, crickets di kata 'Cong'.
sfx=np.zeros(N+SR*3)
def at(tm,x,g=1.0):
    s=int(tm*SR); sfx[s:s+len(x)]+=x*g
cues=[(0.15,whoosh()),(0.3,whoosh(.3),.5),(1.3,stamp()),
(2.5,pop()),(2.6,creak()),(4.35,whoosh()),(4.4,bass(.7)),
(6.2,whoosh()),(7.0,swell(1.2,98)),(9.5,pop()),(9.8,snore(1.6),.7),(11.0,pop()),(11.9,scribble(.3)),
(13.3,printer(1.6)),(14.6,stamp()),(16.0,scribble()),(15.9,thud(80,.25)),
(18.6,breath(1.2)),(19.4,bass(.9,48)),(20.2,heart()),
(21.8,whoosh()),(22.1,pop()),(22.5,pop()),
(23.8,whoosh()),(24.6,pop()),(25.0,pop()),(25.4,pop()),(26.0,buzz(.25)),(27.2,scribble()),(28.6,stamp()),
(30.8,whoosh()),(32.4,whoosh(.3),.6),(33.0,pop()),(34.3,buzz(.3)),(35.4,stamp()),
(37.3,riser(2.0)),(37.4,whoosh()),(39.3,pop()),(39.4,ding(),.6),(40.0,pop()),(40.3,pop()),(40.6,pop()),(41.0,pop()),(42.5,stamp()),(42.5,bass(.8)),
(44.7,whoosh()),(44.8,steps(3,.9),.7),(45.4,buzz(.25)),(46.5,whoosh(.5)),(47.9,ding(),.7),(47.9,stamp(),.5),
(49.04,slash()),(49.1,drop()),(49.1,scratch()),(49.2,clang()),(49.9,stamp()),(50.6,scribble(.3)),(51.6,crickets(.6)),(52.25,pop()),(52.4,creak()),(52.6,pop()),(53.4,stamp()),(53.4,bass(.7)),
(54.7,thud(60,.6)),(54.7,scratch(.25)),(55.8,heart()),(57.4,steps(5,2.2),.8),(58.6,bass(1.0,45)),
(60.0,notif()),(60.6,tickseq(10,1.3),.4),(62.0,tape()),(62.0,stamp(),.5),(62.4,pop()),(63.2,stamp()),(63.6,jingle())]
for c in cues: at(c[0],c[1],c[2] if len(c)>2 else 1.0)
sfx=sfx[:N]
# ---- music bed ----
mus=np.zeros(N)
tt=np.arange(N)/SR
drone=(np.sin(2*np.pi*55*tt)+.5*np.sin(2*np.pi*82.4*tt)+.25*np.sin(2*np.pi*110*tt))*(0.7+0.3*np.sin(2*np.pi*.08*tt))
mus+=drone*.18
bpm=96; beat=60/bpm
notes=[220,261.6,329.6,261.6, 196,246.9,293.7,246.9, 174.6,220,261.6,220, 164.8,207.7,246.9,207.7]
def pluck(f,d=.6): t=t_(d); return (np.sin(2*np.pi*f*t)+.3*np.sin(2*np.pi*2*f*t))*env(d,.003,.18)
def section(t0,t1,gain=1.0,tense=False,closing=False):
    k=0;tm=t0
    while tm<t1-.1:
        f=notes[k%len(notes)]*(2 if closing else 1); x=pluck(f)
        s=int(tm*SR); e=min(N,s+len(x)); mus[s:e]+=x[:e-s]*.22*gain
        if k%2==0:
            h=hp(noise(.04),.4)*env(.04,.001,.01)*.08*gain; mus[s:s+len(h)]+=h[:max(0,min(len(h),N-s))]
        if tense and k%4==0:
            b=thud(55,.3)*.25*gain; mus[s:s+len(b)]+=b[:max(0,min(len(b),N-s))]
        tm+=beat/2;k+=1
# ===================== MUSIK (CONTOH) =====================
# section(mulai,akhir,gain,tegang,penutup). Matikan musik saat momen Papiyyar & jeda dramatis lewat g[...]=0.
section(0.0,37.1); section(37.1,49.0,1.0,True); section(59.9,64.4,1.1,False,True)
# drone gating: off during silence & papiyyar
g=np.ones(N)
def fade(t0,t1,v0,v1):
    s,e=int(t0*SR),int(t1*SR); g[s:e]=np.linspace(v0,v1,e-s)
g[int(49.04*SR):int(57.3*SR)]=0; fade(57.3,58.0,0,.6); fade(63.4,64.4,1,0)
g[:int(.4*SR)]=np.linspace(0,1,int(.4*SR))
mus*=g
def save(fn,x):
    x=np.clip(x,-1,1); w=wave.open(fn,'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x*32767).astype('<i2').tobytes()); w.close()
save('sfx.wav',np.tanh(sfx/np.percentile(np.abs(sfx[sfx!=0]),99.9)*0.8)); save('music.wav',mus*0.9)
print('done', np.abs(sfx).max(), np.abs(mus).max())
