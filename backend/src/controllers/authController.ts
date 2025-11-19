import { firestore } from "../lib/firebase";
import { Request, Response } from "express";

const userCollections = firestore.collection("users");

export async function authController(req: Request, res: Response) {

  const { email } = req.body;

  const userSnap = await userCollections.where("email", "==", email).get();
  const docs = userSnap.docs;

  // Si no existe el usuario → responder y cortar
  if (docs.length === 0) {
    return res.status(404).json({ message: "email no registrado" });
  }

  const doc = docs[0];
  const data = doc.data() || {};

  // Respuesta final
  return res.json({
    id: doc.id,
    name: data.name || "",
  });

}