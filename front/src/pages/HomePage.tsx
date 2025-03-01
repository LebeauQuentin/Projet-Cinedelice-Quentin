import "./style/HomePage.css"
import { useVar } from "../contexts/var.context";
import {Link} from "react-router";
import { useEffect } from "react";
import ReactSimplyCarouselExample from "../components/Carroussel/Carroussel";
import ValidateButton from "../components/Button/ValidateButton/ValidateButton";


export default function HomePage() {
  // Définition du logo (O'clock Présente sur HomePage / Cinedelices sur les autres)
  const { setHeaderLogo } = useVar()
 useEffect(() => {
    setHeaderLogo("O'clock Présente");
  }, [setHeaderLogo]);

  // Utilisation de React Query pour gérer la requête
  const { recipes, isLoading, error } = useVar();

  const lastRecipes = recipes
  .filter(recipe => recipe.validated) // Ne garde que les recettes validées
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) // Trie par date décroissante
  .slice(0, 6); // Prend les 6 premiers éléments

  return (
    <div className="homepage">
      <div className="title_cinedelice">
        <h1 className="title_cinedelice_h1">CineDelices</h1>
        </div>
      
      <section className="section section_description">
        <div className="section_description_high">
          <h2 className="homepage_h2">- Description -</h2>
          <p className="description_p">"Ciné Délices" est un projet de site web mettant en avant des recettes inspirées de films. Chaque recette sera accompagnée d'une référence à l'œuvre cinématographique dont elle est issue, permettant aux utilisateurs de découvrir et de reproduire des plats emblématiques du cinéma.</p>
        </div>
        <div className="section_description_down">  
          <Link to= "/recipes" >
            <ValidateButton text="Nos recettes" />
          </Link>
          <img className="homepage_img_recipe" src="/images/ratatouille-affiche.webp" alt="image de recette" />
          </div>
      </section>

      {isLoading && <p className="loading_message">Chargement de la page. Votre séance va commencer...</p>}
      {error && <p className="error_message">Impossible de charger la page. Veuillez réessayer plus tard.</p>}
      {/* Affichage des recettes si elles sont disponibles */}
      {recipes && (            
        <section className="section section_news">
          <h2 className="homepage_h2">- A l'affiche -</h2>
            {lastRecipes?.length && lastRecipes?.length > 0 && 
            <ReactSimplyCarouselExample lastRecipes={lastRecipes}></ReactSimplyCarouselExample>}
        </section>
        )}  
      </div>
  
  )    
}