import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env"), quiet: true });

const BASE_SERVICE_URL = process.env.BASE_SERVICE_URL || "http://localhost";

export const env = {
  PORT: Number(process.env.GATEWAY_PORT) || 8000,
  AUTH_SERVICE_URL: `${BASE_SERVICE_URL}:${process.env.AUTH_PORT}`,
  ROOM_SERVICE_URL: `${BASE_SERVICE_URL}:${process.env.ROOM_PORT}`,
  COLLAB_SERVICE_URL: `${BASE_SERVICE_URL}:${process.env.COLLAB_PORT}`,
  CODE_RUNNER_SERVICE_URL: `${BASE_SERVICE_URL}:${process.env.CODE_RUNNER_PORT}`,
};
