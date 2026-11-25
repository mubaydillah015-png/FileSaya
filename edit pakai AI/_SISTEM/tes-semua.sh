#!/usr/bin/env bash
# Uji coba semua perlengkapan studio. Hasil di _SISTEM/tes, laporan di _SISTEM/tes/laporan-tes.txt
set -uo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/studio.sh"
TES="$STUDIO/tes"; L="$TES/laporan-tes.txt"; mkdir -p "$TES"/{remotion,hyperframes,ffmpeg,whisper,yt-dlp}
MULAI="$STUDIO_KERJA/tmp/.penanda-mulai"; touch "$MULAI"; sleep 1
ok(){ echo "[LULUS] $*" | tee -a "$L"; }; gagal(){ echo "[GAGAL] $*" | tee -a "$L"; }
echo "Laporan tes studio - $(date '+%Y-%m-%d %H:%M:%S %Z')" > "$L"
dur(){ ffprobe -v error -show_entries format=duration -of csv=p=0 "$1" 2>/dev/null; }

echo "== Versi ==" >> "$L"
{ echo "node    $(node -v)  ($(command -v node))"
  echo "ffmpeg  $(ffmpeg -version | head -1 | cut -d' ' -f3)  ($(command -v ffmpeg))"
  echo "yt-dlp  $(yt-dlp --version)  ($(command -v yt-dlp))"
  echo "whisper $(command -v whisper-cli)  model: $WHISPER_MODEL"
  echo "remotion $(cd "$STUDIO/projects/remotion-studio" && node -p "require('remotion/package.json').version")"
  echo "hyperframes $(cd "$STUDIO/projects/hyperframes-studio" && node -p "require('hyperframes/package.json').version")"; } >> "$L"
echo "== Hasil ==" >> "$L"

# Remotion
( cd "$STUDIO/projects/remotion-studio" && npx remotion render src/index.ts TesStudio "$TES/remotion/tes-remotion.mp4" --log=error ) >/dev/null 2>&1 \
  && [ -s "$TES/remotion/tes-remotion.mp4" ] && ok "Remotion: render 1080x1920 $(dur "$TES/remotion/tes-remotion.mp4")s" || gagal "Remotion render"
# HyperFrames
( cd "$STUDIO/projects/hyperframes-studio/tes-studio" && npx hyperframes render -o "$TES/hyperframes/tes-hyperframes.mp4" ) >/dev/null 2>&1 \
  && [ -s "$TES/hyperframes/tes-hyperframes.mp4" ] && ok "HyperFrames: render animasi 3D $(dur "$TES/hyperframes/tes-hyperframes.mp4")s" || gagal "HyperFrames render"
# FFmpeg: potong, gabung, konversi
cd "$TES/ffmpeg" && ffmpeg -v error -y -f lavfi -i testsrc2=size=1080x1920:rate=30 -f lavfi -i sine=frequency=440 -t 4 -c:v libx264 -c:a aac -shortest sumber.mp4 \
 && ffmpeg -v error -y -ss 1 -i sumber.mp4 -t 2 -c:v libx264 -c:a aac potong.mp4 \
 && printf "file '%s'\nfile '%s'\n" "$PWD/potong.mp4" "$PWD/potong.mp4" > "$STUDIO_KERJA/tmp/daftar.txt" \
 && ffmpeg -v error -y -f concat -safe 0 -i "$STUDIO_KERJA/tmp/daftar.txt" -c copy gabung.mp4 \
 && ffmpeg -v error -y -i gabung.mp4 -vf scale=540:-2 -c:v libx264 -crf 28 -c:a aac konversi-540p.mp4 \
 && ok "FFmpeg: potong $(dur potong.mp4)s, gabung $(dur gabung.mp4)s, konversi 540p $(dur konversi-540p.mp4)s" || gagal "FFmpeg"
rm -f "$STUDIO_KERJA/tmp/daftar.txt"
# Whisper
cd "$TES/whisper" && ffmpeg -v error -y -i "$STUDIO/tools/whisper/src/samples/jfk.wav" -ar 16000 -ac 1 sampel.wav \
 && whisper-cli -m "$WHISPER_MODEL" -f sampel.wav -l auto -osrt -of caption -t "$(nproc)" >/dev/null 2>&1 && [ -s caption.srt ] \
 && ok "Whisper: caption.srt -> \"$(sed -n 3p caption.srt | cut -c1-70)...\"" || gagal "Whisper"
# yt-dlp (sumber contoh yang diizinkan jaringan; YouTube butuh izin jaringan tambahan)
rm -f "$TES/yt-dlp/"*.mp4
yt-dlp -q --no-progress -P "home:$TES/yt-dlp" -o "unduhan.%(ext)s" "https://remotion.media/BigBuckBunny.mp4" >/dev/null 2>&1 \
 && n=$(ls "$TES/yt-dlp" | wc -l) && ffmpeg -v error -y -i "$TES/yt-dlp/unduhan.mp4" -t 5 -c copy "$TES/yt-dlp/tes-yt-dlp-5detik.mp4" && rm "$TES/yt-dlp/unduhan.mp4" \
 && ok "yt-dlp: unduh -> $n file .mp4 saja (sementara di _SISTEM/kerja/yt-dlp), disimpan potongan 5 detik" || gagal "yt-dlp"
if yt-dlp -q --simulate "https://www.youtube.com/watch?v=jNQXAC9IVRw" >/dev/null 2>&1; then ok "yt-dlp: YouTube bisa dijangkau"; else echo "[INFO]  yt-dlp: YouTube diblokir jaringan cloud (butuh izin jaringan)" | tee -a "$L"; fi

echo "== Folder pengguna ==" >> "$L"
for d in "$STUDIO_HASIL" "$STUDIO_BAHAN" "$STUDIO_REF"; do
  echo "$(basename "$d"): $(find "$d" -mindepth 1 | wc -l) item" >> "$L"; done
echo "== File baru di luar folder utama selama tes ==" >> "$L"
LUAR=$(find / -xdev \( -path /proc -o -path /sys -o -path /dev -o -path /run -o -path "$STUDIO_UTAMA" -o -path /root/.claude -o -path /root/.cache/claude-cli-nodejs -o -path '/tmp/claude-*' -o -path /home/claude \) -prune -o -newer "$MULAI" -type f -print 2>/dev/null | grep -vE '^/etc/(hosts|hostname|resolv\.conf)$')
[ -z "$LUAR" ] && echo "tidak ada" >> "$L" || echo "$LUAR" >> "$L"
rm -f "$MULAI"
echo; cat "$L"
