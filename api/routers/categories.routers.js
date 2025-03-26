import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// GET	/categories	-> retourne toutes les catégories avec les recettes
router.get("/categories", cw(categoriesController.getCategories));

// GET	/categories/:id	-> retourne une catégorie avec ces recettes
router.get("/categories/:id",  cw(categoriesController.getOneCategory));

// POST	/categories	-> retourne la catégorie crée
router.post("/categories", cw(categoriesController.createCategory));

// PATCH	/categories/:id	-> retourne la catégorie mise à jour
router.patch("/categories/:id", cw(categoriesController.updateCategory));

// DELETE	/categories/:id	->	retourne un message de confirmation
router.delete("/categories/:id", cw(categoriesController.deleteCategory));