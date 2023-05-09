import express from "express";
import { ArtistaModel } from "../models/artista.model.js";
import { AlbumModel } from "../models/album.model.js";

const artistaRouter = express.Router();

//create (testado e ok):
artistaRouter.post("/", async (req, res) => {
  try {
    const createdArtist = await ArtistaModel.create(req.body);
    return res.status(201).json(createdArtist);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//details (no teste nao aparecem os albuns, apenas [ ]):
artistaRouter.get("/:id", async (req, res) => {
  try {
    const artista = await ArtistaModel.findOne({ _id: req.params.id });
    return res.status(200).json(artista);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

// read (no teste nao aparecem os albuns, apenas [ ]):
artistaRouter.get("/", async (req, res) => {
  try {
    const allArtistas = await ArtistaModel.find();
    return res.status(200).json(allArtistas);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//delete (testado e ok):
artistaRouter.delete("/:id", async (req, res) => {
  try {
    const artistas = await ArtistaModel.find({ artista: req.params.id });
    artistas.forEach(async (currentAlbum) => {
      await ArtistaModel.findByIdAndUpdate(
        { _id: currentAlbum.id },
        { $pull: { artista: req.params.id } },
        { runValidators: true, new: true }
      );
    });
    const deleteArtista = await ArtistaModel.deleteOne({ _id: req.params.id });
    return res.status(200).json(deleteArtista);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//update (testado e ok):
artistaRouter.put("/:id", async (req, res) => {
  try {
    const updateArtista = await ArtistaModel.findOneAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { runValidators: true, new: true }
    );
    return res.status(200).json(updateArtista)
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

export { artistaRouter };
