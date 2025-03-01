import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Movie extends Model {}
// définition du modèle movie

Movie.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  director: {
    type: DataTypes.STRING,
    allowNull: true
  },
  actors: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING, // URL de l'image ou chemin local a voir
    allowNull: true
  },
  funfact: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },
}, {
  sequelize,
  tableName: "movie",
  paranoid: true, // Active le soft delete
});