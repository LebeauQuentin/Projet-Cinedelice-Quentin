import { useState } from "react";
import { IRecipe } from "../../@types";
import "./PortionIngredients.css";

export default function PortionIngredients({ recipe }: PortionIngredientsProps) {
  const [nbPortions, setNbPortions] = useState(4);

  // Fonction pour mettre à jour les portions
  function changePortion(value: number) {
    setNbPortions((prev) => Math.max(1, prev + value)); // Empêche de descendre en dessous de 1
  }

  return (
    <div className="recipe_detail_portion_container">
      <div className="recipe_detail_portion">
        <button className="button_casting" onClick={() => changePortion(-1)}>-</button>
        <h4 className="recipe_detail_portion_title">Nombre de parts : {nbPortions}</h4>
        <button className="button_casting" onClick={() => changePortion(1)}>+</button>
      </div>
      <ul className="recipe_detail_ingredients">
        {recipe?.Ingredients.map((ingredient) => (
          <li className="recipe_detail_ingredients" key={ingredient.id}>
            <p className="recipe_detail_ingredient">
              {((ingredient.recipe_ingredient_assignation.quantity / 4) * nbPortions)}{" "}
              {ingredient.recipe_ingredient_assignation.unit} de {ingredient.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface PortionIngredientsProps {
  recipe: IRecipe;
}
