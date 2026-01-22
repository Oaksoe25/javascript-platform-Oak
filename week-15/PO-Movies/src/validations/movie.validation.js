import { body } from "express-validator";

export const createMovieValidation = [
  body("name").notEmpty().withMessage("Movie name is required"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("trailerUrl").isURL().withMessage("Invalid trailer URL"),
  body("posterUrl").optional().isURL().withMessage("Invalid poster URL"),
  body("genre").notEmpty().withMessage("Genre is required")
];

export const updateMovieValidation = [
  body("name").optional().notEmpty(),
  body("description").optional().isLength({ min: 10 }),
  body("trailerUrl").optional().isURL(),
  body("posterUrl").optional().isURL(),   // ✅ THIS IS THE KEY LINE
  body("genre").optional().notEmpty()
];
