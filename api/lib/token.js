import "dotenv/config";
import jwt from "jsonwebtoken";

/**
 * Génère un token JWT pour un utilisateur
 * @param {Object} payload - Les données à inclure dans le token
 * @returns {string} Le token généré
 */
export function generateToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la génération du token", error);
  }
}

/**
 * Vérifie un token JWT
 * @param {string} token - Le token à vérifier
 * @returns {Object} Les données du token
 */
export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la vérification du token", error);
  }
}



