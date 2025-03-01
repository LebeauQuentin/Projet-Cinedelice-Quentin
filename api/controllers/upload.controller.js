import sharp from "sharp";
import path from "path";
import fs from "fs";

/**
 * @description Upload et conversion d'une image en WebP avec deux versions : une light (250x250) et une en taille originale.
 */
export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Aucun fichier reçu" });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID requis pour renommer l'image" });
  }

  const uploadsDir = "public/images-recettes";
  const originalFilename = `${id}_normal.webp`;
  const lightFilename = `${id}_light.webp`;

  const originalPath = path.join(uploadsDir, originalFilename);
  const lightPath = path.join(uploadsDir, lightFilename);

  try {
    // Conversion en WebP taille originale
    await sharp(req.file.path).toFormat("webp").toFile(originalPath);

    // Conversion en WebP version réduite (250x250)
    await sharp(req.file.path)
      .resize(250, 250, { fit: "cover" }) // Redimensionne et recadre si besoin
      .toFormat("webp")
      .toFile(lightPath);

    // Suppression du fichier temporaire
    fs.unlinkSync(req.file.path);

    const originalImageUrl = `http://localhost:3000/images-recettes/${originalFilename}`;
    const lightImageUrl = `http://localhost:3000/images-recettes/${lightFilename}`;

    res.json({ original: originalImageUrl, light: lightImageUrl });
  } catch (error) {
    console.error("Erreur lors de la conversion de l'image:", error);
    res.status(500).json({ error: "Erreur lors du traitement de l'image" });
  }
}

export async function deleteImage(req, res) {
  const oldFilename = req.params.filename;
  const oldFilePath = path.join("public/images-recettes", oldFilename);

  try {
    if (fs.existsSync(oldFilePath)) {
      await fs.promises.unlink(oldFilePath);
      // console.log("Ancienne image supprimée :", oldFilename);
      return res.json({ success: true, message: "Image supprimée" });
    } else {
      return res.status(404).json({ error: "Fichier non trouvé" });
    }
  } catch (error) {
    console.error("Erreur dans Delete Image:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}