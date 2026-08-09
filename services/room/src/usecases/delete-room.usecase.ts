import { RoomRepository } from "../ports/room-repository.port";
import { NotFoundError, ForbiddenError } from "../errors";

export class DeleteRoomUseCase {
  constructor(private readonly roomRepository: RoomRepository) {}

  execute(id: string, requesterId: string) {
    const room = this.roomRepository.findById(id);
    if (!room) throw new NotFoundError("room not found");
    if (room.ownerId !== requesterId) {
      throw new ForbiddenError("only owner can delete room");
    }
    this.roomRepository.deleteById(id);
  }
}
