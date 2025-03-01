import { useEffect, useState } from "react";
import { useVar } from "../../contexts/var.context";
import "./MovieCreateForm.css";

export default function MovieCreateForm({ setMovieId, movieIsCreated } : MovieCreationProps) {
  
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [isCreatingNewMovie, setIsCreatingNewMovie] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieExists, setMovieExists] = useState(false);
  const { movies } = useVar();

  const handleCheckboxChange = () => {
    setIsCreatingNewMovie(!isCreatingNewMovie);
    setSelectedMovie(0);
    setMovieId(0);
  };

  const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMovieId = parseInt(e.target.value);
    setSelectedMovie(selectedMovieId);
    setMovieId(selectedMovieId); // Met à jour l'ID du film dans le parent (RecipeForm)
  };

  // Si la création de film réussi mais pas la recette, selectionner le nouveau film
  useEffect(()=>{if (movieIsCreated !== 0){
    setIsCreatingNewMovie(false);
    setSelectedMovie(movieIsCreated)
  }},[movieIsCreated])
  
  // Fonction pour savoir si le film existe deja (titre similaire)
  const handleMovieTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setMovieTitle(newTitle);
    setMovieExists(checkIfMovieExists(newTitle));
  };

  const checkIfMovieExists = (title: string) => {
    return movies.some(movie => movie.title.toLowerCase() === title.toLowerCase());
  };

  return (
    <>
      <h2 className="recipe_create_h2">- Film associé -</h2>
      <div className="movie_create_container">

        <div className="switch_creating_movie">
          <p> Créer un nouveau film </p>
          <label className="switch">
                <input type="checkbox" 
                  checked={isCreatingNewMovie} 
                  onChange={handleCheckboxChange} />
                <span className="slider"></span>
          </label>
        </div>

      {isCreatingNewMovie ? (
        <div className="movie_create_form">
          {movieExists && <p className="error_message">Ce film existe déjà !</p>}
          <div className="movie_create_year">
            <label htmlFor="title">Titre du film</label>
            <input type="text" id="movieTitle" name="movieTitle" 
              value={movieTitle} onChange={handleMovieTitleChange} required />
          </div>

          <div className="movie_create_year">
            <label htmlFor="year">Année</label>
            <input type="number" placeholder="De production entre 1890 et 2050 " id="year" name="year" min="1890" max="2050"/>
          </div>

          <div className="movie_create_category">
            <label htmlFor="movieCategory">Catégorie</label>
            <input type="text" id="movieCategory" name="movieCategory" placeholder="Categorie du film"/>
          </div>

          <div className="movie_create_director">
            <label htmlFor="director">Réalisateur(s)</label>
            <input type="text" id="director" name="director" placeholder="réalisateur(s) du film"/>
          </div>

          <div className="movie_create_actors">
            <label htmlFor="actors">Acteur(s)/Actrice(s)</label>
            <input type="text" id="actors" name="actors" placeholder="Acteurs/Actrices principaux du film"/>
          </div>

          <div className="movie_create_description">
            <label htmlFor="movieDescription">Description</label>
            <textarea id="movieDescription" name="movieDescription" cols={100} rows={5}></textarea>
          </div>

          <div className="movie_create_funfact">
            <label htmlFor="anecdote">Anecdote</label>
            <textarea id="anecdote" name="anecdote" cols={100} rows={5}></textarea>
          </div>
        </div>
      ) : (
        <div className="movie_select_exist">
          <label htmlFor="movie">Choisissez un film existant:</label>
          <select
          className="movie_create_select"
            id="movie"
            value={selectedMovie}
            onChange={handleMovieChange}
          >
            <option value="">- Selectionnez un film -</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
      )}
      </div>
    </>
  );
}

interface MovieCreationProps {
  setMovieId : (id : number) => void,
  movieIsCreated : number
}
