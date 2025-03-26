import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routers/index.router.js";
import { bodySanitizerMiddleware } from "./middlewares/sanitize.js";

// Configuration d'express
const app = express();

// Authorize CORS requests à modifier pour la prod 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie'],
  exposedHeaders: ['Set-Cookie'],
}));

// Add session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 // 1 jour
  }
}));

// Disable x-powered-by Express header // => ne pas leak des informations sur notre stack technique
app.disable('x-powered-by');

// Add cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Add body parser
app.use(express.urlencoded({ extended: true })); // Parser les bodies de type "application/www-form-urlencoded"
app.use(express.json()); // Parser les bodies de type "application/json"

// Static assets
app.use('/images-recettes', express.static('public/images-recettes', {
  setHeaders: (res) => {
    res.set('Cache-Control', 'no-store');
  }
}));

// SanitizeHtml pour empecher les injections XSS
app.use(bodySanitizerMiddleware);

// Configuration des routes de l'api
app.use("/api", router);

// use variables d'environnement
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} at http://localhost:${PORT}`);
});