export const FILES:Record<string,string>={
'auth.log':`2026-05-14 23:02:09 login FAIL user=admin ip=203.0.113.50
2026-05-14 23:02:15 login FAIL user=admin ip=203.0.113.50
2026-05-14 23:02:21 login FAIL user=admin ip=203.0.113.50
2026-05-15 02:14:07 login OK user=admin ip=198.51.100.77
2026-05-15 02:14:52 file DELETE /redstone/generator.cfg user=admin
2026-05-15 02:15:30 logout user=admin`,
'ip_registry.txt':`10.0.0.12 = Steve_P (lab PC 12)
10.0.0.15 = Alex_R (lab PC 15)
10.0.0.23 = Hero_B (lab PC 23)
198.51.100.77 = C_Ender (home connection)
203.0.113.50 = unknown external host`,
'metadata.csv':`file,author,created,last_modified
generator_backup.cfg,Steve_P,2026-05-14 21:50,2026-05-14 21:50
ransom_note.txt,C_Ender,2026-05-15 02:11,2026-05-15 02:13
lecture_notes.pdf,Alex_R,2026-05-10 14:02,2026-05-12 09:30`,
'suspects.txt':`Steve_P - The Miner      #GAMING   Has generator_backup.cfg (connects him to the generator, not to sabotage)
Alex_R  - The Librarian  #HOMEWORK Shares academic notes. No direct link to the deletion.
Hero_B  - The Farmer     #COFFEE   No direct link to the incident.
C_Ender - The Mysterious #OSINT    "I solve puzzles using only public information."
NOTE: interests and hashtags are not evidence.`,
'investigation_notes.txt':`Investigator guidance
- An IP address is a lead, not proof of identity.
- Metadata records what a system stored, not who acted.
- A suspicious clue is not conclusive proof.
- All addresses in this case are fictional documentation ranges.`};
export type Q={id:string;label:string;w:number;opts?:string[];ok:(v:string)=>boolean};
export type C={id:string;title:string;intro:string;qs:Q[];hints:string[]};
const eq=(x:string)=>(v:string)=>v.trim().toLowerCase()===x.toLowerCase();
const N=['Steve_P','Alex_R','Hero_B','C_Ender'];
export const CH:C[]=[
{id:'c1',title:'1. Authentication logs',intro:'Read auth.log carefully.',hints:['Count only lines marked FAIL.','The deletion is the line starting with file DELETE.'],qs:[
{id:'n',label:'How many login attempts failed? (auth.log)',w:2,opts:['1','2','3','4'],ok:eq('3')},
{id:'fip',label:'IP address used for the failed attempts (auth.log)',w:2,opts:['198.51.100.77','203.0.113.50','10.0.0.12'],ok:eq('203.0.113.50')},
{id:'dt',label:'Time generator.cfg was deleted (auth.log)',w:2,opts:['02:14:07','02:14:52','02:15:30'],ok:v=>v.includes('02:14:52')},
{id:'ac',label:'Account used (auth.log)',w:2,opts:['admin','root','guest'],ok:eq('admin')}]},
{id:'c2',title:'2. IP correlation',intro:'Compare auth.log with ip_registry.txt.',hints:['Find the line with login OK.','Which registry entry matches that address?'],qs:[
{id:'sip',label:'IP address of the successful login (login OK line)',w:1,opts:['198.51.100.77','203.0.113.50','10.0.0.15'],ok:eq('198.51.100.77')},
{id:'pro',label:'Profile associated with that IP',w:1,opts:N,ok:eq('C_Ender')},
{id:'suf',label:'Does the association prove who operated the connection?',w:.5,opts:['Yes, it proves identity','No, it is only a lead'],ok:v=>v.startsWith('No')},
{id:'why',label:'Why is an IP only a lead?',w:.5,opts:['IPs can be shared, proxied or spoofed','IPs never change','An IP is always unique to one person'],ok:v=>v.startsWith('IPs can')}]},
{id:'c3',title:'3. Metadata analysis',intro:'Study metadata.csv and the timeline.',hints:['Look at the ransom_note.txt row.','Compare the creation time with 02:14:52.'],qs:[
{id:'au',label:'Author of ransom_note.txt',w:.5,opts:N,ok:eq('C_Ender')},
{id:'cr',label:'Creation time of the note (metadata.csv)',w:.5,opts:['02:11','02:13','02:14'],ok:v=>v.includes('02:11')},
{id:'ba',label:'Created before or after the deletion?',w:1,opts:['Before','After'],ok:eq('Before')},
{id:'pr',label:'Does metadata alone prove who deleted the file?',w:1,opts:['Yes','No'],ok:eq('No')}]}];
export const TL=[
['14 May 2026, 23:02:09','Failed login attempt','auth.log'],['14 May 2026, 23:02:15','Failed login attempt','auth.log'],['14 May 2026, 23:02:21','Failed login attempt','auth.log'],
['15 May 2026, 02:11','ransom_note.txt created','metadata.csv'],['15 May 2026, 02:13','ransom_note.txt last modified','metadata.csv'],
['15 May 2026, 02:14:07','Successful login as admin','auth.log'],['15 May 2026, 02:14:52','generator.cfg deleted','auth.log'],['15 May 2026, 02:15:30','Logout','auth.log']];
export const SUS=[
{n:'Steve_P',r:'The Miner',t:'#GAMING',clues:['Author of generator_backup.cfg (created 21:50, 14 May).','Registry: lab PC 12.'],link:'Backup file -> Steve_P (connects him to the generator, does not prove sabotage)'},
{n:'Alex_R',r:'The Librarian',t:'#HOMEWORK',clues:['Shares academic notes (lecture_notes.pdf).','No direct evidence links Alex_R to the deletion.'],link:''},
{n:'Hero_B',r:'The Farmer',t:'#COFFEE',clues:['Registry: lab PC 23.','No direct evidence links Hero_B to the incident.'],link:''},
{n:'C_Ender',r:'The Mysterious Player',t:'#OSINT',clues:['Profile: "I solve puzzles using only public information." (an interest, not evidence)','Registry: 198.51.100.77 = C_Ender (home connection).','Metadata: author of ransom_note.txt.'],link:'Successful login IP -> C_Ender;  ransom_note.txt metadata -> C_Ender'}];
export const EVID=[
{id:'ip',l:'Successful-login IP 198.51.100.77 is registered to C_Ender',rel:true},
{id:'note',l:'C_Ender is listed as author of ransom_note.txt',rel:true},
{id:'time',l:'The note timestamps (02:11 / 02:13) precede the deletion (02:14:52)',rel:true},
{id:'osint',l:'C_Ender uses the #OSINT hashtag',rel:false},
{id:'bak',l:'Steve_P owns generator_backup.cfg',rel:false},
{id:'fail',l:'Failed logins came from 203.0.113.50',rel:false}];
export type Rep={d:Record<string,string>;ev:string[]};
export type S={scr:string;tab:string;file:string;a:Record<string,string>;sub:Record<string,boolean>;hs:Record<string,number>;hints:number;notes:Record<string,string>;d:Record<string,string>;ev:string[];rep:Rep|null};
export const INIT:S={scr:'menu',tab:'files',file:'auth.log',a:{},sub:{},hs:{},hints:0,notes:{},d:{},ev:[],rep:null};
export const qok=(s:S,c:C,q:Q)=>q.ok(s.a[c.id+q.id]||'');
export const cdone=(s:S,c:C)=>!!s.sub[c.id]&&c.qs.every(q=>qok(s,c,q));
export function calc(s:S){
 const p=(i:number)=>s.sub[CH[i].id]?CH[i].qs.reduce((t,q)=>t+(qok(s,CH[i],q)?q.w:0),0):0;
 const r=s.rep;const rel=r?r.ev.filter(e=>EVID.find(x=>x.id===e)?.rel).length:0;
 const support=r&&r.d.suspect==='C_Ender'?(rel>=2?4:rel===1?2:0):0;
 const caution=r&&r.d.unc.trim().length>=15&&/(not|may|might|could|lead|limit|prove|proof|certain|cannot|conclusive|shared|spoof|vpn|attribut|doubt|uncertain)/i.test(r.d.unc+' '+r.d.extra)?2:0;
 const parts:[string,number,number][]=[['Authentication log',p(0),8],['IP correlation',p(1),3],['Metadata analysis',p(2),3],['Supported conclusion',support,4],['Awareness of limits',caution,2]];
 const raw=parts.reduce((t,x)=>t+x[1],0);
 return{parts,hints:s.hints,total:Math.max(0,Math.min(20,raw-s.hints/2))};}
