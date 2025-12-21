// Load popular movies when page opens
async function loadMovies() {
  try {
    const res = await fetch("/movies");
    const data = await res.json();
    showMovies(data);
  } catch (error) {
    console.error("Failed to load movies", error);
  }
}

// Search movies by title
async function searchMovie() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim();

 // Search when pressing Enter key
function handleEnter(event) {
  if (event.key === "Enter") {
    searchMovie();
  }
}
 

  // If input is empty → go back to home
  if (query === "") {
    loadMovies();
    return;
  }

  if (query.length < 2) {
    alert("Please type at least 2 characters");
    return;
  }

  try {
    const res = await fetch(`/search?q=${query}`);
    const data = await res.json();
    showMovies(data);
  } catch (error) {
    console.error("Search failed", error);
  }
}

// Display movies on screen
function showMovies(movies) {
  const movieDiv = document.getElementById("movies");
  movieDiv.innerHTML = ""; // Clear old movies

  if (!movies || movies.length === 0) {
    movieDiv.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach(movie => {
    if (movie.poster_path) {
      movieDiv.innerHTML += `
        <div class="movie">
          <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            alt="${movie.title}"
          >
          <p>${movie.title}</p>
        </div>
      `;
    }
  });
}

// Go back to main menu (popular movies)
function goHome() {
  document.getElementById("searchInput").value = "";
  loadMovies();
}
// Enable search when pressing ENTER
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // stop page refresh if any
      searchMovie();
    }
  });
});


// Load homepage movies on startup
loadMovies();
