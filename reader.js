const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DEFAULTS = {voice:1,domain:'everyday',depth:'expanded',practice:'guided'};
const PRESETS = {
  focused:{voice:0,domain:'none',depth:'essential',practice:'guided'},
  connected:{voice:1,domain:'everyday',depth:'expanded',practice:'guided'},
  skeptical:{voice:2,domain:'business',depth:'expanded',practice:'challenge'},
  gamer:{voice:1,domain:'gaming',depth:'expanded',practice:'challenge'}
};
const VOICES = ['Direct', 'Conversational', 'Skeptical'];
const DOMAINS = {none:'No analogy',everyday:'Everyday life',gaming:'Gaming & strategy',business:'Business & money'};
const STORAGE_KEY = 'commodity-dynamic-ch4-v1';
let storageAvailable = true;
function loadSaved(){try {return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};} catch {storageAvailable=false;return {};}}
function validPrefs(p){return {voice:[0,1,2].includes(p?.voice)?p.voice:DEFAULTS.voice,domain:Object.hasOwn(DOMAINS,p?.domain)?p.domain:DEFAULTS.domain,depth:['essential','expanded'].includes(p?.depth)?p.depth:DEFAULTS.depth,practice:['guided','challenge'].includes(p?.practice)?p.practice:DEFAULTS.practice};}
const saved = loadSaved();
let prefs = validPrefs(saved.prefs), pending = {...prefs};
let font = [16,17,18,19,20,21,22].includes(saved.font)?saved.font:18;
let notes = saved.notes && typeof saved.notes==='object' && !Array.isArray(saved.notes)?saved.notes:{};
let read = Array.isArray(saved.read)?saved.read.filter(id=>CHAPTER.some(s=>s.id===id&&id.startsWith('4.'))):[];
let mode = 'adapted';
let current = 0;
let showOriginal = false;
let questionState = {};
let toastTimer;
let highlights = false;
let originalPassages = new Set();
let positions = saved.positions && typeof saved.positions==='object' && !Array.isArray(saved.positions) ? saved.positions : {};
let presenter = false, tourStep = 0, beforeTour = null;
let positionTimer;
const sourceSnapshot = JSON.stringify(CHAPTER);
function deepFreeze(obj){Object.freeze(obj);Object.values(obj).forEach(v=>{if(v&&typeof v==='object'&&!Object.isFrozen(v))deepFreeze(v);});return obj;}
deepFreeze(CHAPTER);
deepFreeze(LESSONS);
deepFreeze(SECTION_42_VARIANTS);
function save(){try{localStorage.setItem(STORAGE_KEY, JSON.stringify({prefs:presenter&&beforeTour?beforeTour.prefs:prefs,font,notes,read,positions:presenter&&beforeTour?beforeTour.positions:positions,currentSection:presenter&&beforeTour?beforeTour.section:CHAPTER[current].id}));storageAvailable=true;return true;}catch{storageAvailable=false;return false;}}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').hidden=false;toastTimer=setTimeout(()=>$('#toast').hidden=true,3000);}
function selectedSection(){let id;try{id=decodeURIComponent(location.hash.slice(1))||saved.currentSection;}catch{return 0;}const found=CHAPTER.findIndex(s=>s.id===id);return found<0?0:found;}
function capturePosition(){
  const blocks=$$('[data-source-id]');
  const block=blocks.find(e=>e.getBoundingClientRect().bottom>90);
  if(block&&block.getBoundingClientRect().top<innerHeight)return {id:block.dataset.sourceId,offset:block.getBoundingClientRect().top};
  return {y:window.scrollY};
}
function restorePosition(position){
  if(!position)return window.scrollTo({top:0});
  const el=typeof position.id==='string'?$('[data-source-id="'+CSS.escape(position.id)+'"]'):null;
  if(el&&Number.isFinite(position.offset))window.scrollTo({top:Math.max(0,window.scrollY+el.getBoundingClientRect().top-position.offset)});
  else window.scrollTo({top:Number.isFinite(position.y)?Math.max(0,position.y):0});
}
function rememberPosition(){if(!presenter){positions[CHAPTER[current].id]=capturePosition();save();}}
function rerenderPreservingPosition(){const p=capturePosition(),notesOpen=$('.notes')?.open;renderReading();if(notesOpen&&$('.notes'))$('.notes').open=true;restorePosition(p);}
function paragraphText(text){const colon=text.indexOf(':');if(colon>0&&colon<65)return '<strong>'+escapeHTML(text.slice(0,colon+1))+'</strong>'+escapeHTML(text.slice(colon+1));return escapeHTML(text);}
function sourceBlock(b){
  const attrs=` data-source-id="${b.id}" data-content-kind="fixed"`;
  if(b.type==='h3'||b.type==='h4')return `<${b.type}${attrs}>${escapeHTML(b.text)}</${b.type}>`;
  if(b.type==='table')return `<div class="table-wrap"${attrs}><table><thead><tr>${b.rows[0].map(c=>`<th scope="col">${escapeHTML(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.slice(1).map(row=>'<tr>'+row.map(c=>`<td>${escapeHTML(c)}</td>`).join('')+'</tr>').join('')}</tbody></table></div>`;
  if(b.type==='ul'||b.type==='ol')return `<${b.type}${attrs}>${b.items.map(item=>'<li>'+paragraphText(item)+'</li>').join('')}</${b.type}>`;
  if(b.type==='link')return `<a${attrs} class="activity-link" href="${escapeHTML(b.url)}" target="_blank" rel="noopener">${escapeHTML(b.text)} ↗</a>`;
  const label=['Definition','Example','Application to Agricultural Marketing','Primary Objective','Typical Information Sources','Purpose'].includes(b.text)||b.text.startsWith('Step ');
  return `<p${attrs}${label?' class="label-p"':''}>${escapeHTML(b.text)}</p>`;
}
function mutableBlock(section,lesson){return section.blocks.find(b=>b.type==='p'&&lesson.anchor&&b.text.startsWith(lesson.anchor));}
function variantsFor(section,lesson){
  if(section.id==='4.2')return SECTION_42_VARIANTS;
  const block=mutableBlock(section,lesson);return block?{[block.id]:lesson.voices}:{};
}
function adaptedBlock(b,voices){
  if(mode==='original')return sourceBlock(b);
  const original=originalPassages.has(b.id);
  const top=`<div class="passage-top"><span>${original?'Original wording':'Adapted narrative · '+VOICES[prefs.voice].toLowerCase()}</span>${mode==='compare'?'':'<button data-toggle-source="'+b.id+'" aria-expanded="'+original+'">'+(original?'Back to my version':'Show original')+'</button>'}</div>`;
  if(mode==='compare')return `<div class="adapted-block" data-content-kind="adapted" data-source-id="${b.id}" data-adapted="true">${top}<div class="comparison"><div class="compare-col"><div class="eyebrow">Original wording</div><p>${escapeHTML(b.text)}</p></div><div class="compare-col"><div class="eyebrow">Your version · ${VOICES[prefs.voice]}</div><p>${escapeHTML(voices[prefs.voice])}</p></div></div></div>`;
  return `<div class="adapted-block" data-content-kind="${original?'fixed':'adapted'}" data-source-id="${b.id}" data-adapted="${!original}">${top}<p>${escapeHTML(original?b.text:voices[prefs.voice])}</p></div>`;
}
function renderProse(section,lesson){
  const variants=variantsFor(section,lesson);let exampleOpen=false;let html='';
  for(const block of section.blocks){
    if(block.type==='h3'&&exampleOpen){html+='</section>';exampleOpen=false;}
    if(block.text==='Example: Interpreting a Grain Stocks Report'){
      html+='<section class="original-example" id="worked-example" aria-label="Original worked example"><div class="fixed-label">Original worked example · unchanged in every voice</div>';exampleOpen=true;
    }
    html+=variants[block.id]?adaptedBlock(block,variants[block.id]):sourceBlock(block);
    if(block.id==='4.2-b054'&&mode!=='original')html+=renderExampleSupport();
  }
  if(exampleOpen)html+='</section>';
  return html;
}
function renderExampleSupport(){return `<aside class="example-support" data-content-kind="supplemental" aria-label="Added worked-example support"><div class="eyebrow">Work through the units · optional support</div><div class="inventory-chart" role="img" aria-label="Expected inventory 8.0 billion bushels; reported inventory 8.4 billion bushels"><div><span>Expected</span><i style="width:95.238%"></i><b>8.0 billion</b></div><div><span>Reported</span><i style="width:100%"></i><b>8.4 billion</b></div></div><details id="example-steps"><summary>Explain the calculation step by step</summary><ol><li>Keep both inventories in the same unit: billion bushels.</li><li>Subtract the expectation from the reported inventory: <strong>8.4 − 8.0 = 0.4 billion bushels.</strong></li><li>One billion is 1,000 million, so <strong>0.4 × 1,000 = 400 million bushels.</strong></li><li>The surprise is greater supply than expected. It does not tell us an exact price change or require every producer to sell.</li></ol></details><label for="inventory-answer">Try the unit conversion: 0.4 billion is how many million bushels?</label><div class="calculation-row"><input id="inventory-answer" type="number" inputmode="decimal" min="0" step="any" placeholder="Million bushels"><button id="inventory-check">Check conversion</button></div><p id="inventory-feedback" role="status"></p></aside>`;}
function renderLens(lesson){
  if(mode==='original'||!lesson.analogies||prefs.domain==='none')return '';
  const [title,text,limit]=lesson.analogies[prefs.domain];
  return `<aside class="analogy" aria-label="Supplemental analogy"><span class="eyebrow muted">Another way in · ${DOMAINS[prefs.domain]}</span><h3>${escapeHTML(title)}</h3><p>${escapeHTML(text)}</p><p class="limit"><strong>Where the analogy stops:</strong> ${escapeHTML(limit)}</p></aside>`;
}
function renderPreservation(section,lesson){
  const variants=variantsFor(section,lesson);
  const count=Object.keys(variants).filter(id=>mode==='compare'||!originalPassages.has(id)).length;
  return `<aside class="preservation-panel" aria-label="Content preservation"><div class="eyebrow">What changes, what stays</div><div class="preservation-counts"><span><b>${mode==='original'?0:count}</b> adapted narrative passages</span><span><b>${mode==='original'?section.blocks.length:section.blocks.length-count}</b> fixed source blocks</span></div><p class="small">Every original source block remains in its original order. Added teaching support is separate from the textbook text.</p><div class="content-legend"><span class="fixed-key">Fixed source content</span><span class="adapted-key">Adapted narrative</span><span class="added-key">Supplemental support</span></div>${section.id==='4.2'?`<details><summary>Required concepts in this section</summary><ul>${SECTION_42_CONCEPTS.map(c=>'<li>'+escapeHTML(c)+'</li>').join('')}</ul><p>These are the content requirements for author review, not a claim of automated factual verification.</p></details>`:''}</aside>`;
}
const TOUR_STEPS = [
  ['Start with the source','Begin with the original section. Its headings, tables, definitions, and worked example establish the common instructional content.'],
  ['Make it yours','This example selects a skeptical voice, business analogies, and extra explanation. Use the reading lens to try another combination. The full narrative in section 4.2 has three prepared voices.'],
  ['See what stays fixed','Compare the original and adapted narrative. Highlighting identifies fixed source material and added support. The corn example keeps the same numbers and decision process in every voice.']
];
function renderTour(){
  $('#presenter-bar').hidden=!presenter;
  $('#presenter-toggle').setAttribute('aria-expanded',String(presenter));
  if(!presenter)return;
  $('#tour-title').textContent=TOUR_STEPS[tourStep][0];
  $('#tour-description').textContent=TOUR_STEPS[tourStep][1];
  $$('[data-tour-step]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.tourStep)===tourStep)));
  $('#tour-back').disabled=tourStep===0;
  $('#tour-next').textContent=tourStep===2?'Finish tour':'Next step →';
}
function setTourStep(step){
  tourStep=step;current=2;originalPassages.clear();
  if(step===0){prefs={voice:0,domain:'none',depth:'essential',practice:'guided'};mode='original';highlights=false;}
  if(step===1){prefs={...PRESETS.skeptical};mode='adapted';highlights=false;}
  if(step===2){mode='compare';highlights=true;}
  pending={...prefs};
  history.replaceState(null,'','#4.2');renderReading();syncControls();window.scrollTo({top:0});
}
function startTour(){
  if(!presenter){rememberPosition();beforeTour={prefs:{...prefs},mode,section:CHAPTER[current].id,position:capturePosition(),positions:structuredClone(positions),highlights};}
  presenter=true;setTourStep(0);
}
function finishTour(){
  const previous=beforeTour;presenter=false;beforeTour=null;
  if(previous){prefs=previous.prefs;pending={...prefs};mode=previous.mode;highlights=previous.highlights;positions=previous.positions;current=CHAPTER.findIndex(s=>s.id===previous.section);history.replaceState(null,'','#'+previous.section);renderReading();syncControls();restorePosition(previous.position);}
  else{renderTour();}
  save();toast('Back to your reading. Your notes and progress are kept.');
}
function practiceKey(){return CHAPTER[current].id+'-'+prefs.practice;}
function renderPractice(lesson){
  if(mode==='original'||!lesson.question)return '';
  const data=prefs.practice==='challenge'?lesson.challenge:lesson.question;
  const q=questionState[practiceKey()]||{choice:null,checked:false,hint:false};
  return `<section class="practice" aria-label="Supplemental practice"><span class="eyebrow muted">Try the idea · added practice</span><h3>${prefs.practice==='guided'?'Check your understanding':'Test the distinction'}</h3><p class="question">${escapeHTML(data[0])}</p><div class="options" role="group" aria-label="Answer choices">${data[1].map((a,i)=>`<button class="option ${q.checked&&i===data[2]?'correct':q.checked&&i===q.choice?'wrong':''}" data-answer="${i}" aria-pressed="${q.choice===i}"><span class="letter" aria-hidden="true">${String.fromCharCode(65+i)}</span><span>${escapeHTML(a)}</span></button>`).join('')}</div><div class="practice-actions"><button class="primary" id="check-answer" ${q.choice===null||q.checked?'disabled':''}>Check my reasoning</button>${prefs.practice==='guided'?`<button class="quiet" id="hint-toggle" aria-expanded="${q.hint}">${q.hint?'Hide hint':'Give me a hint'}</button>`:''}</div>${q.hint&&prefs.practice==='guided'?`<p class="hint">${escapeHTML(lesson.hint)}</p>`:''}${q.checked?`<div class="feedback" role="status"><strong>${q.choice===data[2]?'That’s right.':'Revisit the distinction.'}</strong> ${escapeHTML(data[3])}</div>`:''}</section>`;
}
function updateProgress(){
  $('#progress-bar').style.width=(read.length/7*100)+'%';
  $('#progress-label').textContent=`${read.length} of 7 sections marked read`;
}
function renderNav(){
  $('#toc').innerHTML=CHAPTER.map((s,i)=>`<a href="#${s.id}" class="${i===current?'active':''}" ${i===current?'aria-current="page"':''}><span>${s.id==='intro'?'○':s.id==='wrap'?'↗':s.id}</span><span>${escapeHTML(LESSONS[i].short)}</span>${read.includes(s.id)?'<span class="read-dot" aria-label="Marked read">✓</span>':''}</a>`).join('');
  $('#mobile-section').innerHTML=CHAPTER.map((s,i)=>`<option value="${s.id}" ${i===current?'selected':''}>${s.id.startsWith('4.')?s.id+' · ':''}${escapeHTML(LESSONS[i].short)}</option>`).join('');
  updateProgress();
}
function renderReading(){
  const section=CHAPTER[current],lesson=LESSONS[current];
  const narrativeCount=Object.keys(variantsFor(section,lesson)).length;
  const title=section.title.replace(/^4\.[1-7]: /,'');
  const idx=section.id.startsWith('4.')?section.id:'Chapter 04';
  const sourceURL='https://commodity-marketing-textbook.ces-chatgpt-2736.chatgpt.site/#4/2';
  $('#reading').innerHTML=`<div class="section-kicker"><span>${idx}</span><span class="line"></span><span>${mode==='original'?'Original chapter text':VOICES[prefs.voice]+' · '+(prefs.depth==='expanded'?'Extra support':'Lean support')}</span></div><h2 class="section-title">${escapeHTML(title)}</h2>${section.id==='4.2'?'<div class="showcase-note"><span class="eyebrow">Featured demonstration</span><p>The narrative throughout this section changes with your voice preference. The original examples, tables, definitions, and procedures stay fixed.</p><button class="quiet small" id="jump-example">Go to the worked example ↓</button></div>':''}${highlights?renderPreservation(section,lesson):''}${mode==='original'?'':`<div class="focus"><span class="eyebrow">Keep this in view · reading guide</span><p>${escapeHTML(lesson.focus)}</p></div>`}${renderLens(lesson)}<article class="prose" aria-label="Chapter section">${renderProse(section,lesson)}</article>${mode!=='original'&&prefs.depth==='expanded'&&lesson.deeper?`<aside class="deeper"><span class="eyebrow muted">Make the connection · added explanation</span><p>${escapeHTML(lesson.deeper)}</p></aside>`:''}${renderPractice(lesson)}<p class="source-note">Source: Jeremy Slade, <a href="${sourceURL}" target="_blank" rel="noopener">Agricultural Commodity Marketing, Chapter 4 ↗</a>. Captured November 5, 2026; pagination and split tables normalized. ${mode==='original'?'Original reading text, with formatting repaired.':`${narrativeCount} narrative passage${narrativeCount===1?'':'s'} ${narrativeCount===1?'has':'have'} prepared voice variations. Turn on Highlight changes to inspect them. Analogies, extra explanations, and practice are supplemental.`}</p><details class="notes"><summary>My notes for this section</summary><label for="section-note">Saved only in this browser; notes are not shared with other readers.</label><textarea id="section-note" placeholder="What changed how you think about this decision?">${escapeHTML(typeof notes[section.id]==='string'?notes[section.id]:'')}</textarea><div class="note-actions"><span id="note-status">${storageAvailable?'Local notes':'Browser storage unavailable; export notes to keep them.'}</span><button class="quiet small" id="export-notes">Export all notes ↓</button></div></details>${section.id.startsWith('4.')?`<label class="complete"><input type="checkbox" id="mark-read" ${read.includes(section.id)?'checked':''}> I’ve finished reading this section</label>`:''}<div class="pager"><button id="previous" ${current===0?'disabled':''}>← Previous section</button><span class="page-count small muted">${current+1} of ${CHAPTER.length}</span><button id="next" class="primary" ${current===CHAPTER.length-1?'disabled':''}>${current===0?'Start section 4.1':'Next section'} →</button></div><p class="bottom-note">Reading prototype · Prepared variations, not live AI generation. Instructor review of adaptations is still needed before classroom use.</p>`;
  document.documentElement.style.setProperty('--reading',font+'px');
  $('#font-less').disabled=font<=16;$('#font-more').disabled=font>=22;
  $$('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
  document.body.classList.toggle('show-changes',highlights);
  $('#highlight-changes').checked=highlights;
  bindReading();renderNav();renderTour();
}
function replacePractice(){
  const old=$('.practice');if(!old)return;
  old.outerHTML=renderPractice(LESSONS[current]);bindPractice();
}
function bindPractice(){
  const key=practiceKey();
  const q=()=>questionState[key]||(questionState[key]={choice:null,checked:false,hint:false});
  $$('[data-answer]').forEach(b=>b.onclick=()=>{const state=q();state.choice=Number(b.dataset.answer);state.checked=false;replacePractice();$(`[data-answer="${state.choice}"]`)?.focus({preventScroll:true});});
  if($('#check-answer'))$('#check-answer').onclick=()=>{q().checked=true;replacePractice();$('.feedback')?.scrollIntoView({block:'nearest'});};
  if($('#hint-toggle'))$('#hint-toggle').onclick=()=>{q().hint=!q().hint;replacePractice();$('#hint-toggle')?.focus({preventScroll:true});};
}
function bindReading(){
  $('#previous').onclick=()=>navigate(current-1);
  $('#next').onclick=()=>navigate(current+1);
  bindPassage();
  if($('#inventory-check'))$('#inventory-check').onclick=()=>{const value=$('#inventory-answer').value;$('#inventory-feedback').textContent=value.trim()===''?'Enter a number in million bushels.':Number(value)===400?'Correct: 0.4 billion equals 400 million bushels.':'Try multiplying 0.4 by 1,000 to convert billions to millions.';};
  if($('#jump-example'))$('#jump-example').onclick=()=>$('#worked-example').scrollIntoView({block:'start'});
  if($('#mark-read'))$('#mark-read').onchange=e=>{const id=CHAPTER[current].id;read=e.target.checked?[...new Set([...read,id])]:read.filter(x=>x!==id);save();renderNav();};
  $('#section-note').oninput=e=>{notes[CHAPTER[current].id]=e.target.value;const ok=save();$('#note-status').textContent=ok?'Saved in this browser':'Storage unavailable. Export your notes to keep them.';};
  $('#export-notes').onclick=exportNotes;
  bindPractice();
}
function bindPassage(){
  $$('[data-toggle-source]').forEach(button=>button.onclick=()=>{
    const id=button.dataset.toggleSource;
    originalPassages.has(id)?originalPassages.delete(id):originalPassages.add(id);
    const section=CHAPTER[current],lesson=LESSONS[current];
    const block=section.blocks.find(b=>b.id===id);
    $('[data-source-id="'+id+'"]').outerHTML=adaptedBlock(block,variantsFor(section,lesson)[id]);
    bindPassage();if($('.preservation-panel'))$('.preservation-panel').outerHTML=renderPreservation(section,lesson);$('[data-toggle-source="'+id+'"]')?.focus({preventScroll:true});
  });
}
function exportNotes(){
  const output=['AGRICULTURAL COMMODITY MARKETING · CHAPTER 4','Personal reading notes',''];
  CHAPTER.forEach(s=>{if(typeof notes[s.id]==='string'&&notes[s.id].trim())output.push(s.title,notes[s.id].trim(),'');});
  if(output.length===3)output.push('No notes recorded yet.');
  const url=URL.createObjectURL(new Blob([output.join('\n')],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download='chapter-4-reading-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function navigate(index){if(index>=0&&index<CHAPTER.length){rememberPosition();location.hash=CHAPTER[index].id;}}
function closeSettings(){const panel=$('#settings');panel.classList.remove('open');$('#settings-toggle').setAttribute('aria-expanded','false');}
function syncControls(){
  $('#voice').value=pending.voice;$('#voice').setAttribute('aria-valuetext',VOICES[pending.voice]);
  $$('.range-labels span').forEach((s,i)=>s.classList.toggle('selected',i===pending.voice));
  $('#domain').value=pending.domain;$('#depth').value=pending.depth;
  $$('input[name=practice]').forEach(r=>r.checked=r.value===pending.practice);
  $$('[data-preset]').forEach(b=>{const active=JSON.stringify(PRESETS[b.dataset.preset])===JSON.stringify(pending);b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});
  const changed=JSON.stringify(pending)!==JSON.stringify(prefs);
  $('#settings-status').textContent=changed?'Changes ready. Apply when you’re ready.':storageAvailable?'Preferences saved on this device.':'Browser storage is unavailable.';
  $('#apply').textContent=changed?'Apply to my reading':'Reading lens applied';
  $('#apply').disabled=!changed;
}
function applyPreferences(){rememberPosition();prefs={...pending};originalPassages.clear();mode='adapted';rerenderPreservingPosition();save();syncControls();closeSettings();toast('Reading lens updated. Original examples stay intact.');}
$('#voice').oninput=e=>{pending.voice=Number(e.target.value);syncControls();};
$('#domain').onchange=e=>{pending.domain=e.target.value;syncControls();};
$('#depth').onchange=e=>{pending.depth=e.target.value;syncControls();};
$$('input[name=practice]').forEach(r=>r.onchange=()=>{pending.practice=r.value;syncControls();});
$$('[data-preset]').forEach(b=>b.onclick=()=>{pending={...PRESETS[b.dataset.preset]};syncControls();});
$('#apply').onclick=applyPreferences;
$('#reset').onclick=()=>{pending={...DEFAULTS};prefs={...DEFAULTS};mode='adapted';originalPassages.clear();save();rerenderPreservingPosition();syncControls();toast('Reading preferences reset. Your notes and progress are kept.');};
$$('[data-mode]').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;originalPassages.clear();rerenderPreservingPosition();if(mode==='compare'&&!Object.keys(variantsFor(CHAPTER[current],LESSONS[current])).length)toast('This section has no rewritten passage. Its original text stays fixed.');});
$('#font-less').onclick=()=>{font=Math.max(16,font-1);save();document.documentElement.style.setProperty('--reading',font+'px');$('#font-less').disabled=font<=16;$('#font-more').disabled=false;};
$('#font-more').onclick=()=>{font=Math.min(22,font+1);save();document.documentElement.style.setProperty('--reading',font+'px');$('#font-more').disabled=font>=22;$('#font-less').disabled=false;};
$('.skip').onclick=e=>{e.preventDefault();$('#reading').focus();$('#reading').scrollIntoView({block:'start'});};
$('#mobile-section').onchange=e=>{rememberPosition();location.hash=e.target.value;};
$('#settings-toggle').onclick=()=>{const open=$('#settings').classList.toggle('open');$('#settings-toggle').setAttribute('aria-expanded',open);if(open)$('#settings-close').focus();};
$('#settings-close').onclick=()=>{closeSettings();$('#settings-toggle').focus();};
$('#highlight-changes').onchange=e=>{highlights=e.target.checked;rerenderPreservingPosition();};
$('#presenter-toggle').onclick=()=>presenter?finishTour():startTour();
$$('[data-tour-step]').forEach(b=>b.onclick=()=>setTourStep(Number(b.dataset.tourStep)));
$('#tour-back').onclick=()=>{if(tourStep>0)setTourStep(tourStep-1);};
$('#tour-next').onclick=()=>tourStep===2?finishTour():setTourStep(tourStep+1);
$('#tour-reset').onclick=startTour;
$('#tour-exit').onclick=finishTour;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#settings').classList.contains('open')){closeSettings();$('#settings-toggle').focus();}});
document.addEventListener('click',e=>{if($('#settings').classList.contains('open')&&!$('#settings').contains(e.target)&&!$('#settings-toggle').contains(e.target))closeSettings();});
window.addEventListener('hashchange',()=>{clearTimeout(positionTimer);current=selectedSection();originalPassages.clear();renderReading();restorePosition(presenter?null:positions[CHAPTER[current].id]);$('#reading').focus({preventScroll:true});save();});
$('#toc').addEventListener('click',e=>{if(e.target.closest('a'))rememberPosition();});
window.addEventListener('scroll',()=>{clearTimeout(positionTimer);positionTimer=setTimeout(rememberPosition,350);},{passive:true});
window.addEventListener('pagehide',rememberPosition);
// Used by the local integrity check. It verifies structure/preservation, not factual truth.
window.chapterAudit = function(){
  const section=CHAPTER[current], lesson=LESSONS[current], variants=variantsFor(section,lesson);
  const expected=section.blocks.map(b=>b.id);
  const actual=$$('[data-source-id]').map(e=>e.dataset.sourceId);
  const fixed=section.blocks.filter(b=>!variants[b.id]||mode==='original');
  const text=(node)=>node.textContent.replace(/\s+/g,' ').trim();
  const failed=fixed.filter(b=>{
    const el=$(`[data-source-id="${b.id}"]`);if(!el)return true;
    if(b.type==='table')return JSON.stringify([...el.querySelectorAll('tr')].map(r=>[...r.children].map(text)))!==JSON.stringify(b.rows);
    if(b.items)return JSON.stringify([...el.children].map(text))!==JSON.stringify(b.items);
    return text(el)!==b.text+(b.type==='link'?' ↗':'');
  }).map(b=>b.id);
  return {section:section.id,sourceUnchanged:JSON.stringify(CHAPTER)===sourceSnapshot,blockOrderPreserved:JSON.stringify(expected)===JSON.stringify(actual),fixedBlocks:fixed.length,failedFixedBlocks:failed,adaptedPassages:$$('[data-adapted="true"]').length,sourceBlocks:expected.length};
};
current=selectedSection();renderReading();syncControls();restorePosition(positions[CHAPTER[current].id]);
if(new URLSearchParams(location.search).get('present')==='1')startTour();
