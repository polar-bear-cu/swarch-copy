import { httpClient } from "@/config/axios";
import type { Room } from "@/types/room";

export async function getAllRooms(): Promise<Room[]> {
  const res = await httpClient.get<Room[]>("/rooms");
  return res.data;
}

export async function getRoomById(id: string): Promise<Room> {
  const res = await httpClient.get<Room>(`/rooms/${id}`);
  return res.data;
}

export async function createRoom(name: string, ownerId: string): Promise<Room> {
  const res = await httpClient.post<Room>("/rooms", { name, ownerId });
  return res.data;
}

export async function deleteRoom(id: string, ownerId: string): Promise<void> {
  await httpClient.delete(`/rooms/${id}`, { params: { ownerId } });
}
