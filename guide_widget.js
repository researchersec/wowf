'use strict';
// Built-in data and existing site catalog are separate evidence tiers.
const guideDB = /*__GUIDE_DATA__*/;
const guideById = new Map((typeof data!=='undefined' ? data : []).map(x=>[x.id,x]));
const guideElt = id => document.getElementById(id);
const guideEsc = value => String(value??'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const guideField = (r,k) => (r.attributes||[]).find(x=>x.name===k)?.value||'';
let guideFaction='Alliance', guideStart='human', guideLevel=16;
const guideFallback={};
function guideSafeRead(k){try{return window.localStorage.getItem(k)??guideFallback[k]??null}catch(e){return guideFallback[k]??null}}
function guideSafeWrite(k,v){guideFallback[k]=v;try{window.localStorage.setItem(k,v)}catch(e){}}
function guideStorageKey(){return 'ffg-1-30:'+guideStart}
function guideChecks(){try{return JSON.parse(guideSafeRead(guideStorageKey())||'{}')}catch(e){return {}}}
function guideSetStartChoices(){
 const choices=guideDB.starting_options[guideFaction];
 guideElt('guideStart').innerHTML=choices.map(s=>`<option value="${guideEsc(s.id)}">${guideEsc(s.name)}</option>`).join('');
 if(!choices.some(s=>s.id===guideStart))guideStart=choices[0].id;
 guideElt('guideStart').value=guideStart;
}
function guideReadLevel(){
 const n=Number(guideElt('guideLevel').value);
 if(!Number.isInteger(n)||n<1||n>30){guideElt('guideLevel').setCustomValidity('Enter a whole level between 1 and 30.');guideElt('guideLevel').reportValidity();return false;}
 guideElt('guideLevel').setCustomValidity('');guideLevel=n;return true;
}
function guideDungeonMatches(d){return guideLevel>=d.min&&guideLevel<=d.max}
function guidePreferredDungeon(d){return d.near_faction==='Both'||d.near_faction===guideFaction}
function guideSortDungeon(a,b){
 const step=guideDB.routes[guideStart].find(s=>guideLevel>=s.level_min&&guideLevel<=s.level_max);
 const rank=d=>{
  const local=step?.zone_keys.some(k=>k.toLowerCase()===d.category.toLowerCase()||d.location.toLowerCase().includes(k.toLowerCase()));
  return (guideDungeonMatches(d)?0:100) + (local?-35:0) + (guidePreferredDungeon(d)?0:55) + (d.min>guideLevel?d.min-guideLevel:0);
 };
 return rank(a)-rank(b)||a.min-b.min||a.name.localeCompare(b.name);
}
function guideDungeonRows(){
 const current=guideDB.dungeons.filter(guideDungeonMatches).sort(guideSortDungeon);
 const upcoming=guideDB.dungeons.filter(d=>d.min>guideLevel&&d.min<=Math.min(30,guideLevel+5)).sort(guideSortDungeon);
 // Show close-to-route choices first, but allow distant alternatives when the local list is short.
 const preferred=current.filter(guidePreferredDungeon);
 const remote=current.filter(d=>!guidePreferredDungeon(d));
 const future=upcoming.filter(guidePreferredDungeon);
 let chosen=[...preferred.slice(0,5)];
 if(chosen.length<4)chosen.push(...future.slice(0,4-chosen.length));
 if(chosen.length<4)chosen.push(...remote.slice(0,4-chosen.length));
 if(!chosen.length)chosen=guideDB.dungeons.filter(d=>d.min>guideLevel).sort((a,b)=>a.min-b.min).slice(0,2);
 return [...new Map(chosen.map(d=>[d.id,d])).values()];
}
function guideQuestCandidates(steps,shownDungeons){
 const active=steps.find(s=>guideLevel>=s.level_min&&guideLevel<=s.level_max)||steps[steps.length-1];
 const keys=new Set(active.zone_keys.map(x=>x.toLowerCase()));
 // Source-backed index entries can have minimum level lower than their suggested quest level.
 for(const d of shownDungeons) if(guidePreferredDungeon(d)&&(guideDungeonMatches(d)||d.min-guideLevel<=2)) keys.add(d.category.toLowerCase());
 return [...guideById.values()].filter(r=>r.type==='Quest'&&r.status==='beta_indexed').filter(r=>{
  let category=guideField(r,'Category / zone').toLowerCase();
  let min=Number(guideField(r,'Minimum level'));
  let qlevel=Number(guideField(r,'Quest level'));
  if(!keys.has(category)||!Number.isInteger(min)||min>guideLevel)return false;
  return Number.isInteger(qlevel)&&qlevel<=guideLevel+7;
 }).sort((a,b)=>{
  const qa=Number(guideField(a,'Quest level')),qb=Number(guideField(b,'Quest level'));
  return Math.abs(qa-guideLevel)-Math.abs(qb-guideLevel)||a.name.localeCompare(b.name);
 }).slice(0,6);
}
function guideRender(){
 const steps=guideDB.routes[guideStart],check=guideChecks(),doneCount=steps.filter((s,i)=>check[i]).length;
 const chosen=guideDB.starting_options[guideFaction].find(x=>x.id===guideStart);
 const active=steps.find(s=>guideLevel>=s.level_min&&guideLevel<=s.level_max);
 const dungeons=guideDungeonRows();
 guideElt('guideStats').innerHTML=`<span><strong>${guideEsc(chosen.name)}</strong> · ${guideEsc(chosen.start)}</span><span><strong>Level ${guideLevel}</strong> · ${guideEsc(active?.zone||'Choose a zone')}</span><span>${doneCount}/${steps.length} route bands checked</span><span class="rule-pill">Prelaunch · sourced, not live verified</span>`;
 guideElt('guideRouteSub').textContent=`${steps.length} compact level bands · advice, not a fixed quest chain`;
 guideElt('guideRoute').innerHTML=steps.map((s,i)=>{
  const isCurrent=guideLevel>=s.level_min&&guideLevel<=s.level_max;
  return `<article class="route-step ${isCurrent?'current':''} ${check[i]?'done':''}"><div class="route-range">${s.level_min}–${s.level_max}</div><div><div class="route-title"><span>${guideEsc(s.zone)}</span>${isCurrent?'<span class="now">YOU ARE HERE</span>':''}</div><div class="route-hub">${guideEsc(s.hub)}</div><p class="route-action">${guideEsc(s.action)}</p><div class="route-bottom"><label class="route-check"><input type="checkbox" data-route-check="${i}" ${check[i]?'checked':''}/> Mark this band done</label><span class="route-type">${guideEsc(s.focus)}</span></div></div></article>`;
 }).join('');
 guideElt('guideDungeonCount').textContent=`${guideDB.dungeons.filter(guideDungeonMatches).length} in published bracket`;
 guideElt('guideDungeons').innerHTML=dungeons.length?dungeons.map(d=>{
  const now=guideDungeonMatches(d),official=d.status==='official_announced';
  const source=guideDB.sources[d.source];
  return `<article class="dungeon-row"><div class="d-top"><span class="d-name">${guideEsc(d.name)}</span><strong class="d-range">${d.min}–${d.max}</strong></div><div class="d-place">${guideEsc(d.location)} · ${now?'Within published level range':'Upcoming at '+d.min}${guidePreferredDungeon(d)?'':' · Long travel'}</div><div class="d-bottom"><span class="d-evidence ${official?'':'beta'}">${official?'Blizzard announced':'Community beta range'}</span>${d.record_id&&guideById.has(d.record_id)?`<button type="button" class="d-link" data-guide-record="${guideEsc(d.record_id)}">Details in database ↗</button>`:''}<a href="${guideEsc(source)}" target="_blank" rel="noopener noreferrer" class="d-link">Source ↗</a></div>${d.id==='dalaran'?`<p class="d-notes">${guideEsc(d.tip)}</p>`:''}</article>`;
 }).join(''):'<div class="level-empty">No dungeon matches this band. Your first published dungeon bracket begins at level 13.</div>';
 const questRows=guideQuestCandidates(steps,dungeons);
 guideElt('guideQuests').innerHTML=questRows.length?questRows.map(q=>`<div class="quest-suggestion"><div><button class="quest-link" type="button" data-guide-record="${guideEsc(q.id)}">${guideEsc(q.name)} ↗</button><small>${guideEsc(guideField(q,'Category / zone'))} · Quest level ${guideEsc(guideField(q,'Quest level'))} · Minimum ${guideEsc(guideField(q,'Minimum level'))}</small></div><strong>Beta index</strong></div>`).join(''):'<div class="level-empty">No matching quest listing in our partial beta index for this zone and level. This does not mean there are no quests.</div>';
}
function guideCopyText(){
 const steps=guideDB.routes[guideStart],links=guideDB.sources;
 const planned=guideDB.dungeons.filter(d=>d.min<=30&&guidePreferredDungeon(d)).sort((a,b)=>a.min-b.min);
 return `Forever Field Guide · Level 1–30 editorial plan\n${guideFaction} / ${guideStart} · Current level ${guideLevel}\n\n`+
 steps.map(s=>`${s.level_min}–${s.level_max}: ${s.zone} (${s.hub})\n  ${s.action}`).join('\n')+
 '\n\nDungeon reference (not mandatory):\n'+planned.map(d=>`• ${d.name} ${d.min}–${d.max} (${d.status==='official_announced'?'Blizzard announced':'community beta range'})`).join('\n')+
 `\n\nSources: ${links.blizzard_dungeons} | ${links.route_alliance} | ${links.route_horde}\nPrelaunch editorial suggestions; not verified fastest or live-server confirmed.`;
}
guideElt('guideFaction').addEventListener('change',e=>{guideFaction=e.target.value;guideSetStartChoices();guideRender()});
guideElt('guideStart').addEventListener('change',e=>{guideStart=e.target.value;guideRender()});
guideElt('guideLevel').addEventListener('change',()=>{if(guideReadLevel())guideRender()});
guideElt('guideLevel').addEventListener('input',()=>{if(Number.isInteger(Number(guideElt('guideLevel').value))&&Number(guideElt('guideLevel').value)>=1&&Number(guideElt('guideLevel').value)<=30){guideReadLevel();guideRender()}});
guideElt('guideRoute').addEventListener('change',e=>{const c=e.target.closest('[data-route-check]');if(!c)return;const state=guideChecks();state[Number(c.dataset.routeCheck)]=c.checked;guideSafeWrite(guideStorageKey(),JSON.stringify(state));guideRender()});
guideElt('guideCopy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(guideCopyText());guideElt('guideCopy').textContent='Copied ✓';setTimeout(()=>guideElt('guideCopy').textContent='Copy route',1600)}catch(e){window.prompt('Copy the route:',guideCopyText())}});
guideElt('levelingGuide').addEventListener('click',e=>{const b=e.target.closest('[data-guide-record]');if(!b)return;if(typeof selectRecord==='function')selectRecord(b.dataset.guideRecord)});
const initGuideFaction=guideSafeRead('ffg-1-30:faction');if(initGuideFaction==='Horde')guideFaction='Horde';
guideElt('guideFaction').value=guideFaction;
guideSetStartChoices();guideRender();
guideElt('guideFaction').addEventListener('change',()=>guideSafeWrite('ffg-1-30:faction',guideFaction));
