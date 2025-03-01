import { Router } from "express";
import * as ingredientController from "../controllers/ingredients.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();

router.get("/ingredients", cw(ingredientController.getIngredients));
router.get("/ingredients/:id", cw(ingredientController.getOneIngredient));
router.post("/ingredients", cw(ingredientController.createIngredient));
router.patch("/ingredients/:id", cw(ingredientController.updateIngredient));
router.delete("/ingredients/:id", cw(ingredientController.deleteIngredient));

// route de test pour restaurer un une recette supprimer
// router.post("/restore", cw(ingredientController.testRestoreBranch));