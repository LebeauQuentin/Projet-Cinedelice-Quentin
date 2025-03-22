import { Router } from "express";
import * as movieController from "../controllers/movies.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// GET	/movies -> retourne toutes les films
router.get("/movies", cw(movieController.getMovies));

// GET	/movies/:id -> retourne un film
router.get("/movies/:id", cw(movieController.getOneMovie));

// POST	/movies/:id -> retourne le film crée
router.post("/movies", cw(movieController.createMovie));

// PATCH /movies/:id	-> retourne le film mis à jour
router.patch("/movies/:id", cw(movieController.updateMovie));

// DELETE /movies/:id -> retourne un message de confirmation
router.delete("/movies/:id", cw(movieController.deleteMovie));

// route de test pour restaurer un une recette supprimer
// router.post("/restore", cw(movieController.testRestoreBranch));