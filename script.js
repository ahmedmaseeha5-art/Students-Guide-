const subjectGrid = document.getElementById("subjectGrid");
const searchInput = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const pageResources = document.getElementById("pageResources");
const colorMap = { lav: "#eee7f8", pink: "#fae9ed", blue: "#e4eff7", sage: "#e8f0e5" };
function escapeHtml(v) { return String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function card(r) {
  const audio = r.type === "surah" || r.type === "dua" || r.type === "audio";
  const player = r.audioUrl ? `<audio controls controlsList="nodownload" preload="none" src="${escapeHtml(r.audioUrl)}">Your browser does not support audio playback.</audio>` : `<span class="resource-link">Audio will appear here when added.</span>`;
  const note = r.url ? `<a class="resource-link" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">Open study note →</a>` : `<span class="resource-link">Study note will appear here when added.</span>`;
  return `<article class="resource-card"><div class="resource-top"><span class="resource-icon" style="background:${audio?'#e4eff7':'#eee7f8'}">${escapeHtml(r.icon || (audio?'🎧':'📝'))}</span><span class="tag">${escapeHtml(r.subject || '')}</span></div><h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description || '')}</p>${audio ? player : note}</article>`;
}
function renderSubjects() {
 subjectGrid.innerHTML = subjects.map(s => `<a class="subject-card" href="#page/${s.id}" style="background:${colorMap[s.color]||colorMap.lav}"><span class="emoji">${s.emoji}</span><strong>${escapeHtml(s.name)}</strong><small>Open section →</small></a>`).join("");
}
function renderSearch() {
 const q = searchInput.value.trim().toLowerCase();
 if (!q) { document.getElementById('searchResults').hidden = true; return; }
 const found = resources.filter(r => `${r.title} ${r.subject} ${r.description||''} ${r.keywords||''}`.toLowerCase().includes(q));
 resultsGrid.innerHTML = found.map(card).join('');
 document.getElementById('searchResults').hidden = false;
 document.getElementById('emptyState').hidden = found.length > 0;
}
function route() {
 const match = location.hash.match(/^#page\/(.+)$/);
 document.getElementById('hero').hidden = !!match;
 document.getElementById('searchPanel').hidden = !!match;
 document.getElementById('subjects').hidden = !!match;
 document.getElementById('searchResults').hidden = !!match || !searchInput.value.trim();
 document.getElementById('about').hidden = !!match;
 document.getElementById('emptyState').hidden = true;
 if (!match) { document.getElementById('pageView').hidden = true; return; }
 const subject = subjects.find(s => s.id === decodeURIComponent(match[1]));
 if (!subject) { location.hash = '#home'; return; }
 document.getElementById('pageView').hidden = false;
 document.getElementById('pageTitle').textContent = subject.name;
 document.getElementById('pageEyebrow').textContent = subject.kind ? 'Listen and learn' : 'Read and revise';
 document.getElementById('pageDescription').textContent = subject.description;
 const items = resources.filter(r => r.subject === subject.name || (subject.kind === 'surah' && r.type === 'surah') || (subject.kind === 'dua' && r.type === 'dua'));
 pageResources.innerHTML = items.map(card).join('');
 document.getElementById('pageEmpty').hidden = items.length > 0;
 window.scrollTo({top:0,behavior:'smooth'});
}
renderSubjects();
searchInput.addEventListener('input', renderSearch);
document.getElementById('clearSearch').addEventListener('click', () => { searchInput.value=''; renderSearch(); searchInput.focus(); });
document.getElementById('year').textContent = new Date().getFullYear();
const menuToggle = document.getElementById('menuToggle'), nav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => { const open=nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded',String(open)); });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('hashchange', route); route();
