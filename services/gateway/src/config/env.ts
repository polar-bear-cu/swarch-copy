import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env"), quiet: true });

export const env = {
  PORT: Number(process.env.GATEWAY_PORT) || 8000,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:8001",
  ROOM_SERVICE_URL: process.env.ROOM_SERVICE_URL || "http://localhost:8002",
  COLLAB_SERVICE_URL: process.env.COLLAB_SERVICE_URL || "http://localhost:8004",
  CODE_RUNNER_SERVICE_URL: process.env.CODE_RUNNER_SERVICE_URL || "http://localhost:8005",
};
