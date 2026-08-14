import { Request, Response } from "express";
import { CreateRoomUseCase } from "@/usecases/create-room.usecase";
import { GetRoomUseCase } from "@/usecases/get-room.usecase";
import { GetAllRoomsUseCase } from "@/usecases/get-all-rooms.usecase";
import { DeleteRoomUseCase } from "@/usecases/delete-room.usecase";
import { NotFoundError, ForbiddenError, ValidationError } from "@/errors";
import { RoomRepository } from "@/repositories/room.repository";
import { CreateRoomRequestDto } from "@/dtos/create-room-request.dto";
import { toCreateRoomResponseDto } from "@/dtos/create-room-response.dto";
import { toGetRoomResponseDto } from "@/dtos/get-room-response.dto";
import { toGetAllRoomsResponseDto } from "@/dtos/get-all-rooms-response.dto";
import { DeleteRoomRequestDto } from "@/dtos/delete-room-request.dto";
import { DeleteRoomResponseDto } from "@/dtos/delete-room-response.dto";

const roomRepository = new RoomRepository();
const createRoomUseCase = new CreateRoomUseCase(roomRepository);
const getRoomUseCase = new GetRoomUseCase(roomRepository);
const getAllRoomsUseCase = new GetAllRoomsUseCase(roomRepository);
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
      const body: CreateRoomRequestDto = req.body;
      const room = createRoomUseCase.execute(body.name, body.ownerId);
      res.status(201).json(toCreateRoomResponseDto(room));
    } catch (err) {
      handleError(err, res);
    }
  },

  getAll(_req: Request, res: Response) {
    res.json(getAllRoomsUseCase.execute().map(toGetAllRoomsResponseDto));
  },

  getById(req: Request, res: Response) {
    try {
      const room = getRoomUseCase.execute(req.params.id);
      res.json(toGetRoomResponseDto(room));
    } catch (err) {
      handleError(err, res);
    }
  },

  deleteById(req: Request, res: Response) {
    try {
      // TODO: requesterId should come from verified JWT (gateway), not query
      const body: DeleteRoomRequestDto = {
        id: req.params.id,
        ownerId: String(req.query.ownerId),
      };
      deleteRoomUseCase.execute(body.id, body.ownerId);
      const response: DeleteRoomResponseDto = { id: body.id };
      res.status(200).json(response);
    } catch (err) {
      handleError(err, res);
    }
  },
};
