const express = require("express");
const router = express.Router();
const { Artist, validator } = require("../../models/Artist");

router.get("/", async (req, res) => {
  const artists = await Artist.find();
  res.send(artists);
});

router.post("/", async (req, res) => {
  let { name } = req.body;
  name = name.trim();
  const { error } = validator({ name });
  if (error) return res.status(400).send(error.details[0].message);

  let artist = new Artist({
    name
  });
  artist = await artist.save();
  res.send(artist);
});

router.put("/:id", async (req, res) => {
  let { name } = req.body;
  name = name.trim();
  const { error } = validator({ name });
  if (error) return res.status(400).send(error.details[0].message);

  const artist = await Artist.findByIdAndUpdate(req.params.id, { name });
  if (!artist) return res.status(400).send("ID Invalid");
  res.send(artist);
});

router.delete("/:id", async (req, res) => {
  const artist = await Artist.findByIdAndRemove(req.params.id);
  if (!artist) return res.status(400).send("ID Invalid");
  res.send(artist);
});

router.get("/:id", async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  if (!artist) return res.status(400).send("Id invalid");
  res.send(artist);
});

module.exports = router;
