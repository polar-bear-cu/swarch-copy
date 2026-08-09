import { RoomRepository } from "../ports/room-repository.port";
import { NotFoundError } from "../errors";

export class GetRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  execute(id: string) {
    const room = this.roomRepository.findById(id);
    if (!room) throw new NotFoundError("room not found");
    return room;
  }
}
