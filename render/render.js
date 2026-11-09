// Capture anim.html frame by frame at 1080x1920 / 30fps and pipe to ffmpeg.
const {chromium} = require('playwright');
const {spawn} = require('child_process');
const path = require('path');
(async () => {
  const dir = __dirname, FPS = 30;
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 300, height: 533}, deviceScaleFactor: 3.6});
  await p.goto('file://' + path.join(dir, 'anim.html'));
  await p.waitForTimeout(2500);
  const total = await p.evaluate(() => window.TOTAL);
  const n = Math.round(total * FPS);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-vf', 'scale=1080:1920:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', path.join(dir, 'video_only.mp4')],
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
  console.log('done');
})();
