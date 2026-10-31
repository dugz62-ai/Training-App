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
  'Low-to-high cable fly': ['wr', 3, 'Cable fly'],
  'KB halos': ['wr', 3, 'KB halos'],
  'KB pullovers': ['wr', 3, 'KB pullovers'],
  'KB single-arm floor press': ['wr', 3, 'KB floor press'],
  'Dead bug': ['r', 3, 'Dead bug'],
  'Prone Y-T-W raises (light plates)': ['wr', 2, 'Y-T-W'],
  'Prone cobra hold': ['s', 3, 'Cobra hold'],
  'Lat pulldown or assisted pull-up': ['wr', 4, 'Lat pulldown'],
  'Seated dumbbell shoulder press': ['wr', 3, 'Seated DB shoulder press'],
  'Single-arm kettlebell row': ['wr', 3, 'KB single-arm row'],
  'Suitcase hold': ['ws', 3, 'Suitcase hold'],
  'Overhead KB hold': ['ws', 3, 'Overhead KB hold'],
  'Straight-arm cable pulldown': ['wr', 3, 'Straight-arm pulldown'],
  'Cable external rotation': ['wr', 3, 'Cable ext rotation'],
  'KB side bends': ['ws', 3, 'KB side bends'],
  'Hollow hold': ['s', 3, 'Hollow hold'],
  'Single-arm plank': ['s', 3, 'Single-arm plank'],
  'Superman hold': ['s', 3, 'Superman hold'],
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
  'Arm-bike paddle intervals': ['int', 1, 'Paddle intervals'],
  'Dead hang': ['s', 3, 'Dead hang'],
  'Yoga session': ['min', 1, 'Yoga'],
};
const specOf = (ex) => SPEC[ex.name] || ['done', 1, ex.name];

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
  A: { label: 'DAY A', title: 'Day A · Chest and posture', short: 'Day A', gym: true, items: EX.dayA },
  B: { label: 'DAY B', title: 'Day B · Back, shoulders and core', short: 'Day B', gym: true, items: EX.dayB },
  C: { label: 'DAY C', title: 'Day C · Chest, arms and push-ups', short: 'Day C', gym: true, items: EX.dayC },
  P: { label: 'PADDLE + MOBILITY', title: 'Paddle intervals + mobility', short: 'Paddle', gym: false, items: [...EX.intervals, ...EX.mobility] },
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

function lastEntry(exName, beforeDate) {
  for (const s of sorted()) {
    if (beforeDate && s.date >= beforeDate) continue;
    const e = s.entries && s.entries[exName];
    if (e && hasData(e)) return { date: s.date, entry: e };
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
  if (def.gym) { const wu = EX.warmup.filter((ex) => s.entries[ex.name]?.done).length; lines.push(`Warm-up: ${wu}/${EX.warmup.length}`); }
  const listed = new Set();
  for (const ex of def.items) {
    listed.add(ex.name);
    const e = s.entries[ex.name]; if (!e) continue;
    const t = entryText(ex, e); if (t) lines.push(`${specOf(ex)[2]}: ${t}`);
  }
  // Exercises removed from the programme (old Incline dumbbell press logs) still print.
  const warmupNames = new Set(EX.warmup.map((ex) => ex.name));
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

function blankSets(n) { const sets = []; for (let i = 0; i < n; i++) sets.push({ w: '', r: '' }); return sets; }
// Old drafts and saved sessions predate new exercises. Fill any missing rows so the card can render.
function ensureEntries(draft, key) {
  const def = SESSIONS[key];
  draft.entries = draft.entries || {};
  const all = (def.gym ? EX.warmup : []).concat(def.items);
  for (const ex of all) {
    const [type, n] = specOf(ex);
    const e = draft.entries[ex.name];
    if (!e) { draft.entries[ex.name] = type === 'done' ? { done: false } : { sets: blankSets(n) }; continue; }
    if (type === 'done') { if (e.done === undefined) e.done = false; continue; }
    if (!Array.isArray(e.sets)) e.sets = [];
    while (e.sets.length < n) e.sets.push({ w: '', r: '' });
  }
  return draft;
}
function newDraft(key) {
  const date = todayISO();
  const d = loadDraft(key);
  if (d && d._day === date) return ensureEntries(d, key);
  const saved = load().find((x) => x.key === key && x.date === date);
  if (saved) { const c = JSON.parse(JSON.stringify(saved)); c._day = date; return ensureEntries(c, key); } // re-open today's saved session for edits
  const entries = {};
  const def = SESSIONS[key];
  const all = (def.gym ? EX.warmup : []).concat(def.items);
  for (const ex of all) {
    const [type, n] = specOf(ex);
    if (type === 'done') { entries[ex.name] = { done: false }; continue; }
    const last = lastEntry(ex.name, date);
    const lastSets = last ? last.entry.sets.filter((s) => filled(s.r)) : [];
    const sets = [];
    for (let i = 0; i < n; i++) {
      const ls = lastSets[i] || lastSets[lastSets.length - 1];
      // pre-fill weight (and level for intervals) with the last logged value
      sets.push({ w: (type === 'wr' || type === 'ws' || type === 'int') && ls && filled(ls.w) ? ls.w : '', r: '' });
    }
    entries[ex.name] = { sets };
  }
  return { key, date, _day: date, knee: '', notes: '', entries };
}

function field(type, i, which, val, ph) {
  const unit = which === 'w' ? (type === 'int' ? 'lvl' : 'kg') : (UNIT[type] || 'reps');
  const mode = which === 'w' ? 'decimal' : 'numeric';
  return `<label class="field"><input inputmode="${mode}" data-set="${i}" data-k="${which}" value="${esc(val)}" placeholder="${esc(ph || '')}" aria-label="${unit} set ${i + 1}"><span>${unit}</span></label>`;
}

function exCard(ex, opts = {}) {
  const [type] = specOf(ex);
  const e = cur.entries[ex.name] || {};
  const last = type !== 'done' ? lastEntry(ex.name, cur.date) : null;
  const lastTxt = last ? entryText(ex, last.entry) : '';
  const lastSets = last ? (last.entry.sets || []).filter((s) => filled(s.r)) : [];
  let body = '';
  if (type === 'done') {
    body = `<label class="check"><input type="checkbox" data-done ${e.done ? 'checked' : ''}> Done</label>`;
  } else {
    const rows = (e.sets || []).map((s, i) => {
      const ph = lastSets[i] ? lastSets[i].r : '';
      if (type === 'wr' || type === 'ws' || type === 'int') {
        return `<div class="setrow"><div class="setno">${type === 'int' ? '' : i + 1}</div>${type === 'int' ? field(type, i, 'r', s.r, ph) + field(type, i, 'w', s.w, '') : field(type, i, 'w', s.w, '') + field(type, i, 'r', s.r, ph)}</div>`;
      }
      return `<div class="setrow one"><div class="setno">${type === 'min' ? '' : i + 1}</div>${field(type, i, 'r', s.r, ph)}</div>`;
    }).join('');
    body = `<div class="sets">${rows}</div>`;
  }
  const links = ex.links.map((l) => `<a href="${esc(l.href)}" target="_blank" rel="noopener">▶ ${esc(l.title)}<small>${esc(l.site)}</small></a>`).join('');
  return `<div class="card ex ${type === 'done' && e.done ? 'done' : ''}" data-ex="${esc(ex.name)}">
    <div class="exhead"><div><h3>${esc(ex.name)}</h3><div class="dose">${esc(ex.dose)}</div>
      ${lastTxt ? `<div class="last">Last time: ${esc(lastTxt)} <span class="muted">(${esc(last.date)})</span></div>` : (type !== 'done' && !opts.noLast ? '<div class="last">Last time: –</div>' : '')}</div>
      <button class="howbtn" data-how aria-expanded="false">How to ▾</button></div>
    ${body}
    <div class="how"><ul>${ex.cues.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
      ${ex.knee ? `<div class="knee">🦵 <b>Knee:</b> ${esc(ex.knee)}</div>` : ''}
      <div class="avoid">✕ <b>Avoid:</b> ${esc(ex.mistake)}</div>
      ${links ? `<div class="links">${links}</div>` : ''}</div></div>`;
}

function renderSession(key) {
  const def = SESSIONS[key];
  cur = newDraft(key);
  const tk = todayKey(), dow = todayDow();
  const selDay = key === tk ? dow : WEEK.find((w) => w[1] === key)[0];
  const week = WEEK.map(([d, k]) => `<a href="#/s/${k}" class="${d === dow ? 'today' : ''} ${d === selDay ? 'sel' : ''}"><b>${d}</b>${k === 'M' ? 'Mob' : SESSIONS[k].short}</a>`).join('');
  const pick = Object.entries(SESSIONS).map(([k, s]) => `<a href="#/s/${k}" class="${k === key ? 'sel' : ''}">${esc(s.short)}${k === tk ? ' • today' : ''}</a>`).join('');
  $('#title').textContent = key === tk ? 'Today' : 'Session';
  $('#subtitle').textContent = prettyDate(todayISO());
  $('#app').innerHTML = `
    <div class="week">${week}</div>
    <div class="pickers">${pick}</div>
    ${def.gym ? `<div class="banner"><b>⚠ Knee first:</b> no squats, lunges, cossacks, KB swings or cleans, running or rowing until the physio clears the knee (Martine, 12 Nov). Stop anything that hurts the knee.</div>` : ''}
    <div class="sesshead"><h2>${esc(def.title)}</h2><input type="date" class="datein" id="sdate" value="${esc(cur.date)}" aria-label="Session date"></div>
    ${def.gym ? `<details class="card group" ${hasAnyWarmup() ? '' : 'open'}><summary>🔥 Warm-up · about 10 min</summary>${EX.warmup.map((ex) => exCard(ex)).join('')}</details>` : ''}
    ${key === 'P' ? '<h2>Paddle intervals</h2>' + exCard(EX.intervals[0]) + '<h2>Mobility routine · ~10 min</h2>' + EX.mobility.map((ex) => exCard(ex)).join('')
      : key === 'M' ? '<div class="card muted small">Weekend: do the mobility routine and/or a yoga session, or take a full rest day.</div><h2>Mobility routine · ~10 min</h2>' + EX.mobility.map((ex) => exCard(ex)).join('') + '<h2>Yoga</h2>' + exCard(YOGA)
      : def.items.map((ex) => exCard(ex)).join('')}
    <div class="card"><h3>Knee today</h3>
      <div class="seg"><button data-knee="ok" class="${cur.knee === 'ok' ? 'on' : ''}">👍 OK</button><button data-knee="sore" class="${cur.knee === 'sore' ? 'on' : ''}">⚠ Sore</button></div>
      <h3 style="margin-top:14px">Notes</h3><textarea id="snotes" placeholder="How did it feel? Anything to flag?">${esc(cur.notes)}</textarea></div>
    <button class="btn primary" id="save">Save session</button>
    <button class="btn ghost" id="send">Send to coach</button>
    <p class="muted small" style="text-align:center">Inputs auto-save as a draft on this phone until you press Save.</p>`;
  function hasAnyWarmup() { return EX.warmup.some((ex) => cur.entries[ex.name]?.done); }
}

function onSessionInput(e) {
  if (!cur) return;
  const t = e.target;
  if (t.id === 'snotes') cur.notes = t.value;
  else if (t.id === 'sdate') cur.date = t.value || todayISO();
  else {
    const card = t.closest('[data-ex]'); if (!card) return;
    const en = cur.entries[card.dataset.ex];
    if (t.hasAttribute('data-done')) { en.done = t.checked; card.classList.toggle('done', t.checked); }
    else if (t.dataset.set !== undefined) en.sets[+t.dataset.set][t.dataset.k] = t.value.trim();
  }
  saveDraft(cur.key, cur);
}

function saveSession() {
  const s = JSON.parse(JSON.stringify(cur)); delete s._day;
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
  const retired = [{ name: 'Incline dumbbell press' }];
  const exs = [EX.dayA, EX.dayB, EX.dayC, EX.intervals, [EX.mobility.find((e) => e.name === 'Dead hang')], [YOGA], retired].flat();
  const charts = exs.map((ex) => {
    const pts = asc.map((s) => s.entries[ex.name] && metricFor(ex, s.entries[ex.name]) ? { d: s.date, ...metricFor(ex, s.entries[ex.name]) } : null).filter(Boolean);
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
window.__dt = { sessionText, load }; // for testing
})();
