import { Router } from "express";
import * as dietsController from "../controllers/diets.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();

router.get("/diets", cw(dietsController.getDiets));
router.get("/diets/:id", cw(dietsController.getOneDiet));
router.post("/diets", cw(dietsController.createDiet));
router.patch("/diets/:id", cw(dietsController.updateDiet));
router.delete("/diets/:id", cw(dietsController.deleteDiet));
