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
// routes Recettes
router.use(recipesRouter);

// routes Diets
router.use(dietsRouter);

// routes Users
router.use(usersRouter);

// routes Auth
router.use(authRouter);

//routes categories
router.use(categoriesRouter);

// routes Ingredients
router.use(ingredientRouter);

// routes Movies
router.use(movieRouter);

// routes upload
router.use(uploadRouter);

// Middleware 404
router.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});