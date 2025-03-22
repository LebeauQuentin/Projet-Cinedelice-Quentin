import multer from "multer";

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dossier où seront stockées les images
    cb(null, "public/images-recettes/"); 
  }
});

// Configuration de multer pour l'upload des images
export const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Format d'image non supporté"), false);
    }
    cb(null, true);
  }
});
