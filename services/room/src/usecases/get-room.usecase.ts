import { RoomInterface } from "../interfaces/room.interface";
import { NotFoundError } from "../errors";

export class GetRoomUseCase {
  constructor(private readonly roomRepository: RoomInterface) {}

  execute(id: string) {
    const room = this.roomRepository.findById(id);
    if (!room) throw new NotFoundError("room not found");
    return room;
  }
}
