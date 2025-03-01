import { IDiets } from "../../@types"
import './Diet.css';

export default function Diet ({diet}: DietProps) {

  return ( 
    <li className="recipe_card_diet" style={{ backgroundColor: diet.color }}>
      {diet.name}
    </li>
  );
}

interface DietProps {
  diet: IDiets
}