import "./MoviesCreateAdmin.css";
import { createMovie } from "../../services/api-movie";
import { toast } from "react-toastify";
import { useVar } from "../../contexts/var.context";

export default function MoviesCreateAdmin({ onBack }: MoviesCreateAdminProps) {
  const { setUpdateTriggerMovies } = useVar();

  async function handleCreateMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();  
    // Récupération des données du formulaire
    const formData = new FormData(event.currentTarget);
    const inputs = Object.fromEntries(formData);
    // Conversion du champ 'year' en nombre (car FormData retourne une chaîne de caractères)
    const year = parseInt(inputs['year'] as string, 10);
    // Création d'un objet movie avec les bonnes valeurs
    const movieData = {
      title: inputs['title'],
      image: inputs['image'],
      year,
      director: inputs['director'],
      actors: inputs['actors'],
      category: inputs['category'],
      description: inputs['description'],
      funfact: inputs['funfact'],
    };
  
    try {
      const created = await createMovie(movieData);
      if (created) {
        toast.success("Film créé avec succès !");
        // Après la Création, on déclenche le raffraichissement
        setUpdateTriggerMovies((prev) => !prev);
        onBack(); // Retour à la vue précédente
      } else {
        toast.error("La création a échoué.");
      }
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      toast.error("Une erreur est survenue lors de la création.");
    }
  }

  return (<>
    <div className="movie_create_admin_container">
      <form className="movie_form_admin_container_form" onSubmit={handleCreateMovie} noValidate>
        <div className="movie_form_admin_container_title">
           <label htmlFor="title">Titre du film</label>
           <input type="text" id="title" name="title"/>  
        </div>

        <div className="movie_form_admin_container_image">
          <label htmlFor="image"> Lien Images</label>
          <input type="text" id="image" name="image"/>
        </div>

        <div className="movie_form_admin_container_year">
          <label htmlFor="year">années</label>
          <input type="number" id="year" name="year"/>
        </div>

        <div className="movie_form_admin_container_director">
          <label htmlFor="director">Réalisateur</label>
          <input type="text" id="director" name="director"/>
        </div>

        <div className="movie_form_admin_container_actors">
          <label htmlFor="actors">Acteurs</label>
          <input type="text" id="actors" name="actors"/>
        </div>

        <div className="movie_form_admin_container_category">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category"/>
        </div>

        <div className="movie_form_admin_container_description">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description"/>
        </div>
        
        <div className="movie_form_admin_container_funfact">
          <label htmlFor="funfact">Anecdote</label>
          <textarea id="funfact" name="funfact"/>
          </div>

        <div className="admin_button_form_movie">
          <button type="submit" className="admin_button_validate_movie">
            Créer la recette
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_movie">
            Annuler
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

interface MoviesCreateAdminProps {
  onBack: () => void;
}