import { Room } from "@/entities/room.entity";

export interface GetAllRoomsResponseDto {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
}

export function toGetAllRoomsResponseDto(room: Room): GetAllRoomsResponseDto {
  return {
    id: room.id,
    name: room.name,
    ownerId: room.ownerId,
    createdAt: room.createdAt.toISOString(),
  };
}
