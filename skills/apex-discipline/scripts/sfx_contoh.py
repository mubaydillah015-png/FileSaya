"""CONTOH: membuat musik latar gelap + SFX sintetis sebagai PENGGANTI SEMENTARA.
Pemakaian: python3 sfx_contoh.py  -> menulis sfx_bed.wav (stereo 48 kHz).
Ubah TOTAL, kurva bed_env (scene hening/klimaks), dan daftar add(...) di bagian SFX
agar waktunya cocok dengan scene video baru. Butuh numpy.
"""
import numpy as np, wave

SR = 48000
TOTAL = 63.5
N = int(SR * TOTAL)
rng = np.random.default_rng(7)
out = np.zeros(N)


def add(sig, t, gain=1.0):
    i = int(t * SR)
    j = min(N, i + len(sig))
    if i < N:
        out[i:j] += sig[: j - i] * gain


def tt(d):
    return np.arange(int(d * SR)) / SR


def lowpass(x, a):
    # one-pole lowpass, a in (0,1): smaller = darker
    y = np.empty_like(x)
    acc = 0.0
    for k in range(len(x)):
        acc += a * (x[k] - acc)
        y[k] = acc
    return y


def boom(d=2.5, f0=62, f1=32):
    t = tt(d)
    f = f1 + (f0 - f1) * np.exp(-t * 4)
    ph = 2 * np.pi * np.cumsum(f) / SR
    env = np.exp(-t * 1.6) * np.minimum(1, t / 0.004)
    click = rng.normal(0, 1, len(t)) * np.exp(-t * 60) * 0.35
    return (np.sin(ph) + 0.3 * np.sin(2 * ph)) * env + click


def hit(d=0.6):
    t = tt(d)
    body = np.sin(2 * np.pi * (90 * np.exp(-t * 8) + 45) * t) * np.exp(-t * 7)
    n = lowpass(rng.normal(0, 1, len(t)), 0.25) * np.exp(-t * 18)
    return body * 0.9 + n * 0.8


def whoosh(d=0.7):
    t = tt(d)
    n = rng.normal(0, 1, len(t))
    a = 0.02 + 0.25 * np.sin(np.pi * t / d) ** 2
    y = np.empty_like(n); acc = 0.0
    for k in range(len(n)):
        acc += a[k] * (n[k] - acc); y[k] = acc
    return y * np.sin(np.pi * t / d) ** 1.5 * 1.6


def riser(d=2.0):
    t = tt(d)
    n = rng.normal(0, 1, len(t))
    a = 0.01 + 0.4 * (t / d) ** 2
    y = np.empty_like(n); acc = 0.0
    for k in range(len(n)):
        acc += a[k] * (n[k] - acc); y[k] = acc
    tone = np.sin(2 * np.pi * np.cumsum(200 + 600 * (t / d) ** 2) / SR) * 0.15
    return (y * 1.2 + tone) * (t / d) ** 2


def beep(d=0.12, f=1000):
    t = tt(d)
    return np.sin(2 * np.pi * f * t) * np.minimum(1, (d - t) / 0.02) * np.minimum(1, t / 0.005)


def tick(d=0.05):
    t = tt(d)
    return np.sin(2 * np.pi * 1800 * t) * np.exp(-t * 120) + rng.normal(0, .3, len(t)) * np.exp(-t * 200)


def noiseburst(d, a, decay):
    t = tt(d)
    return lowpass(rng.normal(0, 1, len(t)), a) * np.exp(-t * decay)


# --- dark drone bed (placeholder music) ---
t = np.arange(N) / SR
lfo = 0.6 + 0.4 * np.sin(2 * np.pi * t / 7.0)
drone = (np.sin(2 * np.pi * 55 * t) + 0.5 * np.sin(2 * np.pi * 82.4 * t + 1) + 0.25 * np.sin(2 * np.pi * 110 * t + 2)) * lfo
pulse = np.zeros(N)
for b in np.arange(0.0, TOTAL, 60 / 72):  # slow heartbeat-like pulse, 72 bpm
    s = hit(0.4) * 0.35
    i = int(b * SR); j = min(N, i + len(s)); pulse[i:j] += s[: j - i]
bed_env = np.ones(N)
def ramp(a, b, v0, v1):
    i, j = int(a * SR), int(b * SR); bed_env[i:j] = np.linspace(v0, v1, j - i)
bed_env[:] = 0.55
ramp(0, 1.0, 0.0, 0.55)
ramp(34.3, 34.6, 0.55, 0.0); bed_env[int(34.6 * SR):int(36.7 * SR)] = 0.0  # scene 9: silence
ramp(36.7, 37.5, 0.0, 0.55)
ramp(40.4, 42.4, 0.55, 0.9); bed_env[int(42.4 * SR):int(50.1 * SR)] = 0.8
ramp(50.1, 54.6, 0.8, 1.0); ramp(54.6, 60.0, 1.0, 0.6); ramp(60.0, TOTAL, 0.6, 0.0)
music = (drone * 0.12 + pulse) * bed_env
music[int(34.6 * SR):int(36.7 * SR)] = 0

# --- SFX ---
add(boom(), 0.0, 0.9)                                      # 1 sub-boom
add(noiseburst(0.35, 0.5, 9), 4.05, 0.35)                  # 2 match strike
add(noiseburst(1.0, 0.08, 3), 7.05, 0.35)                  # 2 flame dies hiss
for c in [3.66, 8.38, 12.77, 25.90, 36.84, 50.11]:         # whooshes on cuts
    add(whoosh(), c - 0.35, 0.45)
for k, s in enumerate([9.6, 10.3, 11.0, 11.7]):            # 3 footsteps
    add(hit(0.25), s, 0.25)
add(hit(), 15.82, 0.9); add(hit(), 19.37, 1.0)             # 4 impacts
add(noiseburst(5.0, 0.6, 0.0) * 0.04, 12.9, 1.0)           # 4 projector hiss
bt = 20.5; gap = 0.55
while bt < 22.9:                                           # 5 accelerating heart monitor
    add(beep(), bt, 0.22); bt += gap; gap = max(0.2, gap * 0.82)
add(beep(0.9, 1000), 22.95, 0.12)
add(noiseburst(0.25, 0.4, 14), 24.05, 0.3); add(hit(), 24.3, 0.7)   # 6 lace pull + drum
add(hit(0.3) * 0.5, 26.3, 1.0); add(hit(0.3) * 0.5, 26.9, 1.0)       # 7 light clacks
add(noiseburst(2.0, 0.03, 0.5), 26.0, 0.25)                          # 7 wind
for s in [28.62, 30.45, 32.26]:                            # 8 percussion
    add(hit(), s, 0.85)
add(noiseburst(1.2, 0.3, 3), 32.5, 0.35)                   # 8 ice water
add(noiseburst(0.4, 0.7, 10), 41.2, 0.25)                  # 10 crack
add(riser(2.0), 40.4, 0.5)                                 # 11 riser
add(boom(3.5, 70, 28), 42.4, 1.25)                         # 11 biggest boom
for k in range(12):                                        # 12 metronome
    add(tick(), 44.2 + k * 0.5, 0.25)
for k in range(10):
    add(hit(0.3) * 0.4, 44.28 + k * 0.55, 0.6)            # 12 bricks placed
for k in range(8):                                         # 13 running drums
    add(hit(0.35), 50.4 + k * 0.5, 0.45 + 0.05 * k)
add(boom(4.0, 60, 30), 58.7, 1.0)                          # 14 final boom
add(boom(3.0, 50, 28), 60.4, 0.6)                          # logo reveal

mix = music + out * 0.55
mix = np.tanh(mix * 1.1) * 0.7
st = np.stack([mix, mix], 1)
st = (st * 32767).astype(np.int16)
with wave.open('sfx_bed.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(st.tobytes())
print('ok', TOTAL)
