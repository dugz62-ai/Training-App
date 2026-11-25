/* Douglas Training – v1. Vanilla JS, all data in localStorage. */
(() => {
'use strict';
const EX = window.EX;
const TZ = 'Africa/Johannesburg';

// ---------- logging specs: [type, sets, short name for coach text] ----------
// types: wr = kg + reps, r = reps, s = seconds, ws = kg + seconds, int = rounds + level, min = minutes, done = checkbox
const SPEC = {
  'Incline dumbbell press': ['wr', 4, 'Incline DB press'], // retired; kept so saved logs still format
  'Single-arm incline dumbbell press': ['wr', 4, 'Single-arm incline DB press'],
  'Chest-supported row': ['wr', 4, 'Chest-supported row'],
  'Flat barbell bench press': ['wr', 3, 'Bench press'],
  'Low-to-high cable fly': ['wr', 3, 'Low-to-high fly'], // retired; kept so saved logs still format
  'Flat or high-to-low cable fly': ['wr', 3, 'Cable fly'],
  'KB halos': ['wr', 3, 'KB halos'],
  'KB pullovers': ['wr', 3, 'KB pullovers'],
  'KB single-arm floor press': ['wr', 3, 'KB floor press'],
  'Dead bug': ['r', 3, 'Dead bug'],
  'Prone Y-T-W raises (light plates)': ['wr', 2, 'Y-T-W'], // retired name; logs still format
  'Prone Y-T-W raises (bodyweight)': ['r', 2, 'Y-T-W'],
  'Prone cobra hold': ['s', 3, 'Cobra hold'], // retired
  'Lat pulldown or assisted pull-up': ['wr', 4, 'Lat pulldown'],
  'Seated dumbbell shoulder press': ['wr', 3, 'Seated DB shoulder press'],
  'Single-arm kettlebell row': ['wr', 3, 'KB single-arm row'],
  'Suitcase hold': ['ws', 3, 'Suitcase hold'], // retired; static hold, kept so old logs format
  'Suitcase or farmer carry': ['ws', 3, 'Suitcase carry'],
  'Overhead KB hold': ['ws', 3, 'Overhead KB hold'], // retired
  'Straight-arm cable pulldown': ['wr', 3, 'Straight-arm pulldown'],
  'Cable external rotation': ['wr', 3, 'Cable ext rotation'],
  'KB side bends': ['ws', 3, 'KB side bends'],
  'Hollow hold': ['s', 3, 'Hollow hold'],
  'Single-arm plank': ['s', 3, 'Single-arm plank'],
  'Superman hold': ['s', 3, 'Superman hold'], // retired
  'Inverted-row isometric holds': ['s', 3, 'Inverted-row hold'],
  'Paused flat dumbbell press': ['wr', 4, 'Paused DB press'],
  'Archer push-ups': ['r', 3, 'Archer push-ups'],
  'Pike push-ups': ['r', 3, 'Pike push-ups'],
  'Light chest-supported dumbbell row': ['wr', 3, 'Chest-supported DB row'],
  'Band pull-aparts': ['r', 3, 'Band pull-aparts'],
  'Seated cable row': ['wr', 3, 'Seated cable row'],
  'KB lateral-to-front raise': ['wr', 3, 'KB lateral-front raise'],
  'Goblet curl to pullover': ['wr', 3, 'Goblet curl to pullover'],
  'Rope triceps pushdown': ['wr', 3, 'Rope pushdown'],
  'Bird dog': ['r', 3, 'Bird dog'],
  'Light glute bridge': ['wr', 3, 'Glute bridge'],
  'Arm-bike paddle intervals': ['int', 1, 'Paddle intervals'], // retired; kept so saved logs still format
  'Seated battle ropes': ['s', 4, 'Battle ropes'],
  'SkiErg intervals': ['int', 1, 'SkiErg'],
  'Straight-arm cable pulldown (paddle stroke)': ['wr', 3, 'Paddle pulldown'],
  'Dead hang': ['s', 3, 'Dead hang'],
  'Yoga session': ['min', 1, 'Yoga'],
  'Stick or broom mobility opener': ['done', 1, 'Stick opener'],
  'Travel circuit (how this session works)': ['done', 1, 'Travel circuit'],
  'Grounded rotation (seated, tall-kneeling or quadruped)': ['r', 3, 'Grounded rotation'],
  'KB floor press or push-ups': ['wr', 3, 'KB floor press'],
  'Light goblet squat or reverse lunge': ['wr', 3, 'Goblet squat'],
  'Band dislocates (shoulder pass-throughs)': ['done', 1, 'Band dislocates'], // retired
  '90/90 hip switches': ['done', 1, '90/90 switches'], // retired
};
// Renames that should still find the previous log. Different exercises stay unaliased.
const ALIAS = {
  'Prone Y-T-W raises (bodyweight)': ['Prone Y-T-W raises (light plates)'],
  'Suitcase or farmer carry': ['Suitcase hold'],
};
const specOf = (ex) => SPEC[ex.name] || ['done', 1, ex.name];
const sessionWarmup = (def) => (def.gym ? (def.warmup || EX.warmup) : []);

const YOGA = {
  name: 'Yoga session',
  dose: '30–45 min: gentle hatha, yin or a mobility flow',
  cues: ['Focus on spine, hips and shoulder openers', 'Good picks: cat-cow, thread the needle, downward dog, supported twists',
    'Your saved s.z.movement and stretch.strengthen routines fit well here'],
  mistake: 'Deep knee bends: hero pose, full kneeling and pigeon on the injured side.',
  knee: 'Skip any pose that loads or twists the sore knee until the physio clears it.',
  links: [],
};

const SESSIONS = {
  A: { label: 'DAY A', title: 'Day A · Chest and posture', short: 'Day A', gym: true, warmup: EX.warmupA, items: EX.dayA },
  B: { label: 'DAY B', title: 'Day B · Back, shoulders and core', short: 'Day B', gym: true, items: EX.dayB },
  C: { label: 'DAY C', title: 'Day C · Chest, arms and push-ups', short: 'Day C', gym: true, items: EX.dayC },
  T: { label: 'TRAVEL KB', title: 'Travel KB · 30 min', short: 'Travel KB', gym: false, kneeBanner: true, items: EX.travelKB },
  P: { label: 'PADDLE + MOBILITY', title: 'Paddle conditioning + mobility', short: 'Paddle', gym: false, items: [...EX.intervals, ...EX.mobility] },
  M: { label: 'MOBILITY / YOGA', title: 'Mobility & yoga (or rest)', short: 'Mobility/yoga', gym: false, items: [...EX.mobility, YOGA] },
};
const WEEK = [ // Mon..Sun
  ['Mon', 'A'], ['Tue', 'P'], ['Wed', 'B'], ['Thu', 'P'], ['Fri', 'C'], ['Sat', 'M'], ['Sun', 'M'],
];

// ---------- dates in Africa/Johannesburg ----------
const todayISO = () => new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const todayDow = () => new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short' }).format(new Date());
const prettyDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString('en-ZA', { timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }); };
const todayKey = () => (WEEK.find((w) => w[0] === todayDow()) || WEEK[0])[1];

// ---------- storage ----------
const K_SESS = 'dt.sessions.v1';
const load = () => { try { return JSON.parse(localStorage.getItem(K_SESS)) || []; } catch { return []; } };
const store = (arr) => localStorage.setItem(K_SESS, JSON.stringify(arr));
const draftKey = (key) => 'dt.draft.' + key;
const loadDraft = (key) => { try { return JSON.parse(localStorage.getItem(draftKey(key))); } catch { return null; } };
const saveDraft = (key, d) => localStorage.setItem(draftKey(key), JSON.stringify(d));
const clearDraft = (key) => localStorage.removeItem(draftKey(key));
const sorted = () => load().sort((a, b) => (b.date + b.savedAt).localeCompare(a.date + a.savedAt));

function loggedEntry(entries, exName) {
  if (!entries) return null;
  if (entries[exName] && hasData(entries[exName])) return entries[exName];
  for (const alt of (ALIAS[exName] || [])) {
    if (entries[alt] && hasData(entries[alt])) return entries[alt];
  }
  return null;
}
function lastEntry(exName, beforeDate) {
  const names = [exName, ...(ALIAS[exName] || [])];
  for (const s of sorted()) {
    if (beforeDate && s.date >= beforeDate) continue;
    for (const name of names) {
      const e = s.entries && s.entries[name];
      if (e && hasData(e)) return { date: s.date, entry: e, name };
    }
  }
  return null;
}
const filled = (v) => v !== undefined && v !== null && String(v).trim() !== '';
const hasData = (e) => e.done || (e.sets || []).some((st) => filled(st.r));

// ---------- helpers ----------
const $ = (sel, el = document) => el.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v) => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : null; };
const fmtNum = (n) => (Math.round(n * 100) / 100).toString();
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 2200); }

const UNIT = { r: 'reps', s: 's', ws: 's', int: 'rounds', min: 'min' };
// compact text for one entry, e.g. "22.5kg 10/9/8/8" or "20kg×10, 22.5kg×8"
function entryText(ex, e) {
  const [type] = specOf(ex);
  if (type === 'done') return e.done ? '✓' : '';
  const sets = (e.sets || []).filter((s) => filled(s.r));
  if (!sets.length) return '';
  const rs = sets.map((s) => s.r);
  if (type === 'r') return rs.join('/');
  if (type === 's') return rs.map((r) => r + 's').join(' / ');
  if (type === 'min') return rs[0] + ' min';
  if (type === 'int') return `${rs[0]} rounds` + (filled(sets[0].w) ? ` @ level ${sets[0].w}` : '');
  const ws = sets.map((s) => (filled(s.w) ? fmtNum(num(s.w) ?? 0) : ''));
  const suffix = type === 'ws' ? 's' : '';
  const sep = type === 'ws' ? ' / ' : '/';
  if (ws.every((w) => w === ws[0])) return (ws[0] ? ws[0] + 'kg ' : '') + rs.map((r) => r + suffix).join(sep);
  return sets.map((s, i) => (ws[i] ? ws[i] + 'kg×' : '') + s.r + suffix).join(', ');
}
function sessionText(s) {
  const def = SESSIONS[s.key];
  const lines = [`${def.label} – ${s.date}`, `Knee: ${s.knee || '?'}`];
  const wuList = sessionWarmup(def);
  if (def.gym) { const wu = wuList.filter((ex) => s.entries[ex.name]?.done).length; lines.push(`Warm-up: ${wu}/${wuList.length}`); }
  const listed = new Set();
  for (const ex of def.items) {
    listed.add(ex.name);
    const e = s.entries[ex.name]; if (!e) continue;
    const t = entryText(ex, e); if (t) lines.push(`${specOf(ex)[2]}: ${t}`);
  }
  // Exercises removed from the programme (old incline press, arm-bike, low-to-high fly) still print.
  const warmupNames = new Set(wuList.map((ex) => ex.name));
  for (const name of Object.keys(s.entries || {})) {
    if (listed.has(name) || warmupNames.has(name)) continue;
    const t = entryText({ name }, s.entries[name]); if (t) lines.push(`${specOf({ name })[2]}: ${t}`);
  }
  if (filled(s.notes)) lines.push(`Notes: ${s.notes.trim()}`);
  return lines.join('\n');
}

// ---------- share / copy ----------
async function shareText(text) {
  if (navigator.share) {
    try { await navigator.share({ text }); return; } catch (err) { if (err && err.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(text); toast('Copied – paste it to your coach'); return; } catch {}
  showTextModal(text);
}
function showTextModal(text) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="card"><h3>Copy this to your coach</h3><textarea readonly>${esc(text)}</textarea><button class="btn primary">Done</button></div>`;
  document.body.appendChild(m); const ta = $('textarea', m); ta.style.minHeight = '220px'; ta.focus(); ta.select();
  $('button', m).onclick = () => m.remove();
}

// ---------- rest timer ----------
const timer = { end: 0, h: 0 };
function beep() {
  try { const C = window.AudioContext || window.webkitAudioContext; const ctx = timer.ctx || (timer.ctx = new C());
    [0, 0.35, 0.7].forEach((t) => { const o = ctx.createOscillator(); const g = ctx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.25, ctx.currentTime + t); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.25); o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.3); });
  } catch {}
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}
function tick() {
  const el = $('#timer'), d = $('#tdisplay');
  const left = Math.max(0, Math.ceil((timer.end - Date.now()) / 1000));
  d.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`;
  if (left <= 0) { clearInterval(timer.h); el.classList.remove('running'); el.classList.add('finished'); d.textContent = 'Go!'; beep();
    setTimeout(() => el.classList.remove('finished'), 4000); }
}
function startRest(sec) {
  clearInterval(timer.h); const el = $('#timer'); el.classList.remove('finished'); el.classList.add('running');
  // unlock audio on iOS with a user gesture
  try { const C = window.AudioContext || window.webkitAudioContext; if (!timer.ctx) timer.ctx = new C(); timer.ctx.resume(); } catch {}
  timer.end = Date.now() + sec * 1000; tick(); timer.h = setInterval(tick, 250);
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-rest]'); if (b) startRest(+b.dataset.rest);
  if (e.target.closest('#tstop')) { clearInterval(timer.h); $('#timer').classList.remove('running', 'finished'); $('#tdisplay').textContent = '--'; }
});

// ---------- session screen ----------
let cur = null; // { key, date, knee, notes, entries }
let prefillMask = null; // which inputs on a fresh session are suggestions; never stored

function blankSets(n) { const sets = []; for (let i = 0; i < n; i++) sets.push({ w: '', r: '' }); return sets; }

// Dose text → sets and the work number (reps, seconds, rounds or minutes).
// A range uses the low end. Text after "·" is a build-to note, not today's target.
function doseMain(dose) { return String(dose || '').split('·')[0]; }
function parseWork(dose, type) {
  const text = doseMain(dose);
  if (type === 'int') {
    const rounds = text.match(/(\d+)\s*rounds?/i);
    const level = text.match(/(?:damper|level)\s*(\d+(?:[.,]\d+)?)/i);
    if (!rounds && !level) return null;
    return { sets: 1, setsHigh: null, work: rounds ? rounds[1] : '', level: level ? level[1].replace(',', '.') : '' };
  }
  if (type === 'min') {
    const m = text.match(/(\d+)(?:\s*[–\-]\s*\d+)?\s*min/i);
    return m ? { sets: 1, setsHigh: null, work: m[1], level: '' } : null;
  }
  const sm = text.match(/(\d+)(?:\s*[–\-]\s*(\d+))?\s*(?:×|x|rounds?\b)/i);
  const sets = sm ? +sm[1] : null;
  const setsHigh = sm && sm[2] ? +sm[2] : null;
  let work = '';
  if (type === 's' || type === 'ws') {
    const workPart = text.split(/\brest\b|\byou've\b/i)[0];
    const sec = workPart.match(/(\d+)(?:\s*[–\-]\s*\d+)?\s*s\b/i);
    if (sec) work = sec[1];
  } else {
    const afterX = text.match(/×\s*(\d+)/);
    const afterColon = text.match(/:\s*(\d+)/);
    if (afterX) work = afterX[1];
    else if (afterColon) work = afterColon[1];
  }
  if (!work && sets == null) return null;
  return { sets, setsHigh, work, level: '' };
}
// "@ 22 kg" is an explicit target. "@ 10–12 kg" is a range, so it does not override a previous log.
function kgInDose(dose, singleOnly) {
  const m = String(dose || '').match(/@\s*(\d+(?:[.,]\d+)?)(\s*[–\-]\s*\d+(?:[.,]\d+)?)?\s*kg/i);
  if (!m) return '';
  if (singleOnly && m[2]) return '';
  return m[1].replace(',', '.');
}
function logCount(ex) {
  const [type, specN] = specOf(ex);
  if (type === 'done' || type === 'int' || type === 'min') return specN;
  const parsed = parseWork(ex.dose, type);
  if (!parsed || parsed.sets == null) return specN;
  if (parsed.setsHigh) return Math.max(specN, parsed.setsHigh);
  return parsed.sets;
}
function applyParsed(sets, mask, parsed, n, weight) {
  if (!parsed || !parsed.work) return false;
  const count = parsed.sets == null ? n : Math.min(n, parsed.sets);
  for (let i = 0; i < count; i++) {
    if (weight) { sets[i].w = weight; mask[i].w = true; }
    sets[i].r = String(parsed.work);
    mask[i].r = true;
  }
  if (parsed.level) { sets[0].w = parsed.level; mask[0].w = true; }
  return true;
}
// (a) explicit programme target, else (b) last logged sets, else (c) the dose.
function suggestionFor(ex, date) {
  const [type] = specOf(ex);
  const n = logCount(ex);
  const sets = blankSets(n);
  const mask = sets.map(() => ({ w: false, r: false }));
  if (type === 'done') return { sets: null, mask: null };
  const parsed = parseWork(ex.dose, type);
  const explicit = (type === 'wr' || type === 'ws') ? kgInDose(ex.dose, true) : '';
  if (explicit && applyParsed(sets, mask, parsed, n, explicit)) return { sets, mask };
  const last = lastEntry(ex.name, date);
  const lastSets = last && last.entry.sets ? last.entry.sets.filter((s) => filled(s.r)) : [];
  if (lastSets.length) {
    const weighted = type === 'wr' || type === 'ws' || type === 'int';
    for (let i = 0; i < n; i++) {
      const src = lastSets[i];
      if (src) {
        if (weighted && filled(src.w)) { sets[i].w = String(src.w); mask[i].w = true; }
        sets[i].r = String(src.r);
        mask[i].r = true;
      } else if (weighted) {
        const prev = lastSets[lastSets.length - 1];
        if (prev && filled(prev.w)) { sets[i].w = String(prev.w); mask[i].w = true; }
      }
    }
    return { sets, mask };
  }
  const doseW = (type === 'wr' || type === 'ws') ? kgInDose(ex.dose, false) : '';
  applyParsed(sets, mask, parsed, n, doseW);
  return { sets, mask };
}

// Old drafts and saved sessions predate new exercises. Fill any missing rows so the card can render.
function ensureEntries(draft, key) {
  const def = SESSIONS[key];
  draft.entries = draft.entries || {};
  const all = sessionWarmup(def).concat(def.items);
  for (const ex of all) {
    const [type] = specOf(ex);
    const n = logCount(ex);
    const e = draft.entries[ex.name];
    if (!e) { draft.entries[ex.name] = type === 'done' ? { done: false } : { sets: blankSets(n) }; continue; }
    if (type === 'done') { if (e.done === undefined) e.done = false; continue; }
    if (!Array.isArray(e.sets)) e.sets = [];
    while (e.sets.length < n) e.sets.push({ w: '', r: '' });
  }
  return draft;
}
function newDraft(key) {
  prefillMask = null;
  const date = todayISO();
  const d = loadDraft(key);
  if (d && d._day === date) {
    const draft = ensureEntries(d, key);
    if (draft._prefill) prefillMask = draft._prefill;
    return draft;
  }
  const saved = load().find((x) => x.key === key && x.date === date);
  if (saved) { const c = JSON.parse(JSON.stringify(saved)); c._day = date; delete c._prefill; return ensureEntries(c, key); } // re-open today's saved session for edits
  const entries = {};
  const mask = {};
  const def = SESSIONS[key];
  const all = sessionWarmup(def).concat(def.items);
  for (const ex of all) {
    const [type] = specOf(ex);
    if (type === 'done') { entries[ex.name] = { done: false }; continue; }
    const sug = suggestionFor(ex, date);
    entries[ex.name] = { sets: sug.sets };
    mask[ex.name] = sug.mask;
  }
  prefillMask = mask;
  return { key, date, _day: date, knee: '', notes: '', entries, _prefill: mask };
}

// ---------- voice logging ----------
// Web Speech API where the browser allows it. iOS home-screen (standalone) often
// blocks it; the same parser runs on typed text, including iOS keyboard dictation.
const speechCtor = () => window.SpeechRecognition || window.webkitSpeechRecognition || null;
const standaloneApp = window.navigator.standalone === true || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
const VOICE_HINT = { wr: '30 kg 8 8 7', ws: '24 kg 35 32 30', s: '45 seconds', r: '10 10 8', int: '4 rounds damper 5', min: '35 minutes' };
const WORD_NUM = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
const TENS_WORDS = new Set(['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']);
let recCtrl = null;

function voiceTokens(raw) {
  let s = String(raw || '').toLowerCase().replace(/½/g, ' and a half').replace(/¼/g, ' and a quarter');
  s = s.replace(/(\d),(\d)/g, '$1.$2');
  s = s.replace(/\b(twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety)-(one|two|three|four|five|six|seven|eight|nine)\b/g, '$1 $2');
  s = s.replace(/\b(each|per)\s+(side|arm|hand)\b/g, ' ').replace(/\bboth\s+sides\b/g, ' ').replace(/\ba\s+side\b/g, ' ');
  s = s.replace(/\bkilograms?\b/g, ' kg ').replace(/\bkilos?\b/g, ' kg ');
  s = s.replace(/\bseconds?\b/g, ' sec ').replace(/\bsecs?\b/g, ' sec ');
  s = s.replace(/\bminutes?\b/g, ' min ').replace(/\bmins?\b/g, ' min ');
  s = s.replace(/\brepetitions?\b/g, ' rep ').replace(/\breps?\b/g, ' rep ');
  s = s.replace(/\brounds?\b/g, ' round ').replace(/\b(damper|level|lvl)\b/g, ' lvl ');
  s = s.replace(/\b(point|dot)\b/g, ' point ');
  s = s.replace(/(\d+(?:\.\d+)?)(kg|sec|min|rep|round|lvl)(?=\d|\s|$)/g, '$1 $2 ');
  s = s.replace(/[^a-z0-9.\s]/g, ' ').replace(/\s+/g, ' ').trim();
  return s ? s.split(' ') : [];
}
function readFraction(tok, i) {
  if (tok[i] !== 'and') return null;
  let j = i + 1;
  if (tok[j] === 'a' || tok[j] === 'an' || tok[j] === 'one') j++;
  if (tok[j] === 'half') return { add: 0.5, next: j + 1 };
  if (tok[j] === 'quarter') return { add: 0.25, next: j + 1 };
  return null;
}
function readNumber(tok, i) {
  const t = tok[i];
  if (t === 'half') return { n: 0.5, next: i + 1 };
  if ((t === 'a' || t === 'an') && tok[i + 1] === 'half') return { n: 0.5, next: i + 2 };
  if ((t === 'a' || t === 'an') && tok[i + 1] === 'quarter') return { n: 0.25, next: i + 2 };
  let n = null, next = i + 1;
  if (/^\d+(?:\.\d+)?$/.test(t)) n = parseFloat(t);
  else if (WORD_NUM[t] !== undefined) {
    n = WORD_NUM[t];
    if (TENS_WORDS.has(t) && WORD_NUM[tok[next]] !== undefined && WORD_NUM[tok[next]] < 10) { n += WORD_NUM[tok[next]]; next++; }
  } else return null;
  if (tok[next] === 'point') {
    const f = tok[next + 1];
    if (/^\d+$/.test(f || '')) { n = parseFloat(String(n) + '.' + f); next += 2; }
    else if (WORD_NUM[f] !== undefined && WORD_NUM[f] < 10) { n += WORD_NUM[f] / 10; next += 2; }
  }
  const frac = readFraction(tok, next);
  if (frac) { n += frac.add; next = frac.next; }
  return { n, next };
}
function voiceItems(text) {
  const tok = voiceTokens(text);
  const skip = new Set(['and', 'for', 'of', 'the', 'at', 'with', 'on', 'by', 'times', 'time', 'set', 'sets', 'hold', 'holds', 'about', 'around', 'roughly', 'just', 'x', 'to']);
  const units = new Set(['kg', 'sec', 'min', 'rep', 'round', 'lvl']);
  const out = [];
  for (let i = 0; i < tok.length;) {
    const got = readNumber(tok, i);
    if (got) {
      i = got.next;
      let unit = null;
      if (units.has(tok[i])) { unit = tok[i]; i++; }
      out.push({ n: got.n, unit });
      continue;
    }
    i++;
    if (skip.has(tok[i - 1]) || units.has(tok[i - 1])) continue;
  }
  return out;
}
function inferWeight(all, nSets, type) {
  if (!all.length) return null;
  // Seconds sit in the same range as a kettlebell, so a timed hold needs "kg" or one extra number.
  if (type === 'ws') {
    if (all.length === nSets + 1 || (!Number.isInteger(all[0].n) && all.length > 1)) return { weights: [all[0]], works: all.slice(1) };
    return null;
  }
  const workish = (it) => Number.isInteger(it.n) && it.n <= 30;
  const heavy = (it) => !Number.isInteger(it.n) || it.n >= 15;
  if (all.length >= 4 && all.length % 2 === 0 && all.length / 2 <= nSets) {
    const weights = [], works = [];
    let ok = true;
    for (let i = 0; i < all.length; i += 2) {
      if (!workish(all[i + 1]) || !heavy(all[i])) { ok = false; break; }
      weights.push(all[i]); works.push(all[i + 1]);
    }
    if (ok) return { weights, works };
  }
  if (all.length === nSets + 1) return { weights: [all[0]], works: all.slice(1) };
  if (all.length > 1 && all.length <= nSets) {
    const rest = all.slice(1), first = all[0];
    if (rest.every(workish) && heavy(first) && first.n > Math.max(...rest.map((it) => it.n))) return { weights: [first], works: rest };
  }
  return null;
}
function voiceSummary(type, sets) {
  const fake = sets.map((s) => ({ w: s.w ?? '', r: s.r ?? '' }));
  const withR = fake.filter((s) => filled(s.r));
  if (!withR.length) {
    const w = fake.find((s) => filled(s.w));
    return w ? (type === 'int' ? 'level ' + w.w : w.w + ' kg') + ' — say the reps or time too' : '';
  }
  if (type === 'r') return withR.map((s) => s.r).join('/');
  if (type === 's') return withR.map((s) => s.r + 's').join(' / ');
  if (type === 'min') return withR[0].r + ' min';
  if (type === 'int') return withR[0].r + ' rounds' + (filled(withR[0].w) ? ' @ level ' + withR[0].w : '');
  const suffix = type === 'ws' ? 's' : '';
  const sep = type === 'ws' ? ' / ' : '/';
  const ws = withR.map((s) => (filled(s.w) ? s.w : ''));
  if (ws.every((w) => w === ws[0])) return (ws[0] ? ws[0] + 'kg ' : '') + withR.map((s) => s.r + suffix).join(sep);
  return withR.map((s, i) => (ws[i] ? ws[i] + 'kg×' : '') + s.r + suffix).join(', ');
}
function parseVoice(text, type, nSets) {
  const items = voiceItems(text);
  if (!items.length) return { ok: false, error: 'No numbers in that. Try “' + (VOICE_HINT[type] || '30 kg 8 8 7') + '”.' };
  const fmt = (n) => fmtNum(n);
  let sets = [];
  if (type === 's' || type === 'r' || type === 'min') {
    const works = items.filter((it) => it.unit !== 'kg' && it.unit !== 'lvl');
    (works.length ? works : items).slice(0, nSets).forEach((it) => sets.push({ r: fmt(it.n) }));
  } else if (type === 'int') {
    const lvl = items.find((it) => it.unit === 'lvl');
    let rounds = items.find((it) => it.unit === 'round') || items.find((it) => it.unit !== 'lvl' && it.unit !== 'kg');
    if (!rounds) rounds = items[0];
    if (!lvl && items.length >= 2) {
      const other = items.find((it) => it !== rounds && it.unit !== 'round');
      sets = [{ r: fmt(rounds.n), w: other ? fmt(other.n) : '' }];
    } else sets = [{ r: fmt(rounds.n), w: lvl ? fmt(lvl.n) : '' }];
  } else {
    let weights = items.filter((it) => it.unit === 'kg');
    let works = items.filter((it) => it.unit !== 'kg' && it.unit !== 'lvl');
    if (!weights.length) {
      const inferred = inferWeight(items.filter((it) => it.unit !== 'lvl'), nSets, type);
      if (inferred) { weights = inferred.weights; works = inferred.works; }
    }
    if (weights.length > 1 && weights.length === works.length) {
      for (let i = 0; i < works.length && i < nSets; i++) sets.push({ w: fmt(weights[i].n), r: fmt(works[i].n) });
    } else if (weights.length && works.length) {
      const w = fmt(weights[0].n);
      works.slice(0, nSets).forEach((it) => sets.push({ w, r: fmt(it.n) }));
    } else if (weights.length) {
      sets.push({ w: fmt(weights[0].n), r: '' });
    } else {
      works.slice(0, nSets).forEach((it) => sets.push({ r: fmt(it.n) }));
    }
  }
  if (!sets.length) return { ok: false, error: 'No numbers in that. Try “' + (VOICE_HINT[type] || '30 kg 8 8 7') + '”.' };
  const summary = voiceSummary(type, sets);
  if (!summary) return { ok: false, error: 'Could not read that. Try “' + (VOICE_HINT[type] || '30 kg 8 8 7') + '”.' };
  return { ok: true, sets, summary };
}
function voiceFailMessage(reason) {
  const typed = ' Type it in the box — the iOS keyboard has its own mic.';
  if (reason === 'unavailable' || reason === 'service-not-allowed') {
    return (standaloneApp ? 'This home-screen app can’t use the mic directly.' : 'Voice recognition isn’t available in this browser.') + typed;
  }
  if (reason === 'not-allowed' || reason === 'audio-capture') return 'Microphone permission was blocked.' + typed;
  if (reason === 'network') return 'Speech recognition needs a connection.' + typed;
  if (reason === 'no-speech') return 'Didn’t hear anything. Try again, or type it.';
  return 'Voice didn’t start.' + typed;
}
function stopRec() {
  const rec = recCtrl; recCtrl = null;
  if (rec) { try { rec.onend = null; rec.onerror = null; rec.onresult = null; rec.stop(); } catch {} }
  document.querySelectorAll('.micbtn.on').forEach((b) => { b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); b.textContent = '🎤'; });
}
function openVoiceBox(box, message) {
  box.hidden = false;
  const msg = $('.voice-msg', box);
  msg.hidden = !message;
  msg.textContent = message || '';
  const ta = $('[data-voice-text]', box);
  if (!message) ta.placeholder = ta.dataset.hint || '';
  refreshVoicePreview(box);
  return ta;
}
function refreshVoicePreview(box) {
  const ta = $('[data-voice-text]', box);
  const out = $('.voice-parsed', box);
  const apply = $('[data-voice-apply]', box);
  if (box.dataset.voiceKind === 'notes') {
    const text = ta.value.trim();
    const merged = [cur && cur.notes, text].filter((s) => filled(s)).join('\n');
    out.classList.toggle('bad', !text);
    out.textContent = text ? 'Notes will read: ' + merged : 'Say or type a note first.';
    apply.disabled = !text;
    return;
  }
  const parsed = parseVoice(ta.value, box.dataset.voiceType, +box.dataset.voiceSets || 1);
  out.classList.toggle('bad', !parsed.ok);
  out.textContent = parsed.ok ? 'Will log: ' + parsed.summary : parsed.error;
  apply.disabled = !parsed.ok;
  box._parsed = parsed;
}
function applyVoice(box) {
  if (box.dataset.voiceKind === 'notes') {
    const text = $('[data-voice-text]', box).value.trim();
    if (!text || !cur) return;
    cur.notes = [cur.notes, text].filter((s) => filled(s)).join('\n');
    const notes = $('#snotes'); if (notes) notes.value = cur.notes;
    saveDraft(cur.key, cur);
    box.hidden = true;
    toast('Note added');
    return;
  }
  const parsed = box._parsed;
  if (!parsed || !parsed.ok || !cur) return;
  const card = box.closest('[data-ex]');
  const en = cur.entries[card.dataset.ex];
  if (!en || !en.sets) return;
    parsed.sets.forEach((s, i) => {
    if (!en.sets[i]) return;
    if (filled(s.w)) en.sets[i].w = s.w;
    if (filled(s.r)) en.sets[i].r = s.r;
  });
  if (parsed.sets.some((s) => filled(s.r))) {
    for (let i = parsed.sets.length; i < en.sets.length; i++) en.sets[i].r = '';
  }
  const vMask = cur._prefill && cur._prefill[card.dataset.ex];
  en.sets.forEach((s, i) => {
    const wIn = card.querySelector(`input[data-set="${i}"][data-k="w"]`);
    const rIn = card.querySelector(`input[data-set="${i}"][data-k="r"]`);
    if (wIn) { wIn.value = s.w; wIn.classList.remove('prefill'); }
    if (rIn) { rIn.value = s.r; rIn.classList.remove('prefill'); }
    if (vMask && vMask[i]) { vMask[i].w = false; vMask[i].r = false; }
  });
  saveDraft(cur.key, cur);
  box.hidden = true;
  toast('Logged — check the sets');
}
function listenInto(box, button) {
  stopRec();
  document.querySelectorAll('.voicebox').forEach((b) => { if (b !== box) b.hidden = true; });
  const SpeechRec = speechCtor();
  if (!SpeechRec) { openVoiceBox(box, voiceFailMessage('unavailable')).focus(); return; }
  let heard = false, failed = false;
  let rec;
  try { rec = new SpeechRec(); } catch { openVoiceBox(box, voiceFailMessage('unavailable')).focus(); return; }
  recCtrl = rec;
  rec.lang = 'en-ZA';
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  button.classList.add('on');
  button.setAttribute('aria-pressed', 'true');
  button.textContent = '●';
  const ta = openVoiceBox(box, '');
  rec.onresult = (e) => {
    let text = '';
    for (let i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
    heard = true;
    ta.value = text.trim();
    refreshVoicePreview(box);
  };
  rec.onerror = (e) => {
    const code = (e && e.error) || 'error';
    if (code === 'aborted') return;
    failed = true;
    stopRec();
    openVoiceBox(box, voiceFailMessage(code)).focus();
  };
  rec.onend = () => {
    if (recCtrl === rec) recCtrl = null;
    button.classList.remove('on');
    button.setAttribute('aria-pressed', 'false');
    button.textContent = '🎤';
    if (!failed && !heard && !ta.value.trim()) openVoiceBox(box, voiceFailMessage('no-speech'));
  };
  try { rec.start(); } catch { stopRec(); openVoiceBox(box, voiceFailMessage('unavailable')).focus(); }
}

function field(type, i, which, val, ph, suggested) {
  const unit = which === 'w' ? (type === 'int' ? 'lvl' : 'kg') : (UNIT[type] || 'reps');
  const mode = which === 'w' ? 'decimal' : 'numeric';
  const cls = suggested && filled(val) ? ' class="prefill"' : '';
  return `<label class="field"><input${cls} inputmode="${mode}" data-set="${i}" data-k="${which}" value="${esc(val)}" placeholder="${esc(ph || '')}" aria-label="${unit} set ${i + 1}"><span>${unit}</span></label>`;
}

function exCard(ex, opts = {}) {
  const [type] = specOf(ex);
  const e = cur.entries[ex.name] || {};
  const last = type !== 'done' ? lastEntry(ex.name, cur.date) : null;
  const lastTxt = last ? entryText({ name: last.name || ex.name }, last.entry) : '';
  const lastSets = last ? (last.entry.sets || []).filter((s) => filled(s.r)) : [];
  const mask = (prefillMask && prefillMask[ex.name]) || [];
  let body = '';
  if (type === 'done') {
    body = `<label class="check"><input type="checkbox" data-done ${e.done ? 'checked' : ''}> Done</label>`;
  } else {
    const rows = (e.sets || []).map((s, i) => {
      const ph = lastSets[i] ? lastSets[i].r : '';
      const mw = mask[i] && mask[i].w;
      const mr = mask[i] && mask[i].r;
      if (type === 'wr' || type === 'ws' || type === 'int') {
        const rw = type === 'int' ? field(type, i, 'r', s.r, ph, mr) + field(type, i, 'w', s.w, '', mw) : field(type, i, 'w', s.w, '', mw) + field(type, i, 'r', s.r, ph, mr);
        return `<div class="setrow"><div class="setno">${type === 'int' ? '' : i + 1}</div>${rw}</div>`;
      }
      return `<div class="setrow one"><div class="setno">${type === 'min' ? '' : i + 1}</div>${field(type, i, 'r', s.r, ph, mr)}</div>`;
    }).join('');
    body = `<div class="sets">${rows}</div>`;
  }
  const voice = type === 'done' ? '' : `<div class="voicebox" hidden data-voice-kind="sets" data-voice-type="${esc(type)}" data-voice-sets="${(e.sets || []).length}">
      <p class="voice-msg" hidden></p>
      <textarea data-voice-text data-hint="${esc(VOICE_HINT[type] || '')}" placeholder="${esc(VOICE_HINT[type] || '')}" aria-label="Say or type ${esc(ex.name)}"></textarea>
      <div class="voice-parsed" aria-live="polite"></div>
      <div class="row2"><button type="button" class="btn primary" data-voice-apply disabled>Use this</button><button type="button" class="btn ghost" data-voice-cancel>Cancel</button></div></div>`;
  const mic = type === 'done' ? '' : `<button type="button" class="micbtn" data-mic aria-pressed="false" aria-label="Log ${esc(ex.name)} by voice">🎤</button>`;
  const links = ex.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">▶ ${esc(l.title)}<small>${esc(l.site)}</small></a>`).join('');
  return `<div class="card ex ${type === 'done' && e.done ? 'done' : ''}" data-ex="${esc(ex.name)}">
    <div class="exhead"><div><h3>${esc(ex.name)}</h3><div class="dose">${esc(ex.dose)}</div>
      ${lastTxt ? `<div class="last">Last time: ${esc(lastTxt)} <span class="muted">(${esc(last.date)})</span></div>` : (type !== 'done' && !opts.noLast ? '<div class="last">Last time: –</div>' : '')}</div>
      <div class="exbtns">${mic}<button type="button" class="howbtn" data-how aria-expanded="false">How to ▾</button></div></div>
    ${body}
    ${voice}
    <div class="how"><ul>${ex.cues.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
      ${ex.knee ? `<div class="knee">🦵 <b>Knee:</b> ${esc(ex.knee)}</div>` : ''}
      <div class="avoid">✕ <b>Avoid:</b> ${esc(ex.mistake)}</div>
      ${links ? `<div class="links">${links}</div>` : ''}</div></div>`;
}

function renderSession(key) {
  const def = SESSIONS[key];
  cur = newDraft(key);
  const tk = todayKey(), dow = todayDow();
  const weekHit = WEEK.find((w) => w[1] === key);
  const selDay = key === tk ? dow : (weekHit ? weekHit[0] : '');
  const week = WEEK.map(([d, k]) => `<a href="#/s/${k}" class="${d === dow ? 'today' : ''} ${d === selDay ? 'sel' : ''}"><b>${d}</b>${k === 'M' ? 'Mob' : SESSIONS[k].short}</a>`).join('');
  const pick = Object.entries(SESSIONS).map(([k, s]) => `<a href="#/s/${k}" class="${k === key ? 'sel' : ''}">${esc(s.short)}${k === tk ? ' • today' : ''}</a>`).join('');
  $('#title').textContent = key === tk ? 'Today' : 'Session';
  $('#subtitle').textContent = prettyDate(todayISO());
  $('#app').innerHTML = `
    <div class="week">${week}</div>
    <div class="pickers">${pick}</div>
    ${def.gym || def.kneeBanner ? `<div class="banner"><b>Knee:</b> physio review pending. Light, controlled squats and reverse lunges only. No swings, cleans, jumping, pivoting or heavy/deep leg work.</div>` : ''}
    ${prefillMask ? '<p class="prefill-note">Sets are prefilled from the programme target, or your last session. Edit any that differed — they are saved as shown. Dashed boxes are still suggestions.</p>' : ''}
    <div class="sesshead"><h2>${esc(def.title)}</h2><input type="date" class="datein" id="sdate" value="${esc(cur.date)}" aria-label="Session date"></div>
    ${def.gym ? `<details class="card group" ${hasAnyWarmup() ? '' : 'open'}><summary>🔥 Warm-up · about 10 min</summary>${sessionWarmup(def).map((ex) => exCard(ex)).join('')}</details>` : ''}
    ${key === 'P' ? '<h2>Paddle conditioning</h2><div class="card muted small">Pick one, or rotate through them. No arm bike, and no rower until the physio clears the right knee.</div>' + EX.intervals.map((ex) => exCard(ex)).join('') + '<h2>Mobility routine · ~10 min</h2>' + EX.mobility.map((ex) => exCard(ex)).join('')
      : key === 'M' ? '<div class="card muted small">Weekend: do the mobility routine and/or a yoga session, or take a full rest day.</div><h2>Mobility routine · ~10 min</h2>' + EX.mobility.map((ex) => exCard(ex)).join('') + '<h2>Yoga</h2>' + exCard(YOGA)
      : def.items.map((ex) => exCard(ex)).join('')}
    <div class="card"><h3>Knee today</h3>
      <div class="seg"><button data-knee="ok" class="${cur.knee === 'ok' ? 'on' : ''}">👍 OK</button><button data-knee="sore" class="${cur.knee === 'sore' ? 'on' : ''}">⚠ Sore</button></div>
      <div class="noteshead"><h3>Notes</h3><button type="button" class="micbtn" data-mic-notes aria-pressed="false" aria-label="Dictate notes">🎤</button></div>
      <textarea id="snotes" placeholder="How did it feel? Anything to flag?">${esc(cur.notes)}</textarea>
      <div class="voicebox" hidden data-voice-kind="notes" id="notes-voice">
        <p class="voice-msg" hidden></p>
        <textarea data-voice-text placeholder="How the session felt" aria-label="Say or type a note"></textarea>
        <div class="voice-parsed" aria-live="polite"></div>
        <div class="row2"><button type="button" class="btn primary" data-voice-apply disabled>Use this</button><button type="button" class="btn ghost" data-voice-cancel>Cancel</button></div>
      </div></div>
    <button class="btn primary" id="save">Save session</button>
    <button class="btn ghost" id="send">Send to coach</button>
    <p class="muted small" style="text-align:center">Inputs auto-save as a draft on this phone until you press Save.</p>`;
  function hasAnyWarmup() { return sessionWarmup(def).some((ex) => cur.entries[ex.name]?.done); }
}

function onSessionInput(e) {
  if (!cur) return;
  const t = e.target;
  if (t.matches && t.matches('[data-voice-text]')) { const box = t.closest('.voicebox'); if (box) refreshVoicePreview(box); return; }
  if (t.id === 'snotes') cur.notes = t.value;
  else if (t.id === 'sdate') cur.date = t.value || todayISO();
  else {
    const card = t.closest('[data-ex]'); if (!card) return;
    const en = cur.entries[card.dataset.ex];
    if (t.hasAttribute('data-done')) { en.done = t.checked; card.classList.toggle('done', t.checked); }
    else if (t.dataset.set !== undefined) {
      const i = +t.dataset.set, k = t.dataset.k;
      en.sets[i][k] = t.value.trim();
      t.classList.remove('prefill');
      const row = cur._prefill && cur._prefill[card.dataset.ex] && cur._prefill[card.dataset.ex][i];
      if (row) row[k] = false;
    }
  }
  saveDraft(cur.key, cur);
}

function saveSession() {
  const s = JSON.parse(JSON.stringify(cur));
  delete s._day;
  delete s._prefill;
  const any = Object.values(s.entries).some(hasData);
  if (!any && !filled(s.notes)) { toast('Log at least one set first'); return null; }
  const all = load();
  const i = all.findIndex((x) => x.key === s.key && x.date === s.date);
  s.id = i >= 0 ? all[i].id : `${s.key}-${s.date}-${Date.now().toString(36)}`;
  s.savedAt = new Date().toISOString();
  if (i >= 0) all[i] = s; else all.push(s);
  store(all); clearDraft(s.key);
  toast(i >= 0 ? 'Session updated ✓' : 'Session saved ✓');
  return s;
}

// ---------- history ----------
function metricFor(ex, e) {
  const [type] = specOf(ex);
  const sets = (e.sets || []).filter((s) => filled(s.r));
  if (!sets.length) return null;
  if (type === 'wr' || type === 'ws') {
    const ws = sets.map((s) => num(s.w)).filter((v) => v !== null && v > 0);
    if (ws.length) return { v: Math.max(...ws), u: 'kg' };
  }
  const rs = sets.map((s) => num(s.r)).filter((v) => v !== null);
  if (!rs.length) return null;
  return { v: Math.max(...rs), u: { s: 's', ws: 's', int: 'rounds', min: 'min' }[type] || 'reps' };
}
function spark(points) {
  const W = 150, H = 44, P = 5;
  const vs = points.map((p) => p.v), min = Math.min(...vs), max = Math.max(...vs), span = max - min || 1;
  const xy = points.map((p, i) => [P + (points.length === 1 ? (W - 2 * P) / 2 : (i * (W - 2 * P)) / (points.length - 1)), H - P - ((p.v - min) / span) * (H - 2 * P) * (max === min ? 0 : 1) - (max === min ? (H - 2 * P) / 2 : 0)]);
  const d = xy.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="trend"><path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${xy.map((q) => `<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="3.5" fill="var(--accent)"/>`).join('')}</svg>`;
}
function renderHistory() {
  $('#title').textContent = 'History'; $('#subtitle').textContent = '';
  const ss = sorted();
  if (!ss.length) { $('#app').innerHTML = '<div class="card muted">No sessions saved yet. Log a session on the Train tab and press Save.</div>'; return; }
  const list = ss.map((s) => `<details class="card hist" data-id="${esc(s.id)}"><summary><div><b>${esc(prettyDate(s.date))}</b><br><span class="muted small">${esc(SESSIONS[s.key].title)}</span></div>
      <span class="pill ${s.knee === 'sore' ? 'sore' : s.knee === 'ok' ? 'ok' : ''}">Knee: ${esc(s.knee || '?')}</span></summary>
      <pre>${esc(sessionText(s))}</pre>
      <div class="row2"><button class="btn ghost" data-share="${esc(s.id)}">Send to coach</button><button class="btn danger" data-del="${esc(s.id)}">Delete</button></div></details>`).join('');
  // progress per exercise, oldest → newest
  const asc = [...ss].reverse();
  const retired = [
    { name: 'Incline dumbbell press' }, { name: 'Low-to-high cable fly' }, { name: 'Arm-bike paddle intervals' },
    { name: 'Prone cobra hold' }, { name: 'Superman hold' }, { name: 'Overhead KB hold' },
  ];
  const seen = new Set();
  const exs = [EX.dayA, EX.dayB, EX.dayC, EX.travelKB, EX.intervals, [EX.mobility.find((e) => e.name === 'Dead hang')], [YOGA], retired].flat().filter((ex) => {
    if (!ex || seen.has(ex.name)) return false;
    seen.add(ex.name);
    return true;
  });
  const charts = exs.map((ex) => {
    const pts = asc.map((s) => {
      const e = loggedEntry(s.entries, ex.name);
      return e && metricFor(ex, e) ? { d: s.date, ...metricFor(ex, e) } : null;
    }).filter(Boolean);
    if (!pts.length) return '';
    const best = Math.max(...pts.map((p) => p.v)), lastP = pts[pts.length - 1];
    const label = (specOf(ex)[0] === 'wr' || specOf(ex)[0] === 'ws') && lastP.u === 'kg' ? 'Top weight' : 'Best set';
    return `<div class="card chart"><div><h3>${esc(specOf(ex)[2])}</h3><div class="small muted">${label}: <span class="val">${fmtNum(lastP.v)} ${lastP.u}</span> · best ${fmtNum(best)} ${lastP.u}<br>${pts.length} session${pts.length > 1 ? 's' : ''} · since ${esc(pts[0].d)}</div></div>${spark(pts)}</div>`;
  }).join('');
  $('#app').innerHTML = `<h2>Progress</h2>${charts || '<div class="card muted">Charts appear once you log sets.</div>'}<h2>Sessions</h2>${list}`;
}

// ---------- backup ----------
function renderData() {
  $('#title').textContent = 'Backup'; $('#subtitle').textContent = '';
  const n = load().length;
  $('#app').innerHTML = `<div class="card"><h3>Your data</h3><p class="muted">${n} saved session${n === 1 ? '' : 's'}, stored only on this phone (in this browser). Export a backup now and then, especially before clearing Safari data or switching phones.</p>
    <button class="btn primary" id="export">Export JSON backup</button>
    <label class="btn ghost" style="display:flex;align-items:center;justify-content:center">Import JSON backup<input type="file" id="import" accept="application/json,.json" hidden></label>
    <p class="muted small">Import merges with what's already here (same session and date is replaced by the backup copy).</p></div>
    <div class="card small muted">Douglas Training v1 · works offline once loaded. Add to Home Screen: Safari → Share → Add to Home Screen.</div>`;
}
async function exportData() {
  const payload = { app: 'douglas-training', version: 1, exportedAt: new Date().toISOString(), sessions: load() };
  const text = JSON.stringify(payload, null, 2);
  const name = `training-backup-${todayISO()}.json`;
  try {
    const file = new File([text], name, { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: name }); return; }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  toast('Backup downloaded');
}
function importData(file) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const data = JSON.parse(r.result); const inc = Array.isArray(data) ? data : data.sessions;
      if (!Array.isArray(inc)) throw new Error('bad');
      const all = load(); let added = 0;
      for (const s of inc) {
        if (!s || !SESSIONS[s.key] || !s.date || !s.entries) continue;
        const i = all.findIndex((x) => x.id === s.id || (x.key === s.key && x.date === s.date));
        if (i >= 0) all[i] = s; else all.push(s); added++;
      }
      store(all); toast(`Imported ${added} session${added === 1 ? '' : 's'}`); renderData();
    } catch { toast('That file is not a valid backup'); }
  };
  r.readAsText(file);
}

// ---------- events ----------
document.addEventListener('input', onSessionInput);
document.addEventListener('change', (e) => { if (e.target.id === 'import' && e.target.files[0]) importData(e.target.files[0]); else onSessionInput(e); });
document.addEventListener('click', (e) => {
  const mic = e.target.closest('[data-mic]');
  if (mic && cur) { const box = mic.closest('[data-ex]') && mic.closest('[data-ex]').querySelector('.voicebox'); if (box) listenInto(box, mic); return; }
  const micN = e.target.closest('[data-mic-notes]');
  if (micN && cur) { const box = $('#notes-voice'); if (box) listenInto(box, micN); return; }
  const apply = e.target.closest('[data-voice-apply]');
  if (apply && !apply.disabled) { applyVoice(apply.closest('.voicebox')); return; }
  const cancel = e.target.closest('[data-voice-cancel]');
  if (cancel) { stopRec(); const box = cancel.closest('.voicebox'); if (box) box.hidden = true; return; }
  const how = e.target.closest('[data-how]');
  if (how) { const c = how.closest('.card'); const open = c.classList.toggle('open'); how.setAttribute('aria-expanded', open); how.textContent = open ? 'Hide ▴' : 'How to ▾'; return; }
  const k = e.target.closest('[data-knee]');
  if (k && cur) { cur.knee = k.dataset.knee; document.querySelectorAll('[data-knee]').forEach((b) => b.classList.toggle('on', b === k)); saveDraft(cur.key, cur); return; }
  if (e.target.id === 'save') { const s = saveSession(); if (s) renderSession(s.key); return; }
  if (e.target.id === 'send') { const s = saveSession(); if (s) { renderSession(s.key); shareText(sessionText(s)); } return; }
  const sh = e.target.closest('[data-share]');
  if (sh) { const s = load().find((x) => x.id === sh.dataset.share); if (s) shareText(sessionText(s)); return; }
  const del = e.target.closest('[data-del]');
  if (del && confirm('Delete this session?')) { store(load().filter((x) => x.id !== del.dataset.del)); renderHistory(); toast('Deleted'); return; }
  if (e.target.id === 'export') exportData();
});

function route() {
  stopRec();
  const h = location.hash || '#/today';
  let nav = 'today';
  window.scrollTo(0, 0);
  if (h.startsWith('#/s/') && SESSIONS[h.slice(4)]) renderSession(h.slice(4));
  else if (h === '#/history') { cur = null; nav = 'history'; renderHistory(); }
  else if (h === '#/data') { cur = null; nav = 'data'; renderData(); }
  else renderSession(todayKey());
  document.body.classList.toggle('nosess', nav !== 'today');
  document.querySelectorAll('[data-nav]').forEach((a) => a.classList.toggle('on', a.dataset.nav === nav));
}
window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => {});
window.__dt = { sessionText, load, parseVoice, parseWork, suggestionFor, logCount, kgInDose }; // for testing
})();
