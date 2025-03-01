import { Router } from "express";
import * as movieController from "../controllers/movies.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();

router.get("/movies", cw(movieController.getMovies));
router.get("/movies/:id", cw(movieController.getOneMovie));
router.post("/movies", cw(movieController.createMovie));
router.patch("/movies/:id", cw(movieController.updateMovie));
router.delete("/movies/:id", cw(movieController.deleteMovie));

// route de test pour restaurer un une recette supprimer
// router.post("/restore", cw(movieController.testRestoreBranch));