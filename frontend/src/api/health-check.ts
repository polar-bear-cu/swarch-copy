import axios from "axios";
import { createHttpClient } from "@/config/axios";
import type { ServiceTarget, HealthCheckResult, ServiceHealth } from "@/types/health";

export async function checkServiceHealth(target: ServiceTarget): Promise<HealthCheckResult> {
  const client = createHttpClient(target.baseURL);
  const start = performance.now();
  try {
    const res = await client.get<ServiceHealth>("/health");
    return {
      state: "ok",
      service: target.name,
      latencyMs: performance.now() - start,
      data: res.data,
    };
  } catch (err) {
    const message = axios.isAxiosError(err) ? (err.code ?? err.message) : "unknown error";
    return { state: "error", service: target.name, latencyMs: performance.now() - start, message };
  }
}
