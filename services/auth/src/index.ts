import express from "express";
import cors from "cors";
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

app.listen(PORT, () => console.log(`[auth] :${PORT}`));
