import Joi from 'joi';
import { Recipe, Ingredient, Diet, Movie, Category, Users, AssocIngredientRecipe } from "../models/index.js";

export async function getRecipes(req,res) {
  // On récupère toutes les recettes avec les ingrédients, les régimes,le film et la categorie
  const recipes = await Recipe.findAll({
    include: [{
      model: Ingredient,
      as: "Ingredients"
    }, {
      model: Diet,
      as: "Diets"
    }, {
      model: Movie,
      as: "movie"
    }, {
      model: Category,
      as: "category"
    }, {
      model: Users,
      as: "user",
      attributes: ['first_name'] // On ne récupère que le prénom de l'utilisateur, il servira a signé la recette
    }], order: [["title", "ASC"]],
    
  });
  // On revoit les recettes avec un status 200
  res.status(200).json(recipes);
}

export async function getDataForRecipes(req,res) {
  // On récupère toutes les catégories, les régimes et les ingrédients
  const diets = await Diet.findAll();
  const categories = await Category.findAll();
  const ingredients = await Ingredient.findAll();
  // Et on les envois en JSON
  res.status(200).json({diets, categories, ingredients});
}

export async function getOneRecipe(req,res) {
  // Récupérer l'ID de la recette et on la parse
  const recipeId = parseInt(req.params.id);
  
  // On récupe la recette en fonction de son ID et l'on inclut les information
  const recipe = await Recipe.findByPk(recipeId, {
    include: [{
      model: Ingredient,
      as: "Ingredients",
      through: {
        attributes: ['quantity', 'unit']
      }
    }, {
      model: Diet,
      as: "Diets"
    }, {
      model: Movie,
      as: "movie"
    }, {
      model: Category,
      as: "category"
    },
    {
      model: Users,
      as: "user",
      attributes: ['first_name'] // On ne récupère que le prénom de l'utilisateur, il servira a signé la recette
    }]
  });

  // Si pas de données => 404
  if (!recipe) {
    return res.status(404).json({ error: "Pas de recette trouvé, vérifier l'id." });
  }

  res.status(200).json(recipe);
}

export async function createRecipe(req,res) {
  // Récupérer le body
  const { title, description, duration, difficulty, instruction, image, movie_id, category_id, user_id, diets, ingredients } = req.body;
  // On crée un schema de validation
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required(),
    description: Joi.string().trim().required(),
    duration:Joi.number().integer(),
    difficulty: Joi.string().trim().valid("Facile", "Moyen", "Difficile").required(),
    instruction: Joi.string().trim().required(),
    image: Joi.string().uri().required(),
    movie_id: Joi.number().integer(),
    category_id: Joi.number().integer(),
    user_id: Joi.number().integer(),
    diets: Joi.array().items(Joi.number().integer()).optional(), // Liste des IDs de régimes alimentaires
    ingredients: Joi.array().items(
      Joi.object({
        ingredient_id: Joi.number().integer().required(),
        quantity: Joi.number().required(),
        unit: Joi.string().trim().allow(null)
      })).min(1).required()
  });

  // Confronter notre body sur le schéma
  const { error } = schema.validate({ title, description, duration, difficulty, instruction, image, movie_id, category_id, user_id, diets, ingredients });

  // Si une erreur de validation survient 
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Mis en commentaire car pas de contrainte d'unicité pour le titre, il peut y avoir plusieurs recettes du même titre
  // On verifie s'il n'y a pas de conflit de titre de recette
  // const test = await Recipe.findOne({where: { title} });  
  // if(test){ res.status(409).json({status: 409, message: "Conflit : Cette recette existe déjà"}); return; }

  // On crée la recette
  const newRecipe = await Recipe.create({
    title,
    description,
    duration,
    difficulty,
    instruction,
    image,
    movie_id,
    category_id,
    user_id,
  });

  // Vérifier que tous les ingrédients existent
  const ingredientId = ingredients.map(ing => ing.ingredient_id);
  const existingIngredients = await Ingredient.findAll({
    where: { id: ingredientId }
  });
  if (existingIngredients.length !== ingredientId.length) {
    return res.status(400).json({ error: "Un ou plusieurs ingrédients sont invalides." });
  }

  // Associer les ingrédients à la recette
  const ingredientAssociations = ingredients.map(ing => ({
    recipe_id: newRecipe.id,
    ingredient_id: ing.ingredient_id,
    quantity: ing.quantity,
    unit: ing.unit
  }));

  // On incorpore les ingredient dans le tableau d'association 
  //---> Conseil chatgpt : utilisé "bulk create" pour envoyer toutes les données d'un coup, 
  // ici plus efficace qu'un "create"
  await AssocIngredientRecipe.bulkCreate(ingredientAssociations);

  // 🔹 Vérifier et associer les régimes alimentaires (Diets) 🔹
  if (diets && diets.length > 0) {
    const existingDiet = await Diet.findAll({ where: { id: diets } });
    if (existingDiet.length !== diets.length) {
      return res.status(400).json({ error: "Un ou plusieurs régimes sont invalides." });
    }
    await newRecipe.setDiets(existingDiet); // Sequelize gère l'association automatiquement
  }

  // Récupérer la recette avec les ingrédients et régimes alimentaires
  const createdRecipe = await Recipe.findByPk(newRecipe.id, {
    include: [{
      model: Ingredient,
      as: "Ingredients",
      through: {
        attributes: ['quantity', 'unit']
      }
    }, {
      model: Diet,
      as: "Diets"
    }, {
      model: Movie,
      as: "movie"
    }, {
      model: Category,
      as: "category"
    },
    {
      model: Users,
      as: "user",
      attributes: ['first_name'] // On ne récupère que le prénom de l'utilisateur, il servira a signé la recette
    }],
  });

  return res.status(201).json(createdRecipe);
}

export async function updateRecipe(req,res) {
  // Récupérer l'ID de la recette à update
  const recipeId = parseInt(req.params.id);
  // Récupérer la recette en BDD
  const recipeToUpdate = await Recipe.findByPk(recipeId, {
    include: [
      { model: Ingredient, as: "Ingredients", through: { attributes: ['quantity', 'unit'] } },
      { model: Diet, as: "Diets", attributes: ["id", "name"] }]
  });

  // Si elle n'existe pas ==> 404
  if (!recipeToUpdate) {
    return res.status(404).json({ error: "Oups cette recette n'existe pas" });
  }

  // Récupèrer le body
  const body = req.body;

  // Créer le Schéma de validation
  const updateRecipeBodySchema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .optional(),
    description: Joi.string().trim().optional(),
    duration:Joi.number().integer().optional(),
    difficulty: Joi.string().trim().valid("Facile", "Moyen", "Difficile").optional(),
    instruction: Joi.string().trim().optional(),
    image: Joi.string().uri().optional(),
    movie_id: Joi.number().integer().optional(),
    category_id: Joi.number().integer().optional(),
    user_id: Joi.number().integer().optional(),
    diets: Joi.array().items(Joi.number().integer()).optional(), // Liste des IDs de régimes alimentaires,
    validated: Joi.boolean().optional(),
    ingredients: Joi.array().items(
      Joi.object({
        ingredient_id: Joi.number().integer().optional(),
        quantity: Joi.number().optional(),
        unit: Joi.string().trim().allow(null)
      })).min(1).optional()
  });

  // Valider le body
  const { error, value } = updateRecipeBodySchema.validate(body);

  // Si error => 400
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Procéder à l'update
  recipeToUpdate.title = value.title || recipeToUpdate.title;
  recipeToUpdate.description = value.description || recipeToUpdate.description;
  recipeToUpdate.duration = value.duration || recipeToUpdate.duration;
  recipeToUpdate.difficulty = value.difficulty || recipeToUpdate.difficulty;
  recipeToUpdate.instruction = value.instruction || recipeToUpdate.instruction;
  recipeToUpdate.image = value.image || recipeToUpdate.image;
  recipeToUpdate.movie_id = value.movie_id || recipeToUpdate.movie_id;
  recipeToUpdate.category_id = value.category_id || recipeToUpdate.category_id;
  recipeToUpdate.user_id = value.user_id || recipeToUpdate.user_id;
  recipeToUpdate.validated = value.validated ?? recipeToUpdate.validated;

  // Mettre à jour la recette
  await recipeToUpdate.save();

  // Mise à jour des ingrédients
  if (value.ingredients) {
    const existingIngredients = await AssocIngredientRecipe.findAll({
      where: { recipe_id: recipeId },
    });

    const incomingIngredientIds = value.ingredients.map((ing) => ing.ingredient_id);
    const existingIngredientIds = existingIngredients.map((ing) => ing.ingredient_id);

    // Supprimer les ingrédients qui ne sont plus dans la liste
    const ingredientsToDelete = existingIngredientIds.filter(
      (id) => !incomingIngredientIds.includes(id)
    );
    await AssocIngredientRecipe.destroy({
      where: {
        recipe_id: recipeId,
        ingredient_id: ingredientsToDelete,
      },
    });

    // Mettre à jour ou ajouter les nouveaux ingrédients
    for (const ingredient of value.ingredients) {
      const existingIngredient = await AssocIngredientRecipe.findOne({
        where: { recipe_id: recipeId, ingredient_id: ingredient.ingredient_id },
      });

      if (existingIngredient) {
        await existingIngredient.update({
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        });
      } else {
        await AssocIngredientRecipe.create({
          recipe_id: recipeId,
          ingredient_id: ingredient.ingredient_id,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        });
      }
    }
  }
 
  // Mettre à jour les régimes alimentaires (Diets)
  if (value.diets) {
    await recipeToUpdate.setDiets(value.diets);
  }

  // Renvoyer la recette mise à jour avec les nouvelles relations
  const updatedRecipe = await Recipe.findByPk(recipeId, {
    include: [
      {
        model: Ingredient,
        as: "Ingredients",
        through: {
          attributes: ['quantity', 'unit']
        }
      }, {
        model: Diet,
        as: "Diets"
      }, {
        model: Movie,
        as: "movie"
      }, {
        model: Category,
        as: "category"
      },
      {
        model: Users,
        as: "user",
        attributes: ['first_name'] // On ne récupère que le prénom de l'utilisateur, il servira a signé la recette
      }
    ],
  });

  // Répondre à l'utilisateur avec les données de la recette modifiée
  return res.status(200).json(updatedRecipe);
}

export async function validateRecipe(req,res) {
  // Récupérer l'ID de la recette
  const recipeId = parseInt(req.params.id);

  // Récupérer la recette en base de données
  const recipeToUpdate = await Recipe.findByPk(recipeId);

  // Si la recette n'existe pas, renvoyer une erreur 404
  if (!recipeToUpdate) {
    return res.status(404).json({ error: "Oups, cette recette n'existe pas" });
  }

  // Récupérer la valeur du champ validated
  const { validated } = req.body;

  // Définir le schéma de validation
  const updateRecipeBodySchema = Joi.object({
    validated: Joi.boolean().required(),
  });

  // Valider la donnée
  const { error, value } = updateRecipeBodySchema.validate({ validated });

  // En cas d'erreur de validation, renvoyer une erreur 400
  if (error) {
    return res.status(400).json({ error: `Erreur de validation: ${error.details.map(err => err.message).join(', ')}` });
  }

  // Mettre à jour le statut de validation s'il est différent de celui d'origine
  if( recipeToUpdate.validated !== value.validated ){
    recipeToUpdate.validated = value.validated;
    // Sauvegarder les modifications
    await recipeToUpdate.save();
    // Répondre à l'admin avec un message de confirmation
    if (validated){
      return res.status(200).json({ message: "Recette validée avec succès" });
    } else return res.status(200).json({ message: "Recette retirée avec succès" });
  } return res.status(200).json({ message: "Aucune modification apporté" });
}

export async function deleteRecipes(req,res){
  // Récupérer l'ID de la recette
  const recipeId = parseInt(req.params.id);

  // Récupérer la recette en base de données
  const recipeToDelete = await Recipe.findByPk(recipeId);

  // Si la recette n'existe pas, renvoyer une erreur 404
  if (!recipeToDelete) {
    return res.status(404).json({ error: "Oups, cette recette n'existe pas" });
  }

  // On renomme la categorie qui vient d'etre supprimée ---> Pas obligatoire car pas de contrainte d'unicité dans le titre de la recette
  recipeToDelete.title = `recipeDeleteNumber${recipeToDelete.id}`;
  recipeToDelete.save();
  // Et l'on supprime en soft delete
  recipeToDelete.destroy(); // Avec Sequelize en soft delete

  return res.status(204).json("recette supprimé");
}

// On fait une fonction pour tester de restaurer le soft delete
// export async function testRestoreBranch(req,res){
//  await Recipe.restore({ where: { id: 13 } });
//  const recipeToUpdate = await Recipe.findByPk(13);
//  return res.status(200).json({ recipeToUpdate });
// }