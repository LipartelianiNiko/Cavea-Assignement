import express from "express";
import cors from "cors";
import router  from "./controllers/routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",router);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;