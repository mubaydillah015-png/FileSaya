B.length=0;B.push(0,2.14,3.69,6.03,10.02,13.87,15.77,20.54,24.23,28.11,33.94,40.33,43.95,47.08,52.51);
const NK=158;
// kertas QRIS toko (vektor), sticker: 0..1 seberapa jauh stiker sudah menempel (1 = menempel)
function qrisCard(x,y,s,stk=0,curl=0){let g=`<g transform="translate(${x},${y}) scale(${s})">${P(`<rect x="0" y="0" width="200" height="270" rx="6" fill="#fff"/>`)}<path d="M0 60 L40 100 L0 140Z" fill="${R}" opacity=".85"/><text x="14" y="26" class="hd" font-size="20" fill="${INK}">QRIS</text><text x="100" y="56" class="cap" font-size="15" fill="${INK}" text-anchor="middle">Toko Icha</text>${qr(45,72,110,2)}<text x="100" y="222" class="mono" font-size="9" fill="#777" text-anchor="middle">SATU QRIS UNTUK SEMUA</text>`;
 if(stk>0){const dx=(1-stk)*160,dy=-(1-stk)*120,r=(1-stk)*-25;g+=`<g transform="translate(${dx} ${dy}) rotate(${r+curl*-8} 100 127)" filter="url(#sh)"><rect x="40" y="67" width="120" height="120" fill="#fff" stroke="#ddd"/>${qr(45,72,110,9)}${curl>0?`<path d="M160 67 L${160-curl*40} 67 L160 ${67+curl*40}Z" fill="#e8e2d6" stroke="#ccc"/>`:''}</g>`}
 return g+'</g>'}
// 1 HOOK
S.push(()=>bg('cork')+label('// 01 · HOOK',1)
 +head('PEMBELI',0.05,100,50,'#fff')+head('UDAH BAYAR...',0.4,152,46,'#fff')
 +fotoTKP('THUMB.jpg',30,180,250,271,0.2,{sumber:'video viral TikTok',rot:-3,dugaan:true,capPos:[230,420]})
 +A(darkBox(`KE <tspan fill="${R}">PENIPU?</tspan>`,60,492,250,40,'#fff',-4),0.94,'stamp',0.3));
// 2 gara-gara stiker. damn broo
S.push(()=>{const sh=TG>3.46?Math.sin(TG*60)*5*Math.max(0,1-(TG-3.46)/0.5):0;
 return `<rect width="360" height="640" fill="${DARK}"/>`+label('// 01 · HOOK',1)+caption('Gara-gara','stiker.','',1,2.29)
 +A(`<g transform="rotate(-8 180 260)">${P(`<rect x="110" y="190" width="140" height="140" fill="#fff"/>`)}${qr(120,200,120,9)}<path d="M250 190 L210 190 L250 230Z" fill="#cfc8bb"/></g>`,2.3,'stamp',0.35)
 +head('STIKER.',2.6,130,52,'#fff')
 +A(`<g transform="translate(${sh},0) rotate(-6 180 450)"><text x="180" y="460" class="hd" font-size="50" fill="#ff8a9a" text-anchor="middle" stroke="${DARK}" stroke-width="3" paint-order="stroke">DAMN BROO!!!</text></g>`,3.46,'stamp',0.25)});
// 3 klip
S.push(()=>bg('cork')+label('// 02 · TKP',1)+caption('Lu pasti udah','lihat.','',1,3.84)
 +fotoTKP(klip('KLIP-1',15,NK,3.7),40,96,190,338,3.7,{sumber:'video viral TikTok',rot:-2,kb:false})
 +A(`<g transform="rotate(8 290 200)">${P(`<rect x="242" y="170" width="100" height="56" fill="${KRAFT}"/>`)}<text x="292" y="194" class="mono" font-size="11" fill="${INK}" text-anchor="middle">KASUS</text><text x="292" y="215" class="hd" font-size="17" fill="${R}" text-anchor="middle">QRIS #2</text></g>`,4.4,'stamp',0.3)
 +D([[T0,'mag']],232,470,.78));
// 4 stiker ditempel
S.push(()=>{const stk=cl((TG-7.9)/0.7);return bg('paper')+label('// 02 · TKP')+caption('Pemilik Toko Icha','ngaku.','',0,6.18)
 +A(qrisCard(70,150,1.1,TG>7.7?outCubic(stk):0),6.3,'up',0.4)+tag('KERTAS ASLI',40,118,6.6)
 +(TG>8.7?cap('DITEMPELIN',200,470,8.7,-8,22):'')+cap('DUGAAN',290,190,7.0,10,16)
 +D([[T0,'squint']],232,480,.7)});
// 5 scan bayar beres -> penipu
S.push(()=>{let s=bg('paper')+label('// 02 · TKP')+caption(TG<11.51?'Scan, bayar,':'Duitnya masuk ke',TG<11.51?'beres.':'penipu.','',0,TG<11.51?10.17:11.51);
 s+=A(phone(30,140,130,230,`<text x="95" y="230" class="cap" font-size="12" fill="${INK}" text-anchor="middle">Bayar ke:</text><text x="95" y="252" class="hd" font-size="16" fill="${INK}" text-anchor="middle">???</text>`+(TG>10.84?`<circle cx="95" cy="300" r="20" fill="#2e8b57"/><path d="M86 300 l6 7 l11 -13" stroke="#fff" stroke-width="4" fill="none"/>`:'')),10.1,'left',0.3);
 ['SCAN','BAYAR','BERES'].forEach((w,i)=>{s+=tag(w,40+i*70,390,[10.17,10.84,11.17][i])});
 if(TG>11.51){const p=cl((TG-11.6)/1.6);for(let k=0;k<5;k++){const q=cl(p*1.4-k*0.1);s+=`<g opacity="${q>0&&q<1?1:0}"><circle cx="${160+q*130}" cy="${250-Math.sin(q*Math.PI)*60}" r="9" fill="#e0b84a" stroke="#fff" stroke-width="2"/><text x="${160+q*130}" y="${254-Math.sin(q*Math.PI)*60}" class="hd" font-size="9" fill="${INK}" text-anchor="middle">Rp</text></g>`}
  s+=A(`<g>${person(300,300,1,'#111')}<rect x="285" y="232" width="30" height="10" fill="#333"/>${tag('REKENING PENIPU',230,340,11.9)}</g>`,11.6,'right',0.35)}
 return s+D([[T0,'point']],232,480,.7)});
// 6 cek saldo
S.push(()=>bg('paper')+label('// 02 · TKP')+caption('Baru sadar pas cek','saldo.','',0,14.02)
 +A(phone(110,140,140,250,`<text x="180" y="200" class="mono" font-size="10" fill="#777" text-anchor="middle">SALDO TOKO ICHA</text><text x="180" y="260" class="hd" font-size="26" fill="${R}" text-anchor="middle">KOK SEPI?</text>`),14.0,'up',0.35)
 +cap('BARU SADAR',180,440,14.9,-8,24)+D([[T0,'palm']],232,480,.7));
// 7 kerugian
S.push(()=>bg('paper')+label('// 03 · BARANG BUKTI')+caption('Barang bukti','pertama.','',0,15.92)+badge(1,16.0)
 +hitung(['masuk ke penipu:','(pengakuan pemilik)'],'> Rp1.000.000',28,160,300,17.3,0.5)+cap('DUGAAN',250,360,18.9,10,16)
 +D([[T0,'point']],232,470,.78));
// 8 pelaku tak dikenal
S.push(()=>bg('cork')+label('// 03 · BARANG BUKTI',1)+caption('Pelakunya nggak','dikenal.','',1,20.69)
 +A(`<g transform="rotate(-4 120 300)">${P(`<rect x="30" y="160" width="180" height="250" fill="${KRAFT}"/>`)}<text x="120" y="195" class="hd" font-size="26" fill="${INK}" text-anchor="middle">DICARI</text>${person(120,330,1.3,'#111')}<text x="120" y="290" class="hd" font-size="40" fill="#fff" text-anchor="middle">?</text><text x="120" y="395" class="mono" font-size="12" fill="${R}" text-anchor="middle">TIDAK DIKENAL</text></g>`,20.7,'down',0.4)
 +A(`<g transform="rotate(6 280 230)">${P(`<rect x="232" y="180" width="96" height="100" fill="#fff"/>`)}<rect x="232" y="180" width="96" height="24" fill="${R}"/><text x="280" y="197" class="mono" font-size="11" fill="#fff" text-anchor="middle">KAPAN?</text><text x="280" y="258" class="hd" font-size="44" fill="${INK}" text-anchor="middle">??</text></g>`,22.24,'pop')
 +qm(250,340,40,.7)+qm(300,380,30,.5,1)+D([[T0,'shrug']],232,480,.7));
// 9 positif: kecil rapi mirip
S.push(()=>bg('paper')+label('// 03 · BARANG BUKTI')+caption('Gua coba','positif dulu.','',0,24.38)
 +fotoTKP('FOTO-2.jpg',30,120,200,217,24.3,{sumber:'video viral TikTok',rot:-3})
 +tag('KECIL',245,190,26.13)+tag('RAPI',245,225,27.1)+tag('MIRIP BANGET',220,260,27.49)
 +D([[T0,'shrug']],232,480,.7));
// 10 saksi
S.push(()=>bg('dark')+label('// 03 · BARANG BUKTI',1)+caption('Kedua,','saksi.','',1,28.26)+badge(2,28.4)+head('KETERANGAN SAKSI',28.8,140,32,'#fff')
 +saksi('@dedew***','Pakai Sound Qris Kak, Kalau Asli Berbunyi Sesuai Nominalnya','3',24,175,300,29.0,'Berbunyi')
 +saksi('@xrey***','kan sebelum bayar biasanya konsumen ngeliatin ke yg punya toko.. nanti ketahuan nama tertera','8',36,300,296,29.6,'nama')
 +A(`<text x="180" y="500" class="hd" font-size="54" fill="#ff8a9a" text-anchor="middle" transform="rotate(-6 180 480)">TING!</text>`,32.6,'stamp',0.25));
// 11 twist: HP cuma baca stiker
S.push(()=>{const stage=TG<36.68?0:TG<38.43?1:2;let s=bg('paper')+label('// 04 · TWIST')+caption(['Kertasnya tetap','HP nggak baca','HP cuma baca'][stage],['Toko Icha.','tulisan.','stikernya.'][stage],'',0,[34.09,36.68,38.43][stage]);
 s+=A(qrisCard(30,150,0.95,1,0),34.1,'left',0.35);
 if(stage>=1){s+=A(phone(250,190,90,160,`<rect x="262" y="214" width="66" height="112" fill="#222"/><rect x="272" y="240" width="46" height="46" fill="none" stroke="#fff" stroke-width="2"/>`,-6),36.7,'right',0.3)+xmark(125,203,18,37.0)}
 if(stage>=2){s+=`<path d="M250 270 L180 265" stroke="${R}" stroke-width="4" ${draw(80,38.5,0.3)}/>`+`<ellipse cx="125" cy="275" rx="70" ry="66" fill="none" stroke="${R}" stroke-width="4" ${draw(440,38.6,0.5)}/>`+head('HP BACA STIKER',38.9,450,34,R)}
 return s+D([[T0,'squint'],[38.43,'point']],232,480,.65)});
// 12 PAPIYYAR
S.push(()=>{const lt=TG-T0;const slash=cl(lt/0.15);const punch=lt<0.5?1+0.35*(1-outCubic(cl(lt/0.5))):1;
 const stut=(lt>0.15&&lt<0.45)?[[0,0],[8,-6],[-7,5],[5,4]][Math.floor(lt*30)%4]:[0,0];const shake=lt<0.6?Math.sin(lt*80)*4*(1-lt/0.6):0;
 let body=`<rect width="360" height="640" fill="${R}"/><path d="M-20 520 L380 120" stroke="#fff" stroke-width="16"/><path d="M-20 545 L380 145" stroke="${DARK}" stroke-width="6"/>`
 +A(torn(-10,-10,90,90,PAPER,1),T0+0.1,'left',0.2)+A(torn(280,-10,90,90,PAPER,2),T0+0.13,'right',0.2)+A(torn(-10,560,90,90,PAPER,3),T0+0.16,'left',0.2)+A(torn(280,560,90,90,PAPER,4),T0+0.19,'right',0.2)
 +A(`<g transform="rotate(-8 180 150)"><text x="180" y="165" class="hd" font-size="76" fill="#fff" text-anchor="middle" stroke="${DARK}" stroke-width="3" paint-order="stroke">PAPI<tspan fill="${DARK}" stroke="#fff">YY</tspan>AR!</text></g>`,T0+0.12,'stamp',0.22);
 body+=A(darkBox(`TOKONYA: <tspan fill="#fff">ICHA</tspan>`,30,230,300,30,'#ff8a9a',-3),41.65,'left',0.3);
 body+=A(darkBox(`REKENINGNYA: <tspan fill="#fff">PENIPU</tspan>`,30,300,300,30,'#ff8a9a',3),42.45,'right',0.3);
 body+=A(`<text x="290" y="420" class="kw" font-size="40" fill="#fff" text-anchor="middle">Cong.</text>`,43.58,'pop')+D([[T0,'glasses'],[43.58,'squint']],40,430,1.05);
 const wipe=slash<1?`<rect width="360" height="640" fill="#fff" opacity="${1-slash}"/>`:'';
 return `<g transform="translate(${stut[0]+shake} ${stut[1]}) translate(180 320) scale(${punch}) translate(-180 -320)">${body}</g>${wipe}`});
// 13 VONIS
S.push(()=>`<rect width="360" height="640" fill="${DARK}"/>`+label('// 05 · VONIS',1)+caption('Sebelum','bayar,','',1,44.1)
 +A(phone(125,120,110,150,`<text x="180" y="170" class="mono" font-size="8" fill="#777" text-anchor="middle">BAYAR KE:</text><text x="180" y="200" class="hd" font-size="15" fill="#2e8b57" text-anchor="middle">TOKO ICHA ✓</text>`),45.0,'pop',0.3)
 +A(`<text x="180" y="350" class="hd" font-size="40" fill="#fff" text-anchor="middle">CEK NAMA DI LAYAR.</text>`,45.07,'stamp',0.3)
 +A(`<text x="180" y="410" class="hd" font-size="40" fill="#ff8a9a" text-anchor="middle">BUKAN DI KERTAS.</text>`,46.25,'pop',0.3)
 +D([[T0,'glasses']],232,480,.7));
// 14 PENUTUP
S.push(()=>{const typed='salah siapa?';const n=Math.max(0,Math.min(typed.length,Math.floor((TG-48.0)*9)));const cur=(TG*2|0)%2?'|':'';
 return bg('paper')+label('// penutup')+caption('Menurut lu,','salah siapa?','',0,47.23)+head('TULIS DI KOMEN',48.4,125,34)
 +A(P(`<rect x="20" y="145" width="280" height="110" rx="10" fill="#fff"/>`)+`<text x="34" y="173" class="cap" font-size="13" fill="${INK}">Pedagang, pembeli, atau penipu?</text><rect x="34" y="190" width="252" height="40" rx="20" fill="#f1f1f1"/><text x="50" y="215" class="cap" font-size="14" fill="#777">${typed.slice(0,n)}${cur}</text>`,47.6,'pop')
 +A(`<g transform="rotate(-6 180 345)">${P(`<circle cx="180" cy="345" r="54" fill="#fff"/>`)}<g transform="translate(180,345)"><image href="logo-papiyyar.jpg" x="-50" y="-50" width="100" height="100" clip-path="url(#lc2)"/></g>${tape(155,283,8)}</g>`,49.2,'stamp',0.3)
 +A(P(`<rect x="40" y="430" width="160" height="40" rx="20" fill="${R}"/>`)+`<text x="120" y="457" class="hd" font-size="18" fill="#fff" text-anchor="middle">IKUTI @PAPIYYAR</text>`,50.21,'pop')
 +A(`<g transform="rotate(8 90 525)">${P(`<rect x="12" y="505" width="170" height="34" fill="${INK}"/>`)}<text x="97" y="528" class="hd" font-size="16" fill="#fff" text-anchor="middle">KASUS QRIS #3 SEGERA</text></g>`,50.7,'stamp',0.25)
 +(TG>47.4?Array.from({length:14},(_,i)=>{const t=TG-47.4;const x=(i*53)%340+10,y=-20+((t*(60+i*9))+i*37)%680;return torn(x,y,14,8,i%3?R:'#999',i)}).join(''):'')
 +D([[T0,'point']],232,470,.78)});
