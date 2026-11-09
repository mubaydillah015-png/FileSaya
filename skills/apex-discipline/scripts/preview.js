// Pemakaian: node preview.js anim.html folder_keluaran detik1 detik2 ...
// Menyimpan screenshot 1080x1920 dari halaman animasi pada detik-detik tertentu
// (untuk cek cepat sebelum render, atau untuk gambar preview per scene).
const {chromium} = require('playwright');
const path = require('path');
const fs = require('fs');
(async () => {
  const [html, outDir, ...times] = process.argv.slice(2);
  fs.mkdirSync(outDir, {recursive: true});
  const b = await chromium.launch();
  const p = await b.newPage({viewport: {width: 300, height: 533}, deviceScaleFactor: 3.6});
  p.on('pageerror', e => console.log('ERROR halaman:', e.message));
  await p.goto('file://' + path.resolve(html));
  await p.waitForTimeout(2500);
  for (const t of times) {
    await p.evaluate(t => setTime(t), Number(t));
    const f = path.join(outDir, `t_${t}.png`);
    await p.screenshot({path: f});
    console.log(f);
  }
  await b.close();
})();
