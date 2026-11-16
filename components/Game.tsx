'use client';
import {useEffect,useState} from 'react';
import {FileText,Users,Clock,ClipboardList,Target,RotateCcw,Lock,Printer,Lightbulb} from 'lucide-react';
import {tileSrc,headSrc,menuBg} from '@/lib/pixel';
import {FILES,CH,TL,SUS,EVID,INIT,calc,qok,cdone,type S,type C} from '@/lib/data';
const SPL=['Check the logs!','Trust the evidence!','Correlation is not proof!','Not every IP is guilty!','Mine the code!'];
const TIPS=['An IP address is a lead, not proof of identity.','Metadata records what a system stored, not who acted.','A suspicious clue is not conclusive proof.','Hobbies and hashtags are not evidence.'];
const KEYN='cywork-er-v1',PIN='cywork2026';
const NB:[string,string][]=[['sus','Main suspect'],['ts','Important timestamps'],['ips','Suspicious IP addresses'],['ev','Relevant evidence'],['q','Unresolved questions']];

const ICON:Record<string,string>={'auth.log':'obs','ip_registry.txt':'stone','metadata.csv':'dirt','suspects.txt':'grass','investigation_notes.txt':'lamp'};
function Ground(){return <div aria-hidden className="terrain-strip">{['grass','dirt','stone'].map(k=><div key={k} className="pix terrain-block" style={{backgroundImage:`url("${tileSrc(k)}")`,backgroundSize:'48px'}}/>)}</div>}
function Blocks(){return <div aria-hidden className="block-row">{['grass','stone','ore','lamp','obs'].map(k=><img key={k} alt="" className="pix" width={32} height={32} src={tileSrc(k)}/>)}</div>}
function Village(){return(<div className="village-scene"><svg viewBox="0 0 320 70" className="pixel-village" role="img" aria-label="Pixel silhouette of Redstone Village with an unpowered generator" shapeRendering="crispEdges">
{[[10,50,30],[60,44,36],[200,48,32],[250,40,40],[290,54,26]].map(([x,y,w],i)=><g key={i}><rect x={x} y={y} width={w} height={70-y} fill="#1d1d1d" stroke="#333"/><rect x={x-4} y={y-8} width={w+8} height={8} fill="#2c2c2c"/><rect x={x+6} y={y+10} width="6" height="8" fill="#0d0d0d"/><rect x={x+w-12} y={y+10} width="6" height="8" fill="#0d0d0d"/></g>)}
<rect x="130" y="34" width="50" height="36" fill="#2c2c2c" stroke="#555"/><rect x="144" y="46" width="22" height="24" fill="#101010" stroke="#B83232" strokeWidth="2"/>
<rect x="150" y="54" width="10" height="10" fill="#B83232" className="blink"/><rect x="152" y="22" width="6" height="12" fill="#555"/><rect x="152" y="18" width="6" height="4" fill="#7a2020"/></svg><Ground/></div>)}

function TLine({on}:{on:(f:string)=>void}){return(<ol className="timeline-list">{TL.map(([t,l,f],i)=><li key={i} className="timeline-item"><button className="timeline-link" onClick={()=>on(f)}><span className="timeline-time">{t}</span> - {l} <span className="timeline-file">[{f}]</span></button></li>)}
<li className="timeline-note">The timeline shows when events were recorded. It does not establish causation.</li></ol>)}

export default function Game(){
 const [s,setS]=useState<S>(INIT);const [ok,setOk]=useState(false);const [tick,setTick]=useState(0);const [conf,setConf]=useState(false);const [pin,setPin]=useState('');const [how,setHow]=useState(false);const [sel,setSel]=useState('');const [err,setErr]=useState<string[]>([]);const [msg,setMsg]=useState('');
 useEffect(()=>{try{const r=localStorage.getItem(KEYN);if(r)setS({...INIT,...JSON.parse(r)})}catch{}setOk(true)},[]);
 useEffect(()=>{if(ok)try{localStorage.setItem(KEYN,JSON.stringify(s))}catch{}},[s,ok]);
 useEffect(()=>{const t=setInterval(()=>setTick(x=>x+1),3500);return()=>clearInterval(t)},[]);
 useEffect(()=>{const b=document.body.style;b.setProperty('--stone',`url("${tileSrc('stone')}")`);b.setProperty('--dirt',`url("${tileSrc('dirt')}")`)},[]);
 if(!ok)return null;
 const up=(p:Partial<S>)=>setS(x=>({...x,...p}));
 const go=(scr:string)=>up({scr});
 const sc=calc(s);
 const addNote=(k:string,t:string)=>{up({notes:{...s.notes,[k]:(s.notes[k]?s.notes[k]+'\n':'')+t}});setMsg('Added to notebook.')};
 const openFile=(f:string)=>up({file:f,tab:'files'});
 const reset=()=>{try{localStorage.removeItem(KEYN)}catch{}setS(INIT);setConf(false);setSel('');setErr([])};
 const Foot=<footer className="no-print mt-8 border-t border-[#333] p-3 text-center text-xs text-mute">CYWORK Cybersecurity Club</footer>;

 if(s.scr==='menu'){const[gr,di]=menuBg();return(<main className="mc-menu" style={{backgroundImage:`url("${gr}"),url("${di}")`,backgroundSize:'512px 128px,512px 512px',backgroundRepeat:'repeat-x,repeat',backgroundPosition:'left 72px,left 72px'}}>
 <div aria-hidden className="mc-skyband"><i className="cloud c1"/><i className="cloud c2"/><i className="cloud c3"/></div>
 <div className="mc-wrap">
  <div className="mc-head"><img src="/logo_cywork.jpg" alt="CYWORK logo" className="mc-logo"/><p className="mc-presents">CYWORK Cybersecurity Club presents</p></div>
  <div className="mc-titlebox"><h1 className="mclogo"><span>Evidence</span><br/>Room</h1><p key={tick%SPL.length} className="mc-splash" aria-hidden>{SPL[tick%SPL.length]}</p></div>
  <h2 className="mc-mission">The Missing Redstone Core</h2>
  <div className="mc-cols">
   <div className="mc-buttons">
    <button className="mcbtn mcbtn-go" onClick={()=>go(s.rep?'deb':Object.keys(s.a).length?'work':'brief')}>{Object.keys(s.a).length||s.rep?'Resume investigation':'Start investigation'}</button>
    <button className="mcbtn" onClick={()=>setHow(!how)} aria-expanded={how}>How to play</button>
    <button className="mcbtn mcbtn-sm" onClick={()=>go('fac')}>Facilitator</button>
    <div className="mc-hotbar" aria-hidden><Blocks/></div>
    <p className="mc-stats"><img src="/minecraft_heart.jpg" alt="" width={18} height={18} className="pix"/> 3 challenges - 20 points - about 20 min</p>
   </div>
   <figure className="mc-painting"><img src="/cywork_scene.jpg" alt="Cracked wall hiding a dark masked figure"/><figcaption>Evidence #001 - Redstone Village</figcaption></figure>
  </div>
  <div className="panel mc-story"><p className="mc-slogan">Mine the Code. Craft the Future.</p><p className="mc-tip">Tip: {TIPS[tick%TIPS.length]}</p><p>Redstone Village has lost power. During the night, <code>generator.cfg</code> was deleted from the generator. You are the forensic team: read the logs, test every lead, and decide what the evidence really shows.</p></div>
  {how&&<div className="panel mc-how"><p>1. Open the files in the left list.</p><p>2. Complete the three challenges (each unlocks the next).</p><p>3. Inspect suspects and the timeline; take notes.</p><p>4. Submit your report. Hints cost 1 point each. Max score: 20.</p></div>}
 </div>
 <footer className="mc-foot"><span>CYWORK Cybersecurity Club</span><span>Incident CYW-ER-001</span></footer>
</main>)}

 if(s.scr==='brief')return(<main className="mx-auto max-w-2xl p-6"><article className="panel border-gold"><Village/><div className="mb-3 mt-3"><Blocks/></div><p className="text-red font-bold tracking-widest">CONFIDENTIAL - INCIDENT REPORT</p>
 <h1 className="px my-2 text-2xl">Mission Briefing</h1>
 <dl className="grid grid-cols-[9rem_1fr] gap-y-1 text-sm">{[['Incident ID','CYW-ER-001'],['Location','Redstone Village'],['Incident','Unauthorized deletion of generator.cfg'],['Date','15 May 2026'],['Objective','Determine the most likely suspect.']].map(([a,b])=><><dt className="text-mute">{a}</dt><dd key={a}>{b}</dd></>)}</dl>
 <h2 className="lbl mt-4">Rules</h2><ul className="list-disc pl-5 text-sm"><li>Use only the supplied evidence.</li><li>Support every conclusion with facts.</li><li>Do not confuse correlation with proof.</li></ul>
 <button className="btn mt-5" onClick={()=>go('work')}>Begin investigation</button></article>{Foot}</main>);

 if(s.scr==='fac')return(<main className="mx-auto max-w-2xl p-6"><h1 className="px text-2xl">Facilitator</h1>
 {pin!==PIN?<form className="panel mt-4" onSubmit={e=>e.preventDefault()}><label className="lbl" htmlFor="pin"><Lock size={12} className="inline"/> Facilitator PIN</label><input id="pin" type="password" className="inp" value={pin} onChange={e=>setPin(e.target.value)}/></form>:
 <div className="panel mt-4 text-sm"><h2 className="lbl">Answer key</h2><ul className="list-disc pl-5">{['Failed logins: 3','Failed IP: 203.0.113.50 (unknown external host - do not attribute to C_Ender)','Successful login IP: 198.51.100.77 = C_Ender (home connection)','Deletion: 2026-05-15 02:14:52, account admin','ransom_note.txt: author C_Ender, created 02:11, modified 02:13 - BEFORE the deletion','Likely suspect: C_Ender; evidence is strong but not formal proof (IP can be shared/spoofed, metadata can be edited)','Extra evidence: session/command logs, validated attribution (MFA, device logs), corroboration of account control'].map(x=><li key={x}>{x}</li>)}</ul>
 <h2 className="lbl mt-4">How to solve (step by step)</h2><ol className="list-decimal pl-5">{['Open auth.log. Count the lines marked FAIL: 3, all from ip=203.0.113.50.','In the same file, find the line "file DELETE /redstone/generator.cfg": time 02:14:52, user=admin.','Find the "login OK" line: ip=198.51.100.77.','Open ip_registry.txt: 198.51.100.77 = C_Ender (home connection). An IP-to-profile match is only a lead, because IPs can be shared, proxied or spoofed.','Open metadata.csv: ransom_note.txt, author C_Ender, created 02:11, modified 02:13, so BEFORE the deletion (02:14:52). Metadata alone does not prove who deleted the file.','Suspects: Steve_P only owns the backup file; Alex_R and Hero_B have no link; the #OSINT hashtag is not evidence.','Report: suspect C_Ender; tick the IP match, the note author and the note timestamps; use "Fill from my challenge answers".','Uncertainty example: "An IP can be shared or spoofed and metadata can be edited, so this is not conclusive proof."','Extra evidence example: "Detailed session and command logs showing who controlled the account." Confidence: Medium.'].map(x=><li key={x} className="mb-1">{x}</li>)}</ol>
 <p className="mt-3 text-mute">Current session score: {sc.total}/20</p><button className="btn no-print mt-3" onClick={()=>window.print()}>Print solution sheet</button></div>}
 <button className="ghost no-print mt-4" onClick={()=>{setPin('');go('menu')}}>Back</button></main>);

 const Q=(c:C,locked:boolean)=><section key={c.id} className={`panel challenge-panel ${locked?'locked':''}`} aria-label={c.title}><div className="challenge-header"><h3 className="px text-lg">{c.title}</h3>{locked?<span className="challenge-status">Locked</span>:<span className="challenge-status active">Open</span>}</div>
 <p className="text-sm text-mute">{locked?'Locked: answer the previous challenge correctly.':c.intro}</p>
 {!locked&&<><div className="mt-2 grid gap-3 sm:grid-cols-2">{c.qs.map(q=>{const id=c.id+q.id,v=s.a[id]||'';return <div key={id}><label className="lbl" htmlFor={id}>{q.label}</label>
 {q.opts?<select id={id} className="inp" value={v} onChange={e=>up({a:{...s.a,[id]:e.target.value},sub:{...s.sub,[c.id]:false}})}><option value="">Select...</option>{q.opts.map(o=><option key={o}>{o}</option>)}</select>:<input id={id} className="inp" value={v} onChange={e=>up({a:{...s.a,[id]:e.target.value},sub:{...s.sub,[c.id]:false}})}/>} 
 {s.sub[c.id]&&<p role="status" className={`text-xs font-bold ${qok(s,c,q)?'text-term':'text-red'}`}>{qok(s,c,q)?'Correct':'Not quite - re-check the evidence'}</p>}</div>})}</div>
 {c.id==='c3'&&<div className="mt-3"><TLine on={openFile}/></div>}
 <div className="mt-3 flex flex-wrap items-center gap-2"><button className="btn" onClick={()=>up({sub:{...s.sub,[c.id]:true}})}>Check answers</button><button className="ghost" disabled={(s.hs[c.id]||0)>=c.hints.length} onClick={()=>up({hs:{...s.hs,[c.id]:(s.hs[c.id]||0)+1},hints:s.hints+1})}><Lightbulb size={14} className="inline"/> Hint (-0.5)</button></div>
 {c.hints.slice(0,s.hs[c.id]||0).map(h=><p key={h} className="mt-2 clue-box">{h}</p>)}</>}</section>;

 const submit=()=>{const d=s.d,e:string[]=[];
  [['team','Team name'],['suspect','Most likely suspect'],['fc','Number of failed logins'],['fip','Failed-login IP'],['sip','Successful-login IP'],['dt','Time of deletion'],['acct','Account used'],['unc','What remains uncertain'],['extra','Additional evidence needed'],['conf','Confidence level']].forEach(([k,l])=>{if(!(d[k]||'').trim())e.push(l+' is required.')});
  if(s.ev.length<2)e.push('Select at least two pieces of supporting evidence.');
  setErr(e);if(!e.length){up({rep:{d:s.d,ev:s.ev},scr:'deb'})}};
 const F=(k:string,l:string,t='text')=><div key={k}><label className="lbl" htmlFor={'r'+k}>{l}</label>{t==='area'?<textarea id={'r'+k} rows={3} className="inp" value={s.d[k]||''} onChange={e=>up({d:{...s.d,[k]:e.target.value}})}/>:<input id={'r'+k} className="inp" value={s.d[k]||''} onChange={e=>up({d:{...s.d,[k]:e.target.value}})}/>}</div>;

 if(s.scr==='deb'&&s.rep){const r=s.rep;return(<main className="mx-auto max-w-3xl p-6"><h1 className="px text-2xl">Debriefing - CYW-ER-001</h1>
 <section className="panel mt-4"><h2 className="lbl">Report summary</h2><p>Team: <b>{r.d.team}</b> - Suspect: <b className="text-gold">{r.d.suspect}</b> - Confidence: {r.d.conf}</p><p className="text-sm">Failed logins: {r.d.fc} from {r.d.fip}; successful IP {r.d.sip}; deletion {r.d.dt} as {r.d.acct}.</p>
 <h3 className="lbl mt-2">Selected evidence</h3><ul className="list-disc pl-5 text-sm">{r.ev.map(e=><li key={e}>{EVID.find(x=>x.id===e)?.l}</li>)}</ul>
 <h3 className="lbl mt-2">Uncertainty</h3><p className="text-sm">{r.d.unc}</p><h3 className="lbl mt-2">Evidence that would help</h3><p className="text-sm">{r.d.extra}</p></section>
 <section className="panel mt-4"><h2 className="lbl">Score</h2><ul className="text-sm">{sc.parts.map(([n,v,m])=><li key={n}>{n}: {v}/{m}</li>)}<li>Hint penalty: -{sc.hints/2}</li></ul><p className="px mt-2 text-2xl text-gold">{sc.total} / 20</p></section>
 <section className="panel mt-4 text-sm"><h2 className="lbl">Debrief</h2><p>C_Ender is the most likely suspect: the successful-login IP is registered to C_Ender, C_Ender authored ransom_note.txt, and the note timestamps precede the deletion.</p>
 <p className="mt-2">This is still not formal proof that C_Ender personally performed the deletion. Stronger work needs detailed session and command logs, validated attribution of the connection, and corroboration of who controlled the account.</p>
 <p className="mt-2">The failed-login IP 203.0.113.50 matches no suspect in the registry and must not be attributed to C_Ender. #OSINT is an interest, not evidence. All IP ranges are fictional documentation addresses.</p></section>
 <div className="no-print mt-4 flex gap-3"><button className="btn" onClick={()=>window.print()}><Printer size={14} className="inline"/> Print report</button><button className="ghost" onClick={()=>go('work')}>Back to workspace</button><button className="ghost" onClick={()=>setConf(true)}>New team</button></div>
 {conf&&<div role="alertdialog" className="panel mt-3 border-red no-print">Erase this team's progress and start over? <button className="btn ml-2" onClick={reset}>Confirm</button> <button className="ghost" onClick={()=>setConf(false)}>Cancel</button></div>}</main>)}

 const T:[string,string,React.ReactNode][]=[['files','Files',<FileText size={14} key="a"/>],['chal','Challenges',<Target size={14} key="b"/>],['sus','Suspects',<Users size={14} key="c"/>],['time','Timeline',<Clock size={14} key="d"/>],['rep','Report',<ClipboardList size={14} key="e"/>]];
 const done=CH.filter(c=>cdone(s,c)).length;
 const progressPct=(done/CH.length)*100;
 return(<div className="workspace-shell">
 <header className="hdr no-print topbar"><span className="brand-badge"><img src="/logo_cywork.jpg" alt="CYWORK logo" className="brand-mini"/><img alt="Redstone lamp, lit when all challenges are solved" className="pix" width={28} height={28} src={tileSrc(done===3?'lit':'lamp')}/>CYWORK / Evidence Room</span>
 <div className="topbar-stats" aria-live="polite"><span>Challenges {done}/3</span><span>Score {sc.total}/20</span><span>Hints {s.hints}</span></div>
 <span className="topbar-actions"><button className="ghost !py-1 text-xs" onClick={()=>go('menu')}>Menu</button> <button className="ghost !py-1 text-xs" onClick={()=>setConf(true)}><RotateCcw size={12} className="inline"/> Restart</button></span></header>
 {conf&&<div role="alertdialog" className="panel border-red m-3">Restart erases all progress for this team. <button className="btn ml-2" onClick={()=>{reset();go('menu')}}>Confirm restart</button> <button className="ghost" onClick={()=>setConf(false)}>Cancel</button></div>}
 <div className="mission-progress" aria-label="Investigation progress"><div className="progress-labels"><span>Investigation status</span><span>{done}/3 completed</span></div><div className="progress-track"><span style={{width:`${progressPct}%`}} /></div></div>
 <div className="workspace-grid">
  <nav aria-label="Investigation files" className="panel inventory-panel"><h2 className="lbl">Investigation files</h2>{Object.keys(FILES).map(f=><button key={f} className={`inventory-slot ${s.file===f&&s.tab==='files'?'active':''}`} onClick={()=>openFile(f)}><i className="blk" style={{backgroundImage:`url("${tileSrc(ICON[f])}")`}}/>{f}</button>)}</nav>
  <main className="workspace-main"><div role="tablist" className="tab-bar">{T.map(([k,l,i])=><button key={k} role="tab" aria-selected={s.tab===k} className="tab" onClick={()=>{up({tab:k});setMsg('')}}>{i} {l}</button>)}</div>
 {msg&&<p role="status" className="status-badge">{msg}</p>}
 {s.tab==='files'&&<section className="panel terminal-panel"><h2 className="lbl">{s.file}</h2><pre className="terminal-window" tabIndex={0}>{FILES[s.file]}</pre></section>}
 {s.tab==='chal'&&CH.map((c,i)=>Q(c,false))}
 {s.tab==='sus'&&<section className="suspect-board"><div className="suspect-grid">{SUS.map(u=><button key={u.n} aria-pressed={sel===u.n} className={`panel suspect-card ${sel===u.n?'selected':''}`} onClick={()=>setSel(u.n)}><img alt="" className="pix mb-1" width={40} height={40} src={headSrc(u.n)}/><b>{u.n}</b><br/><span className="text-xs text-mute">{u.r} - {u.t}</span></button>)}</div>
 {SUS.filter(u=>u.n===sel).map(u=><div key={u.n} className="panel dossier-card"><h3 className="px flex items-center gap-3"><img alt="" className="pix" width={48} height={48} src={headSrc(u.n)}/>{u.n}</h3><ul className="mt-2 text-sm clues-list">{u.clues.map(c=><li key={c} className="clue-line">- {c} <button className="ghost !px-2 !py-0 text-xs" onClick={()=>addNote('ev',u.n+': '+c)}>Note</button></li>)}</ul>{u.link&&<p className="mt-2 border-l-4 border-gold pl-2 text-sm text-gold">Evidence link: {u.link}</p>}<p className="mt-2 text-xs text-mute">A link is a lead to examine, not a verdict.</p></div>)}</section>}
 {s.tab==='time'&&<section className="panel timeline-panel"><h2 className="lbl">Event timeline (click to open evidence)</h2><TLine on={openFile}/></section>}
 {s.tab==='rep'&&<section className="panel report-form"><h2 className="px text-lg">Final report</h2><button className="ghost mt-2" onClick={()=>up({d:{...s.d,...(s.a.c1n&&{fc:s.a.c1n}),...(s.a.c1fip&&{fip:s.a.c1fip}),...(s.a.c2sip&&{sip:s.a.c2sip}),...(s.a.c1dt&&{dt:s.a.c1dt}),...(s.a.c1ac&&{acct:s.a.c1ac})}})}>Fill from my challenge answers</button>
 <div className="mt-2 grid gap-3 sm:grid-cols-2">{F('team','Team name')}<div><label className="lbl" htmlFor="rsuspect">Most likely suspect</label><select id="rsuspect" className="inp" value={s.d.suspect||''} onChange={e=>up({d:{...s.d,suspect:e.target.value}})}><option value="">Select...</option>{SUS.map(u=><option key={u.n}>{u.n}</option>)}</select></div>
 {F('fc','Number of failed logins')}{F('fip','Failed-login IP')}{F('sip','Successful-login IP')}{F('dt','Time of deletion')}{F('acct','Account used')}
 <div><label className="lbl" htmlFor="rconf">Confidence</label><select id="rconf" className="inp" value={s.d.conf||''} onChange={e=>up({d:{...s.d,conf:e.target.value}})}><option value="">Select...</option>{['Low','Medium','High'].map(o=><option key={o}>{o}</option>)}</select></div></div>
 <fieldset className="mt-3"><legend className="lbl">Supporting evidence (select at least two)</legend>{EVID.map(e=><label key={e.id} className="mb-1 flex gap-2 text-sm"><input type="checkbox" checked={s.ev.includes(e.id)} onChange={()=>up({ev:s.ev.includes(e.id)?s.ev.filter(x=>x!==e.id):[...s.ev,e.id]})}/>{e.l}</label>)}</fieldset>
 <div className="mt-3 grid gap-3">{F('unc','What remains uncertain?','area')}{F('extra','One additional piece of evidence that would confirm identity','area')}</div>
 {err.length>0&&<ul role="alert" className="mt-3 border-2 border-red p-2 text-sm text-red">{err.map(x=><li key={x}>{x}</li>)}</ul>}
 <button className="btn mt-3" onClick={submit}>Submit report</button></section>}
 </main>
 <aside aria-label="Investigation notebook" className="panel notebook-panel"><h2 className="lbl">Notebook</h2>{NB.map(([k,l])=><div key={k} className="mb-2"><label className="lbl" htmlFor={'n'+k}>{l}</label><textarea id={'n'+k} rows={2} className="inp text-xs" value={s.notes[k]||''} onChange={e=>up({notes:{...s.notes,[k]:e.target.value}})}/></div>)}</aside></div>{Foot}</div>);
}
