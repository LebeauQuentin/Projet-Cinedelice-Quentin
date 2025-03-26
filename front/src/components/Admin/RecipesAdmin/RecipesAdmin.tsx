import "./RecipesAdmin.css";
import { IRecipe } from "../../../@types";
import { DashboardAdminVue } from "../../../@types";
import { useVar } from "../../../contexts/var.context";

export default function RecipesAdmin({setSelectedRecipeId, setCurrentView}: RecipeAdminProps) {

  const { recipes, isLoading, error } = useVar();
    // Test simulation de chargement des données pour tester le message fourni par Tanstak
    /*const getAllRecipes = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Donnée 1", "Donnée 2", "Donnée 3"]);
        }, 2000); // Simule un délai de 2 secondes
      });
    }; 
    */
 
  function onRecipeClick(recipeId: number) {
    setSelectedRecipeId(recipeId);
    setCurrentView(DashboardAdminVue.RECIPES_FORM);
  }
  return (
    <div className="recipes_admin_container">
      {/* Gestion du chargement */}
      {isLoading && <p className="loading_message">Chargement des recettes. Votre séance va commencer...</p>}

      {/* Gestion des erreurs */}
      {error && <p className="error_message">Impossible de charger les recettes. Veuillez réessayer plus tard.</p>}

      {/* Affichage des recettes si elles sont disponibles */}
      {recipes && (
        <ul>
          {
            recipes.map((recipe) => (
              <li key={recipe.id} className="recipe_admin_item" data-recipe-id={recipe.id} onClick={() => onRecipeClick(recipe.id)}> 
                  <div className="recipe_admin_item_title">
                    <p>{recipe.title}</p>
                  </div>
                <div className={`recipe_admin_item_checked ${recipe.validated ? "recipe_admin_item_checked_valid" : "recipe_admin_item_checked_invalid"}`}></div>
              </li>
              )
            )
          }
        </ul>)}
    </div>
  );
}

interface RecipeAdminProps {
  recipes: IRecipe[];
  setSelectedRecipeId: (recipeId: number) => void;
  setCurrentView: (view: DashboardAdminVue) => void;
}
