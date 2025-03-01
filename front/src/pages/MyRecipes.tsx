import { Link } from "react-router";
import RecipeCardMod from "../components/RecipeCardMod/RecipeCardMod";
import "./style/MyRecipes.css";
import { useVar } from "../contexts/var.context";
import { useAuthVerification } from "../utils/utils.authVerification";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth.context";


export default function MyRecipes() {
  const {user} = useAuth();
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo, recipes, isLoading, error } = useVar()

  useEffect(() => {
    setHeaderLogo("CineDelices");
  }, [setHeaderLogo]);

  // Vérification de l'authentification de l'utilisateur
  useAuthVerification("user");

  return (

    <>
      {/* Gestion du chargement */}
      {isLoading && <p className="loading_message">Chargement de vos recettes. Votre séance va commencer...</p>}
      
      {/* Gestion des erreurs */}
      {error && <p className="error_message">Impossible de charger vos recettes. Veuillez réessayer plus tard.</p>}
      
      {/* Affichage des recettes si elles sont disponibles */}
      {recipes && (
      <div className="section section_my_recipes">


        <h2>Gérer mes recettes</h2>
        <div>
          <ul className="all_my_recipes">
            { recipes.map((recipe) => (
                recipe.user_id === user?.id && (
                  <li key={recipe.id}>
                    <RecipeCardMod recipe={recipe}/>
                  </li>
                )
              ))
            }
            <li>
              <Link to="/createRecipe">
                <button className="create_recipe_button">
                  <img className="create_recipe_button_image" src="/icones/add-recipes.png" alt="Créer une recette" />
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>)}
    </>
  );
}

