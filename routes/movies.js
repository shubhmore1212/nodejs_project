import express from "express";

import { addMovie, getMovie } from "../controllers/movie.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/search", verifyToken, getMovie);

router.post("/create", verifyToken, addMovie);

export default router;
