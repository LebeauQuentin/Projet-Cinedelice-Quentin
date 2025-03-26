import { Router } from "express";
import * as dietsController from "../controllers/diets.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// GET	/diets -> retourne toutes les régimes avec les recettes
router.get("/diets", cw(dietsController.getDiets));

// GET	/diets/:id -> retourne un régime avec ces recettes
router.get("/diets/:id", cw(dietsController.getOneDiet));

// POST	/diets/:id -> retourne le régime crée
router.post("/diets", cw(dietsController.createDiet));

// PATCH /diets/:id	-> retourne le régime mis à jour
router.patch("/diets/:id", cw(dietsController.updateDiet));

// DELETE /diets/:id -> retourne un message de confirmation
router.delete("/diets/:id", cw(dietsController.deleteDiet));
