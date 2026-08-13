import { useEffect, useState, type FormEvent } from "react";
import { createRoom, deleteRoom, getAllRooms } from "@/api/room";
import type { Room } from "@/types/room";

export default function RoomPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [name, setName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    getAllRooms()
      .then(setRooms)
      .catch(() => setError("Failed to load rooms"));
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createRoom(name, ownerId);
      setName("");
      refresh();
    } catch {
      setError("Failed to create room");
    }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      await deleteRoom(id, ownerId);
      refresh();
    } catch {
      setError("Failed to delete room (are you the owner?)");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold">Rooms</h1>

      <form onSubmit={handleCreate} className="mt-4 flex items-end gap-2">
        <div>
          <label className="block text-sm text-gray-500">Owner ID</label>
          <input
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
            className="rounded border px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500">Room name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded border px-2 py-1"
          />
        </div>
        <button type="submit" className="rounded border px-3 py-1 text-sm hover:bg-gray-100">
          Create
        </button>
        <button
          type="button"
          onClick={refresh}
          className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
        >
          Refresh
        </button>
      </form>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Created</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-t">
              <td className="p-2 font-medium">{room.name}</td>
              <td className="p-2 text-gray-500">{room.ownerId}</td>
              <td className="p-2 text-gray-500">{new Date(room.createdAt).toLocaleString()}</td>
              <td className="p-2">
                <button
                  type="button"
                  onClick={() => handleDelete(room.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {rooms.length === 0 && (
            <tr>
              <td colSpan={4} className="p-2 text-gray-400">
                No rooms yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
