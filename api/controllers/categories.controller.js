import Joi from "joi";
import { Category, Recipe } from "../models/index.js";
//import { sequelize } from "../models/sequelizeClient.js";

export  async function getCategories(req, res){
//   On importe tous les rcategories égimes en incluant les recettes
  const categories = await Category.findAll({include:[{
    model:Recipe,
    as: "Recipes"
  }]});

  //On aurait pu faire une requete SQl avec une jointure plutôt que d'utiliser Sequelize
  // const categories = await sequelize.query(`
  //    SELECT * FROM "category"
  //    JOIN "recipe" ON category.id = recipe.category_id
  //    ORDER BY category.id;
  //   `);
 
  res.status(200).json(categories);
  
}

export async function getOneCategorie(req, res) {
  const categoryId = parseInt(req.params.id);
  const oneCategorie = await Category.findByPk(categoryId, {
    include: [{
      model:Recipe,
      as: "Recipes"
    }]
  });
  if(!oneCategorie){
    return res.status(404).json({error: "pas de category trouvé"});
  }
  res.status(200).json(oneCategorie);
}

export async function createCategorie(req, res) {
  // recupérer le body
  const {name, color} = req.body;

  // on crée un shema de validation 
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required(),
    
    color: Joi.string()
      .trim()
      .pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/) // Regex pour hex
      .optional()

  });
  // Confronter notre body sur le schéma
  const { error } = schema.validate({ name, color });
  
  // Si une erreur de validation survient 
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }
  // On verifie s'il n'y a pas de conflit de titre du category
  const existingCategory = await Category.findOne({
    where: {name},
    paranoid: false // inclut les categories supprimés

  });
  // Inutile car les categories sont renommés à la suppression mais pas de soucis de le laisser.
 
  if (existingCategory) {
    if(existingCategory.deleted_at !== null) {
      //restaurer la category s'il etait supprimée
      await existingCategory.restore();
      return res.status(200).json(existingCategory);
    }
    return res.status(409).json({ status: 409, message: "Conflit : Cette category existe déjà" });
  
  }
  

  //On cree la category
  const newCategory = await Category.create({name, color});

  res.status(201).json(newCategory);
}

export async function updateCategorie (req, res){
  // recuperer l'ID de categorie  a update
  const categorieId = parseInt(req.params.id);
  //recuperer la catégories en BDD
  const categorieToUpdate = await Category.findByPk(categorieId);
  // si elle n'existe pas ==> 404
  if(!categorieToUpdate){
    return res.status(404).json({error: "Oups ce régime n'existe pas"});
  }

  // Récupérer le body
  const { name, color } = req.body;
  // On crée un schema de validation
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .optional(),
  
    color: Joi.string()
      .trim()
      .pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/) // Regex pour hex
      .optional()
  });

  // Confronter notre body sur le schéma
  const { error, value } = schema.validate({ name, color });

  // Si une erreur de validation survient 
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  };

  // Vérifier l'unicité du nom seulement si le nom a changé
  if (typeof name === "string" && name !== categorieToUpdate.name) {
    const categorieNameIsExisting = await Category.findOne({ 
      where: { name }, 
      paranoid: false // Inclut aussi les éléments supprimés
    });
  
    if (categorieNameIsExisting) {
      return res.status(400).json("Ce nom de categorie est déjà pris.");
    }
  }

  // Mise à jour des champs
  categorieToUpdate.name = value.name || categorieToUpdate.name;
  categorieToUpdate.color = value.color || categorieToUpdate.color;
    
  // Sauvegarder les modifications
  await categorieToUpdate.save();
    
  return res.status(200).json(categorieToUpdate);

}

export async function deleteCategorie(req, res) {
  //recupérer l'ID du categorie
  const categorieId = parseInt(req.params.id);

  // recupérer un  régime en base de données
  const categorieToDelete = await Category.findByPk(categorieId);

  //si la categorie n'existe pas, renvoyer une erreur 404
  if(!categorieToDelete){
    return res.status(404).json({error: "Oups, cette catégorie n'existe pas"});
  }

  //On renomme la categorie qui vient d'etre supprimée
  categorieToDelete.name = `categorieDeleteNumber${categorieToDelete.id}`;
  categorieToDelete.save();

  categorieToDelete.destroy(); // Avec Sequelize en soft delete
  
  return res.status(204).json("categorie supprimé"); 
}