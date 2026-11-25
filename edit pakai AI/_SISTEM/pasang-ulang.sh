#!/usr/bin/env bash
# Memasang ulang seluruh studio di _SISTEM (dipakai kalau server cloud diganti).
# Pakai:  bash "<folder utama>/_SISTEM/pasang-ulang.sh"
# Semua yang sudah ada dilewati, jadi aman dijalankan berkali-kali.
set -euo pipefail
source "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/studio.sh"
T="$STUDIO/tools"; C="$STUDIO/cache"; DL="$STUDIO_KERJA/unduhan"

# Aturan: folder milik pengguna TIDAK boleh dibuat diam-diam.
for d in "$STUDIO_HASIL" "$STUDIO_BAHAN" "$STUDIO_REF"; do
  if [ ! -d "$d" ]; then echo "BERHENTI: folder tidak ditemukan: $d  -> tanyakan ke pengguna dulu."; exit 1; fi
done
mkdir -p "$T" "$STUDIO/projects" "$C" "$STUDIO_KERJA" "$STUDIO/tes" "$DL"

# 1. Node.js portable (LTS terbaru)
if [ ! -x "$T/node/bin/node" ]; then
  NV=$(curl -fsSL https://nodejs.org/dist/index.json | python3 -I -c "import json,sys;print([r['version'] for r in json.load(sys.stdin) if r['lts']][0])")
  curl -fsSL -o "$DL/node.tar.xz" "https://nodejs.org/dist/$NV/node-$NV-linux-x64.tar.xz"
  mkdir -p "$T/node" && tar -xJf "$DL/node.tar.xz" -C "$T/node" --strip-components=1
fi
# 2. FFmpeg statis
if [ ! -x "$T/ffmpeg/bin/ffmpeg" ]; then
  curl -fsSL -o "$DL/ffmpeg.tar.xz" https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz
  mkdir -p "$T/ffmpeg" && tar -xJf "$DL/ffmpeg.tar.xz" -C "$T/ffmpeg" --strip-components=1
fi
# 3. yt-dlp (biner tunggal)
if [ ! -x "$T/yt-dlp/yt-dlp" ]; then
  mkdir -p "$T/yt-dlp" && curl -fsSL -o "$T/yt-dlp/yt-dlp" https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux && chmod +x "$T/yt-dlp/yt-dlp"
fi
# 4. whisper.cpp (dibangun dari kode sumber) + model small
if [ ! -x "$T/whisper/bin/whisper-cli" ]; then
  mkdir -p "$T/whisper/bin" "$T/whisper/models"
  [ -d "$T/whisper/src" ] || git clone --depth 1 https://github.com/ggml-org/whisper.cpp "$T/whisper/src"
  (cd "$T/whisper/src" && cmake -B build -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DWHISPER_BUILD_TESTS=OFF >/dev/null \
     && cmake --build build -j"$(nproc)" --config Release >/dev/null)
  cp "$T/whisper/src/build/bin/whisper-cli" "$T/whisper/src/build/bin/whisper-server" "$T/whisper/bin/"
fi
MODEL="${1:-small}"
if [ ! -s "$T/whisper/models/ggml-$MODEL.bin" ]; then
  curl -fsSL -o "$T/whisper/models/ggml-$MODEL.bin.part" "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-$MODEL.bin"
  mv "$T/whisper/models/ggml-$MODEL.bin.part" "$T/whisper/models/ggml-$MODEL.bin"
fi
# 5. Konfigurasi yt-dlp (selalu ditulis ulang supaya path-nya benar)
mkdir -p "$STUDIO/config/yt-dlp"
cat > "$STUDIO/config/yt-dlp/config" <<CFG
# yt-dlp: hanya 1 file .mp4 ke Referensi, file sementara di _SISTEM/kerja
-P "home:$STUDIO_REF"
-P "temp:$STUDIO_KERJA/yt-dlp"
--cache-dir "$C/yt-dlp"
--ffmpeg-location "$T/ffmpeg/bin"
-f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/bv*+ba/b"
--merge-output-format mp4
--remux-video mp4
-o "%(title).80B [%(id)s].%(ext)s"
--no-write-thumbnail
--no-write-subs
--no-write-auto-subs
--no-write-info-json
--no-write-description
--no-embed-metadata
--no-mtime
--no-playlist
--compat-options no-certifi
CFG
cat > "$STUDIO/config/npmrc" <<CFG
cache=$C/npm
prefix=$C/npm-global
fund=false
audit=false
update-notifier=false
CFG
# 6. Project Remotion & HyperFrames (dependensi dari package-lock.json)
(cd "$STUDIO/projects/remotion-studio" && [ -d node_modules ] || npm ci)
(cd "$STUDIO/projects/hyperframes-studio" && [ -d node_modules ] || npm ci)
cp "$STUDIO/projects/hyperframes-studio/node_modules/gsap/dist/gsap.min.js" "$STUDIO/projects/hyperframes-studio/tes-studio/assets/gsap.min.js"
# 7. Browser untuk render (disimpan di _SISTEM/cache)
RB="$C/remotion-browser/chrome-headless-shell-linux64/chrome-headless-shell"
if [ ! -x "$RB" ]; then
  V=$(cd "$STUDIO/projects/remotion-studio" && node -p "require('@remotion/renderer/dist/browser/get-chrome-download-url').TESTED_VERSION")
  curl -fsSL -o "$DL/chs.zip" "https://remotion.media/chromium-headless-shell-linux-x64-$V.zip?clear"
  mkdir -p "$C/remotion-browser" && unzip -q -o "$DL/chs.zip" -d "$C/remotion-browser"
fi
(cd "$STUDIO/projects/hyperframes-studio" && npx hyperframes browser ensure >/dev/null)
rm -rf "$DL"
echo "Studio terpasang. Jalankan tes:  bash \"$STUDIO/tes-semua.sh\""
