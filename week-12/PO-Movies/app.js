require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { query, validationResult } = require("express-validator");

const app = express();
app.use(express.static("public"));
app.use(express.json());

const TMDB_URL = "https://api.themoviedb.org/3";
const headers = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
};

app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `${TMDB_URL}/movie/popular`,
      { headers }
    );
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ message: "Failed to load movies" });
  }
});

// Search movies by title
app.get("/search", async (req, res) => {
  const query = req.query.q;

  // ✅ Data validation
  if (!query || query.length < 2) {
    return res.status(400).json({
      message: "Search query must be at least 2 characters",
    });
  }

  try {
    const response = await axios.get(
      `${TMDB_URL}/search/movie?query=${query}`,
      { headers }
    );

    res.json(response.data.results);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Search failed" });
  }
});

app.get(
  "/search",
  query("q").isLength({ min: 2 }).withMessage("Search too short"),
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const response = await axios.get(
        `${TMDB_URL}/search/movie?query=${req.query.q}`,
        { headers }
      );
      res.json(response.data.results);
    } catch (error) {
      res.status(500).json({ message: "Search failed" });
    }
  }
);
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
