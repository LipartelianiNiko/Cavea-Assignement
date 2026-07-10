import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",

  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "5432"),

  database: process.env.PGDATABASE || "inventory_db",
  username: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "",

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