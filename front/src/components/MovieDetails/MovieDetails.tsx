import { IRecipe } from '../../@types/index';
import "./MovieDetails.css";

export default function MovieDetails ({ recipe }: MovieDetailsProps)  {


  return (
    <>
      <div className="movie">
        <img className="movie_img" src={recipe?.movie.image} alt={`affiche du film ${recipe?.movie.title}`} />
        <div className='movie_text'>
          <p><span>Sortie :</span> {recipe?.movie.year}</p>
          <p><span>Catégorie :</span> {recipe?.movie.category}</p>
          <p><span>Réalisation :</span> {recipe?.movie.director}</p>
          <p><span>Acteurs :</span> {recipe?.movie.actors}</p>
          <p><span>Description :</span> {recipe?.movie.description}</p>
          <p><span>Anecdote :</span> {recipe?.movie.funfact}</p>
        </div>
      </div>
    </>
  )
}

interface MovieDetailsProps {
  recipe : IRecipe
}