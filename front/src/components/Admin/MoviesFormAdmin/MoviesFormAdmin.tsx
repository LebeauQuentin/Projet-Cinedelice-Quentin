import "./MoviesFormAdmin.css";
import { getOneMovie, updateMovie, deleteMovie } from "../../../services/api-movie";
import { useEffect, useState } from "react";
import { IMovie } from "../../../@types";
import { toast } from "react-toastify";
import ModalDeleteBox from "../../Modals/ModalDeleteBox/ModalDeleteBox";
import { useQuery } from '@tanstack/react-query';
import { useVar } from "../../../contexts/var.context";

export default function MoviesFormAdmin({ movieId, onBack }: MoviesFormAdminProps) {
  const [ movie, setMovie ] = useState<IMovie | null>(null);
  const [ isModalDeleteOpen, setIsModalDeleteOpen ] = useState<boolean>(false);
  const { setUpdateTriggerMovies } = useVar();

  // Utilisation de React Query pour gérer la requête
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getOneMovie(Number(movieId)),
    retry: 2, // Nombre de tentatives en cas d'échec
  });
 
  useEffect(() => {
    if( data ) { setMovie(data) }
  }, [data]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, deleted_at, created_at, updated_at, ...filteredData } = movie;
    try {
      const updated = await updateMovie(movie.id, filteredData);
      if (updated) {
        toast.success("Film mis à jour");
        // Après la MAJ, on déclenche le raffraichissement
        setUpdateTriggerMovies((prev) => !prev);
        onBack();
      } else {
        toast.error("La mise à jour a échoué.");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      toast.error("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    if (movie) {
      try {
        const deleted = await deleteMovie(movie.id);
        if (deleted) {
          toast.success("Film supprimé");
          // Après la sup, on déclenche le raffraichissement
          setUpdateTriggerMovies((prev) => !prev);
          onBack();
        } else {
          toast.error("La supression a échoué.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression du film :", err);
        toast.error("La supression a échoué.");
      }
    }
    setIsModalDeleteOpen(false);
  };
  
  return (
    <>

    {/* Gestion du chargement */}
    {isLoading && <p className="loading_message">Chargement du film. Votre séance va commencer...</p>}

    {/* Gestion des erreurs */}
    {error && <p className="error_message">Impossible de charger le film. Veuillez réessayer plus tard.</p>}

    {/* Affichage des films s'ils sont disponibles */}
    {data && (

    <div className="movie_form_admin_container">
      <div className="movie_admin_container_infos">
        <div className="movie_admin_container_infos_title">
          <h2>{movie?.title}</h2>
          <p>Réalisée par : {movie?.director}</p>
          <p>Acteurs : {movie?.actors}</p>
          <p>Catégories : {movie?.category}</p>
          <p>Sortie : {movie?.year}</p>

          <time className="movie_admin_container_infos_title_date" dateTime={movie?.created_at}>
            <p>Créé le : </p>
             {movie?.created_at && new Date(movie?.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </time>
        </div>
        <div className="movie_admin_container_infos_image">
          <img src={movie?.image} alt={movie?.title} />
        </div>
      </div>

      <form className="movie_form_admin_container_form" onSubmit={handleSubmit} noValidate>
        <div className="movie_form_admin_container_title">
           <label htmlFor="title">Titre du film</label>
           <input type="text" id="title" name="title" value={movie?.title ?? ""} onChange={(e) => setMovie(movie ? {...movie, title: e.target.value} : null)} />  
        </div>

        <div className="movie_form_admin_container_image">
          <label htmlFor="image"> Lien Images</label>
          <input type="text" id="image" name="image" value={movie?.image ?? ""} onChange={(e) => setMovie(movie ? {...movie, image: e.target.value} : null)} />
        </div>

        <div className="movie_form_admin_container_year">
          <label htmlFor="year">années</label>
          <input type="number" id="year" name="year" value={movie?.year ?? ""} onChange={(e) => setMovie(movie ? {...movie, year: parseInt(e.target.value)} : null)} />
        </div>

        <div className="movie_form_admin_container_director">
          <label htmlFor="director">Réalisateur</label>
          <input type="text" id="director" name="director" value={movie?.director ?? ""} onChange={(e) => setMovie(movie ? {...movie, director: e.target.value} : null)} />
        </div>

        <div className="movie_form_admin_container_actors">
          <label htmlFor="actors">Acteurs</label>
          <input type="text" id="actors" name="actors" value={movie?.actors ?? ""} onChange={(e) => setMovie(movie ? {...movie, actors: e.target.value} : null)} />
        </div>

        <div className="movie_form_admin_container_category">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" value={movie?.category ?? ""} onChange={(e) => setMovie(movie ? {...movie, category: e.target.value} : null)} />
        </div>

        <div className="movie_form_admin_container_description">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={movie?.description ?? ""} onChange={(e) => setMovie(movie ? {...movie, description: e.target.value} : null)} />
        </div>
        
        <div className="movie_form_admin_container_funfact">
          <label htmlFor="funfact">Anecdote</label>
          <textarea id="funfact" name="funfact" value={movie?.funfact ?? ""} onChange={(e) => setMovie(movie ? {...movie, funfact: e.target.value} : null)} />
          </div>

        <div className="admin_button_form_movie">
          <button type="submit" className="admin_button_validate_movie">
            Valider
          </button>
          <button type="button" onClick={onBack} className="admin_button_reset_movie">
            Annuler
          </button>
          <button type="button" onClick={() => setIsModalDeleteOpen(true)} className="admin_button_delete_movie">
            Supprimer
          </button>
        </div>
      </form>
    </div>)}
    <ModalDeleteBox isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} onDelete={handleDelete} description="Voulez-vous vraiment supprimer ce film ?" title="Suppression du film" />
  </>
  );
}

interface MoviesFormAdminProps {
  movieId: number | null;
  onBack: () => void;
}

