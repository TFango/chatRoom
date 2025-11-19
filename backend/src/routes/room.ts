import { Router } from "express";
import { roomsController } from "../controllers/roomsController";

export const roomRouter = Router();

roomRouter.post("/rooms", roomsController);
