import express from "express";
import { connectToDB } from "./config/db.config.js";
import { artistaRouter } from "./routes/artista.routes.js";
import { albumRouter } from "./routes/album.routes.js";

connectToDB();
const app = express();
app.use(express.json());

app.use("/artista", artistaRouter);
app.use("/albuns", albumRouter);

app.listen(4000, () => {
  console.log("Conectei na porta 4000");
});
