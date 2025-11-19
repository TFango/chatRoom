import { firestore, rtdb } from "../lib/firebase";
import { nanoid } from "nanoid";
import { Request, Response } from "express";

const roomCollection = firestore.collection("rooms");

export async function messageController(req: Request, res: Response) {
  const { userId, roomId, message } = req.body;

  if (!userId || !roomId || !message) {
    return res.status(404).json({ message: "Faltan datos" });
  }

  const msg = message.trim();
  const room = await roomCollection.doc(roomId).get();

  if (!room.exists) return res.status(404).json({ error: "room no existe" });

  const rtdbRoomId = room.data().rtdbRoomId;

  await rtdb.ref("rooms/" + rtdbRoomId + "/messages").push({
    from: userId,
    text: msg,
    createdAt: Date.now(),
  });

  return res.json({ ok: true });
}
