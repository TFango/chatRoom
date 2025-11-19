import { firestore, rtdb } from "../lib/firebase";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

const userCollection = firestore.collection("users");
const roomCollection = firestore.collection("rooms");

export async function roomsController(req: Request, res: Response) {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: "userId requerido" });

  const userSnap = await userCollection.doc(userId.toString()).get();

  if (userSnap.exists) {
    const roomRef = rtdb.ref("rooms/" + nanoid());

    await roomRef.set({
      messages: [],
      owner: userId,
    });

    const roomLongId = roomRef.key;
    const roomId = nanoid(6);

    await roomCollection.doc(roomId.toString()).set({
      rtdbRoomId: roomLongId,
    });

    return res.json({
      id: roomId.toString(),
    });
  } else {
    return res.status(401).json({
      message: "no existis",
    });
  }
}
