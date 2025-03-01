import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Ingredient extends Model {}
// définition du modèle ingredient
Ingredient.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },
}, {
  sequelize,
  tableName: "ingredient",
  paranoid: true, // Active le soft delete
});