import Joi from "joi";
import { Diet, Recipe } from "../models/index.js";


/**
 * @description Récupérer toutes les régimes avec les recettes associées
 * @param {*} res code de status et les régimes
 * @returns {Object} les régimes avec les recettes associées
 */

export async function getDiets (req, res) {
// On importe tous les régimes en incluant les recettes
  const diets = await Diet.findAll({ include: [{
    model: Recipe,
    as: "Recipes"
  }] });
  
  // On aurait pu faire une requete SQl avec une jointure plutôt que d'utiliser Sequelize
  // const diets = await sequelize.query(`
  //   SELECT * FROM "diet" 
  //   JOIN "recipe_diet_assignation" ON diet.id = recipe_diet_assignation.diet_id
  //   LEFT JOIN "recipe" ON recipe.id = recipe_diet_assignation.recipe_id
  //   `);

  res.status(200).json(diets);
}

/**
 * @description Récupérer un régime avec les recettes associées
 * @param {*} req l'id du régime à récupérer dans les params
 * @param {*} res code de status et le régime
 * @returns {Object} le régime avec les recettes associées
 */

export async function getOneDiet (req, res) {
  // Récupérer l'ID du régime et on la parse
  const dietId = parseInt(req.params.id);

  const oneDiet = await Diet.findByPk(dietId, {
    include: [{
      model: Recipe,
      as: "Recipes" }]
  });

  // Si pas de données => 404
  if (!oneDiet) {
    return res.status(404).json({ error: "Pas de régimes trouvé, vérifier l'id." });
  }

  res.status(200).json(oneDiet);
}

/**
 * @description Créer un régime
 * @param {*} req le body avec le nom et la couleur
 * @param {*} res code de status et le régime créé
 * @returns {Object} le régime crée
 */

export async function createDiet (req, res) {
  // Récupérer le body
  const { name, color } = req.body;

  // On crée un schéma de validation
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

  // Vérifier si un régime avec le même nom existe (même soft-deleted)
  const existingDiet = await Diet.findOne({
    where: { name },
    paranoid: false // Inclut les régimes supprimés
  });

  // Inutile car les régimes sont renommés à la suppression mais pas de soucis de le laisser.
  if (existingDiet) {
    if (existingDiet.deleted_at !== null) {
      // Restaurer le régime s'il était supprimé
      await existingDiet.restore();
      return res.status(200).json(existingDiet);
    }
    return res.status(409).json({ status: 409, message: "Conflit : Ce régime existe déjà" });
  }

  // On crée le régime
  const newDiet = await Diet.create({ name, color });
  
  res.status(201).json(newDiet);
}

/**
 * @description Mettre à jour un régime
 * @param {*} req l'id du régime à mettre à jour dans les params
 * @param {*} res code de status et le régime mis à jour
 * @returns {Object} le régime mis à jour
 */

export async function updateDiet(req, res) {
  // Récupérer l'ID du régime à mettre à jour
  const dietId = parseInt(req.params.id);
  // Récupérer le régime
  const dietToUpdate = await Diet.findByPk(dietId);

  // Vérifier si le régime existe
  if (!dietToUpdate) {
    return res.status(404).json({ error: "Oups, ce régime n'existe pas" });
  }
  
  // Récupérer le body
  const { name, color } = req.body;
  
  // Validation avec Joi
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).optional(),
    color: Joi.string().trim().pattern(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).optional(),
  });
  
  const { error, value } = schema.validate({ name, color });
  
  if (error) {
    return res.status(400).json({ error: `Erreur de validation: ${error}` });
  }
   
  // Vérifier l'unicité du nom seulement si le nom a changé
  if (typeof name === "string" && name !== dietToUpdate.name) {
    const dietNameIsExisting = await Diet.findOne({ 
      where: { name }, 
      paranoid: false // Inclut aussi les éléments supprimés
    });
  
    if (dietNameIsExisting) {
      return res.status(400).json("Ce nom de régime est déjà pris.");
    }
  }

  // Mise à jour des champs
  dietToUpdate.name = value.name || dietToUpdate.name;
  dietToUpdate.color = value.color || dietToUpdate.color;
  
  // Sauvegarder les modifications
  await dietToUpdate.save();
  
  return res.status(200).json(dietToUpdate);
}

/**
 * @description Supprimer un régime
 * @param {*} req l'id du régime à supprimer dans les params
 * @param {*} res un status 204
 * @returns {Object} un message de succès
 */

export async function deleteDiet (req, res) {
  // Récupérer l'ID du régime
  const dietId = parseInt(req.params.id);

  // Récupérer un régime en base de données
  const dietToDelete = await Diet.findByPk(dietId);
  
  // Si le régime n'existe pas, renvoyer une erreur 404
  if (!dietToDelete) {
    return res.status(404).json({ error: "Oups, ce régime n'existe pas" });
  }
  
  // On renomme le régime qui vient d'être supprimé
  dietToDelete.name = `dietDeleteNumber${dietToDelete.id}`;
  dietToDelete.save();
  
  // Et on le supprime en SOFT DELETE
  dietToDelete.destroy();
  
  return res.status(204).json("régime supprimé");
}