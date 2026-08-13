export interface ServiceTarget {
  name: string;
  baseURL: string;
}

export interface ServiceHealth {
  service: string;
  status: string;
  port: number | string;
}

export type HealthCheckResult =
  | { state: "ok"; service: string; latencyMs: number; data: ServiceHealth }
  | { state: "error"; service: string; latencyMs: number; message: string };
