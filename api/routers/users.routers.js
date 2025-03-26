import { Router } from "express";
import  * as usersController  from "../controllers/users.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";
import { isAuthenticated, authorized } from "../middlewares/authenticated.js";

export const router = Router();
//  POST /users -> création d'un utilisateur
router.post('/users', cw(usersController.createUser));

// GET /users -> récupérer tous les utilisateurs pour l'admin avec vérification de la connexion
router.get('/users', isAuthenticated, cw(authorized), cw(usersController.getAllUsers));

// GET /users/:id -> récupérer un utilisateur par son id pour l'admin avec vérification de la connexion
router.get('/users/:id', isAuthenticated, cw(authorized), cw(usersController.getUserById));

// PATCH /users/:id -> récupérer un utilisateur par son id pour le mettre à jour avec vérification de la connexion
router.patch('/users/:id', isAuthenticated, cw(usersController.updateUser));

// PATCH /admin/users/:id -> récupérer un user par son id pour mettre à jour son status d'admin
router.patch('/admin/users/:id', isAuthenticated, cw(usersController.isAdminUser));

// DELETE /users/:id -> supprimer un utilisateur par son id pour les utilisateurs connectés
router.delete('/users/:id', isAuthenticated, cw(usersController.deleteUser));





