import { Router } from "express";
import { messageController } from "../controllers/messagesController";

export const messagesRouter = Router();

messagesRouter.post("/messages", messageController);
