import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class AssocIngredientRecipe extends Model {}
// définition du modèle recipe_ingredient_assignation

AssocIngredientRecipe.init({
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "recipe",
      key: "id"
    }
  },
  ingredient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "ingredient",
      key: "id"
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },
}, {
  sequelize,
  tableName: "recipe_ingredient_assignation",
  paranoid: true, // Active le soft delete
});