import "./DietsCreateAdmin.css";
import { createDiet } from "../../services/api-diet";
import { toast } from "react-toastify";
import { useVar } from "../../contexts/var.context";

export default function DietsCreateAdmin({ onBack }: DietsCreateAdminProps) {
  // On importe le setter dans le VAR CONTEXT permettant d'actualiser la liste des régimes apres modification ou supression d'un régime
  const { setUpdateTriggerDiets } = useVar()

  // Fonction de soumission du formulaire lorsque l'on clique sur le bouton "valider"
  async function handleCreateDiet(event: React.FormEvent<HTMLFormElement>) {
    // Supression du comportement par default 
    // (les formulaires raffraichisse la page automatiquement lorsqu'on les soumet, 
    // ce qui n'est pas notre besoin, il faut donc enlever ca )
    event.preventDefault();  
    // Récupération des données du formulaire
    const formData = new FormData(event.currentTarget);
    const inputs = Object.fromEntries(formData);

    // Création d'un objet diet avec les bonnes valeurs
    const dietData = {
      name: inputs['name'],
      color: inputs['color'],
    };
  
    try {
      // On crée le régime
      const created = await createDiet(dietData);
      // Si le régime est crée, l'on recoit un toast de succés et l'on repart sur la page précedente
      if (created) {
        toast.success("Régime créé avec succès !");
        // Après la MAJ, on déclenche le raffraichissement
        setUpdateTriggerDiets((prev) => !prev);
        onBack();
      } else {
        // Sinon l'on a un message d'erreur
        toast.error("La création a échoué.");
      }
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      toast.error("Une erreur est survenue lors de la création.");
    }
  }

  return (<>
    <div className="diet_create_admin_container">
      <form className="diet_form_admin_container_form" onSubmit={handleCreateDiet} noValidate>
        <div className="diet_form_admin_container_name">
           <label htmlFor="name">Nom du régime</label>
           <input type="text" id="name" name="name"/>  
        </div>

        <div className="diet_create_admin_container_color">
          <label htmlFor="color"> couleur</label>
          <input type="color" id="color" name="color" defaultValue="#f6b73c"/>
        </div>

        <div className="admin_button_create_diet">
          <button type="submit" className="admin_button_validate_diet">
            Créer le Régime
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_diet">
            Annuler
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

// Interface pour TypeScript
interface DietsCreateAdminProps {
  onBack: () => void;
}