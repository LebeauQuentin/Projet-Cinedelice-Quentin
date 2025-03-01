import { useState } from "react";
import Diet from "../Diet/Diet";
import "./RecipeCardMod.css";
import { IRecipe } from "../../@types";
import Category from "../Category/Category";
import ModalDeleteBox from "../ModalDeleteBox/ModalDeleteBox";
import { deleteRecipe } from "../../services/api-recipe";
import { toast } from "react-toastify";
import { useVar } from "../../contexts/var.context";
import { Link } from "react-router";
import ValidateButton from "../Button/ValidateButton/ValidateButton";

export default function RecipeCardMod({ recipe }:RecipeCardModProps) {
  
  const { setUpdateTriggerRecipes } = useVar();
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ recipeId ] = useState<number>(recipe.id);

    // Changer l'image avec une version plus light pour la miniature (Démarche Eco-responsable)
    function recipeImage(image: string) { 
      return image.replace("_normal", "_light") }
  
  // gestion de la suppression d'une recette
  const handleDelete = async () => {
    const response = await deleteRecipe(recipeId);
    if (!response) {
      toast.error("Une erreur est survenue lors de la suppression de la recette");
    }
    toast.info("La recette a été supprimée avec succès");
    setUpdateTriggerRecipes(prev => !prev)
    setIsOpen(false);
  }
  return (
    <>
      <article className={`article_recipe_card_mod ${recipe.validated ? "recipe_card_mod_valid" : "recipe_card_mod_invalid"}`}>
        <h4 className="myrecipe_h4">{recipe.title}</h4>
        {/* Gestion de la validation de la recette */}
        <div className={`article_recipe_card_mod_validation ${recipe.validated ? "recipe_card_mod_validation_valid" : "recipe_card_mod_validation_invalid"}`} data-tooltip={recipe.validated ? "Recette validée" : "Recette non validée"}></div>
        {recipe.validated ?
        <Link to={`/recipes/${recipe.id}`}>
        <div className="article_recipe_card_catdiet_mod">
          <Category category={recipe.category} />
          {recipe.Diets?.slice(0, 2).map(diet => (
            <Diet key={diet.id} diet={diet} />
          ))}
          {recipe.Diets && recipe.Diets.length > 3 && <div className="li_more">...</div>}
        </div>

        <img src={recipeImage(recipe.image)} alt={recipe.title} className="article_recipe_card_image_mod"/>
        <p><strong>{recipe.difficulty}</strong> {recipe.duration} min</p>
        <h3 className="myrecipe_h3">{recipe.movie.title}</h3>
        </Link>
        : <> {/* Si la recette n'est pas valider on ne peut pas aller sur la page recipe detail  */}
        <div className="article_recipe_card_catdiet_mod article_recipe_card_catdiet_mod_notvalid">
        <Category category={recipe.category} />
        {recipe.Diets?.slice(0, 2).map(diet => (
          <Diet key={diet.id} diet={diet} />
        ))}
        {recipe.Diets && recipe.Diets.length > 3 && <div className="li_more">...</div>}
      </div>

      <img src={recipeImage(recipe.image)} alt={recipe.title} className="article_recipe_card_image_mod"/>
      <p><strong>{recipe.difficulty}</strong> {recipe.duration} min</p>
      <h3 className="myrecipe_h3">{recipe.movie.title}</h3>
      </>}
        <div className="recipe_card_mod_buttons">
          <Link to={`/updateRecipe/${recipe.id}`}>
            <ValidateButton text="Modifier" />
          </Link>
          <button className="recipe_card_mod_button_delete" onClick={() =>  {setIsOpen(true)}}>Supprimer</button>
        </div>
      </article>
      <ModalDeleteBox isOpen={isOpen} onClose={() => setIsOpen(false)} onDelete={() => {handleDelete()}} description={ `Voulez-vous vraiment supprimer la recette "${recipe.title}" ?`} title="Supprimer la recette" />
    </>
  );
}

interface RecipeCardModProps {
  recipe: IRecipe
}
