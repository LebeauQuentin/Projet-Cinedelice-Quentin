import { ICategory } from "../../@types"
import './Category.css'

export default function Category ({category}: CategoryProps) {

  return (
    <li className="recipe_card_category" style={{ backgroundColor: category.color }}>
      {category.name}
    </li>
      )
    }

interface CategoryProps {
  category: ICategory
}