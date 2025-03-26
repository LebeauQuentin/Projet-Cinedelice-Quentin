import { DashboardAdminVue } from "../../../@types";
import "./CategoriesAdmin.css"; 
import { useVar } from "../../../contexts/var.context";

export default function CategoriesAdmin({setCurrentView, setSelectedCategoryId}: CategoriesAdminProps) {

  const { categories, isLoading, error } = useVar()

   // Créer une fonction quyi dirige vers la page de modification d'une categorie (fonction dans le Onclick)
  function onCategoryClick(categoryId: number) {
    setSelectedCategoryId(categoryId);
    setCurrentView(DashboardAdminVue.CATEGORIES_FORM);
  }
  // Dans le dashboard on affiche toutes les categories existantes pour pouvoir soit en crée une nouvelle, soit en supprimer ou en modifier
  return (
    <>
      {/* Bouton pour créer une nouvelle categorie*/}
      <button className="category_admin_create" onClick={() => setCurrentView(DashboardAdminVue.CATEGORIES_CREATE) }> Créer Une Nouvelle Categorie </button> 
      {/* Gestion du chargement */}
      {isLoading && <p className="loading_message">Chargement des catégories. Votre séance va commencer...</p>}

      {/* Gestion des erreurs */}
      {error && <p className="error_message">Impossible de charger des catégories. Veuillez réessayer plus tard.</p>}

      {/* Affichage des recettes si elles sont disponibles */}
      {categories && (
      <div className="categories_admin_container">
      {/* On fait séléctionne chacun des régimes présent dans l'objet "diets" pour pouvoir les afficher et les sélectionner individuellement */}
        <ul>
          {
            categories.map((category) => (
              <li key={category.id} className="category_admin_item" data-category-id={category.id} onClick={() => onCategoryClick(category.id)}>  {/* Quand on clique, l'on arrive sur la page 1 categorie */}
                  <div className="category_admin_item_title">
                    <p>{category.name}</p>
                    <div className="category_admin_item_color" style={{ backgroundColor: category.color}}></div>
                  </div>
              </li>
              )
            )
          }
        </ul>
      </div>)} 
    </>
 );
}

interface CategoriesAdminProps {
  setSelectedCategoryId: (CategoryId: number) => void;
  setCurrentView: (view: DashboardAdminVue) => void;
}
