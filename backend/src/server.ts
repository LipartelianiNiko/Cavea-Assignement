import app from "./app";
import sequelize from "./config/db";
import Location from "./models/location";

const PORT = process.env.PORT || 3000;

async function start(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    await sequelize.sync({ alter: false });
    console.log("Database synced");

    const locations = await Location.count();

    if (locations === 0) {
      await Location.bulkCreate([
        { id: 1, name: "Main Office" },
        { id: 2, name: "Cavea Gallery" },
        { id: 3, name: "Cavea Tbilisi Mall" },
        { id: 4, name: "Cavea East Point" },
        { id: 5, name: "Cavea City Mall" }
      ]);
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();