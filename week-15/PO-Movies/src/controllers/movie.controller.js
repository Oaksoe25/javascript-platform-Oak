import prisma from "../prisma.js";

// CREATE MOVIE
export const createMovie = async (req, res, next) => {
  try {
    const { name, description, trailerUrl, genre, posterUrl } = req.body;

    if (!name || !description || !trailerUrl || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const movie = await prisma.movie.create({
      data: {
        name,
        description,
        trailerUrl,
        posterUrl,
        genre,
        userId: req.user.id
      }
    });

    res.status(201).json({
      message: "Movie created successfully",
      movie
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL MOVIES
export const getAllMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// UPDATE MOVIE  ✅ NO SERVICE, DIRECT PRISMA
export const updateMovie = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.id);

    const movie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        name: req.body.name,
        genre: req.body.genre,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        description: req.body.description
      }
    });

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// DELETE MOVIE
export const deleteMovie = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.id);

    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    await prisma.movie.delete({
      where: { id: movieId }
    });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    next(error);
  }
};
