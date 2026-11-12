// Render frame uji di detik tertentu lalu susun jadi satu lembar (wajib dilihat sebelum render penuh).
//   node test_frames.js anim.html 1.5 5.5 12 ...   -> test_sheet.jpg (7 kolom)
// Untuk gambar storyboard: ambil satu waktu per scene, lalu susun 6 per lembar (lihat produksi.md).
const {chromium}=require('playwright');const {execFileSync}=require('child_process');const path=require('path');
const [html,...ts]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:360,height:640},deviceScaleFactor:1});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
const files=[];for(const [i,t] of ts.entries()){const f=`t_${String(i).padStart(2,'0')}.png`;await p.evaluate(t=>render(t),Number(t));await p.screenshot({path:f});files.push(f)}
await b.close();
execFileSync('python3',['-c',`import sys\nfrom PIL import Image\nfs=sys.argv[1:];c=7;r=(len(fs)+c-1)//c\ns=Image.new('RGB',(360*c,640*r))\nfor i,f in enumerate(fs): s.paste(Image.open(f),((i%c)*360,(i//c)*640))\ns.save('test_sheet.jpg',quality=80)`,...files]);
console.log('test_sheet.jpg');})();
