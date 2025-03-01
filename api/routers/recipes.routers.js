import { Router } from "express";
import * as recipesController from "../controllers/recipes.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();

router.get("/recipes", cw(recipesController.getRecipes));
router.get("/recipes/data", cw(recipesController.getDataForRecipes));
router.get("/recipes/:id", cw(recipesController.getOneRecipe));
router.post("/recipes", cw(recipesController.createRecipe));
router.patch("/recipes/:id", cw(recipesController.updateRecipe));
router.patch("/admin/recipes/:id", cw(recipesController.validateRecipe));
router.delete("/recipes/:id", cw(recipesController.deleteRecipes));

// route de test pour restaurer un une recette supprimer
// router.post("/restore", cw(recipesController.testRestoreBranch));