const DEFAULT_POSTER =
  "https://via.placeholder.com/300x450?text=No+Poster";

async function loadFavorites() {
  const token = localStorage.getItem("token");
  if (!token) return (window.location.href = "/login.html");

  const res = await fetch("/api/favorites", {
    headers: { Authorization: "Bearer " + token }
  });

  const favorites = await res.json();
  const container = document.getElementById("favorites");
  container.innerHTML = "";

  favorites.forEach(f => {
    const m = f.movie;

    const card = document.createElement("div");
    card.className = "favorite-card";

    card.innerHTML = `
      <div class="fav-poster" onclick="openTrailer('${m.trailerUrl}')">
        <img src="${m.posterUrl || DEFAULT_POSTER}"
             onerror="this.src='${DEFAULT_POSTER}'">
        <div class="play-overlay">▶</div>
      </div>
      <div class="fav-info">
        <h3>${m.name}</h3>
        <button onclick="removeFavorite(${f.id}); event.stopPropagation();">
          ❌ Remove
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function openTrailer(url) {
  if (url) window.open(url, "_blank");
}

async function removeFavorite(id) {
  const token = localStorage.getItem("token");
  await fetch(`/api/favorites/${id}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });
  loadFavorites();
}

function goBack() {
  window.location.href = "/index.html";
}

loadFavorites();
