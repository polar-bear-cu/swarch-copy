import { RoomRepository } from "../ports/room-repository.port";
import { ValidationError } from "../errors";

export class CreateRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  execute(name: string, ownerId: string) {
    if (!name || !ownerId) {
      throw new ValidationError("name and ownerId are required");
    }
    return this.roomRepository.create(name, ownerId);
  }
}
