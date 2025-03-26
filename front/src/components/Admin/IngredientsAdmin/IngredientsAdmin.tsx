import "./IngredientsAdmin.css";
import { useVar } from "../../../contexts/var.context";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { IIngredients } from "../../../@types";
import { toast } from "react-toastify";
import { createIngredient, deleteIngredient, updateIngredient } from "../../../services/api-ingredient";
import ModalDeleteBox from "../../Modals/ModalDeleteBox/ModalDeleteBox";

export default function IngredientsAdmin() {
  const inputSearchTermIng = useRef<HTMLInputElement>(null);
  const { ingredients, setUpdateTriggerIngredients, isLoading, error } = useVar();
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientsDisplay, setIngredientsDisplay] = useState<IIngredients[]>([]);
  const [editedIngredients, setEditedIngredients] = useState<Record<number, string>>({});
  const [ingredientToDelete, setIngredientToDelete] = useState<IIngredients | null>(null);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

    // Test simulation de chargement des données
    /*const getAllIngredients = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Donnée 1", "Donnée 2", "Donnée 3"]);
        }, 2000); // Simule un délai de 2 secondes
      });
    }; */

  // ===== Partie CREATION Ingrédient =====
async function handleCreateIngredient(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();  

  // Récupération et formatage du nom
  const formData = new FormData(event.currentTarget);
  let ingredientName = (formData.get("name") as string).trim();
  if (!ingredientName) return toast.error("Le nom de l'ingrédient ne peut pas être vide.");

  ingredientName = ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1).toLowerCase();

  // Vérification de l'existence de l'ingrédient
  const ingredientExists = ingredients.some(
    (ing) => ing.name.toLowerCase() === ingredientName.toLowerCase()
  );

  if (ingredientExists) {
    return toast.error("Cet ingrédient existe déjà.");
  }

  try {
    const created = await createIngredient({ name: ingredientName });
    if (created) {
      toast.success("Ingrédient créé avec succès !");
      setUpdateTriggerIngredients((prev) => !prev);
    } else {
      toast.error("La création a échoué.");
    }
  } catch (err) {
    console.error("Erreur lors de la création :", err);
    toast.error("Une erreur est survenue lors de la création.");
  }
}
  // ===== Partie SEARCHBAR =====
  // Focus SearchBar
  useEffect(() => {
    if (inputSearchTermIng.current) {
      inputSearchTermIng.current.focus();
    }
  }, []);
  // Recherche
  useEffect(() => {
    const filteredIngredients = ingredients.filter(
      (ingredient) => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setIngredientsDisplay(filteredIngredients);
  }, [searchTerm, ingredients]);

  // Fonction d'écoute d'évenement dans la Searchbar
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  // ===== Partie UPDATE / DELETE =====
  // Fonction de modification de l'état en fonction de l'id
  const handleEditChange = (id: number, value: string) => {
    setEditedIngredients((prev) => ({ ...prev, [id]: value }));
  };
// ===== Partie UPDATE Ingrédient =====
const handleSubmit = async (e: React.FormEvent, ingredient: IIngredients) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  e.preventDefault();

  let updatedName = (editedIngredients[ingredient.id] || ingredient.name).trim();
  if (!updatedName) return toast.error("Le nom de l'ingrédient ne peut pas être vide.");

  updatedName = updatedName.charAt(0).toUpperCase() + updatedName.slice(1).toLowerCase();

  // Vérification de l'existence de l'ingrédient
  const ingredientExists = ingredients.some(
    (ing) => ing.id !== ingredient.id && ing.name.toLowerCase() === updatedName.toLowerCase()
  );

  if (ingredientExists) {
    return toast.error("Un ingrédient avec ce nom existe déjà.");
  }

  try {
    const updated = await updateIngredient({ name: updatedName }, ingredient.id);

    if (updated) {
      toast.success("Ingrédient mis à jour");
      setUpdateTriggerIngredients((prev) => !prev);
    } else {
      toast.error("La mise à jour a échoué.");
    }
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err);
    toast.error("Une erreur est survenue lors de la mise à jour.");
  }
};

  // Fonction de soumission du formulaire de suppression
  const handleDelete = async () => {
    if (!ingredientToDelete) return;

    try {
      const deleted = await deleteIngredient(ingredientToDelete.id);
      if (deleted) {
        toast.success("Ingrédient supprimé");
        setUpdateTriggerIngredients((prev) => !prev);
      } else {
        toast.error("La suppression a échoué.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'ingrédient :", err);
      toast.error("La suppression a échoué.");
    }
    setIsModalDeleteOpen(false);
  };

  return (
    <>
      <form className="ingredient_create_admin_container_form" onSubmit={handleCreateIngredient} noValidate>
        <div className="ingredient_create_admin_container_name">
           <label htmlFor="name">Création d'ingrédient</label>
           <input type="text" id="name" name="name"/>  
        </div> 
          <button type="submit" className="admin_button_validate_ingredient">
            Créer l'ingredient
          </button>
      </form>

      <div className="dashboard_research">
        <form className="dashboard_research_ingredient" onSubmit={(e) => e.preventDefault()}>
          <input
            ref={inputSearchTermIng}
            type="text"
            placeholder="Recherche ingrédient"
            className="dashboard_searchbar_ingredient"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </form>

        <p className="nb-ingredients-display">
          {ingredientsDisplay.length === 0
            ? "Aucun ingrédient trouvé, relancez la recherche !"
            : `Nombre d'ingrédients trouvés : ${ingredientsDisplay.length}`}
        </p>
      </div>

      {/* Gestion du chargement */}
      {isLoading && <p className="loading_message">Chargement des ingredients. Votre séance va commencer...</p>}
      
      {/* Gestion des erreurs */}
      {error && <p className="error_message">Impossible de charger les ingredients. Veuillez réessayer plus tard.</p>}
      
      {/* Affichage des recettes si elles sont disponibles */}
      {ingredients && (
      <div className="ingredients_admin_container">
        <ul> {ingredientsDisplay.map((ingredient) => (
            <li key={ingredient.id} className="ingredient_admin_item" data-ingredient-id={ingredient.id}>
              <form className="ingredient_admin_item_name" onSubmit={(e) => handleSubmit(e, ingredient)} noValidate>
                <input
                  type="text"
                  name="name"
                  value={editedIngredients[ingredient.id] ?? ingredient.name}
                  onChange={(e) => handleEditChange(ingredient.id, e.target.value)}
                />
                <div className="admin_button_form_ingredient">
                  <button type="submit" className="admin_button_validate_ingredient">
                    Valider
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredientToDelete(ingredient);
                      setIsModalDeleteOpen(true);
                    }}
                    className="admin_button_delete_ingredient"
                  >
                    Supprimer
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      </div>)}

      <ModalDeleteBox
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        onDelete={handleDelete}
        description="Voulez-vous vraiment supprimer cet ingrédient ?"
        title="Suppression de l'ingrédient"
      />
    </>
  );
}
