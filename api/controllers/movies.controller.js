import Joi from 'joi';
import { Movie } from "../models/index.js";

export async function getMovies(req,res) {
  // On récupère tous les movies et on tri dans l'ordre croissant
  const movies = await Movie.findAll({
    order: [["title", "ASC"]],
  });
  // On revoit les movies avec un status 200
  res.status(200).json(movies);
}

export async function getOneMovie(req,res) {
  // Récupérer l'ID du movie et on la parse
  const movieId = parseInt(req.params.id);
  
  // On récupe l'ingredient' en fonction de son ID et l'on inclut les recettes auxquel il est associé
  const movie = await Movie.findByPk(movieId);

  // Si pas de données => 404
  if (!movie) {
    return res.status(404).json({ error: "Le film est introuvable, vérifier l'id." });
  }

  res.status(200).json(movie);
}

export async function createMovie(req,res) {
  // Récupérer le body
  const { title, description, director, actors, year, image, funfact, category } = req.body;

  // On crée un schema de validation
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(3)
      .max(30)
      .required(),
    description: Joi.string().trim(),
    director: Joi.string().trim(),
    actors: Joi.string().trim(),
    year: Joi.number().integer(),
    image: Joi.string().uri(),
    funfact: Joi.string().trim(),
    category: Joi.string().trim()
    
  });

  // Confronter notre body sur le schéma
  const { error } = schema.validate({ title, description, director, actors, year, image, funfact, category });

  // Si une erreur de validation survient 
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Vérifier si un ingredient avec le même title existe (même soft-deleted)
  const existingMovie = await Movie.findOne({
    where: { title },
    paranoid: false // Inclut les régimes supprimés
  });
  if (existingMovie) {
    if (existingMovie.deleted_at !== null) {
      // Restaurer le film s'il était supprimé
      await existingMovie.restore();
      return res.status(200).json({ movie: existingMovie });
    }
    return res.status(409).json({ status: 409, message: "Conflit : Ce film existe déjà" });
  }

  // On crée l'ingredient
  const newMovie = await Movie.create({
    title, description, director, actors, year, image, funfact, category
  });

  // Récupérer l'ingredient qui vient d'être créé
  const createdMovie = await Movie.findByPk(newMovie.id);

  // Et on le renvoit avec un code succes 201
  return res.status(201).json(createdMovie);
}

export async function updateMovie(req,res) {
  // Récupérer l'ID du film à update
  const movieId = parseInt(req.params.id);

  // Récupérer le film ciblé en BDD
  const movieToUpdate = await Movie.findByPk(movieId);

  // S'il n'existe pas ==> 404
  if (!movieToUpdate) {
    return res.status(404).json({ error: "Oups ce chef d'oeuvre n'existe pas" });
  }

  // Récupèrer le body
  const body = req.body;

  // Créer le Schéma de validation
  const updateMovieBodySchema = Joi.object({
    title: Joi.string()
      .trim()
      .min(1)
      .max(30)
      .required(),
    description: Joi.string().trim(),
    director: Joi.string().trim(),
    actors: Joi.string().trim(),
    year: Joi.number().integer(),
    image: Joi.string().uri(),
    funfact: Joi.string().trim(),
    category: Joi.string().trim()
    
  });

  // Valider le body
  const { error, value } = updateMovieBodySchema.validate(body);

  // Si error => 400
  if (error) {
    return res.status(400).json({ error: `erreur de validation: ${error}` });
  }

  // Procéder à l'update
  movieToUpdate.title = value.title || movieToUpdate.title;
  movieToUpdate.description = value.description || movieToUpdate.description;
  movieToUpdate.director = value.director || movieToUpdate.director;
  movieToUpdate.actors = value.actors || movieToUpdate.actors;
  movieToUpdate.year = value.year || movieToUpdate.year;
  movieToUpdate.image = value.image || movieToUpdate.image;
  movieToUpdate.funfact = value.funfact || movieToUpdate.funfact;
  movieToUpdate.category = value.category || movieToUpdate.category;

  // Mettre à jour l'ingredient et renvoyer la recette mise à jour avec les nouvelles relations
  const updatedMovie = await movieToUpdate.save();


  // Répondre à l'utilisateur avec les données de la carte modifiée
  return res.status(200).json(updatedMovie);
}


export async function deleteMovie(req,res){
  // Récupérer l'ID de la recette
  const movieId = parseInt(req.params.id);

  // Récupérer la recette en base de données
  const movieToDelete = await Movie.findByPk(movieId);

  // Si la recette n'existe pas, renvoyer une erreur 404
  if (!movieToDelete) {
    return res.status(404).json({ error: "Oups, ce chef d'oeuvre n'existe pas" });
  }

  // On renomme le régime qui vient d'être supprimé
  movieToDelete.name = `movieDeleteNumber${movieToDelete.id}`;
  movieToDelete.save();

  movieToDelete.destroy(); // Avec Sequelize en soft delete

  return res.status(204).json("Le film a bien été supprimé");
}

// On fait une fonction pour tester de restaurer le soft delete
// export async function testRestoreBranch(req,res){
//  await Ingredient.restore({ where: { id: 13 } });
//  const ingredientToUpdate = await Ingredient.findByPk(13);
//  return res.status(200).json({ ingredientToUpdate });
// }


