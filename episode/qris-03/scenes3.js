B.length=0;B.push(0,2.55,3.8,6.9,11.3,15.62,17.6,25.42,28.3,32.5,34.6,38.4,42.6,44.4,51.64);
const NK=61;
const simul=(x,y,ts)=>cap('SIMULASI',x,y,ts,-10,16);
const menuCard=(x,y,s,fake=0)=>`<g transform="translate(${x},${y}) scale(${s})">${P(`<rect x="0" y="0" width="120" height="130" rx="4" fill="#1a1a1a"/>`)}<text x="60" y="16" class="cap" font-size="10" fill="#ccc" text-anchor="middle">Pindai Menu</text><rect x="20" y="24" width="80" height="80" fill="#fff"/>${qr(25,29,70,4)}<text x="60" y="122" class="cap" font-size="10" fill="#ccc" text-anchor="middle">Scan di sini</text>${fake>0?`<g transform="translate(${(1-fake)*150} ${-(1-fake)*90}) rotate(${(1-fake)*-20} 60 64)"><rect x="18" y="22" width="84" height="84" fill="#fff" stroke="${R}" stroke-width="2" stroke-dasharray="4 3"/>${qr(25,29,70,11)}</g>`:''}</g>`;
const plate=(x,y,s=1)=>`<g transform="translate(${x},${y}) scale(${s})" filter="url(#sh)"><ellipse rx="44" ry="16" fill="#fff" stroke="#ddd" stroke-width="2"/><path d="M-26 -4 Q-20 -28 0 -26 Q22 -28 26 -4Z" fill="#e8a33d"/><path d="M-16 -10 q6 -6 12 0 q6 -6 12 0" stroke="#fff3c4" stroke-width="3" fill="none"/></g>`;
const keypad=(x,y,n)=>{let s=`<text x="${x+50}" y="${y}" class="hd" font-size="20" fill="${INK}" text-anchor="middle" letter-spacing="4">${'●'.repeat(n)}${'○'.repeat(6-n)}</text>`;for(let i=0;i<9;i++)s+=`<circle cx="${x+15+(i%3)*35}" cy="${y+28+Math.floor(i/3)*30}" r="11" fill="#e9e4d8"/><text x="${x+15+(i%3)*35}" y="${y+33+Math.floor(i/3)*30}" class="cap" font-size="11" fill="${INK}" text-anchor="middle">${i+1}</text>`;return s};
// 1 HOOK
S.push(()=>bg('cork')+label('// 01 · HOOK',1)
 +head('LU CUMA',0.05,100,50,'#fff')+head('SCAN MENU...',0.35,152,46,'#fff')
 +fotoTKP('THUMB.jpg',30,180,250,245,0.2,{sumber:'@indomietelor_2 (TikTok)',rot:-3})+simul(235,215,0.6)
 +A(darkBox(`3 BULAN <tspan fill="${R}">KEMUDIAN…</tspan>`,40,470,280,34,'#fff',-3),1.41,'stamp',0.3));
// 2 saldo nol
S.push(()=>{const sh=TG>2.65?Math.sin(TG*60)*5*Math.max(0,1-(TG-2.65)/0.5):0;return `<rect width="360" height="640" fill="${DARK}"/>`+label('// 01 · HOOK',1)+caption('Saldo','lu…','',1,2.65)
 +`<g transform="translate(${sh},0)">`+A(`<text x="180" y="330" class="hd" font-size="120" fill="#ff8a9a" text-anchor="middle">Rp0?</text>`,2.65,'stamp',0.3)+'</g>'});
// 3 klip simulasi
S.push(()=>bg('cork')+label('// 02 · TKP',1)+caption('Lu pasti udah','lihat.','',1,3.85)
 +fotoTKP(klip('KLIP-1',15,NK,3.85),40,96,190,338,3.8,{sumber:'@indomietelor_2 (TikTok)',rot:-2,kb:false})
 +A(`<g transform="rotate(8 290 200)">${P(`<rect x="242" y="170" width="100" height="56" fill="${KRAFT}"/>`)}<text x="292" y="194" class="mono" font-size="11" fill="${INK}" text-anchor="middle">KASUS</text><text x="292" y="215" class="hd" font-size="17" fill="${R}" text-anchor="middle">QRIS #3</text></g>`,4.4,'stamp',0.3)
 +simul(290,280,5.0)+D([[T0,'mag']],232,470,.78));
// 4 malam: stiker ditempel
S.push(()=>{const f=cl((TG-9.6)/0.8);return bg('dark')+label('// 02 · TKP',1)+caption(TG<8.06?'Malam':'Oknum karyawan',TG<8.06?'sebelumnya.':'nempelin stiker.','',1,TG<8.06?7.02:8.06)
 +A(`<g transform="translate(300,110)">${icon('moon',0,0,.9)}</g>`,7.0,'pop')
 +A(P(`<rect x="20" y="300" width="320" height="150" fill="#4a3322"/>`),7.1,'fade')
 +A(menuCard(110,250,1.15,TG>9.4?outCubic(f):0),7.2,'up',0.35)
 +tag('OKNUM KARYAWAN',30,200,8.3)+(TG>10.3?cap('QR PALSU',180,480,10.3,-8,22):'')+simul(290,200,8.8)});
// 5 scan pesan bayar -> m-banking palsu
S.push(()=>{const fake=TG>=13.64;let s=bg('paper')+label('// 02 · TKP')+caption(fake?'Yang kebuka mirip':'Scan, pesan,',fake?'m-banking.':'bayar.','',0,fake?13.64:11.39);
 ['SCAN','PESAN','BAYAR'].forEach((w,i)=>{s+=tag(w,30+i*70,110,[11.39,12.40,12.98][i])});
 s+=A(phone(95,150,170,300,fake?`<rect x="103" y="168" width="154" height="22" fill="#eee"/><text x="180" y="183" class="mono" font-size="10" fill="${R}" text-anchor="middle">bank-1ogin.xyz</text><text x="180" y="230" class="hd" font-size="22" fill="#1d4ed8" text-anchor="middle">m-Banking</text><rect x="115" y="250" width="130" height="26" rx="4" fill="#fff" stroke="#bbb"/><text x="122" y="268" class="cap" font-size="10" fill="#999">Username</text><rect x="115" y="285" width="130" height="26" rx="4" fill="#fff" stroke="#bbb"/><text x="122" y="303" class="cap" font-size="10" fill="#999">PIN</text><rect x="115" y="322" width="130" height="28" rx="14" fill="#1d4ed8"/><text x="180" y="341" class="cap" font-size="11" fill="#fff" text-anchor="middle">Masuk</text>`:`<text x="180" y="230" class="cap" font-size="12" fill="${INK}" text-anchor="middle">Menu Mini Resto</text>${plate(180,290,.9)}<rect x="115" y="350" width="130" height="28" rx="14" fill="#2e8b57"/><text x="180" y="369" class="cap" font-size="11" fill="#fff" text-anchor="middle">Bayar</text>`),11.3,'up',0.35);
 if(fake)s+=`<ellipse cx="180" cy="179" rx="82" ry="16" fill="none" stroke="${R}" stroke-width="3" ${draw(520,14.4,0.4)}/>`+cap('HALAMAN PALSU',180,490,14.9,-8,20);
 return s+D([[T0,'point']],232,480,.65)});
// 6 username + PIN diketik
S.push(()=>{const n=Math.max(0,Math.min(6,Math.floor((TG-16.53)*7)));return bg('paper')+label('// 02 · TKP')+caption('Username sama','PIN diketik.','',0,15.72)
 +A(phone(40,140,160,300,`<text x="120" y="200" class="cap" font-size="11" fill="${INK}" text-anchor="middle">Username: budi_88</text>`+keypad(70,240,n)),15.7,'left',0.3)
 +(TG>16.9?thread('200,300 290,250',16.9):'')+A(`<g transform="translate(295,230)" filter="url(#sh)"><rect x="-26" y="-34" width="52" height="68" rx="5" fill="${INK}"/><rect x="-18" y="-24" width="36" height="8" fill="#4c4"/><rect x="-18" y="-8" width="36" height="8" fill="#4c4"/><rect x="-18" y="8" width="36" height="8" fill="${R}"/></g>`,16.9,'pop')+tag('SERVER PELAKU',240,275,17.0)});
// 7 barang bukti pertama: makanan
S.push(()=>bg('paper')+label('// 03 · BARANG BUKTI')+caption(TG<22.99?'Barang bukti':'Pelaku bayarin pakai',TG<22.99?'pertama.':'duitnya sendiri.','',0,TG<22.99?18.17:22.99)+badge(1,18.3)
 +hitung(['Tagihan meja 07','Rp70.000'],'DIBAYAR PELAKU',28,150,300,20.0,1.4)
 +A(plate(110,380,1.2),21.58,'pop')+A(`<g>${check(160,360)}</g>`,21.9,'pop')+tag('MAKANAN DATANG',60,410,21.9)
 +D([[T0,'point'],[23.0,'squint']],232,480,.7));
// 8 positif: baik banget? + saksi
S.push(()=>bg('dark')+label('// 03 · BARANG BUKTI',1)+caption('Gua coba','positif dulu.','',1,25.52)
 +head('BAIK BANGET YA?',26.96,140,34,'#ff8a9a')
 +saksi('@icecream***','sejak kapan barcode di meja buat bayar pesanan? bayar di kasir bukan di meja.','',24,190,300,27.1,'kasir')
 +D([[T0,'shrug']],232,480,.7));
// 9 kedua: waktu 3 bulan
S.push(()=>{const k=TG<29.65?0:Math.min(3,1+Math.floor((TG-29.65)/0.5));const m=['OKT','NOV','DES','JAN'][k];return bg('paper')+label('// 03 · BARANG BUKTI')+caption(TG<29.65?'Kedua,':'Sabar nunggu',TG<29.65?'waktu.':'tiga bulan.','',0,TG<29.65?28.36:29.65)+badge(2,28.4)
 +A(`<g transform="rotate(-4 150 290)">${P(`<rect x="70" y="190" width="160" height="170" fill="#fff"/>`)}<rect x="70" y="190" width="160" height="40" fill="${R}"/><text x="150" y="218" class="hd" font-size="24" fill="#fff" text-anchor="middle">${m}</text><text x="150" y="320" class="hd" font-size="72" fill="${INK}" text-anchor="middle">${k?'+'+k:'0'}</text></g>`,28.4,'down',0.35)
 +(TG>31.38?cap('BIAR NGGAK DICURIGAI',180,430,31.38,-6,18):'')+D([[T0,'squint']],232,480,.7)});
// 10 saldo 1 juta -> nol
S.push(()=>bg('paper')+label('// 03 · BARANG BUKTI')+caption('Saldo satu juta,','tinggal nol.','',0,32.58)
 +fotoTKP('FOTO-1.jpg',40,120,180,221,32.55,{sumber:'@indomietelor_2 (TikTok)',rot:-3,kb:false})
 +A(darkBox(`Rp1.000.000 → <tspan fill="#ff8a9a">Rp0</tspan>`,30,410,300,26,'#fff',-3),33.74,'stamp',0.3)
 +D([[T0,'palm']],232,480,.7));
// 11 twist: yang dicuri PIN
S.push(()=>{const st=TG>=37.0;let s=bg('paper')+label('// 04 · TWIST')+caption(st?'Yang dicuri':'Yang dicuri bukan',st?'PIN lu.':'70 ribu.','',0,st?37.0:34.69);
 s+=A(`<g transform="rotate(-4 120 220)">${P(`<rect x="40" y="150" width="160" height="110" fill="#fff"/>`)}<text x="120" y="190" class="mono" font-size="12" fill="${INK}" text-anchor="middle">STRUK MEJA 07</text><text x="120" y="230" class="hd" font-size="28" fill="${INK}" text-anchor="middle">Rp70.000</text></g>`,34.7,'left',0.3)+(TG>36.0?xmark(120,210,40,36.0):'');
 if(st)s+=A(`<g>${P(`<rect x="150" y="290" width="180" height="160" rx="10" fill="#fff"/>`)}${keypad(190,320,6)}</g>`,37.0,'right',0.3)+cap('DICURI',240,470,37.72,-8,24);
 return s+D([[T0,'squint'],[37.0,'point']],-10,480,.65)});
// 12 PAPIYYAR
S.push(()=>{const lt=TG-T0;const slash=cl(lt/0.15);const punch=lt<0.5?1+0.35*(1-outCubic(cl(lt/0.5))):1;
 const stut=(lt>0.15&&lt<0.45)?[[0,0],[8,-6],[-7,5],[5,4]][Math.floor(lt*30)%4]:[0,0];const shake=lt<0.6?Math.sin(lt*80)*4*(1-lt/0.6):0;
 let body=`<rect width="360" height="640" fill="${R}"/><path d="M-20 520 L380 120" stroke="#fff" stroke-width="16"/><path d="M-20 545 L380 145" stroke="${DARK}" stroke-width="6"/>`
 +A(torn(-10,-10,90,90,PAPER,1),T0+0.1,'left',0.2)+A(torn(280,-10,90,90,PAPER,2),T0+0.13,'right',0.2)+A(torn(-10,560,90,90,PAPER,3),T0+0.16,'left',0.2)+A(torn(280,560,90,90,PAPER,4),T0+0.19,'right',0.2)
 +A(`<g transform="rotate(-8 180 150)"><text x="180" y="165" class="hd" font-size="76" fill="#fff" text-anchor="middle" stroke="${DARK}" stroke-width="3" paint-order="stroke">PAPI<tspan fill="${DARK}" stroke="#fff">YY</tspan>AR!</text></g>`,T0+0.12,'stamp',0.22);
 body+=A(darkBox(`DIA TRAKTIR: <tspan fill="#fff">70RB</tspan>`,30,230,300,30,'#ff8a9a',-3),39.71,'left',0.3);
 body+=A(darkBox(`LU BAYAR: <tspan fill="#fff">SEJUTA</tspan>`,30,300,300,30,'#ff8a9a',3),40.59,'right',0.3);
 body+=A(`<text x="290" y="420" class="kw" font-size="40" fill="#fff" text-anchor="middle">Cong.</text>`,41.89,'pop')+D([[T0,'glasses'],[41.89,'squint']],40,430,1.05);
 const wipe=slash<1?`<rect width="360" height="640" fill="#fff" opacity="${1-slash}"/>`:'';
 return `<g transform="translate(${stut[0]+shake} ${stut[1]}) translate(180 320) scale(${punch}) translate(-180 -320)">${body}</g>${wipe}`});
// 13 VONIS
S.push(()=>`<rect width="360" height="640" fill="${DARK}"/>`+label('// 05 · VONIS',1)
 +A(`<text x="180" y="230" class="hd" font-size="64" fill="#fff" text-anchor="middle">MENU</text>`,43.47,'stamp',0.25)
 +A(`<text x="180" y="300" class="hd" font-size="40" fill="#ff8a9a" text-anchor="middle">KOK MINTA PIN?</text>`,43.75,'pop',0.25)
 +saksi('@meanless***','langsung muncul domain buat login ke bank pake user dan password, itu yang harus dicurigai','14',24,340,300,43.9,'dicurigai')
 +D([[T0,'glasses']],232,480,.7));
// 14 PENUTUP
S.push(()=>{const typed='nggak lagi deh...';const n=Math.max(0,Math.min(typed.length,Math.floor((TG-46.0)*9)));const cur=(TG*2|0)%2?'|':'';
 return bg('paper')+(TG>44.6?Array.from({length:14},(_,i)=>{const t=TG-44.6;const x=(i*53)%340+10,y=-20+((t*(60+i*9))+i*37)%680;return torn(x,y,14,8,i%3?R:'#999',i)}).join(''):'')+label('// penutup')+caption('Masih berani','scan sembarangan?','',0,44.45)+head('TULIS DI KOMEN',48.12,125,34)
 +A(P(`<rect x="20" y="145" width="280" height="110" rx="10" fill="#fff"/>`)+`<text x="34" y="173" class="cap" font-size="13" fill="${INK}">Masih berani scan sembarangan?</text><rect x="34" y="190" width="252" height="40" rx="20" fill="#f1f1f1"/><text x="50" y="215" class="cap" font-size="14" fill="#777">${typed.slice(0,n)}${cur}</text>`,45.0,'pop')
 +A(`<g transform="rotate(-6 180 345)">${P(`<circle cx="180" cy="345" r="54" fill="#fff"/>`)}<g transform="translate(180,345)"><image href="logo-papiyyar.jpg" x="-50" y="-50" width="100" height="100" clip-path="url(#lc2)"/></g>${tape(155,283,8)}</g>`,48.5,'stamp',0.3)
 +A(P(`<rect x="24" y="428" width="196" height="44" rx="22" fill="${R}"/>`)+`<text x="122" y="457" class="hd" font-size="20" fill="#fff" text-anchor="middle" letter-spacing=".5">IKUTI @PAPIYYAR</text>`,49.18,'pop')
 +A(`<g transform="rotate(8 90 525)">${P(`<rect x="12" y="505" width="170" height="34" fill="${INK}"/>`)}<text x="97" y="528" class="hd" font-size="16" fill="#fff" text-anchor="middle">KASUS QRIS #4 SEGERA</text></g>`,49.72,'stamp',0.25)
  +D([[T0,'point']],232,470,.78)});
