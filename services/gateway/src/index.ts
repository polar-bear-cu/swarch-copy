import express, { Request } from "express";
import cors from "cors";
import type { Socket } from "net";
import { env } from "@/config/env";
import { docsRouter } from "@/docs/router";
import { authProxy, roomProxy, collabProxy, codeRunnerProxy } from "@/proxies";
import { getHealth } from "@/controllers/health.controller";

const app = express();

app.use(cors());

app.get("/health", getHealth);

app.use(docsRouter);
app.use("/auth", authProxy);
app.use("/rooms", roomProxy);
app.use("/collab", collabProxy);
app.use("/run", codeRunnerProxy);

const server = app.listen(env.PORT, () => console.log(`[gateway] :${env.PORT}`));
server.on("upgrade", (req, socket, head) => {
  collabProxy.upgrade?.(req as unknown as Request, socket as Socket, head);
});
