import { Router } from "express";
import { router as recipesRouter } from "./recipes.routers.js";
import { router as usersRouter } from "./users.routers.js";
import { router as authRouter } from "./auth.routers.js";
import { router as dietsRouter } from "./diets.routers.js";
import { router as categoriesRouter } from "./categories.routers.js";
import { router as ingredientRouter } from "./ingredients.routeur.js";
import { router as movieRouter } from "./movies.routeur.js";
import { uploadRouter } from "./upload.routeur.js";

export const router = Router();

// == Routes ==
// add routes Recettes
router.use(recipesRouter);

// add routes Diets
router.use(dietsRouter);

// add routes Users
router.use(usersRouter);

// add routes Auth
router.use(authRouter);

//add routes categories
router.use(categoriesRouter);

// add routes Ingredients
router.use(ingredientRouter);

// add routes Movies
router.use(movieRouter);

// add routes upload
router.use(uploadRouter);

// Middleware 404
router.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});