import { Router } from "express";
import * as recipesController from "../controllers/recipes.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// GET	/recipes -> retourne toutes les recettes aves les ingrédients, les régimes, le film et la catégorie et le nom de l'utilisateur associés
router.get("/recipes", cw(recipesController.getRecipes));

// GET	/recipe/date -> retourne tous ingrédients, les régimes, et les catégories
router.get("/recipes/data", cw(recipesController.getDataForRecipes));

// GET	/recipes/:id -> retourne une recette aves les ingrédients, les régimes, le film et la catégorie et le nom de l'utilisateur associés
router.get("/recipes/:id", cw(recipesController.getOneRecipe));

// POST	/recipes -> crée une recette
router.post("/recipes", cw(recipesController.createRecipe));

// PATCH /recipes/:id -> modifie une recette
router.patch("/recipes/:id", cw(recipesController.updateRecipe));

// PATCH /admin/recipes/:id -> modifie une recette dans le panel d'administration
router.patch("/admin/recipes/:id", cw(recipesController.validateRecipe));

// PATCH /recipes/:id -> supprime une recette
router.delete("/recipes/:id", cw(recipesController.deleteRecipes));

// route de test pour restaurer un une recette supprimer
// router.post("/restore", cw(recipesController.testRestoreBranch));