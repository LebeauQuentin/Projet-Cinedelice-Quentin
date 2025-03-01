import { Router } from "express";
import { deleteImage, uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

// Route pour uploader une nouvelle image
router.post("/upload", upload.single("file"), uploadImage);

// Route pour supprimer une image existante
router.delete("/delete/:filename", deleteImage);

export { router as uploadRouter };
