import { getCookie } from "../lib/cookie.js";
import { verifyToken } from "../lib/token.js";
import { Users } from "../models/index.js";

/**
 * @description Vérifie si l'utilisateur est connecté ACL (Access Control List)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next passe à la suite
 */

export function isAuthenticated(req, res, next) {
  const token = getCookie(req);
  if (!token) {
    return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette page" });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette page" });
  }
  req.decoded = decoded;
  next();
}

/**
 * @description Vérifie si l'utilisateur est connecté en tant qu'administrateur ACL (Access Control List)
 * @param {*} req 
 * @param {*} res 
 * @param {*} next passe à la suite
 */

export async function authorized(req, res, next) {
  const decoded = req.decoded;
  const user = await Users.findOne({ where: { id: decoded.id } });
  if (!user.is_admin) {
    return res.status(401).json({ message: "Vous devez être connecté pour accéder à cette page" });
  }
  next();
}


