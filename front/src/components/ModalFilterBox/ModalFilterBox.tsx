import "./ModalFilterBox.css"
import { ChangeEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "../../contexts/modal.context";
import { useVar } from "../../contexts/var.context";
import CloseButton from "../Button/CloseButton/CloseButton";
import CancelButton from "../Button/CancelButton/CancelButton";
import ValidateButton from "../Button/ValidateButton/ValidateButton";

export default function ModalFilterBox ({ applyFilters }: ModalFilterBoxProps) {
  // REF
  const dialogRef = useRef<HTMLDialogElement>(null);
  const SearchBarIngredients = useRef<HTMLDivElement>(null); // Création de la ref pour l'input searchBarIngredients
  const searchInputRef = useRef<HTMLInputElement>(null);
  // VAR
  const { diets, categories, ingredients, isLoading, error } = useVar()
  // MODAL
  const { isModalFilterOpen, setIsModalFilterOpen } = useModal();
  // STATE
  const [checkedValues, setCheckedValues] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientSelected, setIngredientSelected] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Partie Ouverture / Fermeture de Modal
  useEffect(() => {
    if (dialogRef.current && isModalFilterOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current && !isModalFilterOpen) {
      dialogRef.current.close();
    }
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalFilterOpen]);

  const handleClose = () => {
    setIsModalFilterOpen(false);
  };

  const handleReset = () => {
    setCheckedValues({}); // Réinitialise les checkboxes
    setIngredientSelected(null); // Réinitialise l'ingrédient sélectionné
    setSearchTerm("")
    applyFilters([], [], []);
    handleClose();
  };

  // Partie Filtrage par catégorie
  useEffect(() => {
    const initialCheckedValues: { [key: string]: boolean } = {};
  
    categories.forEach(cat => {
      initialCheckedValues[cat.name] = false; // ou une valeur par défaut
    });
  
    diets.forEach(diet => {
      initialCheckedValues[diet.name] = false;
    });
  
    setCheckedValues(initialCheckedValues);
  }, [categories, diets]); // Exécuter seulement quand les données sont chargées

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
  
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked, // Met à jour la valeur associée à l'input coché/décoché
    }));
  };
  
  // Partie SearchBar Ingredient
  // Gestion du changement de l'input de recherche
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  // Reinitialise le filtre si le searchTerm est vide
  useEffect(() => {
    if (!searchTerm) {
      setIngredientSelected(null);
    }
  }, [searchTerm]);

 // Filtrage des suggestions d'ingrédients
 const filteredIngredients = useMemo(() => // Use memo est un conseil Chat GPT, sinon l'index se reinitialisait a chaque fois que j'utilisait les fleches
  ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ingredientSelected !== ingredient.name
  ).slice(0, 5),
  [ingredients, searchTerm, ingredientSelected]
);

const handleIngredientSelection = (ingredientName: string) => {
  setIngredientSelected(ingredientName);
  setSearchTerm(ingredientName); // Met à jour la barre de recherche avec l'ingrédient sélectionné
};

// Partie application des filtres dans le composant parents
const handleApplyFilters = () => {
  const selectedCategories = categories
    .filter(cat => checkedValues[cat.name])
    .map(cat => cat.name);

  const selectedDiets = diets
    .filter(diet => checkedValues[diet.name])
    .map(diet => diet.name);

  const selectedIngredient = ingredientSelected ? [ingredientSelected] : [];
      
  applyFilters(selectedCategories, selectedDiets, selectedIngredient);
  handleClose();
};

  // Gestion des touches clavier pour la selection d'ingredients 
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredIngredients.length === 0) return;
  
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredIngredients.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredIngredients.length - 1
      );
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault(); // ⚠️ Empêche la soumission du formulaire !
      handleIngredientSelection(filteredIngredients[selectedIndex].name);
      setSelectedIndex(-1); // Réinitialisation après sélection
    }
  };
  
  // Reset l'index si la liste d'ingrédients change
  useEffect(() => {
    if (filteredIngredients.length === 0) {
      setSelectedIndex(-1);
    }
  }, [filteredIngredients]);

  return (
    // Modale pour sélectionner les filtres que l'on souhaite appliquer à l'affichage des recettes
    <dialog className="modal-filter" ref={dialogRef}>
          <CloseButton onClose={handleClose}/> 

    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement des Regimes, ingrédients et catégories.</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger les Regimes, ingrédients et catégories. Veuillez réessayer plus tard.</p>}
    
    {/* Affichage des recettes si elles sont disponibles */}
    {diets && categories && ingredients && (
        <form className="modal-form-filter" onSubmit={(e) => e.preventDefault()} noValidate>
        {/* Filtre de Categorie */}
        <div className="modal-cat-filter">
        <h2 className="modal-title-filter">Catégorie</h2>
        <ul>
        {categories.map(cat => (
            <li key={cat.id}>   
            <input
              type="checkbox"
              id={cat.name}
              name={cat.name}
              checked={checkedValues[cat.name] || false} // Evite undefined
              onChange={handleCheckboxChange} // Ajout du gestionnaire onChange
            />
            <label htmlFor={cat.name}>{cat.name}</label>
          </li>
          ))}
         
        </ul>
      </div>
      {/* Filtre de Regime */}
      <div className="modal-diet-filter">
        <h2 className="modal-title-filter">Régime alimentaire</h2>
        <ul>
        {diets.map(diet => (
            <li key={diet.id}>   
            <input
              type="checkbox"
              id={diet.name}
              name={diet.name}
              checked={checkedValues[diet.name] || false} // Evite undefined
              onChange={handleCheckboxChange} // Ajout du gestionnaire onChange
            />
            <label htmlFor={diet.name}>{diet.name}</label>
          </li>
          ))}
        </ul>
        {/* SearchBar d'ingredient */}
        <div ref={SearchBarIngredients}>
        <input
          ref={searchInputRef}
          type="text"
          name="SearchTerm"
          placeholder="Allergies Alimentaire"
          className="filter_searchbar"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Gère les touches du clavier
        />
        {searchTerm && filteredIngredients.length > 0 && (
          <ul className="results">
            {filteredIngredients.map((ingredient, index) => (
              <li
                key={ingredient.id}
                className={`result ${index === selectedIndex ? "selected" : ""}`} 
                onMouseEnter={() => setSelectedIndex(index)} // Survol souris => sélection
                onClick={() => handleIngredientSelection(ingredient.name)}
              >
                {ingredient.name}
              </li>
            ))}
          </ul>
        )}

        <div className="modal-button-container-filter">
          <ValidateButton  onClick={handleApplyFilters} text="Valider"/>
          <CancelButton  onClick={handleReset} text="Reset"/>
        </div>
       </div>
      </div>
      </form>
    )}
    </dialog>
);
}

interface ModalFilterBoxProps { applyFilters: (selectedCategories: string[], selectedDiets: string[], selectedIngredient:string[]) => void }