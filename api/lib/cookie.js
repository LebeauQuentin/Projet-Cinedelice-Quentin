import "dotenv/config";

/**
 * @description Créer un cookie
 * @param {*} req, res 
 * @param {*} token 
 */
export function setCookie(req, res, token) {
  const maxAge = Number(process.env.COOKIE_EXPIRES_IN);
  req.session.expires = Date.now() + maxAge; //mettre en timeStamp
  res.cookie("x-auth-token", token, {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE,
    maxAge: maxAge,
    sameSite: process.env.COOKIE_SAME_SITE,
    path: "/",
    domain: "localhost"
  });
}

/**
 * @description Récupérer le temps restant avant la fin de la session
 * @param {*} req 
 * @returns {Number} temps restant
 */
export function getRemainingTime(req) {
  const expiresIn = req.session.expires;
  const timeRemaining = expiresIn - Date.now(); // enlever le timestamp pour deduire le temps restant
  //console.log("expiresIn", timeRemaining);
  return Math.max(0, timeRemaining); // ne pas retourner un nombre négatif
}


/**
 * @description Définir la durée de vie du cookie
 * @param {*} req, res 
 * @returns {Number} cookie temps restant de la session
 */
export function setCookieExpiry(req, res) {
  const remainingTime = getRemainingTime(req);// temps restant avant la fin de la session
  const expiry = Date.now() + Number(remainingTime); // mettre en timeStamp
  res.cookie("x-auth-token-expiry", expiry, {
    httpOnly: false,
    secure: true,
    maxAge: Number(process.env.COOKIE_EXPIRES_IN),
    sameSite: process.env.COOKIE_SAME_SITE,
    path: "/",
  });
}

/**
 * @description Récupérer un cookie
 * @param {*} req 
 * @returns {String} token
 */
export function getCookie(req) {
  if (!req.cookies["x-auth-token"] || req.cookies["x-auth-token"].length < 20) {
    return null;
  }
  return req.cookies["x-auth-token"];
}

/**
 * @description Supprimer un cookie x-auth-token
 * @param {*} res 
 */
export function deleteCookie(res) {
  res.clearCookie("x-auth-token");
}


