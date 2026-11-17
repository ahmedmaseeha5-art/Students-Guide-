const notesGrid = document.getElementById("notesGrid");
const audioGrid = document.getElementById("audioGrid");
const subjectGrid = document.getElementById("subjectGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
let activeSubject = "";

const colorMap = { lav: "#eee7f8", pink: "#fae9ed", blue: "#e4eff7", sage: "#e8f0e5" };

function renderSubjects() {
  subjectGrid.innerHTML = subjects.map(s => `
    <button class="subject-card ${activeSubject === s.name ? "active" : ""}"
      style="background:${colorMap[s.color] || colorMap.lav}" data-subject="${escapeHtml(s.name)}">
      <span class="emoji">${s.emoji}</span><strong>${escapeHtml(s.name)}</strong>
      <small>Browse resources →</small>
    </button>`).join("");
  subjectGrid.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
    activeSubject = activeSubject === btn.dataset.subject ? "" : btn.dataset.subject;
    render();
    document.getElementById("library").scrollIntoView({behavior:"smooth"});
  }));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

function matches(r, q) {
  const haystack = `${r.title} ${r.subject} ${r.description} ${r.keywords || ""}`.toLowerCase();
  return (!q || haystack.includes(q)) && (!activeSubject || r.subject === activeSubject);
}

function render() {
  renderSubjects();
  const q = searchInput.value.trim().toLowerCase();
  const found = resources.filter(r => matches(r, q));
  const notes = found.filter(r => r.type === "note");
  const audios = found.filter(r => r.type === "audio");

  notesGrid.innerHTML = notes.map(r => `
    <article class="resource-card">
      <div class="resource-top"><span class="resource-icon" style="background:#eee7f8">${r.icon || "📝"}</span><span class="tag">${escapeHtml(r.subject)}</span></div>
      <h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description)}</p>
      ${r.url && r.url !== "#" ? `<a class="resource-link" href="${escapeHtml(r.url)}" target="_blank" rel="noopener">Open study note →</a>` : `<span class="resource-link">Add a document link in resources.js</span>`}
    </article>`).join("");

  audioGrid.innerHTML = audios.map(r => `
    <article class="resource-card">
      <div class="resource-top"><span class="resource-icon" style="background:#e4eff7">${r.icon || "🎧"}</span><span class="tag">${escapeHtml(r.subject)}</span></div>
      <h3>${escapeHtml(r.title)}</h3><p>${escapeHtml(r.description)}</p>
      ${r.audioUrl ? `<audio controls controlsList="nodownload" preload="none" src="${escapeHtml(r.audioUrl)}">Your browser does not support audio playback.</audio>` : `<span class="resource-link">Add an audio link in resources.js</span>`}
    </article>`).join("");

  emptyState.hidden = found.length !== 0;
  document.querySelector("#notes").hidden = notes.length === 0;
  document.querySelector("#audio").hidden = audios.length === 0;
}

searchInput.addEventListener("input", render);
document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = ""; activeSubject = ""; render(); searchInput.focus();
});
document.getElementById("year").textContent = new Date().getFullYear();
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
render();
