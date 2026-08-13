const BASE_SERVICE_URL = import.meta.env.VITE_BASE_SERVICE_URL || "http://localhost";
const BASE_GATEWAY_PORT = import.meta.env.VITE_GATEWAY_PORT || 8000;

export const ENV = {
  GATEWAY_SERVICE_URL: `${BASE_SERVICE_URL}:${BASE_GATEWAY_PORT}`,
};
