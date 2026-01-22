const DEFAULT_POSTER =
  "https://via.placeholder.com/300x450?text=No+Poster";

/* =====================
   GLOBAL STATE
===================== */
let allMovies = [];
let heroMovies = [];
let heroIndex = 0;
let heroInterval = null;

let currentTab = "home";
let currentGenre = null;

/* =====================
   AUTH HELPERS
===================== */
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

/* =====================
   LOAD MOVIES
===================== */
async function loadMovies() {
  const res = await fetch("/api/movies");
  allMovies = await res.json();

  // FORCE HOME STATE ON REFRESH
  currentTab = "home";
  currentGenre = null;

  // HERO: HIGH-RATED ONLY
  heroMovies = allMovies.filter(
    m => m.rating >= 7.5 && m.posterUrl && m.description
  );

  if (heroMovies.length < 3) {
    heroMovies = allMovies.filter(m => m.posterUrl);
  }

  // Shuffle hero list
  heroMovies.sort(() => Math.random() - 0.5);

  heroIndex = 0;
  renderHero(heroMovies[heroIndex]);

  startHeroRotation();

  // Render all rows on Home
  renderRows(allMovies);
}

/* =====================
   HERO ROTATION
===================== */
function startHeroRotation() {
  if (heroInterval) clearInterval(heroInterval);

  heroInterval = setInterval(() => {
    heroIndex = (heroIndex + 1) % heroMovies.length;
    renderHero(heroMovies[heroIndex]);
  }, 6000); // ⏱ 6 seconds
}

/* =====================
   HERO RENDER
===================== */
function renderHero(movie) {
  if (!movie) return;

  const hero = document.getElementById("hero");

  hero.style.backgroundImage = `
    linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)),
    url(${movie.posterUrl})
  `;

  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = "center top";

  hero.innerHTML = `
    <div class="hero-content">
      <h1>${movie.name}</h1>
      <p>${movie.description}</p>
      <button onclick="window.open('${movie.trailerUrl}')">▶ Play</button>
      <button onclick="addFavorite(${movie.id})">❤️ My List</button>
    </div>
  `;
}

/* =====================
   ROW RENDER
===================== */
function renderRows(movies) {
  const rows = document.getElementById("movieRows");
  rows.innerHTML = "";

  const genres = [...new Set(movies.map(m => m.genre))];

  genres.forEach(genre => {
    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <h2>${genre}</h2>
      <div class="row-posters">
        ${movies
          .filter(m => m.genre === genre)
          .map(m => createCard(m))
          .join("")}
      </div>
    `;

    rows.appendChild(row);
  });
}

/* =====================
   MOVIE CARD
===================== */
function createCard(m) {
  const token = localStorage.getItem("token");
  const payload = token ? parseJwt(token) : null;
  const isAdmin = payload && payload.role === "ADMIN";

  return `
    <div class="movie-card" onclick="openTrailer('${m.trailerUrl}')">
      <img src="${m.posterUrl || DEFAULT_POSTER}">
      <div class="play-overlay">▶</div>

      <div class="movie-info">
        <h3>${m.name}</h3>

        <p class="description" id="desc-${m.id}">
          ${m.description}
        </p>

        <span class="read-more"
          onclick="toggleDesc(${m.id}); event.stopPropagation();">
          Read more
        </span>

        <div style="margin-top:8px;">
          <button onclick="event.stopPropagation(); addFavorite(${m.id})">
            ❤️ My List
          </button>

          <a href="${m.trailerUrl}" target="_blank"
             onclick="event.stopPropagation()">
            🎥 Trailer
          </a>
        </div>

        ${isAdmin ? `
          <div class="admin-actions">
            <button onclick="event.stopPropagation(); editMovie(${m.id})">✏️</button>
            <button onclick="event.stopPropagation(); deleteMovie(${m.id})">🗑</button>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}

/* =====================
   SEARCH
===================== */
function filterMovies() {
  const q = document.getElementById("search").value.toLowerCase();
  const filtered = allMovies.filter(m =>
    m.name.toLowerCase().includes(q)
  );
  renderRows(filtered);
}

/* =====================
   TABS & FILTERS
===================== */
function setTab(tab) {
  currentTab = tab;
  currentGenre = null;

  document.querySelectorAll(".nav-tab").forEach(btn =>
    btn.classList.remove("active")
  );
  event.target.classList.add("active");

  applyFilters();
}

function filterByGenre(genre) {
  currentGenre = genre || null;
  applyFilters();
}

function applyFilters() {
  let filtered = [...allMovies];

  if (currentTab === "movies") {
    filtered = filtered.filter(m => m.genre !== "Animation");
  }

  if (currentTab === "shows") {
    filtered = filtered.filter(m =>
      m.genre === "Drama" || m.genre === "Animation"
    );
  }

  if (currentTab === "coming") {
    const thisYear = new Date().getFullYear();
    filtered = filtered.filter(m => m.year >= thisYear);
  }

  if (currentTab === "trending") {
    filtered = filtered.filter(m => m.rating >= 7.5).slice(0, 40);
  }

  if (currentGenre) {
    filtered = filtered.filter(m => m.genre === currentGenre);
  }

  renderRows(filtered);
}

/* =====================
   ACTIONS
===================== */
function addFavorite(id) {
  const token = localStorage.getItem("token");
  if (!token) return alert("Login first");

  fetch(`/api/favorites/${id}`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token }
  });
}

function openTrailer(url) {
  if (url) window.open(url, "_blank");
}

function toggleDesc(id) {
  document.getElementById(`desc-${id}`).classList.toggle("expanded");
}

function editMovie(id) {
  window.location.href = `admin.html?id=${id}`;
}

function deleteMovie(id) {
  if (!confirm("Delete this movie?")) return;

  const token = localStorage.getItem("token");
  fetch(`/api/movies/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  }).then(loadMovies);
}

function goFavorites() {
  window.location.href = "favorites.html";
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* =====================
   INIT
===================== */
loadMovies();
