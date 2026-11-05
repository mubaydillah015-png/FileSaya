"""Menyusun track efek suara dari daftar cue (waktu animasi per scene)."""
import json, subprocess, sys, wave
import numpy as np
SR = 48000
sc = json.load(open(sys.argv[1])); D0 = [6,5,6,10,8,8,10,6,9,13,4,7,6,8,7]
END = sc[-1]["T0"] + sc[-1]["D"]; N = int(END*SR) + SR
out = np.zeros((N, 2))
cache = {}
def load(name):
    if name not in cache:
        raw = subprocess.run(["ffmpeg","-v","error","-i",f"sfx/{name}.mp3","-f","f32le","-ac","2","-ar",str(SR),"-"],capture_output=True,check=True).stdout
        cache[name] = np.frombuffer(raw, "<f4").reshape(-1, 2).astype(float)
    return cache[name]
def at(n, ta): s = sc[n-1]; return s["T0"] + ta * s["D"] / D0[n-1]
# (scene, waktu animasi, sfx, gain dB, maks detik)
CUES = [(n, 0.0, "flip", -14, 1) for n in range(2, 16)] + [
 (1,.1,"tear",-6,2),(1,0,"clock",-20,2),(1,2,"clock",-20,2),(1,4,"clock",-22,2),
 (2,.3,"stamp",-4,1),(2,2.1,"pop",-9,1),
 (3,1.5,"money",-10,1),(3,2.6,"money",-12,1),(3,.9,"pop",-16,1),
 (4,6.0,"scribble",-8,1),(4,7.3,"whoosh",-14,1),(4,8.0,"click",-10,1),(4,8.45,"click",-10,1),(4,8.9,"click",-10,1),
 (5,1.8,"whoosh",-14,1),(5,5.2,"sparkle",-8,1),(5,6.3,"whoosh",-8,1),
 (6,1.3,"scribble",-12,1),(6,2.3,"stamp",-6,1),(6,4.1,"pop",-8,1),(6,4.3,"boom",-12,1),
 (7,.2,"whoosh",-12,1),(7,3.3,"pop",-14,1),(7,4.0,"pop",-14,1),(7,4.7,"pop",-14,1),(7,5.8,"scribble",-12,1),
 (8,0,"whoosh",-12,1),(8,1.2,"scribble",-14,1),(8,3.9,"tear",-7,2),
 (9,.25,"slap",-2,1),(9,6.4,"tear",-6,2),
 (10,4.3,"whoosh",-12,1),(10,5.6,"ice",-8,2),(10,7.2,"lock",-5,1),(10,8.2,"lock",-5,1),(10,9.1,"lock",-5,1),
 (11,0,"boom",-14,1),
 (12,0,"boom",-1,1),(12,0,"whoosh",-6,1),(12,.9,"tear",-10,2),
 (13,2.4,"scribble",-12,1),(13,3.0,"coin",-6,5),
 (14,0,"rewind",-8,1),(14,.9,"rewind",-10,1),(14,2.9,"whoosh",-10,1),(14,4.1,"whoosh",-10,1),(14,5.3,"whoosh",-10,1),(14,6.9,"lock",-3,1),
 (15,0,"heart",-8,2),(15,2.0,"heart",-9,2),(15,3.8,"pop",-10,1),(15,5.6,"stamp",-2,1),
]
for n, ta, name, db, mx in CUES:
    x = load(name)[: int(mx*SR)] * 10**(db/20)
    i = int(at(n, ta) * SR); out[i:i+len(x)] += x[: N-i]
# sip: tepat setelah kata "Cong" (VO scene 12 selesai)
x = load("sip") * 10**(-5/20); i = int((sc[11]["T0"] + .15 + 8.83) * SR); out[i:i+len(x)] += x
out = out[: int(END*SR)]
out = np.clip(out, -1, 1)
with wave.open(sys.argv[2], "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype("<i2").tobytes())
print("cues", len(CUES)+1)
