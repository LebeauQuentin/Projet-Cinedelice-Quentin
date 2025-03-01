import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Category extends Model {}
// définition du modèle category
Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },

}, {
  sequelize,
  tableName: "category",
  paranoid: true // Active le soft delete
});