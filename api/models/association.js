import { Recipe } from "./Recipe.js";
import { Ingredient } from "./Ingredient.js";
import { Movie } from "./Movie.js";
import { Category } from "./Category.js";
import { Users } from "./Users.js";
import { AssocIngredientRecipe } from "./AssocIngredientRecipe.js";
import { Diet } from "./Diet.js";

/**
 * Association entre Recipe et Ingredient
 * recipe_ingredient_assignation
 * recipe peut avoir plusieurs ingredients
 * ingredient peut être dans plusieurs recipes
 * Many to Many
 */
Recipe.belongsToMany(Ingredient, {
  through: "recipe_ingredient_assignation",
  foreignKey: "recipe_id",
  otherKey: "ingredient_id",
  as: "Ingredients"
});


Ingredient.belongsToMany(Recipe, {
  through: "recipe_ingredient_assignation",
  foreignKey: "ingredient_id",
  otherKey: "recipe_id",
  as: "Recipes"
});


/**
 * Association entre Recipe et Diet
 * recipe_diet_assignation
 * recipe peut avoir plusieurs diets
 * diet peut être dans plusieurs recipes
 * Many to Many
 */

Recipe.belongsToMany(Diet, {
  through: "recipe_diet_assignation",
  foreignKey: "recipe_id",
  otherKey: "diet_id",
  as: "Diets"
});


Diet.belongsToMany(Recipe, {
  through: "recipe_diet_assignation",
  foreignKey: "diet_id",
  otherKey: "recipe_id",
  as: "Recipes"
});


/**
 * Association entre Recipe et Movie
 * recipe peut avoir un movie
 * movie peut être dans plusieurs recipes
 * One to Many
 */

Recipe.belongsTo(Movie, {
  foreignKey: "movie_id",
  as: "movie"
});

Movie.hasMany(Recipe, {
  foreignKey: "movie_id",
  as: "Recipes"
});

/**
 * Association entre Recipe et Category
 * recipe peut avoir une category
 * category peut être dans plusieurs recipes
 * One to Many
 */

Recipe.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category"
});

Category.hasMany(Recipe, {
  foreignKey: "category_id",
  as: "Recipes"
});

/**
 * Association entre Recipe et Users
 * recipe peut avoir un user
 * user peut avoir plusieurs recipes
 * One to Many
 */ 

Recipe.belongsTo(Users, {
  foreignKey: "user_id",
  as: "user"
});

Users.hasMany(Recipe, {
  foreignKey: "user_id",
  as: "Recipes"
});

/**
 * Association entre Recipe et AssocIngredientRecipe
 * recipe peut avoir plusieurs ingredients
 * ingredient peut être dans plusieurs recipes
 * Many to Many a voir
 */ 

Recipe.hasMany(AssocIngredientRecipe, { 
  foreignKey: "recipe_id",
  as: "ingredients"
});

AssocIngredientRecipe.belongsTo(Recipe, {
  foreignKey: "recipe_id",
  as: "recipes"
});

// A voir pour la partie du dessus avec AssocIngredientRecipe, je ne suis pas sur que c'est bon!

export { Recipe, Ingredient, Movie, Category, Users, AssocIngredientRecipe, Diet };