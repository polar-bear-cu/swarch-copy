import { Router } from "express";
import { roomController } from "../controllers/room.controller";

export const roomRoutes = Router();

roomRoutes.post("/", roomController.create);
roomRoutes.get("/:id", roomController.getById);
roomRoutes.delete("/:id", roomController.deleteById);
