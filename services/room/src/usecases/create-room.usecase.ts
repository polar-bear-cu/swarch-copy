import { RoomInterface } from "../interfaces/room.interface";
import { ValidationError } from "../errors";

export class CreateRoomUseCase {
  constructor(private readonly roomRepository: RoomInterface) {}

  execute(name: string, ownerId: string) {
    if (!name || !ownerId) {
      throw new ValidationError("name and ownerId are required");
    }
    return this.roomRepository.create(name, ownerId);
  }
}
