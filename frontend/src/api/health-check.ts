import axios from "axios";
import { httpClient } from "@/config/axios";
import type { HealthCheckResult, ServiceHealth } from "@/types/health";

async function checkHealth(service: string, path: string): Promise<HealthCheckResult> {
  const start = performance.now();
  try {
    const res = await httpClient.get<ServiceHealth>(path);
    return { state: "ok", service, path, latencyMs: performance.now() - start, data: res.data };
  } catch (err) {
    const message = axios.isAxiosError(err) ? (err.code ?? err.message) : "unknown error";
    return { state: "error", service, path, latencyMs: performance.now() - start, message };
  }
}

export const checkGatewayHealth = () => checkHealth("gateway", "/health");
export const checkAuthHealth = () => checkHealth("auth", "/auth/health");
export const checkRoomHealth = () => checkHealth("room", "/rooms/health");
export const checkCollabHealth = () => checkHealth("collab", "/collab/health");
export const checkCodeRunnerHealth = () => checkHealth("code-runner", "/run/health");
