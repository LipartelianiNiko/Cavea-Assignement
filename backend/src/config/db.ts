import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

//to support both deploement variables, local variables .
const sequelize = new Sequelize({
  dialect: "postgres",

  host: process.env.DB_HOST || process.env.PGHOST || "localhost",

  port: parseInt(
    process.env.DB_PORT || process.env.PGPORT || "5432"
  ),

  database: process.env.DB_NAME || process.env.PGDATABASE || "inventory_db",

  username: process.env.DB_USER || process.env.PGUSER || "postgres",

  password: process.env.DB_PASSWORD || process.env.PGPASSWORD || "",

  logging: false,

  dialectOptions: process.env.PGHOST
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

export default sequelize;