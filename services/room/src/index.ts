import express from "express";
import cors from "cors";
import { roomRoutes } from "@/routes/room.routes";
import { swaggerSpec } from "@/docs/swagger";
import { env } from "@/config/env";
import { getHealth } from "@/controllers/health.controller";

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
app.get("/health", getHealth);

app.get("/docs.json", (_, res) => res.json(swaggerSpec));
app.use("/", roomRoutes);

app.listen(PORT, () => console.log(`[room] :${PORT}`));
