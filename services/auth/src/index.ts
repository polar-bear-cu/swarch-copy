import express from "express";
import { swaggerSpec } from "./docs/swagger";

const app = express();
const PORT = 8001;

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
  res.json({ service: "auth", status: "ok", port: PORT });
});

app.get("/docs.json", (_, res) => res.json(swaggerSpec));

app.listen(PORT, () => console.log(`[auth] :${PORT}`));
