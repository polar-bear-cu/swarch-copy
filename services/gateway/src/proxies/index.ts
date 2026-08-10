import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "@/config/env";

export const authProxy = createProxyMiddleware({
  target: env.AUTH_SERVICE_URL,
  changeOrigin: true,
});

export const roomProxy = createProxyMiddleware({
  target: env.ROOM_SERVICE_URL,
  changeOrigin: true,
});

export const collabProxy = createProxyMiddleware({
  target: env.COLLAB_SERVICE_URL,
  changeOrigin: true,
  ws: true,
});

export const codeRunnerProxy = createProxyMiddleware({
  target: env.CODE_RUNNER_SERVICE_URL,
  changeOrigin: true,
});
