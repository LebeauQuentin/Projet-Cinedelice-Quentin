import "./SearchBar.css"
import { useVar } from "../../contexts/var.context";
import { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IRecipe } from "../../@types";
import { useModal } from "../../contexts/modal.context";
import ValidateButton from "../Button/ValidateButton/ValidateButton";

export default function SearchBar ({ setRecipesDisplay } : SearchBarProps) {
  const { recipes, isLoading, error } = useVar();
  const { setIsModalFilterOpen } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const inputSearchTerm = useRef<HTMLInputElement>(null); // Création de la ref pour mettre l'input en Focus

  // Gestion du changement de l'input de recherche
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  // Mettre le focus sur l'input au premier rendu
  useEffect(() => {
    if (inputSearchTerm.current) {
      inputSearchTerm.current.focus();
    }
  }, []);
  
  
  // Filtrage des recettes en fonction du terme de recherche
  useEffect(() => {
    const filteredRecipes = recipes
    .filter((recipe) => recipe.validated) // Exclure les recettes non validées
    .filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setRecipesDisplay(filteredRecipes);
  }, [searchTerm, recipes, setRecipesDisplay]);

  return (
    <>
    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement des Recettes.</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger les Recettes. Veuillez réessayer plus tard.</p>}
    
    {/* Affichage des recettes si elles sont disponibles */}
    {recipes && (
    <div className="recipes_research">
      <form className="form_research_recipe" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputSearchTerm} 
          type="text"
          name="SearchTerm"
          placeholder="Recherche recette/film"
          className="recipes_searchbar"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </form>
      <ValidateButton onClick={() => setIsModalFilterOpen(true)} text="Filtrer"/>
    </div>
    )}
    </>
  );
}

interface SearchBarProps {
  setRecipesDisplay: Dispatch<SetStateAction<IRecipe[]>>;
}