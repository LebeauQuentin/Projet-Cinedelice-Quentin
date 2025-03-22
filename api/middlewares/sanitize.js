import sanitizeHtml from "sanitize-html";

/* Configuration de bodySanitizerMiddleware pour éviter les injections XSS, et donc nettoyer les balises script */
export function bodySanitizerMiddleware(req, res, next) {
  // Pour chaque clé/valeur du body
  // si la valeur est une string, on la passe à sanitizeHtml
  const body = req.body;

  // on parcours les clés du body
  Object.keys(body).forEach(key => {
    // si la valeur est une string
    if (typeof body[key] === 'string') {
      // on nettoie la valeur
      body[key] = sanitizeHtml(body[key]);
    }
  });
  next();
}