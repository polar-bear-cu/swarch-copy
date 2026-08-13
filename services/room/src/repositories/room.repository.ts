import { randomUUID } from "crypto";
import { Room } from "../entities/room.entity";
import { RoomInterface } from "../interfaces/room.interface";

export class RoomRepository implements RoomInterface {
  private readonly rooms = new Map<string, Room>();

  create(name: string, ownerId: string): Room {
    const room: Room = { id: randomUUID(), name, ownerId, createdAt: new Date() };
    this.rooms.set(room.id, room);
    return room;
  }

  findById(id: string): Room | undefined {
    return this.rooms.get(id);
  }

  deleteById(id: string): boolean {
    return this.rooms.delete(id);
  }
}
