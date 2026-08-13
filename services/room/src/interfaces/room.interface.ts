import { Room } from "../entities/room.entity";

export interface RoomInterface {
  create(name: string, ownerId: string): Room;
  findById(id: string): Room | undefined;
  findAll(): Room[];
  deleteById(id: string): boolean;
}
