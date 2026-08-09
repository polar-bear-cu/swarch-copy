import express from "express";

const app = express();
const PORT = 8001;

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ service: "auth", status: "ok", port: PORT });
});

app.listen(PORT, () => console.log(`[auth] :${PORT}`));
