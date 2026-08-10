import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import { env } from "@/config/env";

export const docsRouter = Router();

docsRouter.use(
  "/auth-docs.json",
  createProxyMiddleware({
    target: env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/auth-docs.json": "/docs.json" },
  }),
);

docsRouter.use(
  "/room-docs.json",
  createProxyMiddleware({
    target: env.ROOM_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/room-docs.json": "/docs.json" },
  }),
);

docsRouter.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    explorer: true,
    swaggerOptions: {
      urls: [
        { url: "/room-docs.json", name: "Room Service" },
        { url: "/auth-docs.json", name: "Auth Service" },
      ],
    },
  }),
);
