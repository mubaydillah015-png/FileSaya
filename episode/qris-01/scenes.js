B.length=0;B.push(0,3.4,6.0,8.37,11.72,15.68,20.37,25.77,31.06,33.92,36.5,39.14,41.8,47.11,51.56,55.47,60.37);
const NK=54; // jumlah frame KLIP-1
// ---- props khusus episode QRIS ----
const sack=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#sh)"><path d="M-26 -30 Q-30 -40 -20 -42 L20 -42 Q30 -40 26 -30 Q36 0 30 30 Q0 38 -30 30 Q-36 0 -26 -30Z" fill="#efe6d0" stroke="#fff" stroke-width="3"/><path d="M-20 -36 Q0 -30 20 -36" stroke="#b59a63" stroke-width="3" fill="none"/><text x="0" y="8" class="hd" font-size="13" fill="${R}" text-anchor="middle">BERAS</text></g>`;
function qr(x,y,size,seed=7){const n=13,c=size/n;let s=`<rect x="${x-4}" y="${y-4}" width="${size+8}" height="${size+8}" fill="#fff"/>`;
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const fin=(i<3&&j<3)||(i<3&&j>n-4)||(i>n-4&&j<3);const on=fin?!(i%2==1&&j%2==1&&!(i==1&&j==1)&&false):(((i*31+j*17+seed*13)*(i+3))%7<3);
  if(fin){continue} if(on)s+=`<rect x="${x+j*c}" y="${y+i*c}" width="${c}" height="${c}" fill="${INK}"/>`}
 [[0,0],[0,n-3],[n-3,0]].forEach(([i,j])=>{s+=`<rect x="${x+j*c}" y="${y+i*c}" width="${c*3}" height="${c*3}" fill="${INK}"/><rect x="${x+j*c+c*.6}" y="${y+i*c+c*.6}" width="${c*1.8}" height="${c*1.8}" fill="#fff"/><rect x="${x+j*c+c}" y="${y+i*c+c}" width="${c}" height="${c}" fill="${INK}"/>`});return s}
const phone=(x,y,w,h,inner,rot=0)=>`<g transform="rotate(${rot} ${x+w/2} ${y+h/2})">${P(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${INK}" stroke="#fff" stroke-width="4"/>`)}<rect x="${x+8}" y="${y+18}" width="${w-16}" height="${h-36}" rx="4" fill="#fbf8f2"/>${inner}</g>`;
const okScreen=(x,y,w)=>`<circle cx="${x+w/2}" cy="${y+58}" r="24" fill="#2e8b57"/><path d="M${x+w/2-11} ${y+58} l7 8 l14 -16" stroke="#fff" stroke-width="5" fill="none"/><text x="${x+w/2}" y="${y+108}" class="cap" font-size="13" fill="${INK}" text-anchor="middle">Pembayaran Berhasil</text><text x="${x+w/2}" y="${y+134}" class="hd" font-size="22" fill="${INK}" text-anchor="middle">Rp4.320.000</text><rect x="${x+16}" y="${y+150}" width="${w-32}" height="6" fill="#ddd"/><rect x="${x+16}" y="${y+164}" width="${w-60}" height="6" fill="#ddd"/>`;
const person=(x,y,s=1,fill='#1a1a1a')=>`<g transform="translate(${x},${y}) scale(${s})"><circle cx="0" cy="-58" r="15" fill="${fill}"/><path d="M-24 30 Q-26 -40 0 -40 Q26 -40 24 30Z" fill="${fill}"/></g>`;
const darkBox=(t,x,y,w,size,fill='#fff',rot=-3,h)=>{h=h||size*1.55;return `<g transform="rotate(${rot} ${x+w/2} ${y+h/2})">${P(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${DARK}"/>`)}<text x="${x+w/2}" y="${y+h/2+size*0.36}" class="hd" font-size="${size}" fill="${fill}" text-anchor="middle">${t}</text></g>`};

// 1 HOOK
S.push(()=>bg('cork')+label('// 01 · HOOK',1)
 +head('PEDAGANG',0.05,105,50,'#fff')+head('DIBAYAR...',0.45,160,50,'#fff')
 +fotoTKP('THUMB.jpg',26,190,290,163,0.25,{sumber:'detikcom',rot:-3,dugaan:true,capPos:[250,330]})
 +A(darkBox(`PAKAI <tspan fill="${R}">GAMBAR?</tspan>`,18,400,300,40,'#fff',-3),1.0,'stamp',0.3)
 +D([[T0,'mag']],232,470,.78));
// 2
S.push(()=>{let s=bg('paper')+label('// 01 · HOOK')+caption('Enam karung beras,','lunas?','',0,3.55);
 for(let i=0;i<6;i++){const col=i%3,row=i<3?1:0;s+=A(sack(48+col*58,330-row*60,0.85),3.55+i*0.12,'down',0.35)}
 s+=A(phone(222,150,116,210,`<rect x="236" y="176" width="88" height="150" fill="none" stroke="${R}" stroke-width="2" stroke-dasharray="5 4"/>`+okScreen(230,170,100).replace('font-size="22"','font-size="15"').replace('font-size="13"','font-size="9"'),5),4.4,'right',0.35);
 s+=head('PAKAI SCREENSHOT',4.6,130,32,INK)+cap('LUNAS?',280,390,5.2,-10,24);
 return s+D([[T0,'squint']],40,470,.7)});
// 3 TKP klip
S.push(()=>bg('cork')+label('// 02 · TKP',1)+caption('Lu pasti udah','denger.','',1,6.15)
 +fotoTKP(klip('KLIP-1',15,NK,6.1),40,96,190,338,6.05,{sumber:'Kompas TV, 5 Okt 2026',rot:-2,kb:false})
 +A(`<g transform="rotate(8 290 200)">${P(`<rect x="242" y="170" width="100" height="56" fill="${KRAFT}"/>`)}<text x="292" y="194" class="mono" font-size="11" fill="${INK}" text-anchor="middle">KASUS</text><text x="292" y="215" class="hd" font-size="17" fill="${R}" text-anchor="middle">QRIS #1</text></g>`,6.6,'stamp',0.3)
 +D([[T0,'mag']],232,470,.78));
// 4 peta
S.push(()=>{const map=`<path d="M120 170 Q150 150 170 175 Q185 210 175 250 Q190 300 182 350 Q175 395 150 410 Q125 420 118 395 Q130 360 128 320 Q110 280 118 240 Q95 210 120 170Z" fill="${KRAFT}" stroke="#fff" stroke-width="4"/>`;
 return bg('paper')+label('// 02 · TKP')+caption('Pasutri borong','sembako.','',0,8.52)
 +A(P(map),8.6,'fade',0.4)+(TG>10.0?pin(140,378):'')+(TG>10.7?pin(162,392):'')+thread('140,378 162,392',10.7)
 +tag('MAKASSAR',40,368,10.0)+tag('GOWA',178,404,10.7)
 +A(sack(255,190,0.7),9.0,'pop')+A(`<g transform="translate(300,250)" filter="url(#sh)"><rect x="-12" y="-28" width="24" height="52" rx="5" fill="#f2c94c" stroke="#fff" stroke-width="3"/><rect x="-6" y="-38" width="12" height="12" fill="${R}"/><text x="0" y="6" class="hd" font-size="8" fill="${INK}" text-anchor="middle">MINYAK</text></g>`,9.3,'pop')
 +A(`<g transform="translate(250,280)" filter="url(#sh)"><rect x="-20" y="-16" width="40" height="34" fill="#fff" stroke="#ddd"/><text x="0" y="6" class="hd" font-size="11" fill="${INK}" text-anchor="middle">GULA</text></g>`,9.6,'pop')
 +head('MAKASSAR · GOWA',10.3,140,30,R)+D([[T0,'point']],232,470,.78)});
// 5 QRIS katanya
S.push(()=>{const after=TG>=14.01;let s=bg('paper')+label('// 02 · TKP')+caption(after?'Duitnya nggak pernah':'Bayar pakai QRIS,',after?'masuk.':'katanya.','',0,after?14.01:11.87);
 s+=A(phone(36,150,150,260,qr(56,200,110,3)+`<text x="111" y="345" class="mono" font-size="10" fill="#777" text-anchor="middle">scan untuk bayar</text>`,-4),11.9,'left',0.35);
 if(after)s+=A(phone(196,160,140,240,`<text x="266" y="215" class="mono" font-size="10" fill="#777" text-anchor="middle">SALDO MASUK</text><text x="266" y="260" class="hd" font-size="40" fill="${R}" text-anchor="middle">Rp0</text>`,4),14.05,'right',0.35)+cap('NGGAK MASUK',266,380,14.9,-10,20);
 return s+D([[T0,'idle'],[14.0,'squint']],-10,470,.7)});
// 6 diamankan
S.push(()=>bg('cork')+label('// 02 · TKP',1)+caption('Diduga pelaku','diamankan.','',1,16.52)
 +A(`<g transform="rotate(6 300 115)">${P(`<rect x="262" y="78" width="78" height="76" fill="#fff"/>`)}<rect x="262" y="78" width="78" height="20" fill="${R}"/><text x="301" y="93" class="mono" font-size="11" fill="#fff" text-anchor="middle">OKTOBER</text><text x="301" y="140" class="hd" font-size="38" fill="${INK}" text-anchor="middle">2</text></g>`,15.85,'down',0.4)
 +fotoTKP('FOTO-2.jpg',30,170,160,278,16.5,{sumber:'Kompas TV',rot:-3,dugaan:true,capPos:[110,420]})
 +fotoTKP('FOTO-1.jpg',205,190,118,145,17.6,{rot:4,kb:false})+tag('RESMOB POLDA SULSEL',190,360,18.2)
 +D([[T0,'squint']],240,480,.68));
// 7 hitungan
S.push(()=>bg('paper')+label('// 03 · BARANG BUKTI')+caption('Barang bukti','pertama.','',0,20.52)+badge(1,20.6)
 +hitung(['6 karung beras','1 warung, 1 kali bayar'],'Rp4.320.000',28,160,300,22.6,0.6)
 +A(sack(70,420,0.8),22.6,'pop')+A(sack(120,430,0.8),22.75,'pop')+A(sack(170,420,0.8),22.9,'pop')
 +D([[T0,'point']],232,470,.78));
// 8 kerugian + 2 HP
S.push(()=>{const g=cl((TG-26.6)/0.8);let s=bg('paper')+label('// 03 · BARANG BUKTI')+caption('Kerugian toko lain','5–10 juta.','',0,25.92);
 s+=A(P(`<rect x="24" y="110" width="312" height="140" fill="${KRAFT}"/>`)+`<text x="38" y="132" class="mono" font-size="11" fill="#6b5a3a">// KERUGIAN PER TOKO</text>`,25.9,'fade',0.25);
 if(TG>26.6){s+=`<rect x="40" y="150" width="${130*g}" height="34" fill="${INK}"/><text x="${48+130*g}" y="174" class="hd" font-size="20" fill="${INK}">5 JT</text><rect x="40" y="196" width="${250*g}" height="34" fill="${R}"/><text x="${46+250*g-60}" y="220" class="hd" font-size="20" fill="#fff">10 JT</text>`}
 s+=fotoTKP('FOTO-3.jpg',34,270,150,233,29.2,{sumber:'Kompas TV',rot:-3})+tag('BARANG BUKTI: 2 HP',190,300,29.7);
 return s+D([[T0,'squint']],232,470,.78)});
// 9 positif dulu
S.push(()=>{let s=bg('paper')+label('// 03 · BARANG BUKTI')+caption('Gua coba','positif dulu.','',0,31.21)+head('PEDAGANG KAN SIBUK',32.58,140,30,INK);
 s+=A(P(`<rect x="20" y="330" width="210" height="16" fill="#8a5a33"/>`),31.3,'fade');
 for(let i=0;i<4;i++)s+=A(person(50+i*45,318,0.8,['#2b2b2b','#555','#3b2a1e','#6b4a2f'][i]),31.4+i*0.12,'up',0.3);
 const a=TG*6;s+=A(`<g transform="translate(150,230)" filter="url(#sh)"><circle r="34" fill="#fff"/><circle r="30" fill="none" stroke="${INK}" stroke-width="3"/><line x1="0" y1="0" x2="${Math.sin(a)*22}" y2="${-Math.cos(a)*22}" stroke="${R}" stroke-width="4"/><line x1="0" y1="0" x2="${Math.sin(a/12)*14}" y2="${-Math.cos(a/12)*14}" stroke="${INK}" stroke-width="4"/></g>`,31.5,'pop');
 return s+D([[T0,'shrug']],232,470,.78)});
// 10 saksi
S.push(()=>bg('dark')+label('// 03 · BARANG BUKTI',1)+caption('Kedua,','saksi.','',1,34.07)+badge(2,34.2)+head('KETERANGAN SAKSI',34.7,140,32,'#fff')
 +saksi('@beast***','pake qris yang kalo masuk bunyi min','8',24,175,300,35.0,'bunyi')
 +saksi('@a***','di dana ku langsung masuk kalo pake qris/dana bisnis','',40,290,290,35.4)
 +saksi('@serly***','sdh perna jg karyawan di tempat krjku di tipu ini','',28,400,280,35.8));
// 11 bunyi
S.push(()=>{const ring=TG>38.29;const sh=ring?Math.sin(TG*70)*4*Math.max(0,1-(TG-38.29)/0.8):0;
 let s=bg('dark')+label('// 03 · BARANG BUKTI',1)+caption('Kalau duit masuk,','bunyi.','',1,36.65)+head('DUIT MASUK = BUNYI',37.3,140,30,'#ff8a9a');
 s+=`<g transform="translate(${sh},0)">`+A(phone(110,180,140,250,`<text x="180" y="260" class="mono" font-size="10" fill="#777" text-anchor="middle">NOTIFIKASI</text><text x="180" y="300" class="hd" font-size="19" fill="#2e8b57" text-anchor="middle">+Rp4.320.000</text>`),36.7,'up',0.35)+'</g>';
 if(ring){for(let k=0;k<3;k++){const p=((TG-38.29)*1.6+k/3)%1;s+=`<path d="M${262+p*30} ${270-p*30} q${14+p*10} ${30+p*10} 0 ${60+p*40}" stroke="#ff8a9a" stroke-width="4" fill="none" opacity="${1-p}"/><path d="M${98-p*30} ${270-p*30} q${-14-p*10} ${30+p*10} 0 ${60+p*40}" stroke="#ff8a9a" stroke-width="4" fill="none" opacity="${1-p}"/>`}
  s+=A(`<text x="180" y="500" class="hd" font-size="72" fill="#fff" text-anchor="middle" transform="rotate(-6 180 480)">TING!</text>`,38.3,'stamp',0.25)}
 return s});
// 12 bukti editan
S.push(()=>{const peel=cl((TG-40.4)/0.5);let s=bg('paper')+label('// 04 · TWIST')+caption('Pelaku nunjukin','bukti editan.','',0,39.29);
 s+=A(`<g>${phone(90,140,180,320,`<rect x="98" y="158" width="164" height="284" fill="#fbf8f2"/><text x="180" y="300" class="hd" font-size="54" fill="${R}" text-anchor="middle" transform="rotate(-12 180 290)">EDIT</text><text x="180" y="340" class="mono" font-size="11" fill="#777" text-anchor="middle">layer: gambar.jpg</text>`)}`
  +`<g transform="translate(${peel*220} ${-peel*60}) rotate(${peel*25} 260 160)" opacity="${1-peel*0.15}"><rect x="98" y="158" width="164" height="284" fill="#fff" stroke="#ddd"/>${okScreen(98,180,164)}</g></g>`,39.3,'up',0.35);
 s+=head('MODUS',39.4,135,30,R)+cap('PALSU',100,450,40.9,-14,24);
 return s+D([[T0,'squint']],232,480,.7)});
// 13 lupa cek, pelaku pergi
S.push(()=>{const gone=TG>=45.12;const dim=gone?cl((TG-45.12)/0.6)*0.55:0;let s=bg('paper')+label('// 04 · TWIST')+caption(gone?'Sadar setelah pelaku':'Lupa cek HP',gone?'pergi.':'sendiri.','',0,gone?45.12:41.95);
 s+=A(P(`<rect x="10" y="380" width="340" height="26" fill="#8a5a33"/>`),41.9,'fade');
 s+=A(`<g transform="rotate(-8 120 360)">${P(`<rect x="70" y="350" width="110" height="26" rx="6" fill="${INK}"/>`)}</g>`,42.0,'pop');
 s+=`<g opacity="${1-cl(dim*2)}">`+A(`<g transform="translate(220,250)" filter="url(#sh)"><circle r="30" fill="#fff"/><path d="M-16 -2 L0 -14 L16 -2Z M-14 0 h28 v14 h-28z" fill="${INK}"/><rect x="-10" y="2" width="4" height="10" fill="#fff"/><rect x="-2" y="2" width="4" height="10" fill="#fff"/><rect x="6" y="2" width="4" height="10" fill="#fff"/></g>`,42.6,'pop')
  +A(`<g transform="translate(290,250)" filter="url(#sh)"><circle r="30" fill="#fff"/><rect x="-16" y="-11" width="32" height="22" rx="4" fill="${INK}"/><rect x="4" y="-4" width="12" height="8" rx="2" fill="${R}"/></g>`,43.0,'pop')
  +tag('M-BANKING',190,288,42.8)+tag('E-WALLET',262,288,43.2)+cap('BELUM DICEK',255,345,43.8,-8,18)+'</g>';
 if(gone){const p=cl((TG-45.3)/1.6);s+=`<g transform="translate(${-20+p*330},0)" opacity="${1-cl((p-0.8)/0.2)}">${person(0,350,1.1)}${sack(10,270,0.6)}${person(52,355,1)}${sack(60,280,0.55)}</g>`;
  s+=`<rect width="360" height="640" fill="#000" opacity="${dim}"/>`+head('BARU SADAR…',45.6,150,40,'#fff')}
 else s+=head('LUPA CEK HP SENDIRI',42.6,140,28,R);
 return s+D([[T0,'glasses'],[45.2,'palm']],232,480,.7)});
// 14 PAPIYYAR
S.push(()=>{const lt=TG-T0;const slash=cl(lt/0.15);const punch=lt<0.5?1+0.35*(1-outCubic(cl(lt/0.5))):1;
 const stut=(lt>0.15&&lt<0.45)?[[0,0],[8,-6],[-7,5],[5,4]][Math.floor(lt*30)%4]:[0,0];const shake=lt<0.6?Math.sin(lt*80)*4*(1-lt/0.6):0;
 let body=`<rect width="360" height="640" fill="${R}"/><path d="M-20 520 L380 120" stroke="#fff" stroke-width="16"/><path d="M-20 545 L380 145" stroke="${DARK}" stroke-width="6"/>`
 +A(torn(-10,-10,90,90,PAPER,1),T0+0.1,'left',0.2)+A(torn(280,-10,90,90,PAPER,2),T0+0.13,'right',0.2)+A(torn(-10,560,90,90,PAPER,3),T0+0.16,'left',0.2)+A(torn(280,560,90,90,PAPER,4),T0+0.19,'right',0.2)
 +A(`<g transform="rotate(-8 180 150)"><text x="180" y="165" class="hd" font-size="76" fill="#fff" text-anchor="middle" stroke="${DARK}" stroke-width="3" paint-order="stroke">PAPI<tspan fill="${DARK}" stroke="#fff">YY</tspan>AR!</text></g>`,T0+0.12,'stamp',0.22);
 body+=A(`<g>${P(`<rect x="24" y="218" width="150" height="150" fill="${DARK}"/>`)}${sack(99,280,1)}<text x="99" y="352" class="hd" font-size="24" fill="#fff" text-anchor="middle">ASLI</text>${check(150,240)}</g>`,48.57,'left',0.3);
 body+=A(`<g transform="rotate(4 260 300)">${P(`<rect x="186" y="218" width="150" height="150" fill="${DARK}"/>`)}<rect x="206" y="232" width="110" height="92" fill="#fbf8f2" stroke="#fff" stroke-dasharray="4 3"/><circle cx="261" cy="262" r="14" fill="#2e8b57"/><path d="M255 262 l4 5 l8 -10" stroke="#fff" stroke-width="3" fill="none"/><text x="261" y="300" class="cap" font-size="9" fill="${INK}" text-anchor="middle">Pembayaran Berhasil</text><text x="261" y="352" class="hd" font-size="22" fill="#fff" text-anchor="middle">BOHONGAN</text></g>`,49.69,'right',0.3)+(TG>50.1?xmark(261,278,30,50.1):'');
 body+=A(`<text x="300" y="440" class="kw" font-size="40" fill="#fff" text-anchor="middle">Cong.</text>`,51.04,'pop')+D([[T0,'glasses'],[51.04,'squint']],40,430,1.05);
 const wipe=slash<1?`<rect width="360" height="640" fill="#fff" opacity="${1-slash}"/>`:'';
 return `<g transform="translate(${stut[0]+shake} ${stut[1]}) translate(180 320) scale(${punch}) translate(-180 -320)">${body}</g>${wipe}`});
// 15 VONIS
S.push(()=>`<rect width="360" height="640" fill="${DARK}"/>`+label('// 05 · VONIS',1)+caption('Bukti','bayar?','',1,51.71)
 +A(`<text x="180" y="290" class="hd" font-size="62" fill="#fff" text-anchor="middle">BUNYI HP LU.</text>`,52.77,'stamp',0.3)
 +A(`<text x="180" y="360" class="hd" font-size="40" fill="#ff8a9a" text-anchor="middle">BUKAN GAMBAR</text>`,53.5,'pop',0.3)
 +A(`<text x="180" y="405" class="hd" font-size="40" fill="#ff8a9a" text-anchor="middle">HP ORANG.</text>`,54.1,'pop',0.3)
+D([[T0,'glasses']],232,480,.7));
// 16 PENUTUP
S.push(()=>{const typed='salah siapa?';const n=Math.max(0,Math.min(typed.length,Math.floor((TG-56.3)*9)));const cur=(TG*2|0)%2?'|':'';
 return bg('paper')+label('// penutup')+caption('Menurut lu,','salah siapa?','',0,55.62)+head('TULIS DI KOMEN',56.9,125,34)
 +A(P(`<rect x="20" y="145" width="280" height="110" rx="10" fill="#fff"/>`)+`<text x="34" y="173" class="cap" font-size="13" fill="${INK}">Pedagang lengah, atau penipu?</text><rect x="34" y="190" width="252" height="40" rx="20" fill="#f1f1f1"/><text x="50" y="215" class="cap" font-size="14" fill="#777">${typed.slice(0,n)}${cur}</text>`,56.0,'pop')
 +A(`<g transform="rotate(-6 180 345)">${P(`<circle cx="180" cy="345" r="54" fill="#fff"/>`)}<g transform="translate(180,345)"><image href="logo-papiyyar.jpg" x="-50" y="-50" width="100" height="100" clip-path="url(#lc2)"/></g>${tape(155,283,8)}</g>`,57.6,'stamp',0.3)
 +A(P(`<rect x="40" y="430" width="160" height="40" rx="20" fill="${R}"/>`)+`<text x="120" y="457" class="hd" font-size="18" fill="#fff" text-anchor="middle">IKUTI @PAPIYYAR</text>`,58.24,'pop')
 +A(`<g transform="rotate(8 90 525)">${P(`<rect x="12" y="505" width="170" height="34" fill="${INK}"/>`)}<text x="97" y="528" class="hd" font-size="16" fill="#fff" text-anchor="middle">KASUS QRIS #2 SEGERA</text></g>`,58.8,'stamp',0.25)
 +(TG>55.8?Array.from({length:14},(_,i)=>{const t=TG-55.8;const x=(i*53)%340+10,y=-20+((t*(60+i*9))+i*37)%680;return torn(x,y,14,8,i%3?R:'#999',i)}).join(''):'')
 +D([[T0,'point']],232,470,.78)});
