import { createProxyMiddleware } from "http-proxy-middleware";
import { env } from "@/config/env";

function stripPrefix(prefix: string) {
  return (path: string) => {
    const rest = path.slice(prefix.length);
    return rest === "" ? "/" : rest;
  };
}

export const authProxy = createProxyMiddleware({
  target: env.AUTH_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: stripPrefix("/auth"),
});

export const roomProxy = createProxyMiddleware({
  target: env.ROOM_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: stripPrefix("/rooms"),
});

export const collabProxy = createProxyMiddleware({
  target: env.COLLAB_SERVICE_URL,
  changeOrigin: true,
  ws: true,
  pathRewrite: stripPrefix("/collab"),
});

export const codeRunnerProxy = createProxyMiddleware({
  target: env.CODE_RUNNER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: stripPrefix("/run"),
});
