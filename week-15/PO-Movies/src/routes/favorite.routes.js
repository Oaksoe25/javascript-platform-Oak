import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getFavorites,
  removeFavorite
} from "../controllers/favorite.controller.js";

const router = express.Router();

router.get("/", verifyToken, getFavorites);
router.delete("/:id", verifyToken, removeFavorite);

export default router;
