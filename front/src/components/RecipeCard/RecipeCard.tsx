import Diet from "../Diet/Diet";
import Category from "../Category/Category";
import { IRecipe } from "../../@types";
import "./RecipeCard.css"

export default function RecipeCard({ recipe }: RecipeCardProps) {
  if (!recipe) {
    return <p>Erreur : la recette est introuvable.</p>;
  }

  // Changer l'image avec une version plus light pour la miniature (Démarche Eco-responsable)
  function recipeImage(image: string) { 
    return image.replace("_normal", "_light") }

  return (
    <>
      <article className="article_recipe_card">
        <h4>{recipe?.title || "Titre inconnu"}</h4>

        <div className="article_recipe_card_catdiet">
          {recipe?.category ? <Category category={recipe.category} /> : <p>Catégorie inconnue</p>}
          
          {recipe?.Diets?.slice(0, 2).map(diet => (
            <Diet key={diet.id} diet={diet} />
          ))}
          {recipe.Diets && recipe.Diets.length > 3 && <div className="li_more">...</div>}
        </div>

        {recipe?.image ? (
          <img src={recipeImage(recipe.image)} alt={recipe?.title} className="article_recipe_card_image" />
        ) : (
          <p>Pas d'image disponible</p>
        )}

        <p>
          <strong>{recipe?.difficulty || "Difficulté inconnue"}</strong> {recipe?.duration || "??"} min
        </p>

        <h3>{recipe?.movie?.title || "Film inconnu"}</h3>
      </article>
    </>
  );
}

interface RecipeCardProps {
  recipe: IRecipe;
}
