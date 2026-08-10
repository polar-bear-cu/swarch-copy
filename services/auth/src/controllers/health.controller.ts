import { Request, Response } from "express";
import { GetHealthResponseDto } from "@/dtos/get-health-response.dto";
import { env } from "@/config/env";

export function getHealth(_req: Request, res: Response) {
  const body: GetHealthResponseDto = { service: "auth", status: "ok", port: env.PORT };
  res.json(body);
}
