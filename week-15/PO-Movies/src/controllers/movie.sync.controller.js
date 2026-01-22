import prisma from "../prisma.js";
import axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";

/**
 * Allowed genres ONLY (family-safe)
 */
const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  14: "Fantasy",
  27: "Horror",
  10749: "Romance",
  878: "Sci-Fi",
  53: "Thriller"
};

/**
 * 🚫 Block sexual / erotic keywords
 */
const BANNED_KEYWORDS = [
  "sex",
  "sexual",
  "erotic",
  "porn",
  "adult",
  "nude",
  "nudity",
  "lust",
  "desire",
  "fetish",
  "xxx",
  "brothel",
  "escort",
  "affair",
  "mistress"
];

export const syncMoviesFromTMDB = async (req, res) => {
  console.log("TMDB_API_KEY =", process.env.TMDB_API_KEY);

  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ message: "TMDB API key missing" });
    }

    let imported = 0;

    const fetchTMDB = async (url, params = {}) => {
      const response = await axios.get(`${TMDB_BASE}${url}`, {
        params: {
          api_key: apiKey,
          language: "en-US",
          include_adult: false, // 🚫 very important
          ...params
        }
      });
      return response.data.results;
    };

    const sources = [
      { url: "/movie/popular" },
      { url: "/movie/top_rated" },
      {
        url: "/discover/movie",
        params: {
          with_original_language: "ko|ja|zh|hi",
          sort_by: "popularity.desc"
        }
      }
    ];

    for (const source of sources) {
      for (let page = 1; page <= 8; page++) {
        const movies = await fetchTMDB(source.url, {
          ...source.params,
          page
        });

        for (const m of movies) {

          // ❌ Hard adult flag
          if (m.adult === true) continue;

          // ❌ Missing title or overview
          if (!m.title || !m.overview) continue;

          // ❌ Sexual keywords in title or description
          const text = `${m.title} ${m.overview}`.toLowerCase();
          if (BANNED_KEYWORDS.some(word => text.includes(word))) continue;

          // ❌ No genre
          if (!m.genre_ids || m.genre_ids.length === 0) continue;

          // ❌ Low popularity (filters obscure erotic films)
          if (m.popularity < 10) continue;

          // ✅ Genre mapping
          const genreName = GENRE_MAP[m.genre_ids[0]];
          if (!genreName) continue;

          await prisma.movie.upsert({
            where: { name: m.title },
            update: {},
            create: {
              name: m.title,
              genre: genreName,
              description: m.overview,
              year: m.release_date
                ? parseInt(m.release_date.split("-")[0])
                : null,
              rating: m.vote_average,
              posterUrl: m.poster_path
                ? `https://image.tmdb.org/t/p/original${m.poster_path}`
                : null,
              trailerUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(
                m.title + " trailer"
              )}`
            }
          });

          imported++;
        }
      }
    }

    res.json({
      message: "TMDB sync completed (safe mode)",
      imported
    });

  } catch (error) {
    console.error("TMDB ERROR:", error.response?.data || error.message);
    res.status(500).json({
      message: "TMDB sync failed",
      error: error.response?.data || error.message
    });
  }
};
