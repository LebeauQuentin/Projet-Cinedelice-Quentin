import { Router } from "express";
import * as ingredientController from "../controllers/ingredients.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// GET	/ingredients -> retourne toutes les ingrédients
router.get("/ingredients", cw(ingredientController.getIngredients));

// GET	/ingredients/:id -> retourne un ingrédient
router.get("/ingredients/:id", cw(ingredientController.getOneIngredient));

// POST	/ingredients/:id -> retourne l'ingrédient crée
router.post("/ingredients", cw(ingredientController.createIngredient));

// PATCH /ingredients/:id -> retourne l'ingrédient mis à jour
router.patch("/ingredients/:id", cw(ingredientController.updateIngredient));

// DELETE /ingredients/:id -> retourne un message de confirmation
router.delete("/ingredients/:id", cw(ingredientController.deleteIngredient));

// route de test pour restaurer un ingrédient supprimer
// router.post("/restore", cw(ingredientController.testRestoreBranch));