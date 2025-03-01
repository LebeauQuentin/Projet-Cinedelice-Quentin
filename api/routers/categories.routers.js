import { Router } from "express";
import * as categoriesController from "../controllers/categories.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();

// GET	/categories		retourne toutes les catégories avec les recettes	200
router.get("/categories", cw(categoriesController.getCategories));

// GET	/categories/:id	l'identifiant dans les params	retourne une catégorie avec ces recettes	200
router.get("/categories/:id",  cw(categoriesController.getOneCategorie));

// POST	/categories	les données d'une catégorie	retourne la catégorie crée	201
router.post("/categories", cw(categoriesController.createCategorie));

// PATCH	/categories/:id	l'identifiant dans les params et les données à modifier	retourne la catégorie mise à jour avec ces recettes	200
router.patch("/categories/:id", cw(categoriesController.updateCategorie));

// DELETE	/categories/:id	l'identifiant dans les params		204
router.delete("/categories/:id", cw(categoriesController.deleteCategorie));