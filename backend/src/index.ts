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

// Ruta para archivos estáticos del frontend
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
