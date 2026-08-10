import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../../.env"), quiet: true });

export const env = {
  PORT: Number(process.env.ROOM_PORT) || 8002,
};
