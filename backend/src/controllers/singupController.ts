import { firestore } from "../lib/firebase";
import { Request, Response } from "express";

const userCollections = firestore.collection("users");

export async function singupController(req: Request, res: Response) {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ error: "El email y el nombre son requeridos" });
  }

  const userSnap = await userCollections.where("email", "==", email).get();

  if (userSnap.empty) {
    const newUserRef = await userCollections.add({
      email,
      name,
    });
    return res.json({ id: newUserRef.id, name });
  } else {
    const existingDoc = userSnap.docs[0];
    const existingData = existingDoc.data();
    res.json({
      id: existingDoc.id,
      name: existingData.name,
    });
  }
}
