import { RoomInterface } from "@/interfaces/room.interface";

export class GetAllRoomsUseCase {
  constructor(private readonly roomRepository: RoomInterface) {}

  execute() {
    return this.roomRepository.findAll();
  }
}
