# Studio editing - lingkungan kerja. Pakai: source "<folder utama>/_SISTEM/studio.sh"
export STUDIO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export STUDIO_UTAMA="$(dirname "$STUDIO")"
export STUDIO_HASIL="$STUDIO_UTAMA/Hasil final"
export STUDIO_BAHAN="$STUDIO_UTAMA/Baham edit"
export STUDIO_REF="$STUDIO_UTAMA/Referensi"
export STUDIO_KERJA="$STUDIO/kerja"
T="$STUDIO/tools"; C="$STUDIO/cache"
case ":$PATH:" in *":$T/node/bin:"*) ;; *)
  export PATH="$T/node/bin:$T/ffmpeg/bin:$T/whisper/bin:$T/yt-dlp:$PATH";; esac
# Cache & file sementara -> _SISTEM
export npm_config_cache="$C/npm"
export npm_config_prefix="$C/npm-global"
export npm_config_userconfig="$STUDIO/config/npmrc"
export PUPPETEER_CACHE_DIR="$C/puppeteer"
export PLAYWRIGHT_BROWSERS_PATH="$C/playwright"
export XDG_CACHE_HOME="$C/xdg-cache"
export XDG_CONFIG_HOME="$STUDIO/config"
export XDG_DATA_HOME="$C/xdg-data"
export XDG_STATE_HOME="$C/xdg-state"
export TMPDIR="$STUDIO_KERJA/tmp"; export TEMP="$TMPDIR"; export TMP="$TMPDIR"
export REMOTION_TMPDIR="$TMPDIR"
export NODE_COMPILE_CACHE="$C/node-compile-cache"
export NODE_EXTRA_CA_CERTS="${NODE_EXTRA_CA_CERTS:-/root/.ccr/ca-bundle.crt}"
export SSL_CERT_FILE="${SSL_CERT_FILE:-/root/.ccr/ca-bundle.crt}"
export WHISPER_MODEL="$T/whisper/models/ggml-small.bin"
export NEXT_TELEMETRY_DISABLED=1 DO_NOT_TRACK=1 HYPERFRAMES_TELEMETRY_DISABLED=1
# HyperFrames: pakai tools & cache di _SISTEM
export HYPERFRAMES_FFMPEG_PATH="$T/ffmpeg/bin/ffmpeg" HYPERFRAMES_FFPROBE_PATH="$T/ffmpeg/bin/ffprobe"
export HYPERFRAMES_WHISPER_PATH="$T/whisper/bin/whisper-cli"
export HYPERFRAMES_CACHE_DIR="$C/hyperframes" HYPERFRAMES_CONFIG_DIR="$STUDIO/config/hyperframes"
export HYPERFRAMES_FONT_CACHE_DIR="$C/hyperframes/fonts" HYPERFRAMES_EXTRACT_CACHE_DIR="$C/hyperframes/extract"
export HYPERFRAMES_MEDIA_HOME="$C/hyperframes/media" HYPERFRAMES_RENDER_LOCK_DIR="$STUDIO_KERJA/tmp/hf-lock"
export HYPERFRAMES_NO_TELEMETRY=1 HYPERFRAMES_NO_UPDATE_CHECK=1 HYPERFRAMES_NO_AUTO_INSTALL=1 HYPERFRAMES_SKIP_SKILLS=1
# Browser render: jangan pakai Chrome sistem di luar folder utama
unset PUPPETEER_EXECUTABLE_PATH CHROME_PATH CHROME_BIN PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD
mkdir -p "$TMPDIR" "$C/npm" "$C/puppeteer" "$C/xdg-cache" "$C/xdg-data" "$C/xdg-state" "$STUDIO/config"
unset T C
