const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

if (movieId) {
  document.getElementById("title").innerText = "✏️ Edit Movie";
  document.getElementById("saveBtn").innerText = "💾 Update Movie";
  loadMovie();
}

async function loadMovie() {
  const res = await fetch("/api/movies");
  const movies = await res.json();
  const movie = movies.find(m => m.id == movieId);

  document.getElementById("name").value = movie.name;
  document.getElementById("genre").value = movie.genre;
  document.getElementById("trailerUrl").value = movie.trailerUrl;
  document.getElementById("posterUrl").value = movie.posterUrl || "";
  document.getElementById("description").value = movie.description;
}

async function saveMovie() {
  const data = {
    name: document.getElementById("name").value,
    genre: document.getElementById("genre").value,
    trailerUrl: document.getElementById("trailerUrl").value,
    posterUrl: document.getElementById("posterUrl").value,
    description: document.getElementById("description").value
  };

  const url = movieId ? `/api/movies/${movieId}` : "/api/movies";
  const method = movieId ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert(movieId ? "Movie updated" : "Movie added");
    window.location.href = "index.html";
  } else {
    const err = await res.json();
    alert(err.message);
  }
}

function goBack() {
  window.location.href = "index.html";
}
