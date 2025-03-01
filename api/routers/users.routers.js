import { Router } from "express";
import  * as usersController  from "../controllers/users.controller.js";
import { controllerWrapper as cw } from "../middlewares/controllerWrapper.js";
import { isAuthenticated, authorized } from "../middlewares/authenticated.js";

export const router = Router();

// création d'un utilisateur
router.post('/users', cw(usersController.createUser));

// récupérer tous les utilisateurs pour l'admin avec vérification de la connexion
router.get('/users', isAuthenticated, cw(authorized), cw(usersController.getAllUsers));

// récupérer un utilisateur par son id pour l'admin avec vérification de la connexion
router.get('/users/:id', isAuthenticated, cw(authorized), cw(usersController.getUserById));

// récupérer un utilisateur par son id pour le mettre à jour avec vérification de la connexion
router.patch('/users/:id', isAuthenticated, cw(usersController.updateUser));
// récupérer un user par son id pour mettre à jour son status d'admin
router.patch('/admin/users/:id', isAuthenticated, cw(usersController.isAdminUser));

// supprimer un utilisateur par son id pour les utilisateurs connectés
router.delete('/users/:id', isAuthenticated, cw(usersController.deleteUser));

// == Routes ==
// get /users/:id pour récupérer un utilisateur par son id (✅) pour l'admin
// post /users pour créer un utilisateur (✅)
// patch /users/:id pour mettre à jour un utilisateur (✅)
// delete /users/:id pour supprimer un utilisateur (✅)
// get /users pour récupérer tous les utilisateurs (✅) pour l'admin





