import { randomUUID } from "crypto";
import { Room } from "../entities/room.entity";
import { RoomRepository } from "../ports/room-repository.port";

// TODO: swap for a Postgres-backed implementation once DB connection is wired up
export class InMemoryRoomRepository implements RoomRepository {
  private rooms = new Map<string, Room>();

  create(name: string, ownerId: string): Room {
    const room: Room = {
      id: randomUUID(),
      name,
      ownerId,
      createdAt: new Date(),
    };
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
