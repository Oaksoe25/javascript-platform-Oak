import prisma from "../prisma.js";

export const addFavoriteService = async (userId, movieId) => {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_movieId: {
        userId,
        movieId: Number(movieId)
      }
    }
  });

  if (existing) {
    const error = new Error("Movie already in favorites");
    error.statusCode = 400;
    throw error;
  }

  return await prisma.favorite.create({
    data: {
      userId,
      movieId: Number(movieId)
    }
  });
};

export const getMyFavoritesService = async (userId) => {
  return await prisma.favorite.findMany({
    where: { userId },
    include: { movie: true }
  });
};

export const removeFavoriteService = async (userId, movieId) => {
  return await prisma.favorite.delete({
    where: {
      userId_movieId: {
        userId,
        movieId: Number(movieId)
      }
    }
  });
};
