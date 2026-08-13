export interface ServiceHealth {
  service: string;
  status: string;
  port: number | string;
}

export type HealthCheckResult =
  | { state: "ok"; service: string; path: string; latencyMs: number; data: ServiceHealth }
  | { state: "error"; service: string; path: string; latencyMs: number; message: string };
