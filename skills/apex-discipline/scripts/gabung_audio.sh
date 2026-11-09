#!/usr/bin/env bash
# Pemakaian: gabung_audio.sh video_only.mp4 narasi.mp3 musik_atau_sfx.wav hasil.mp4 [volume_musik=0.55]
# Menggabungkan video + narasi + musik/SFX. Musik otomatis mengecil saat narasi (sidechain),
# lalu dinormalisasi ke -14 LUFS (standar YouTube). Narasi dipakai dua kali, jadi perlu asplit.
set -euo pipefail
V="$1"; VO="$2"; BED="$3"; OUT="$4"; VOL="${5:-0.55}"
ffmpeg -y -v error -i "$V" -i "$VO" -i "$BED" -filter_complex \
"[1:a]aresample=48000,aformat=channel_layouts=stereo,apad,asplit=2[vo1][vo2];\
[2:a]aresample=48000,aformat=channel_layouts=stereo,volume=${VOL}[bed];\
[bed][vo1]sidechaincompress=threshold=0.05:ratio=4:attack=20:release=300[duck];\
[duck][vo2]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" \
 -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "$OUT"
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height -of compact "$OUT"
