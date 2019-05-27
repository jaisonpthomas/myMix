const express = require("express");
const router = express.Router();
const { Album, validator } = require("../../models/Album");
const { Artist } = require("../../models/Artist");

router.get("/", async (req, res) => {
  const albums = await Album.find();
  res.send(albums);
});
router.post("/", async (req, res) => {
  const { title, artistId, genre, copiesAvailable } = req.body;
  const { error } = validator({ title, artistId, genre, copiesAvailable });
  if (error) return res.status(400).send(error.details[0].message);

  const artist = await Artist.findById(artistId);
  if (!artist) return res.status(400).send("Artist Not Found");

  let album = new Album({
    title,
    artist: {
      _id: artist._id,
      name: artist.name
    },
    genre,
    copiesAvailable
  });
  album = await album.save();
  res.send(album);
});

router.put("/:id", async (req, res) => {
  const { title, artistId, genre, copiesAvailable } = req.body;
  const { error } = validator({ title, artistId, genre, copiesAvailable });
  if (error) return res.status(400).send(error.details[0].message);

  const artist = await Artist.findById(artistId);
  if (!artist) return res.status(400).send("Artist Not Found");

  const album = await Album.findByIdAndUpdate(req.params.id, {
    title,
    artist: {
      _id: artist._id,
      name: artist.name
    },
    genre,
    copiesAvailable
  });
  if (!album) return res.status(400).send("Album Not Found");
  res.send(album);
});
router.delete("/:id", async (req, res) => {
  const album = await Album.findByIdAndRemove(req.params.id);

  if (!album) return res.status(404).send("Album Not Found");

  res.send(album);
});
router.get("/:id", async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).send("Album Not Found");
  res.send(album);
});

module.exports = router;
