import Joi from 'joi';
import { Recipe, Ingredient } from "../models/index.js";

export async function getIngredients(req,res) {
  // On récupère toutes les recettes avec les ingrédients par ordre alphabetique
  const ingredients = await Ingredient.findAll({
    order: [["name", "ASC"]],
  });
  // On revoit les ingredients avec un status 200
  res.status(200).json(ingredients);
}

export async function getOneIngredient(req,res) {
  // Récupérer l'ID de l'ingredient et on la parse
  const ingredientId = parseInt(req.params.id);
  
  // On récupe l'ingredient' en fonction de son ID et l'on inclut les recettes auxquel il est associé
  const ingredient = await Ingredient.findByPk(ingredientId, {
    include: {
      model: Recipe,
      as: "Recipes",
      through: { attributes: [] },  //Permet d'éviter de récupérer les données de la table pivot
    },
  });

  // Si pas de données => 404
  if (!ingredient) {
    return res.status(404).json({ error: "Pas d'ingredient' trouvé, vérifier l'id." });
  }

  res.status(200).json(ingredient);
}

export async function createIngredient(req,res) {
  // Récupérer le body
  const { name } = req.body;

  // On crée un schema de validation
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required(),
  });

  // Confronter notre body sur le schéma
  const { error } = schema.validate({ name });

  // Si une erreur de validation survient 
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Vérifier si un ingredient avec le même nom existe (même soft-deleted)
  const existingIngredient = await Ingredient.findOne({
    where: { name },
    paranoid: false // Inclut les régimes supprimés
  });
  if (existingIngredient) {
    if (existingIngredient.deleted_at !== null) {
      // Restaurer le régime s'il était supprimé
      await existingIngredient.restore();
      return res.status(200).json({ ingredient: existingIngredient });
    }
    return res.status(409).json({ status: 409, message: "Conflit : Cet ingredient existe déjà" });
  }

  // On crée l'ingredient
  const newIngredient = await Ingredient.create({
    name,
  });

  // Récupérer l'ingredient qui vient d'être créé
  const createdIngredient = await Ingredient.findByPk(newIngredient.id);

  // Et on le renvoit avec un code succes 201
  return res.status(201).json(createdIngredient);
}

export async function updateIngredient(req,res) {
  // Récupérer l'ID de la carte à update
  const ingredientId = parseInt(req.params.id);

  // Récupérer l'ingredient ciblé en BDD
  const ingredientToUpdate = await Ingredient.findByPk(ingredientId);

  // Si elle n'existe pas ==> 404
  if (!ingredientToUpdate) {
    return res.status(404).json({ error: "Oups cet ingredient n'existe pas" });
  }

  // Récupèrer le body
  const body = req.body;

  // Créer le Schéma de validation
  const updateIngredientBodySchema = Joi.object({
    name: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required(),
  });

  // Valider le body
  const { error, value } = updateIngredientBodySchema.validate(body);

  // Si error => 400
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Procéder à l'update
  ingredientToUpdate.name = value.name || ingredientToUpdate.name;

  // Mettre à jour l'ingredient et renvoyer la recette mise à jour avec les nouvelles relations
  const updatedIngredient = await ingredientToUpdate.save();

  // Répondre à l'utilisateur avec les données de la carte modifiée
  return res.status(200).json(updatedIngredient);
}

export async function deleteIngredient(req,res){
  // Récupérer l'ID de la recette
  const ingredientId = parseInt(req.params.id);

  // Récupérer la recette en base de données
  const ingredientToDelete = await Ingredient.findByPk(ingredientId);

  // Si la recette n'existe pas, renvoyer une erreur 404
  if (!ingredientToDelete) {
    return res.status(404).json({ error: "Oups, cette ingredient n'existe pas" });
  }

  // On renomme l'ingredient qui vient d'être supprimé
  ingredientToDelete.name = `ingredientDeleteNumber${ingredientToDelete.id}`;
  ingredientToDelete.save();
  
  ingredientToDelete.destroy(); // Avec Sequelize en soft delete

  return res.status(204).json("ingredient supprimé");
}

// On fait une fonction pour tester de restaurer le soft delete
// export async function testRestoreBranch(req,res){
//  await Ingredient.restore({ where: { id: 13 } });
//  const ingredientToUpdate = await Ingredient.findByPk(13);
//  return res.status(200).json({ ingredientToUpdate });
// }


