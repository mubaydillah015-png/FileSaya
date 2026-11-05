#!/bin/bash
# Render versi pendek (105-120 detik): video + VO + musik + SFX
set -e
SP=$1; R=$(pwd); OUT=/home/user/FileSaya/output
rm -rf $SP/outs && mkdir -p $SP/outs
for i in 0 1 2 3; do PAGE=animate_short.html node $SP/full2.js $R $SP/outs $i 4 > $SP/outs/log$i.txt 2>&1 & done; wait
printf "file 'seg0.mp4'\nfile 'seg1.mp4'\nfile 'seg2.mp4'\nfile 'seg3.mp4'\n" > $SP/outs/list.txt
ffmpeg -y -loglevel error -f concat -safe 0 -i $SP/outs/list.txt -c copy $SP/outs/video.mp4
# VO track
node -e "
const S=require('./scenes_short.json');
const ins=S.map(s=>'-i vo_short/'+String(s.n).padStart(2,'0')+'.mp3').join(' ');
const f=S.map((s,i)=>'['+i+':a]adelay='+Math.round((s.T0+0.15)*1000)+'|'+Math.round((s.T0+0.15)*1000)+',aformat=channel_layouts=stereo[a'+i+']').join(';')+';'+S.map((_,i)=>'[a'+i+']').join('')+'amix=inputs='+S.length+':normalize=0[out]';
require('fs').writeFileSync('mix_short.sh','ffmpeg -y -loglevel error '+ins+' -filter_complex \"'+f+'\" -map [out] -ar 48000 -c:a pcm_s16le vo_track_short.wav\n');"
bash mix_short.sh
python3 music.py scenes_short.json music_short.wav
python3 sfx_cues.py scenes_short.json sfx_track_short.wav
ffmpeg -y -loglevel error -i vo_track_short.wav -i music_short.wav -i sfx_track_short.wav -filter_complex "[0:a]asplit=2[vo][key];[1:a]volume=-13dB[m];[m][key]sidechaincompress=threshold=0.03:ratio=5:attack=20:release=400[md];[vo][md][2:a]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]" -map "[out]" -ar 48000 -c:a pcm_s16le full_mix_short.wav
ffmpeg -y -loglevel error -i $SP/outs/video.mp4 -i full_mix_short.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart $OUT/papiyyar_final_117detik.mp4
ffprobe -v error -show_entries format=duration:stream=codec_type,width,height -of compact $OUT/papiyyar_final_117detik.mp4
