const BASE_SERVICE_URL = import.meta.env.VITE_BASE_SERVICE_URL || "http://localhost";

export const ENV = {
  GATEWAY_SERVICE_URL: `${BASE_SERVICE_URL}:${import.meta.env.VITE_GATEWAY_PORT}`,
  AUTH_SERVICE_URL: `${BASE_SERVICE_URL}:${import.meta.env.VITE_AUTH_PORT}`,
  ROOM_SERVICE_URL: `${BASE_SERVICE_URL}:${import.meta.env.VITE_ROOM_PORT}`,
  COLLAB_SERVICE_URL: `${BASE_SERVICE_URL}:${import.meta.env.VITE_COLLAB_PORT}`,
  CODE_RUNNER_SERVICE_URL: `${BASE_SERVICE_URL}:${import.meta.env.VITE_CODE_RUNNER_PORT}`,
};
