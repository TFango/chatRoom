import { firestore, rtdb } from "../lib/firebase";
import { Request, Response } from "express";

const userCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

export async function conectRoomController(req: Request, res: Response) {
  const { userId } = req.query;
  const { roomId } = req.params;
  const uid = userId as string;

  if (!userId) return res.status(400).json({ error: "falta userId" });

  const userSnap = await userCollection.doc(uid).get();

  if (userSnap.exists) {
    const room = await roomCollection.doc(roomId).get();

    if (!room.exists)
      return res.status(404).json({ error: "room no encontrada" });

    const data = room.data();
    return res.json({
      rtdbRoomId: data.rtdbRoomId,
    });
  } else {
    return res.status(401).json({
      message: "no existis",
    });
  }
}

