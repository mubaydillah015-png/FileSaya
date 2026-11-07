// Render satu bagian video. Jalankan 4 bagian paralel:
//   for i in 0 1 2 3; do node render.js anim.html <durasi_detik> $i 4 & done; wait
// Hasil: part0.mp4 ... part3.mp4 (1080x1920, 30fps). Gabungkan dengan ffmpeg concat (lihat produksi.md).
// File HTML, tekstur (*.png) dan logo-papiyyar.jpg harus satu folder.
const {chromium}=require('playwright');const {spawn}=require('child_process');const path=require('path');
const [html,dur,part,parts]=process.argv.slice(2);const FPS=30,TOTAL=Math.ceil(Number(dur)*FPS);
const a=Math.floor(TOTAL*part/parts),b=Math.floor(TOTAL*(Number(part)+1)/parts);
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:360,height:640},deviceScaleFactor:3});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+path.resolve(html));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','18','-pix_fmt','yuv420p',`part${part}.mp4`],{stdio:['pipe','inherit','inherit']});
for(let f=a;f<b;f++){await p.evaluate(t=>render(t),f/FPS);const buf=await p.screenshot({type:'jpeg',quality:93});
 if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
 if((f-a)%300==0)console.log(`part${part} ${f-a}/${b-a}`);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();console.log(`part${part} done`);})();
