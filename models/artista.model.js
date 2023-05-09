import { Schema, model, Types } from "mongoose";

const artistaSchema = new Schema({
  name: { type: String, require: true, maxLength: 50, minLength: 2 },
  estilo: {
    type: String,
    require: true,
    enum: ["Pop", "Rock", "Reggae", "Outros"],
    default: "Outros",
  },
  albuns: [{ type: Types.ObjectId, ref: "Album" }],
});

export const ArtistaModel = model("Artista", artistaSchema);
