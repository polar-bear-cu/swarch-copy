import { Request, Response } from "express";
import { CreateRoomUseCase } from "../usecases/create-room.usecase";
import { GetRoomUseCase } from "../usecases/get-room.usecase";
import { DeleteRoomUseCase } from "../usecases/delete-room.usecase";
import { NotFoundError, ForbiddenError, ValidationError } from "../errors";
import { RoomRepository } from "../repositories/room.repository";

const roomRepository = new RoomRepository();
const createRoomUseCase = new CreateRoomUseCase(roomRepository);
const getRoomUseCase = new GetRoomUseCase(roomRepository);
const deleteRoomUseCase = new DeleteRoomUseCase(roomRepository);

function handleError(err: unknown, res: Response) {
  if (err instanceof ValidationError) return res.status(400).json({ error: err.message });
  if (err instanceof NotFoundError) return res.status(404).json({ error: err.message });
  if (err instanceof ForbiddenError) return res.status(403).json({ error: err.message });
  res.status(500).json({ error: "internal error" });
}

export const roomController = {
  create(req: Request, res: Response) {
    try {
      const room = createRoomUseCase.execute(req.body.name, req.body.ownerId);
      res.status(201).json(room);
    } catch (err) {
      handleError(err, res);
    }
  },

  getById(req: Request, res: Response) {
    try {
      const room = getRoomUseCase.execute(req.params.id);
      res.json(room);
    } catch (err) {
      handleError(err, res);
    }
  },

  deleteById(req: Request, res: Response) {
    try {
      // TODO: requesterId should come from verified JWT (gateway), not query
      deleteRoomUseCase.execute(req.params.id, String(req.query.ownerId));
      res.status(204).send();
    } catch (err) {
      handleError(err, res);
    }
  },
};
