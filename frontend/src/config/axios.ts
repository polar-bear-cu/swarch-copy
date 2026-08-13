import axios from "axios";

export function createHttpClient(baseURL: string) {
  return axios.create({ baseURL, timeout: 3000 });
}
