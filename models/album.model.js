import { Schema, model, Types } from "mongoose"; 
                   
const albumSchema = new Schema ({
    name: {type: String, require: true, maxLength: 50, minLength: 2},
    artista: {type: Types.ObjectId, ref: "Artista"}
});

export const AlbumModel = model("Album", albumSchema);
