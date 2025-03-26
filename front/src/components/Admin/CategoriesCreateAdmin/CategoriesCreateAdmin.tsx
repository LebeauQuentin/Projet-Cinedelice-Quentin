import "./CategoriesCreateAdmin.css"; // FAIRE COMME DANS L'EXEMPLE CategoriesCreateAdmin.css
import { createCategory } from "../../../services/api-category";
import { toast } from "react-toastify";
import { useVar } from "../../../contexts/var.context";

export default function CategoriesCreateAdmin({ onBack }: CategoriesCreateAdminProps) {
  // On importe le setter dans le VAR CONTEXT permettant d'actualiser la liste des catégories apres modification ou supression d'une category
  const { setUpdateTriggerCategories } = useVar();
  // Faire Fonction de soumission du formulaire lorsque l'on clique sur le bouton "valider"
  async function handleCreateCategory(event: React.FormEvent<HTMLFormElement>) {
   // Supression du comportement par default 
    // (les formulaires raffraichisse la page automatiquement lorsqu'on les soumet, 
    // ce qui n'est pas notre besoin, il faut donc enlever ca )
    event.preventDefault();
    // Récupération des données du formulaire
    const formData = new FormData(event.currentTarget);
    const inputs = Object.fromEntries(formData);

    // Création d'un objet category avec les bonnes valeurs
    const CategoryData = {
      name: inputs['name'],
      color: inputs['color']
    };

    try {  
    // Création de la categorie
    const createdCategory = await createCategory(CategoryData);
    if (createdCategory) {
      toast.success("Categorie créé avec succès");
      // Après la MAJ, on déclenche le raffraichissement
      setUpdateTriggerCategories((prev) => !prev);
      onBack();
    } else {
      toast.error("La création a échoué")
    }

    } catch (error) {
      console.error("Erreur lors de la création :", error);
      toast.error("Une erreur est survenue lors de la création.");
    };
  }

  return (
  <>
    <div className="category_create_admin_container">
      <form className="category_form_admin_container_form" onSubmit={handleCreateCategory} noValidate>
        <div className="category_form_admin_container_name">
           <label htmlFor="name">Nom de catégorie</label>
           <input type="text" id="name" name="name"/>  
        </div>

        <div className="category_create_admin_container_color">
          <label htmlFor="color"> couleur</label>
          <input type="color" id="color" name="color" defaultValue="#f6b73c"/>
        </div>

        <div className="admin_button_create_category">
          <button type="submit" className="admin_button_validate_category">
            Créer la Catégorie
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_category">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </>
  );
}

// Interface pour TypeScript
interface CategoriesCreateAdminProps {
  onBack: () => void;
}