import axios from "axios";
import { ENV } from "@/config/env";

export const httpClient = axios.create({
  baseURL: ENV.GATEWAY_SERVICE_URL,
  timeout: 3000,
});
