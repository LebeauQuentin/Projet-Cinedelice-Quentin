// CONFIG REACT SIMPLY CAROUSEL
import { useState } from 'react';
import { Link } from 'react-router';
import ReactSimplyCarousel from 'react-simply-carousel';
import { IRecipe } from '../../@types';
import "../../pages/style/HomePage.css"

function ReactSimplyCarouselExample({ lastRecipes }: ReactSimplyCarouselProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Changer l'image avec une version plus light pour la miniature (Démarche Eco-responsable)
  function recipeImage(image: string) { 
    return image.replace("_normal", "_light") }

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      centerMode
      forwardBtnProps={{
        className: "homepage_img_arrow arrow1",
        children: <img className="homepage_img_arrow" src="/icones/icone-fleche-droite.png" alt="fleche droite" />,
      }}
      backwardBtnProps={{
        className: "homepage_img_arrow arrow3",
        children: <img className="homepage_img_arrow" src="/icones/icone-fleche-gauche.png" alt="fleche gauche"/>,
      }}
      
      responsiveProps={[
        {
          itemsToShow: 4,
          itemsToScroll: 1,
          minWidth: 1600,
        },
        {
          itemsToShow: 2,
          itemsToScroll: 1,
          minWidth: 1400,
          maxWidth:1600
        },
        {
          itemsToShow: 2,
          itemsToScroll: 1,
          minWidth: 1000,
          maxWidth:1400
        },
        {
          itemsToShow: 1,
          itemsToScroll: 1,
          maxWidth: 1000,
        },
      ]}
      speed={400}
      easing="linear"
    >
{lastRecipes.map((recipe, index) => (
  <div className='carroussel_container' key={index} >
    <Link to={`/recipes/${recipe.id}`}>
      <li className="homepage_card">
        <img src={recipeImage(recipe.image)} alt={recipe.title} />
        <h4 className="homepage_h4">{recipe.movie.title}</h4>
        <h5 className="homepage_h5">{recipe.title}</h5>
      </li>
    </Link>
  </div>
))}
    </ReactSimplyCarousel>
  );
}

interface ReactSimplyCarouselProps {
    lastRecipes: IRecipe[]
}

export default ReactSimplyCarouselExample;
