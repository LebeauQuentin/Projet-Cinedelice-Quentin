import "./MoviesAdmin.css";
import { DashboardAdminVue} from "../../@types";
import { useVar } from "../../contexts/var.context";

export default function MoviesAdmin({setCurrentView, setSelectedMovieId}: MoviesAdminProps) {

  // Utilisation de React Query pour gérer la requête
  const { movies, isLoading, error } = useVar();

  function onMovieClick(movieId: number) {
    setSelectedMovieId(movieId);
    setCurrentView(DashboardAdminVue.MOVIES_FORM);
  }
 
  return (
    <>
    <button className="movie_admin_create" onClick={() => setCurrentView(DashboardAdminVue.MOVIES_CREATE) }> Créer Nouveau Film </button>
    
    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement des films. Votre séance va commencer...</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger les films. Veuillez réessayer plus tard.</p>}
    
    {/* Affichage des recettes si elles sont disponibles */}
    {movies && (
    <div className="movies_admin_container">
       <ul>
        {
          movies.map((movie) => (
            <li key={movie.id} className="movie_admin_item" data-movie-id={movie.id} onClick={() => onMovieClick(movie.id)}> 
                <div className="movie_admin_item_title">
                  <p>{movie.title}</p>
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

interface MoviesAdminProps {
  setSelectedMovieId: (MovieId: number) => void;
  setCurrentView: (view: DashboardAdminVue) => void;
}
