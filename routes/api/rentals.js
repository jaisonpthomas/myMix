const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Rental, validator } = require("../../models/Rental");
const { Album } = require("../../models/Album");
const { Subscriber } = require("../../models/Subscriber");
const Fawn = require("fawn");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rental.find();
  console.log("RENTALS: ", rentals);
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subscriber = await Subscriber.findById(req.body.subscriberId);
  if (!subscriber) return res.status(400).send("Subscriber not found.");

  const album = await Album.findById(req.body.albumId);
  if (!album) return res.status(400).send("Album not found");

  if (album.numberInStock === 0)
    return res.status(400).send("All copies of album checked out.");

  let rental = new Rental({
    subscriber: {
      _id: subscriber._id,
      firstName: subscriber.firstName,
      lastName: subscriber.lastName,
      email: subscriber.email
    },
    album: {
      _id: album._id,
      title: album.title
    }
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "album",
        { _id: album._id },
        {
          $inc: { numberInStock: -1 }
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send("Rental not found.");
  res.send(rental);
});

module.exports = router;
