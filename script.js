const subjectGrid = document.getElementById("subjectGrid");
const searchInput = document.getElementById("searchInput");
const resultsGrid = document.getElementById("resultsGrid");
const pageResources = document.getElementById("pageResources");

let resources = [];

const colorMap = {
  lav: "#eee7f8",
  pink: "#fae9ed",
  blue: "#e4eff7",
  sage: "#e8f0e5"
};

function escapeHtml(v) {
  return String(v ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function card(r) {
  const audio = ["surah", "dua", "audio"].includes(r.type);

  const audioUrl = r.audioUrl
    ? escapeHtml(r.audioUrl.replace(/^\/media\//, "./media/"))
    : "";

  const player = audioUrl
    ? `<audio controls preload="none" src="${audioUrl}">Your browser does not support audio playback.</audio>`
    : "";

  const notes = r.notes
    ? `<div class="resource-notes" style="white-space:pre-wrap">${escapeHtml(r.notes)}</div>`
    : "";

  return `
    <article class="resource-card">
      <div class="resource-top">
        <span class="resource-icon" style="background:${audio ? '#e4eff7' : '#eee7f8'}">
          ${escapeHtml(r.icon || (audio ? '🎧' : '📝'))}
        </span>
        <span class="tag">${escapeHtml(r.subject || '')}</span>
      </div>
      <h3>${escapeHtml(r.title)}</h3>
      <p>${escapeHtml(r.description || '')}</p>
      ${notes}
      ${audio ? player : ""}
    </article>
  `;
}

function renderSubjects() {
  subjectGrid.innerHTML = subjects.map(s => `
    <a class="subject-card" href="#page/${s.id}"
      style="background:${colorMap[s.color] || colorMap.lav}">
      <span class="emoji">${s.emoji}</span>
      <strong>${escapeHtml(s.name)}</strong>
      <small>Open section →</small>
    </a>
  `).join("");
}

function renderSearch() {
  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    document.getElementById("searchResults").hidden = true;
    return;
  }

  const found = resources.filter(r =>
    `${r.title} ${r.subject} ${r.description || ""} ${r.notes || ""} ${r.keywords || ""}`
      .toLowerCase().includes(q)
  );

  resultsGrid.innerHTML = found.map(card).join("");

  document.getElementById("searchResults").hidden = false;
  document.getElementById("emptyState").hidden = found.length > 0;
}

function route() {
  const match = location.hash.match(/^#page\/(.+)$/);

  document.getElementById("hero").hidden = !!match;
  document.getElementById("searchPanel").hidden = !!match;
  document.getElementById("subjects").hidden = !!match;
  document.getElementById("searchResults").hidden = !!match || !searchInput.value.trim();
  document.getElementById("about").hidden = !!match;
  document.getElementById("emptyState").hidden = true;

  if (!match) {
    document.getElementById("pageView").hidden = true;
    return;
  }

  const subject = subjects.find(s => s.id === decodeURIComponent(match[1]));

  if (!subject) {
    location.hash = "#home";
    return;
  }

  document.getElementById("pageView").hidden = false;
  document.getElementById("pageTitle").textContent = subject.name;
  document.getElementById("pageEyebrow").textContent =
    subject.kind ? "Listen and learn" : "Read and revise";
  document.getElementById("pageDescription").textContent = subject.description;

  const items = resources.filter(r =>
    r.subject === subject.name ||
    (subject.kind === "surah" && r.type === "surah") ||
    (subject.kind === "dua" && r.type === "dua")
  );

  pageResources.innerHTML = items.map(card).join("");
  document.getElementById("pageEmpty").hidden = items.length > 0;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function loadResources() {
  try {
    const response = await fetch("./resources.json");

    if (!response.ok) {
      throw new Error("Could not load learning materials.");
    }

    resources = await response.json();

    if (!Array.isArray(resources)) {
      resources = [];
    }

  } catch (error) {
    console.error("Learning materials error:", error);
    resources = [];
  }

  renderSubjects();
  renderSearch();
  route();
}

searchInput.addEventListener("input", renderSearch);

document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  renderSearch();
  searchInput.focus();
});

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

nav.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => nav.classList.remove("open"))
);

window.addEventListener("hashchange", route);

loadResources();
