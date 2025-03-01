import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Recipe extends Model {}
// définition du modèle recipe

Recipe.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  difficulty: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "MOYEN"
  },
  instruction: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "movie",
      key: "id"
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "category",
      key: "id"
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    }
  },
  validated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },
}, {
  sequelize,
  tableName: "recipe",
  paranoid: true, // Active le soft delete
});