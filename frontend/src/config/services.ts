import { ENV } from "@/config/env";
import type { ServiceTarget } from "@/types/health";

export const SERVICE_TARGETS: ServiceTarget[] = [
  { name: "gateway", baseURL: ENV.GATEWAY_SERVICE_URL },
  { name: "auth", baseURL: ENV.AUTH_SERVICE_URL },
  { name: "room", baseURL: ENV.ROOM_SERVICE_URL },
  { name: "collab", baseURL: ENV.COLLAB_SERVICE_URL },
  { name: "code-runner", baseURL: ENV.CODE_RUNNER_SERVICE_URL },
];
