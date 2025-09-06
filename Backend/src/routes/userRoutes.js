import express from "express";
import {
  createFavourite,
  fetchFavourites,
} from "../controllers/favouriteController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  getSuperhero,
  searchHero,
} from "../controllers/superheroController.js";
const router = express.Router();

router.post("/favourite/:id", isAuth, createFavourite);
router.get("/all", isAuth, getSuperhero);
router.get("/search/:name", isAuth, searchHero);
router.get("/list", isAuth, fetchFavourites);

export default router;
