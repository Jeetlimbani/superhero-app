import express from "express";
import { editSuperhero } from "../controllers/superheroController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { permit } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin only
router.put("/edit/:id", isAuth, permit("admin"), editSuperhero);

export default router;
