const C={paper:'#E8D9B5',paper2:'#DCCB9F',ink:'#272A2F',red:'#B4213D',blue:'#7A9BB0',cctv:'#8E968E',skin:'#E6C29C',brass:'#C9A227'};
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const r=(a,b)=>a+rnd()*(b-a);

// ---------- helpers ----------
function torn(x,y,w,h,a=6,st=14){let p=[];
 for(let i=0;i<=w;i+=st)p.push([x+i,y+r(-a,a)]);
 for(let i=0;i<=h;i+=st)p.push([x+w+r(-a,a),y+i]);
 for(let i=w;i>=0;i-=st)p.push([x+i,y+h+r(-a,a)]);
 for(let i=h;i>=0;i-=st)p.push([x+r(-a,a),y+i]);
 return p.map(q=>q.map(v=>v.toFixed(1)).join(',')).join(' ')}
const tornP=(x,y,w,h,fill,extra='',a=6)=>`<polygon points="${torn(x,y,w,h,a)}" fill="${fill}" ${extra}/>`;
function newsprint(x,y,w,h,cols=3,col='#0000002a'){let s='',cw=(w-(cols-1)*10)/cols;
 for(let c=0;c<cols;c++)for(let yy=y;yy<y+h;yy+=9){const ww=cw*r(.55,1);s+=`<rect x="${x+c*(cw+10)}" y="${yy}" width="${ww.toFixed(1)}" height="3.2" fill="${col}"/>`}return s}
function ransom(txt,x,y,size,opt={}){let s='',cx=x;const fonts=['BN','SE','PM','Georgia','Impact'];
 for(const ch of txt){if(ch===' '){cx+=size*.45;continue}
  const red=opt.red&&opt.red.includes(cx===x?0:-1);const w=size*.78,h=size*1.08,rot=r(-9,9);
  const isRed=opt.redChars&&opt.redChars.includes(ch);
  const bg=isRed?(opt.redBg||'#fff'):[ '#fff','#F3EBD3','#1d1d1d','#E8D9B5','#fff'][Math.floor(r(0,5))];
  const fg=isRed?C.red:(bg==='#1d1d1d'?'#fff':C.ink);
  s+=`<g transform="translate(${cx+w/2},${y}) rotate(${rot.toFixed(1)})" filter="url(#sh)"><polygon points="${torn(-w/2,-h*.78,w,h,2,6)}" fill="${bg}"/><text x="0" y="${(h*.12).toFixed(1)}" text-anchor="middle" font-family="${fonts[Math.floor(r(0,5))]}" font-size="${size}" font-weight="900" fill="${fg}">${ch}</text></g>`;
  cx+=w+size*.06}return s}
const tape=(x,y,w,rot,col='#f4eecfcc')=>`<rect x="${x}" y="${y}" width="${w}" height="22" fill="${col}" transform="rotate(${rot} ${x+w/2} ${y+11})"/>`;
const stamp=(txt,x,y,rot,size=40,col=C.red)=>`<g transform="translate(${x},${y}) rotate(${rot})" opacity=".9"><rect x="${-txt.length*size*.3-14}" y="${-size*.85}" width="${txt.length*size*.6+28}" height="${size*1.25}" rx="6" fill="none" stroke="${col}" stroke-width="5"/><text text-anchor="middle" font-family="BN" font-size="${size}" fill="${col}" letter-spacing="2">${txt}</text></g>`;
const polaroid=(x,y,w,h,rot,inner)=>`<g transform="translate(${x},${y}) rotate(${rot})" filter="url(#sh)"><rect x="0" y="0" width="${w}" height="${h}" fill="#FBF8F0"/><svg x="12" y="12" width="${w-24}" height="${h-60}" viewBox="0 0 ${w-24} ${h-60}" preserveAspectRatio="xMidYMid slice"><rect width="100%" height="100%" fill="#C8BFAA"/>${inner}</svg></g>`;
const caption=(t)=>`<g><text x="270" y="905" text-anchor="middle" font-family="BN" font-size="34" fill="#fff" stroke="${C.ink}" stroke-width="7" paint-order="stroke" letter-spacing="1">${t}</text></g>`;
const badge=(n,dur)=>`<g filter="url(#sh)"><polygon points="${torn(18,22,236,44,3,10)}" fill="#F4EED7"/><text x="30" y="54" font-family="BN" font-size="30" fill="${C.ink}">SCENE ${String(n).padStart(2,'0')}</text><text x="140" y="52" font-family="SE" font-size="17" fill="${C.red}">${dur}</text></g>`;
const watermark=`<g opacity=".75"><clipPath id="wmc"><circle cx="490" cy="50" r="30"/></clipPath><image href="logo.jpg" x="460" y="20" width="60" height="60" clip-path="url(#wmc)"/></g>`;
const bg=(fill=C.paper)=>`<rect width="540" height="960" fill="${fill}"/><rect width="540" height="960" filter="url(#grain)" opacity=".55"/>`;
const sweat=(x,y,s=1)=>`<path d="M${x} ${y} q${-6*s} ${10*s} 0 ${14*s} q${6*s} -4 0 -14z" fill="#BFD6E6" stroke="${C.blue}" stroke-width="1.5" opacity=".9"/>`;

// ---------- characters (local box ~160x300) ----------
function detective(x,y,s,o={}){const brow=o.brow==='up'?'M60 80 L76 72':'M60 80 L76 79';
 const mouth=o.mouth==='yawn'?`<ellipse cx="80" cy="112" rx="8" ry="11" fill="#5a2a2a"/>`:o.mouth==='smirk'?`<path d="M70 113 q12 4 20 -4" stroke="${C.ink}" stroke-width="2.5" fill="none"/>`:`<path d="M71 113 h16" stroke="${C.ink}" stroke-width="2.5"/>`;
 const eyes=o.eyes==='roll'?`<circle cx="68" cy="93" r="3.5" fill="${C.ink}"/><circle cx="92" cy="93" r="3.5" fill="${C.ink}"/>`:`<circle cx="68" cy="96" r="3.5" fill="${C.ink}"/><circle cx="92" cy="96" r="3.5" fill="${C.ink}"/>`;
 let arm='';
 if(o.arm==='point')arm=`<path d="M130 160 L170 230 L160 236 L122 175z" fill="#9C7547" stroke="${C.ink}" stroke-width="2"/><circle cx="168" cy="238" r="9" fill="${C.skin}" stroke="${C.ink}" stroke-width="2"/><path d="M170 244 l4 22" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>`;
 if(o.arm==='glass')arm=`<path d="M130 160 L175 150 L176 162 L128 178z" fill="#9C7547" stroke="${C.ink}" stroke-width="2"/><circle cx="182" cy="156" r="9" fill="${C.skin}"/><line x1="188" y1="150" x2="205" y2="128" stroke="#5b3b22" stroke-width="7"/><circle cx="222" cy="106" r="26" fill="#cfe3ee88" stroke="${C.brass}" stroke-width="6"/>`;
 if(o.arm==='cup')arm=`<path d="M128 165 L120 125 L132 122 L142 162z" fill="#9C7547" stroke="${C.ink}" stroke-width="2"/><rect x="104" y="100" width="28" height="26" rx="3" fill="#F4EED7" stroke="${C.ink}" stroke-width="2"/><path d="M104 104 q-10 6 0 14" stroke="${C.ink}" stroke-width="2" fill="none"/><path d="M112 96 q4 -8 0 -14 M122 96 q4 -8 0 -14" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`;
 return `<g transform="translate(${x},${y}) scale(${s})" filter="url(#sh)">
 <polygon points="34,140 126,140 150,300 10,300" fill="#A98153" stroke="${C.ink}" stroke-width="2.5"/>
 <polygon points="58,140 80,200 102,140 92,140 80,172 68,140" fill="#8A6438" stroke="${C.ink}" stroke-width="2"/>
 <line x1="80" y1="200" x2="80" y2="300" stroke="${C.ink}" stroke-width="2"/>
 <circle cx="80" cy="230" r="3" fill="${C.ink}"/><circle cx="80" cy="260" r="3" fill="${C.ink}"/>
 <circle cx="40" cy="152" r="4" fill="${C.brass}" stroke="${C.ink}"/><circle cx="120" cy="152" r="4" fill="${C.brass}" stroke="${C.ink}"/>
 <rect x="70" y="122" width="20" height="22" fill="${C.skin}"/>
 <ellipse cx="80" cy="96" rx="33" ry="36" fill="${C.skin}" stroke="${C.ink}" stroke-width="2.5"/>
 ${eyes}<path d="${brow}" stroke="${C.ink}" stroke-width="3.5"/><path d="M84 79 L100 79" stroke="${C.ink}" stroke-width="3.5"/>${mouth}
 <ellipse cx="80" cy="64" rx="64" ry="12" fill="#3B2F2A" stroke="${C.ink}" stroke-width="2"/>
 <path d="M48 64 L52 24 Q80 10 108 24 L112 64z" fill="#4A3B34" stroke="${C.ink}" stroke-width="2"/>
 <rect x="49" y="48" width="62" height="10" fill="${C.red}"/>${arm}</g>`}
function gelisah(x,y,s,o={}){const look=o.look==='upleft';
 return `<g transform="translate(${x},${y}) scale(${s})" filter="url(#sh)">
 <polygon points="30,140 130,140 145,300 15,300" fill="#E4DCCB" stroke="${C.ink}" stroke-width="2.5"/>
 <polyline points="40,170 60,180 45,195 70,205 50,225" stroke="#00000030" stroke-width="2" fill="none"/><polyline points="110,175 95,190 115,205 98,222" stroke="#00000030" stroke-width="2" fill="none"/>
 <rect x="68" y="122" width="24" height="22" fill="#EAD3B8"/>
 <ellipse cx="80" cy="95" rx="34" ry="38" fill="#EED8BE" stroke="${C.ink}" stroke-width="2.5"/>
 <path d="M46 80 q4 -40 34 -38 q30 -2 34 38 l-6 -12 l-6 10 l-6 -14 l-6 10 l-8 -12 l-6 12 l-8 -10 l-6 12z" fill="#5a4a3e" stroke="${C.ink}" stroke-width="2"/>
 <circle cx="67" cy="96" r="9" fill="#fff" stroke="${C.ink}" stroke-width="2"/><circle cx="93" cy="96" r="9" fill="#fff" stroke="${C.ink}" stroke-width="2"/>
 <circle cx="${look?62:67}" cy="${look?91:97}" r="4" fill="${C.ink}"/><circle cx="${look?88:93}" cy="${look?91:97}" r="4" fill="${C.ink}"/>
 <path d="M58 82 l16 4 M102 82 l-16 4" stroke="${C.ink}" stroke-width="3"/>
 <path d="M68 118 q4 -5 8 0 q4 5 8 0 q4 -5 8 0" stroke="${C.ink}" stroke-width="2.5" fill="none"/>
 ${sweat(44,70)}${sweat(118,78)}${sweat(122,104,.8)}
 ${o.hands!==false?`<path d="M50 230 q14 -10 22 6 q10 -14 22 0" stroke="${C.ink}" stroke-width="3" fill="#EED8BE"/><path d="M40 222 l-8 -6 M120 222 l8 -6 M38 236 l-10 0" stroke="${C.ink}" stroke-width="2"/>`:''}</g>`}
function tenang(x,y,s,o={}){const pose=o.pose||'straight';
 const lean=pose==='relax'?'rotate(-8 80 300)':'';
 const smile=o.frozen?`<path d="M70 116 h20" stroke="${C.ink}" stroke-width="2.5"/>`:`<path d="M68 114 q12 6 24 0" stroke="${C.ink}" stroke-width="2.5" fill="none"/>`;
 let arms=pose==='relax'?`<path d="M30 160 L-20 120 L-12 110 L36 145z" fill="#3A3F4A" stroke="${C.ink}" stroke-width="2"/><circle cx="-20" cy="112" r="10" fill="#E3C7A8" stroke="${C.ink}" stroke-width="2"/><path d="M130 160 L180 130 L184 142 L134 176z" fill="#3A3F4A" stroke="${C.ink}" stroke-width="2"/><circle cx="186" cy="134" r="10" fill="#E3C7A8" stroke="${C.ink}" stroke-width="2"/>`
 :`<rect x="36" y="232" width="88" height="16" rx="8" fill="#E3C7A8" stroke="${C.ink}" stroke-width="2"/>`;
 return `<g transform="translate(${x},${y}) scale(${s})" filter="url(#sh)"><g transform="${lean}">
 <polygon points="32,140 128,140 140,300 20,300" fill="#3A3F4A" stroke="${C.ink}" stroke-width="2.5"/>
 <polygon points="64,140 80,190 96,140" fill="#F7F5EF"/><polygon points="76,146 84,146 86,196 80,204 74,196" fill="${C.red}"/>
 <rect x="70" y="122" width="20" height="22" fill="#E3C7A8"/>
 <ellipse cx="80" cy="95" rx="33" ry="37" fill="#E9CDAF" stroke="${C.ink}" stroke-width="2.5"/>
 <path d="M47 86 Q48 52 80 52 Q112 52 113 86 L108 72 Q80 64 52 72z" fill="#22252b"/>
 ${o.eyePhoto?`<g><rect x="54" y="86" width="52" height="20" fill="#fff" stroke="${C.ink}" stroke-width="1.2" transform="rotate(-2 80 96)"/><ellipse cx="67" cy="96" rx="8" ry="5" fill="#f2eee8"/><circle cx="67" cy="96" r="4.2" fill="#4a3220"/><circle cx="67" cy="96" r="1.8" fill="#000"/><ellipse cx="93" cy="96" rx="8" ry="5" fill="#f2eee8"/><circle cx="93" cy="96" r="4.2" fill="#4a3220"/><circle cx="93" cy="96" r="1.8" fill="#000"/><path d="M58 92 q9 -6 18 0 M84 92 q9 -6 18 0" stroke="#3a2a20" stroke-width="1.5" fill="none"/></g>`
 :`<circle cx="68" cy="96" r="3.5" fill="${C.ink}"/><circle cx="92" cy="96" r="3.5" fill="${C.ink}"/><path d="M60 86 h16 M84 86 h16" stroke="${C.ink}" stroke-width="3"/>`}
 ${smile}${arms}</g></g>`}
function hand(x,y,s,rot,fill=C.skin){return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})" filter="url(#sh)"><path d="M0 60 L0 10 Q0 0 10 0 Q20 0 20 10 L20 40 L24 -10 Q26 -20 36 -18 Q44 -16 42 -6 L40 40 L46 -14 Q48 -24 58 -22 Q66 -20 64 -10 L60 42 L68 0 Q70 -10 80 -8 Q88 -6 86 4 L80 60 Q90 40 100 44 Q110 50 100 64 L76 110 Q66 128 40 128 L20 128 Q0 120 0 100z" fill="${fill}" stroke="${C.ink}" stroke-width="3"/></g>`}

const defs=`<defs>
<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .28  0 0 0 0 .18  0 0 0 .55 0"/></filter>
<filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .9 0"/></filter>
<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="5" stdDeviation="2.5" flood-color="#000" flood-opacity=".45"/></filter>
<filter id="blur"><feGaussianBlur stdDeviation="5"/></filter>
<radialGradient id="spot" cx="50%" cy="0%" r="100%"><stop offset="0" stop-color="#fff6d8" stop-opacity=".85"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></radialGradient>
<radialGradient id="vig" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
<pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0 H0 V20" fill="none" stroke="#7A9BB066" stroke-width="1"/></pattern>
<pattern id="scan" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="2" fill="#0000002e"/></pattern>
</defs>`;
const vig=`<rect width="540" height="960" fill="url(#vig)"/>`;
