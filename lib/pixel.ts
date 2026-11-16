const cache:Record<string,string>={};
const rnd=(s:number)=>()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
const svg=(w:number,h:number,px:(x:number,y:number)=>string|null)=>{let r='';for(let y=0;y<h;y++)for(let x=0;x<w;x++){const c=px(x,y);if(c)r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`}
 return 'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${r}</svg>`)};
type T={b:string[];t?:string[];th?:number;d?:string;dn?:number;g?:string};
const DIRT=['#79553a','#6b4a33','#85603f'],STONE=['#7d7d7d','#707070','#8a8a8a'];
const TILES:Record<string,T>={
 grass:{b:DIRT,t:['#5d9b3a','#4f8a2f','#6cae44'],th:5},dirt:{b:DIRT},stone:{b:STONE},
 ore:{b:STONE,d:'#c0272d',dn:16},obs:{b:['#17121f','#1d1729','#120e19'],d:'#3a2b5c',dn:8},
 lamp:{b:['#6b4a2e','#5e4128'],g:'#2b1c10'},lit:{b:['#f7d27a','#eebc55','#fbe3a0'],g:'#b8822a'}};
export function tileSrc(k:string){const key='t'+k;if(cache[key])return cache[key];
 const t=TILES[k],r=rnd(k.length*977+k.charCodeAt(0)),dots=new Set<number>();
 for(let i=0;i<(t.dn||0);i++)dots.add(Math.floor(r()*256));
 return cache[key]=svg(16,16,(x,y)=>{const pick=(a:string[])=>a[Math.floor(r()*a.length)];
  if(t.g&&(x%8===0||y%8===0||x%8===7&&y%8===7))return t.g;
  if(dots.has(y*16+x))return t.d!;
  if(t.th&&(y<t.th||(y===t.th&&r()>.5)))return pick(t.t!);
  return pick(t.b)})}
const HEADS:Record<string,[string,string,string]>={Steve_P:['#4a3222','#c68e6a','#3b5bdb'],Alex_R:['#c9742c','#e0b08a','#7a8f3a'],Hero_B:['#2a2a2a','#a8714f','#8a5a2a'],C_Ender:['#161616','#b88a6e','#d33']};
export function headSrc(n:string){const key='h'+n;if(cache[key])return cache[key];const[h,s,e]=HEADS[n];
 return cache[key]=svg(8,8,(x,y)=>y<2?h:y===2?(x===0||x===7?h:s):y===3?(x===1||x===6?'#eee':x===2||x===5?e:s):y===6?(x>1&&x<6?'#8a4a3a':s):s)}
let bg:string[]|null=null;
export function menuBg(){if(bg)return bg;const r=rnd(7);const pick=(a:string[])=>a[Math.floor(r()*a.length)];
 const D=['#a9693a','#b97a45','#8e5a30','#c68a55','#7a4a28','#9c6035'],G=['#5fa832','#4e9128','#7bc043','#3f7d20'];
 const grass=svg(32,8,(x,y)=>y<4?pick(G):y<7&&r()<(y===4?.6:.25)?pick(G):null);
 const dirt=svg(32,32,()=>r()<.04?'#8c8c8c':pick(D));
 return bg=[grass,dirt]}
