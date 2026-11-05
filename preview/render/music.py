"""Musik latar orisinal untuk video PAPIYYAR (disintesis, bebas royalti).

Bagian:
  A  0 s - scene 12   : noir jazz pelan (kontrabas pizzicato, piano, brush, pad)
  B  scene 12         : hentakan + versi bas cepat dan nakal
  C  scene 13 - akhir : drone tegang, berhenti total saat lampu padam (scene 14),
                        kembali pelan di scene 15
Hasil: music.wav (48 kHz, stereo)
"""
import json, sys, wave
import numpy as np

SR = 48000
scenes = json.load(open(sys.argv[1]))  # [{n,T0,D}]
T = {s["n"]: s["T0"] for s in scenes}
END = scenes[-1]["T0"] + scenes[-1]["D"]
N = int(END * SR) + SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)

def put(sig, t, pan=0.0, g=1.0):
    i = int(t * SR)
    if i >= N: return
    sig = sig[: N - i] * g
    L[i:i + len(sig)] += sig * (1 - pan) * 0.5 * 2 ** 0.5
    R[i:i + len(sig)] += sig * (1 + pan) * 0.5 * 2 ** 0.5

def env(n, a=0.005, d=1.0):
    t = np.arange(n) / SR
    e = np.exp(-t / d)
    na = max(1, int(a * SR)); e[:na] *= np.linspace(0, 1, na)
    return e

def lp(x, k=0.15):
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x):
        acc += k * (v - acc); y[i] = acc
    return y

def bass(m, dur=0.6):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    s = np.sin(2*np.pi*f*t) + .35*np.sin(4*np.pi*f*t) + .12*np.sin(6*np.pi*f*t)
    return s * env(n, .004, .22) * .55

def piano(ms, dur=2.2, vel=.25):
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for m in ms:
        f = hz(m)
        for h, a in [(1, 1), (2, .45), (3, .2), (4, .1)]:
            s += a * np.sin(2*np.pi*f*h*t) * np.exp(-t * (1.2 + h * .8))
    return s * env(n, .003, 1.4) * vel / max(1, len(ms))

def brush(dur=.18, g=.05):
    n = int(dur * SR); x = rng.standard_normal(n)
    x = x - lp(x, .3)  # high-pass-ish
    return x * env(n, .01, .05) * g

def pad(ms, dur, g=.08, trem=0.0):
    n = int(dur * SR); t = np.arange(n) / SR; s = np.zeros(n)
    for m in ms:
        f = hz(m)
        s += np.sin(2*np.pi*f*t) + .3*np.sin(2*np.pi*f*2.003*t)
    fade = np.minimum(1, np.minimum(t / 1.5, (dur - t) / 1.5)).clip(0, 1)
    if trem: s *= .65 + .35*np.sin(2*np.pi*trem*t)
    return s * fade * g / len(ms)

# ---------- A: noir jazz ----------
bpm = 84; beat = 60 / bpm
walk = [[38, 45, 41, 45], [34, 41, 38, 41], [31, 38, 34, 38], [33, 40, 37, 40]]  # Dm Bb Gm A
chords = [[62, 65, 69], [58, 62, 65], [55, 58, 62], [57, 61, 64]]
motif = [74, 77, 76, 69]
a_end = T[12]
slap_t = T[9] + 0.25 * (scenes[8]["D"] / 9)          # tamparan scene 9
freeze_t = T[10] + 5.6 * (scenes[9]["D"] / 13)        # Si Tenang membeku
t = 0.5; bar = 0
while t < a_end - .2:
    for k in range(4):
        tb = t + k * beat
        if tb >= a_end - .2: break
        if slap_t <= tb < slap_t + 1.3: continue      # jeda musik setelah tamparan
        if tb < freeze_t or tb >= T[11]:
            put(bass(walk[bar % 4][k]), tb, -.15)
        if k in (1, 3) and tb < freeze_t:
            put(brush(), tb, .3)
    if bar % 2 == 0 and not (slap_t <= t < slap_t + 1.3) and t < freeze_t:
        put(piano(chords[bar % 4], 2.6, .22), t + .02, .1)
    if bar % 8 == 6 and t < freeze_t:
        for j, m in enumerate(motif):
            put(piano([m], 1.4, .18), t + j * beat * .5, .25)
    t += 4 * beat; bar += 1
put(pad([38, 45], a_end - 0.5, .07), 0.3)
put(pad([38, 39, 45], T[11] - freeze_t, .09, trem=6), freeze_t)  # ketegangan saat membeku

# ---------- B: Papiyyar ----------
put(piano([38, 50, 62, 65, 69], 3.0, .9), T[12])
b_end = T[13]; t = T[12] + .6; k = 0
riff = [50, 50, 53, 55, 57, 55, 53, 52]
while t < b_end - .3:
    put(bass(riff[k % 8] - 12, .3), t, -.1, 1.1)
    if k % 2: put(brush(.1, .07), t, .3)
    if k % 8 == 0: put(piano([62, 65, 69], 1.2, .2), t, .2)
    t += beat / 2; k += 1

# ---------- C: tension ----------
blackout = T[14] + 6.9 * (scenes[13]["D"] / 8)
put(pad([26, 38, 39], blackout - T[13], .12, trem=4), T[13])
t = T[14]
while t < blackout:
    put(bass(26, .5), t, 0, .8); t += beat
end_tail = END - T[15]
put(pad([26, 38, 41], end_tail, .08, trem=2.5), T[15] + .2)
stamp_t = T[15] + 5.6 * (scenes[14]["D"] / 7)
put(piano([26, 38, 50, 53, 57], 3.0, .7), stamp_t)

# ---------- master ----------
for arr in (L, R):
    arr[int(blackout * SR):int(T[15] * SR)] *= 0.0
mix = np.stack([L, R], 1)
mix /= np.abs(mix).max() / 0.7
fade = int(1.5 * SR); mix[int(END*SR)-fade:int(END*SR)] *= np.linspace(1, 0, fade)[:, None]
mix = mix[: int(END * SR)]
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("ok", END)
