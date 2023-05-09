import express from "express";
import { ArtistaModel } from "../models/artista.model.js";
import { AlbumModel } from "../models/album.model.js";

const albumRouter = express.Router();

//create (testado e ok):
albumRouter.post("/", async (req, res) => {
  try {
    const album = await AlbumModel.create(req.body);

    ArtistaModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { artista: album._id } },
      { runValidators: true }
    );
    return res.status(201).json(album);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

//details (testado e ok):
albumRouter.get("/:id", async (req, res) => {
  try {
    const album = await AlbumModel.findOne({ _id: req.params.id }).populate(
      "artista"
    );
    return res.status(201).json(album);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
});

// read (testado e ok):
albumRouter.get("/", async (req, res) => {
  try {
    const allAlbuns = await AlbumModel.find();
    return res.status(200).json(allAlbuns);
  } catch (e) {
    return res.status(400).json(e);
  }
});

// delete (testado e ok):
albumRouter.delete("/:id", async (req, res) => {
  try {
    const album = await ArtistaModel.find({ albuns: req.params.id });
    ArtistaModel.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { artista: album._id } },
      { runValidators: true }
    );
    const removedAlbum = await AlbumModel.deleteOne({ _id: req.params.id });
    return res.status(200).json(removedAlbum);
  } catch (e) {
    return res.status(400).json(e);
  }
});

//update (ERRO 400, mas sem nenhuma mensagem de erro):
albumRouter.put("/:id", async (req, res) => {
    try {
        const {album} = req.body;
        ArtistaModel.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { artista: album._id } },
            { runValidators: true }
          );
        const updateAlbum = await AlbumModel.findOne({_id:req.params.id});
        return res.status(200).json(updateAlbum)


    } catch (e) {
        return res.status(400).json(e);
      }
})


export { albumRouter };
