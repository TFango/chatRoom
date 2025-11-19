import express from "express";
import cors from "cors";
import path from "path";

import { authRouter } from "./routes/auth";
import { connectRoomRouter } from "./routes/connectRoom";
import { messagesRouter } from "./routes/messages";
import { roomRouter } from "./routes/room";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(express.json());
app.use(cors());

const publicPath = path.join(__dirname, "../dist_front");
app.use(express.static(publicPath));

app.use("/api", authRouter);
app.use("/api", connectRoomRouter);
app.use("/api", messagesRouter);
app.use("/api", roomRouter);
app.use("/api", signupRouter);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
