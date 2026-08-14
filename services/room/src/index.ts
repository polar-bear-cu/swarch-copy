import express from "express";
import cors from "cors";
import { roomRoutes } from "@/routes/room.routes";
import { swaggerSpec } from "@/docs/swagger";
import { env } from "@/config/env";

const app = express();
const PORT = env.PORT;

app.use(cors());
app.use(express.json());

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Service is up
 */
app.get("/health", (_, res) => {
  res.json({ service: "room", status: "ok", port: PORT });
});

app.get("/docs.json", (_, res) => res.json(swaggerSpec));
app.use("/", roomRoutes);

app.listen(PORT, () => console.log(`[room] :${PORT}`));
