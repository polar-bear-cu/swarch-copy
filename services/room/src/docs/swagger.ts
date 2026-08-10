import swaggerJsdoc from "swagger-jsdoc";
import { env } from "../config/env";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CoPy Room Service",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:${env.PORT}` }],
  },
  apis: ["./src/routes/*.ts", "./src/index.ts"],
});
