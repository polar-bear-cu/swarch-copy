/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_SERVICE_URL: string;
  readonly VITE_GATEWAY_PORT: string;
  readonly VITE_AUTH_PORT: string;
  readonly VITE_ROOM_PORT: string;
  readonly VITE_COLLAB_PORT: string;
  readonly VITE_CODE_RUNNER_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
