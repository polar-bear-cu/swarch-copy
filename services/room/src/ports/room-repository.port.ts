import { Room } from "../entities/room.entity";

export interface RoomRepository {
  create(name: string, ownerId: string): Room;
  findById(id: string): Room | undefined;
  deleteById(id: string): boolean;
}
