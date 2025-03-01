import "./style/Recipes.css"
import { useVar } from "../contexts/var.context";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import ModalFilterBox from "../components/ModalFilterBox/ModalFilterBox";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import SearchBar from "../components/SearchBar/SearchBar";

export default function Recipes () {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  // Utilisation de React Query pour gérer la requête
  const { recipes, isLoading, error } = useVar()

  const [recipesDisplay, setRecipesDisplay] = useState(recipes);
  const [catsAndDietsSelected, setcatsAndDietsSelected] = useState("");
  let filteredRecipes = recipes.filter(recipe => recipe.validated);

  // Fonction qui applique les filtres sélectionnés
  const applyFilters = (selectedCategories: string[], selectedDiets: string[], selectedIngredient:string[]) => {
   if (selectedCategories.length === 0 && selectedDiets.length === 0 && selectedIngredient.length === 0) {
     setRecipesDisplay(filteredRecipes); // Affiche toutes les recettes si rien n'est cochés
     setcatsAndDietsSelected("")
     return;
  }
  setcatsAndDietsSelected(`${selectedCategories} ${selectedDiets} ${selectedIngredient}`)
    filteredRecipes = filteredRecipes.filter(recipe => {
    // Vérification des catégories (logique OR)
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category?.name || "");
    // Vérification des régimes alimentaires (logique AND)
    const matchesDiets = 
      selectedDiets.length === 0 || 
      (recipe.Diets && selectedDiets.every(diet => recipe.Diets?.some(d => d.name === diet)));
    // Logique pour enlever les recettes contenant l'ingrédients sélectionner :
    const matchesIngredient = 
      selectedIngredient.length === 0 || 
      (recipe.Ingredients && selectedIngredient.every(ingredient => !recipe.Ingredients?.some(i => i.name === ingredient)));
    return matchesCategory && matchesDiets && matchesIngredient;
  });

  setRecipesDisplay(filteredRecipes);
};

// Message afficher en fonction des filtres
const nbRecipeDisplay = recipesDisplay.length
let textNbRecipesDisplay = ""
const filterRecipeDisplay = catsAndDietsSelected.replace(/,/g, ', ');
let textFilterRecipesDisplay = ""

  if (nbRecipeDisplay === 0) {
      textNbRecipesDisplay = "Il n'y a pas de recette trouvé, relancer la recherche ! "
  } else if (nbRecipeDisplay === recipes.length) {
      textNbRecipesDisplay = `Nombres de recettes : ${nbRecipeDisplay}`
    } else {
      textNbRecipesDisplay = `Nombre de recettes trouvés : ${nbRecipeDisplay}`
      }

  if (filterRecipeDisplay === "") {
      textFilterRecipesDisplay = ""
  } else if (catsAndDietsSelected.includes(',')) {
      textFilterRecipesDisplay = `Filtres : ${filterRecipeDisplay}`
    } else {
      textFilterRecipesDisplay = `Filtre : ${filterRecipeDisplay}`
      }

  return (
    <>

    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement des recettes. Votre séance va commencer...</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger les recettes. Veuillez réessayer plus tard.</p>}

    {/* Affichage des recettes si elles sont disponibles */}
    {recipes && (

    <div className="section section_all_recipes">
      <SearchBar setRecipesDisplay={setRecipesDisplay}/>
      <h2>- Les recettes -</h2>
      <p className="nb-recipe-display"> {textNbRecipesDisplay}</p>
      <p className="filter-recipe-display"> {textFilterRecipesDisplay} </p>
      <div>
        <ul className="all_recipes">
          {recipesDisplay.map(recipe => (
            <li key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <RecipeCard recipe={recipe}/> 
              </Link>
            </li>
          ))}   
        </ul>
      </div>
    </div>
    )}
    <ModalFilterBox applyFilters={applyFilters}/>
    </>
  )
}
