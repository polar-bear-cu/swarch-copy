import { Room } from "@/entities/room.entity";

export interface CreateRoomResponseDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export function toCreateRoomResponseDto(room: Room): CreateRoomResponseDto {
  return {
    id: room.id,
    name: room.name,
    ownerId: room.ownerId,
    createdAt: room.createdAt.toISOString(),
  };
}
