import express from "express";
import { roomRoutes } from "./routes/room.routes";

const app = express();
const PORT = 8002;

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ service: "room", status: "ok", port: PORT });
});

app.use("/rooms", roomRoutes);

app.listen(PORT, () => console.log(`[room] :${PORT}`));
