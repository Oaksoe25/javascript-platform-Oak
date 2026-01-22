import prisma from "../prisma.js";

export const createMovieService = async (data, userId) => {
  return await prisma.movie.create({
    data: {
      ...data,
      userId
    }
  });
};

export const getAllMoviesService = async () => {
  return await prisma.movie.findMany({
    orderBy: { createdAt: "desc" }
  });
};

export const updateMovieService = async (id, data) => {
  return await prisma.movie.update({
    where: { id: Number(id) },
    data
  });
};

export const deleteMovieService = async (id) => {
  return await prisma.movie.delete({
    where: { id: Number(id) }
  });
};
