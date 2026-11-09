// Pemakaian: node render.js anim.html hasil_video.mp4 [fps=30]
// Merekam halaman animasi (yang punya window.setTime(t) dan window.TOTAL) frame per frame,
// lalu menyalurkannya ke ffmpeg -> MP4 1080x1920 tanpa audio.
const {chromium} = require('playwright');
const {spawn} = require('child_process');
const path = require('path');
(async () => {
  const html = path.resolve(process.argv[2] || 'anim.html');
  const out = path.resolve(process.argv[3] || 'video_only.mp4');
  const FPS = Number(process.argv[4] || 30);
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 300, height: 533}, deviceScaleFactor: 3.6});
  p.on('pageerror', e => console.log('ERROR halaman:', e.message));
  await p.goto('file://' + html);
  await p.waitForTimeout(2500); // beri waktu font & gambar termuat
  const fontOk = await p.evaluate(() => document.fonts.check('900 20px Montserrat'));
  if (!fontOk) console.log('PERINGATAN: font Montserrat belum termuat, cek koneksi/font');
  const total = await p.evaluate(() => window.TOTAL);
  const n = Math.round(total * FPS);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=1080:1920:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', out],
    {stdio: ['pipe', 'inherit', 'inherit']});
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => setTime(t), i / FPS);
    const buf = await p.screenshot({type: 'jpeg', quality: 93});
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log('frame', i, '/', n);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
  console.log('done', out);
})();
