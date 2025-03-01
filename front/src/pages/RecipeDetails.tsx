import "./style/RecipeDetails.css";
import { useEffect, useState } from "react";
import { getOneRecipe } from "../services/api-recipe";
import { useNavigate, useParams } from "react-router";
import { useVar } from "../contexts/var.context.ts";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import Category from "../components/Category/Category.tsx";
import Diet from "../components/Diet/Diet.tsx";
import PortionIngredients from "../components/PortionIngredients/PortionIngredients.tsx";
import { useQuery } from "@tanstack/react-query";
import { IRecipe } from '../@types/index';

export default function RecipeDetails () {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
  const [instructionSplit, setInstructionSplit] = useState<string[]>([]);
  
  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  const params = useParams();
  const navigate = useNavigate(); 

  // Utilisation de React Query pour gérer la requête
  const { data: recipe, isLoading, error } = useQuery<IRecipe>({
    queryKey: ["recipe", params.id],
    queryFn: () => getOneRecipe(Number(params.id)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });

  useEffect(() => {
    if (!isLoading && recipe && !recipe.validated)
      navigate("/404");

    const instructions = recipe?.instruction.split("§").filter(instr => instr.trim() !== "");
    if(instructions)
      setInstructionSplit(instructions)
  }, [recipe, setInstructionSplit, isLoading, navigate]);


  return (
  <>

    <div className="section">
  {/* Gestion du chargement */}
  {isLoading && <p className="loading_message">Chargement de la recette. Votre séance va commencer...</p>}
  
  {/* Gestion des erreurs */}
  {error && <p className="error_message">Impossible de charger la recette. Veuillez réessayer plus tard.</p>}
  
  {/* Affichage des recettes si elles sont disponibles */}
  {recipe && (
      <div className="recipe_detail">
        <div className="recipe_detail_header">
          <h3 className="recipe_detail_title">- {recipe?.movie.title} -</h3>  
          <h2 className="recipe_detail_title">{recipe?.title}</h2>
          <div className="article_recipe_card_catdiet">
          {recipe && <Category category={recipe.category} />}
          { recipe && recipe.Diets && recipe.Diets.map((diet) => (
          <Diet key={diet.id} diet={diet} />
          ))}
        </div>
        {recipe?.user.first_name? <p className="recipe_detail_realisateur">Réalisateur : {recipe?.user.first_name}</p> 
        :  <p className="recipe_detail_realisateur"> Réalisateur : Anonyme </p>}
      </div>  

      <img className="recipe_detail_img" src={recipe?.image} alt={`Photo du plat ${recipe?.title}`} />

      <div className="recipe_detail_resume">
        <h3 className="recipe_detail_h3">Synopsis</h3>
        <p className="recipe_detail_description">{recipe?.description} </p>
        <h3 className="recipe_detail_h3">Casting</h3>
        {recipe && <PortionIngredients recipe={recipe}/>}
      </div>

    <div className="recipe_detail_scenario">
      <h3 className="recipe_detail_h3">Scénario</h3>
      <ul className="recipe_detail_instructions">
        {instructionSplit?.map((instruction) =>
           <li className="recipe_detail_instruction" key={instructionSplit.indexOf(instruction)+1}>
            <span className="recipe_detail_scene">Scène {instructionSplit.indexOf(instruction)+1} </span>
            : {instruction}</li>)}
      </ul>
      </div>
    </div>
  )}      
    { recipe && <MovieDetails recipe={recipe}/> }

    </div>
    </>
  )
}
