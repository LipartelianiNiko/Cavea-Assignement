import app from "./app";
import sequelize from "./config/db";

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    await sequelize.sync({ alter: false });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();