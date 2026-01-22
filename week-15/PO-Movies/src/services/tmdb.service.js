import axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async (apiKey, page = 1) => {
  const res = await axios.get(`${TMDB_BASE}/movie/popular`, {
    params: {
      api_key: apiKey,
      language: "en-US",
      page
    }
  });
  return res.data.results;
};

export const fetchTopRatedMovies = async (apiKey, page = 1) => {
  const res = await axios.get(`${TMDB_BASE}/movie/top_rated`, {
    params: {
      api_key: apiKey,
      language: "en-US",
      page
    }
  });
  return res.data.results;
};

export const fetchAsianMovies = async (apiKey, page = 1) => {
  const res = await axios.get(`${TMDB_BASE}/discover/movie`, {
    params: {
      api_key: apiKey,
      with_original_language: "ko|ja|zh|hi",
      sort_by: "popularity.desc",
      page
    }
  });
  return res.data.results;
};
