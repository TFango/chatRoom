import { Router} from "express";
import { singupController } from "../controllers/singupController";

export const signupRouter  = Router();

signupRouter.post("/signup", singupController);
