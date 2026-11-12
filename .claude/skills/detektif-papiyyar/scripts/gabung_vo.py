"""Gabungkan klip narasi ElevenLabs per scene menjadi satu narasi + timing.

Pakai:
    python3 gabung_vo.py <folder_vo> [jeda_detik] > timing.json

<folder_vo> berisi 01.mp3, 02.mp3, ... (satu klip per scene, urut).
Hasil:
    <folder_vo>/../narasi.wav  : seluruh narasi dengan jeda antar scene
    stdout (timing.json)       : {"bounds": [...], "scenes": [...], "total": detik}
bounds = waktu mulai tiap scene (detik), langsung dipakai untuk const B=[...] di anim.html.
"""
import json, os, subprocess, sys

folder = sys.argv[1]
gap = float(sys.argv[2]) if len(sys.argv) > 2 else 0.35
lead = 0.15  # jeda kecil sebelum kalimat pertama tiap scene

clips = sorted(f for f in os.listdir(folder) if f.lower().endswith(('.mp3', '.wav')))
if not clips:
    sys.exit('Tidak ada klip di ' + folder)

def dur(p):
    out = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries',
                                   'format=duration', '-of', 'csv=p=0', p])
    return float(out)

scenes, t = [], 0.0
for c in clips:
    d = dur(os.path.join(folder, c))
    D = round(lead + d + gap, 3)
    scenes.append({'n': len(scenes) + 1, 'file': c, 'vo': round(d, 3), 'T0': round(t, 3), 'D': D})
    t += D

inputs, filt = [], []
for i, s in enumerate(scenes):
    inputs += ['-i', os.path.join(folder, s['file'])]
    ms = int(round((s['T0'] + lead) * 1000))
    filt.append(f'[{i}:a]aresample=44100,aformat=channel_layouts=mono,adelay={ms}[a{i}]')
filt.append(''.join(f'[a{i}]' for i in range(len(scenes))) +
            f'amix=inputs={len(scenes)}:normalize=0,apad=whole_dur={t:.3f}[out]')
out = os.path.join(os.path.dirname(os.path.abspath(folder)), 'narasi.wav')
subprocess.check_call(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(filt),
                       '-map', '[out]', '-ar', '44100', '-ac', '1', out])

print(json.dumps({'bounds': [s['T0'] for s in scenes], 'scenes': scenes,
                  'total': round(t, 3), 'narasi': out}, indent=1))
sys.stderr.write(f'Total {t:.1f} detik dari {len(scenes)} scene -> {out}\n')
