import Joi from "joi";
import { Category, Recipe } from "../models/index.js";

/**
 * @description Récupérer toutes les catégories avec les recettes associées
 * @param {*} res code de status et les catégories
 * @returns {Object} les catégories avec les recettes associées
 */

export  async function getCategories(req, res){
//   On importe tous les catégories  en incluant les recettes
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

/**
 * @description Récupérer une catégorie avec les recettes associées
 * @param {*} req l'id de la catégorie à récupérer dans les params
 * @param {*} res code de status et la catégorie
 * @returns {Object} la catégorie avec les recettes associées
 */

export async function getOneCategory(req, res) {
  const categoryId = parseInt(req.params.id);
  const oneCategory = await Category.findByPk(categoryId, {
    include: [{
      model:Recipe,
      as: "Recipes"
    }]
  });
  if(!oneCategory){
    return res.status(404).json({error: "pas de categorie trouvé"});
  }
  res.status(200).json(oneCategory);
}

/**
 * @description Créer une catégorie
 * @param {*} req le body avec le nom et la couleur
 * @param {*} res code de status et la catégorie créee
 * @returns {Object} la catégorie créee
 */

export async function createCategory(req, res) {
  // recupérer le body
  const {name, color} = req.body;

  // on crée un schema de validation 
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
  // On verifie s'il n'y a pas de conflit du titre de la catégorie
  const existingCategory = await Category.findOne({
    where: {name},
    paranoid: false // inclut les categories supprimés

  });
  // Inutile car les catégories sont renommés à la suppression mais pas de soucis de le laisser.
 
  if (existingCategory) {
    if(existingCategory.deleted_at !== null) {
      //restaurer la categorie si elle etait supprimée
      await existingCategory.restore();
      return res.status(200).json(existingCategory);
    }
    return res.status(409).json({ status: 409, message: "Conflit : Cette category existe déjà" });
  
  }
  
  //On crée la catégorie
  const newCategory = await Category.create({name, color});

  res.status(201).json(newCategory);
}

/**
 * @description Mettre à jour une catégorie 
 * @param {*} req l'id de la catégorie à mettre à jour dans les params
 * @param {*} res code de status et la catégorie mise à jour
 * @returns {Object} la catégorie mise à jour
 */

export async function updateCategory (req, res){
  // récupérer l'ID de catégorie  à mettre à jour
  const categoryId = parseInt(req.params.id);
  // récupérer la catégorie en BDD
  const categoryToUpdate = await Category.findByPk(categoryId);
  // si elle n'existe pas ==> 404
  if(!categoryToUpdate){
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
  if (typeof name === "string" && name !== categoryToUpdate.name) {
    const categorieNameIsExisting = await Category.findOne({ 
      where: { name }, 
      paranoid: false // Inclut aussi les éléments supprimés
    });
  
    if (categorieNameIsExisting) {
      return res.status(400).json("Ce nom de categorie est déjà pris.");
    }
  }

  // Mise à jour des champs
  categoryToUpdate.name = value.name || categoryToUpdate.name;
  categoryToUpdate.color = value.color || categoryToUpdate.color;
    
  // Sauvegarder les modifications
  await categoryToUpdate.save();
    
  return res.status(200).json(categoryToUpdate);

}

/**
 * @description Supprimer une catégorie 
 * @param {*} req l'id de la catégorie à supprimer dans les params
 * @param {*} res un status 204
 * @returns {Object} un message de succès
 */

export async function deleteCategory(req, res) {
  // recupérer l'ID de la categorie
  const categoryId = parseInt(req.params.id);

  // recupérer une caégorie en base de données
  const categoryToDelete = await Category.findByPk(categoryId);

  // si la catégorie n'existe pas, renvoyer une erreur 404
  if(!categoryToDelete){
    return res.status(404).json({error: "Oups, cette catégorie n'existe pas"});
  }

  // On renomme la catégorie qui vient d'etre supprimée
  categoryToDelete.name = `categoryDeleteNumber${categoryToDelete.id}`;
  categoryToDelete.save();

  categoryToDelete.destroy(); // Avec Sequelize en soft delete
  
  return res.status(204).json("categorie supprimé"); 
}