import { Users } from "../models/index.js"; 
import argon2 from "argon2";
import Joi from "joi";
import { generateToken, verifyToken } from "../lib/token.js";
import { setCookie, getCookie, deleteCookie, setCookieExpiry } from "../lib/cookie.js";

/**
 * @description Connexion d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} message de succès
 */
export async function login(req, res) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  // validation des données via joi
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  // chercher l'utilisateur
  const user = await Users.findOne({ where: { email: value.email } });
  // vérifier si l'utilisateur existe
  if (!user) {
    return res.status(401).json({ error: "Utilisateur non trouvé" });
  }
  // vérifier le mot de passe
  const isPasswordValid = await argon2.verify(user.password, value.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Mot de passe incorrect" });
  }

  // générer un token
  const token = generateToken({ id: user.id });
  // créer un cookie
  //console.log("Token généré:", token); // Debug
  setCookie(req, res, token);
  //console.log("Response headers:", res.getHeaders());

  // retourner un message de succès
  res.status(200).json({ message: "Connexion réussie" });
}

/**
 * @description Récupérer un utilisateur par son token
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} utilisateur connecté sans le mot de passe
 */
export async function getUserByToken(req, res) {
  // récupérer le token
  // console.log("cookies", req.cookies);
  const token = getCookie(req);
  // vérifier si le token est valide
  // console.log("getUserByToken", token);
  if (!token) {
    return res.status(401).json({ error: "Vous devez être connecté pour accéder à cette page" });
  }
  // vérifier si le token est valide
  const decoded = verifyToken(token);
  // vérifier si le token est valide
  if (!decoded) {
    return res.status(401).json({ error: "Vous devez être connecté pour accéder à cette page" });
  }
  // récupérer l'utilisateur sans le mot de passe
  const user = await Users.findOne({ where: { id: decoded.id }, attributes: { exclude: ["password"] } });

  // définir la durée de vie du cookie
  setCookieExpiry(req, res);
  // retourner l'utilisateur courant
  res.status(200).json(user);
}

/**
 * @description Déconnexion d'un utilisateur
 * @param {*} req 
 * @param {*} res 
 * @returns {Object} message de succès
 */
export async function logout(req, res) {
  // supprimer le cookie x-auth-token
  deleteCookie(res);
  // retourner un message de succès
  res.status(200).json({ message: "Déconnexion réussie" });
}


