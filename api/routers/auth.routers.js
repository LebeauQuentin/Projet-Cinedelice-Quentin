import { Router } from "express";
import  * as authController  from "../controllers/auth.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";

export const router = Router();
// POST /auth/login -> connexion d'un utilisateur
router.post('/auth/login', cw(authController.login));

// GET /auth/user -> récupération de l'utilisateur connecté
router.get('/auth/user', cw(authController.getUserByToken));

// GET /auth/logout -> déconnexion d'un utilisateur
router.get('/auth/logout', cw(authController.logout));
