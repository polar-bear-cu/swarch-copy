import { Router } from "express";
import { roomController } from "../controllers/room.controller";

export const roomRoutes = Router();

/**
 * @openapi
 * /:
 *   post:
 *     summary: Create a room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, ownerId]
 *             properties:
 *               name:
 *                 type: string
 *               ownerId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created
 *       400:
 *         description: Missing name or ownerId
 */
roomRoutes.post("/", roomController.create);

/**
 * @openapi
 * /:
 *   get:
 *     summary: List all rooms
 *     responses:
 *       200:
 *         description: List of rooms
 */
roomRoutes.get("/", roomController.getAll);

/**
 * @openapi
 * /{id}:
 *   get:
 *     summary: Get a room by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room found
 *       404:
 *         description: Room not found
 */
roomRoutes.get("/:id", roomController.getById);

/**
 * @openapi
 * /{id}:
 *   delete:
 *     summary: Delete a room (owner only)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: ownerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Room deleted
 *       403:
 *         description: Not the owner
 *       404:
 *         description: Room not found
 */
roomRoutes.delete("/:id", roomController.deleteById);
