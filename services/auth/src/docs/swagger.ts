import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CoPy Auth Service",
      version: "1.0.0",
    },
  },
  apis: ["./src/index.ts"],
});
