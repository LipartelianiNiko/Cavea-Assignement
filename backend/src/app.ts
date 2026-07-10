import express from "express";
import cors from "cors";
import router  from "./controllers/routes";
const app = express();

app.use(cors({
  origin: ['https://cavea-assignement.vercel.app', 'http://localhost:4200']
}));
app.use(express.json());

app.use("/api",router);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

export default app;