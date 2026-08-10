import express, { Request } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import swaggerUi from "swagger-ui-express";
import type { Socket } from "net";

const app = express();
const PORT = 8000;

app.get("/health", (_, res) => {
  res.json({ service: "gateway", status: "ok", port: PORT });
});

app.use(
  "/auth-docs.json",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: { "^/auth-docs.json": "/docs.json" },
  }),
);

app.use(
  "/room-docs.json",
  createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
    pathRewrite: { "^/room-docs.json": "/docs.json" },
  }),
);

app.use(
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

// Auth Services
app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
  }),
);

// Room Services
app.use(
  "/rooms",
  createProxyMiddleware({
    target: "http://localhost:8002",
    changeOrigin: true,
  }),
);

// Collab Services
const collabProxy = createProxyMiddleware({
  target: "http://localhost:8004",
  changeOrigin: true,
  ws: true,
});
app.use("/collab", collabProxy);

// Code Runner Services
app.use(
  "/run",
  createProxyMiddleware({
    target: "http://localhost:8005",
    changeOrigin: true,
  }),
);

const server = app.listen(PORT, () => console.log(`[gateway] :${PORT}`));
server.on("upgrade", (req, socket, head) => {
  collabProxy.upgrade?.(req as unknown as Request, socket as Socket, head);
});
