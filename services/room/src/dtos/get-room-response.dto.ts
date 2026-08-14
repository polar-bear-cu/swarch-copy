import { Room } from "@/entities/room.entity";

export interface GetRoomResponseDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export function toGetRoomResponseDto(room: Room): GetRoomResponseDto {
  return {
    id: room.id,
    name: room.name,
    ownerId: room.ownerId,
    createdAt: room.createdAt.toISOString(),
  };
}
