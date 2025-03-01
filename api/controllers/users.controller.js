import { Users } from "../models/index.js";
import argon2 from "argon2";
import joi from "joi";


/**
 * @description crée un nouvel utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns renvoie un nouvel utilisateur
 */
export async function createUser(req, res) {
  const { password, confirmPassword } = req.body;
  // console.log(lastname, firstname, email, password, confirmPassword);

  // validation des données via joi création du schéma
  const schema = joi.object({
    lastname: joi.string().required(),
    firstname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().min(6).required(),
  });


  // validation des données via joi
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // validation des mots de passe
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
  }
  // vérification de l'existence de l'utilisateur
  const user = await Users.findOne({ where: { email: value.email } });
  if (user) {
    return res.status(404).json({ error: "Il y a un problème avec cette ressource" });
  }
  // hashage du mot de passe
  const hashedPassword = await argon2.hash(password);
  //création de l'utilisateur

  await Users.create({ last_name: value.lastname, first_name: value.firstname, email: value.email, password: hashedPassword });
  // retour de la réponse
  res.status(201).json({ message: "Utilisateur créé avec succès" });

}

/**
 * @description Récupérer tous les utilisateurs
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} retourne tous les utilisateurs
 */ 
export async function getAllUsers(req, res) {
  const users = await Users.findAll({ attributes: { exclude: ["password"] } });
  res.status(200).json(users);
}

/**
 * @description Récupérer un utilisateur par son id
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} retourne un utilisateur
 */
export async function getUserById(req, res) {
  const { id } = req.params;
  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "L'identifiant n'est pas valide" });
  }
  const user = await Users.findByPk(userId, { attributes: { exclude: ["password"] } });
  if (!user) {
    return res.status(404).json({ error: "il y a un problème avec cette ressource" });
  }
  res.status(200).json(user);
}

/**S
 * @description Mettre à jour un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} retourne un utilisateur
 */
export async function updateUser(req, res) {
  const { id } = req.params;
  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "L'identifiant n'est pas valide" });
  }
  // validation des données via joi données optionnelles
  const schema = joi.object({
    lastname: joi.string().optional(),
    firstname: joi.string().optional(),
    email: joi.string().email().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  // vérification de l'existence du mail
  const alreadyExist = await Users.findOne({ where: { email: value.email } });
  if (alreadyExist && alreadyExist.id !== userId) {
    return res.status(404).json({ error: "Cette ressource existe déjà" });
  }
  // récuperation de l'utilisateur via l'id
  const user = await Users.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "il y a un problème avec cette ressource" });
  }

  //faire l'update des champs
  user.last_name = value.lastname || user.last_name;
  user.first_name = value.firstname || user.first_name;
  user.email = value.email || user.email;
  // enregistrer les modifications
  await user.save();
  // récupérer l'utilisateur mis à jour
  const updatedUser = await Users.findByPk(user.id, { 
    attributes: { exclude: ["password"] } 
  });
  res.status(200).json(updatedUser);
}

/**
 * @description Supprimer un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} retourne un utilisateur
 */
export async function deleteUser(req, res) {
  const { id } = req.params;
  const userId = Number(id);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "L'identifiant n'est pas valide" });
  }
  const user = await Users.findByPk(userId);
  if (!user) {
    return res.status(404).json({ error: "il y a un problème avec cette ressource" });
  }
  await Users.destroy({ where: { id: userId } });
  res.status(204).json({ message: "Utilisateur supprimé avec succès" });
}

export async function isAdminUser(req,res) {
  // Récupérer l'ID de la recette
  const userId = parseInt(req.params.id);
  // console.log("le id de la recette", userId);
  // console.log("la validation", req.body);

  // Récupérer la recette en base de données
  const userToUpdate = await Users.findByPk(userId);

  // Si la recette n'existe pas, renvoyer une erreur 404
  if (!userToUpdate) {
    return res.status(404).json({ error: "Oups, cette utilisateur n'existe pas" });
  }

  // Récupérer la valeur du champ validated
  const { is_admin } = req.body;

  // Définir le schéma de validation
  const updateUserBodySchema = joi.object({
    is_admin: joi.boolean().required(),
  });

  // Valider la donnée
  const { error, value } = updateUserBodySchema.validate({ is_admin });

  // En cas d'erreur de validation, renvoyer une erreur 400
  if (error) {
    return res.status(400).json({ error: `Erreur de validation: ${error.details.map(err => err.message).join(', ')}` });
  }

  // Mettre à jour le statut de validation s'il est différent de celui d'origine
  if( userToUpdate.is_admin !== value.is_admin ){
    userToUpdate.is_admin = value.is_admin;
    // Sauvegarder les modifications
    await userToUpdate.save();
    // Répondre à l'admin avec un message de confirmation
    if (is_admin){
      return res.status(200).json({ message: "Utilisateur validée avec succès" });
    } else return res.status(200).json({ message: "Utilisateur retirée avec succès" });
  } return res.status(200).json({ message: "Aucune modification apporté" });
}
