import "dotenv/config";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  define: {
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  }
});

// teste de la connection du client sequelize avec la BDD
//sequelize.authenticate();