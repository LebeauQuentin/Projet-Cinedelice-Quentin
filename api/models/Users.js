import { DataTypes, Model} from "sequelize";
import { sequelize } from "./sequelizeClient.js";

export class Users extends Model {}
// définition du modèle users
Users.init({
  email: {
    type: DataTypes.STRING,

    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true, // NULL signifie que l'utilisateur n'est pas supprimé
  },
}, {
  sequelize,
  tableName: "users",
  paranoid: true, // Active le soft delete
});