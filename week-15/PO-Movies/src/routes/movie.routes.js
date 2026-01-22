import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import { syncMoviesFromTMDB } from "../controllers/movie.sync.controller.js";
import { validateRequest } from "../middlewares/validation.middleware.js";
import {
  createMovieValidation,
  updateMovieValidation
} from "../validations/movie.validation.js";
import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} from "../controllers/movie.controller.js";

const router = express.Router();

// PUBLIC
router.get("/", getAllMovies);

// ADMIN ONLY — TMDB SYNC
router.post(
  "/sync",
  verifyToken,
  isAdmin,
  syncMoviesFromTMDB
);

// ADMIN ONLY — MANUAL CRUD
router.post(
  "/",
  verifyToken,
  isAdmin,
  createMovieValidation,
  validateRequest,
  createMovie
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateMovieValidation,
  validateRequest,
  updateMovie
);

router.delete("/:id", verifyToken, isAdmin, deleteMovie);

export default router;
