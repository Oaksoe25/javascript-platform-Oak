import prisma from "../prisma.js";

// ❤️ ADD FAVORITE
export const addFavorite = async (req, res, next) => {
  try {
    const movieId = parseInt(req.params.movieId);
    const userId = req.user.id;

    // check duplicate
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId
        }
      }
    });

    if (existing) {
      return res.status(400).json({
        message: "Movie already in favorites"
      });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        movieId
      }
    });

    res.status(201).json({
      message: "Movie added to favorites",
      favorite
    });
  } catch (error) {
    next(error);
  }
};
// GET my favorites (with movie info)
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: true   // 🔑 include poster, trailer, title
      }
    });

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Failed to load favorites" });
  }
};

// REMOVE favorite
export const removeFavorite = async (req, res) => {
  try {
    await prisma.favorite.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove favorite" });
  }
};
