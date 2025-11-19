import { Router } from "express";
import { conectRoomController } from "../controllers/conectRoomController";

export const connectRoomRouter = Router();

connectRoomRouter.get("/rooms/:roomId", conectRoomController)
