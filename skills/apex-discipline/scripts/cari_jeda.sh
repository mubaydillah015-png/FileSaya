#!/usr/bin/env bash
# Pemakaian: cari_jeda.sh suara.mp3 [ambang_dB=-38] [jeda_min_detik=0.18]
# Menampilkan durasi suara dan daftar potongan bicara (mulai-selesai) berdasarkan jeda.
# Cocokkan tiap potongan dengan kalimat/klausa naskah untuk mengisi SEG di animasi.
set -euo pipefail
F="$1"; DB="${2:--38}"; D="${3:-0.18}"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$F")
echo "Durasi: ${DUR} detik"
ffmpeg -hide_banner -i "$F" -af "silencedetect=noise=${DB}dB:d=${D}" -f null - 2>&1 \
 | grep -oE "silence_(start|end): [0-9.]+" | awk -v dur="$DUR" '
  BEGIN{s=0; n=0}
  /silence_start/{e=$2; if(e-s>0.05){n++; printf "%2d. %6.2f - %6.2f  (%.2f dtk)\n", n, s, e, e-s}}
  /silence_end/{s=$2}
  END{if(dur-s>0.05){n++; printf "%2d. %6.2f - %6.2f  (%.2f dtk)\n", n, s, dur, dur-s}}'
