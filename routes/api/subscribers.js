const express = require("express");
const router = express.Router();
const { Subscriber, validator } = require("../../models/Subscriber");

router.get("/", async (req, res) => {
  const subscribers = await Subscriber.find();
  res.send(subscribers);
});

router.post("/", async (req, res) => {
  let { firstName, lastName, email, phone } = req.body;

  const { error } = validator({ firstName, lastName, email, phone });
  if (error) return res.status(400).send(error.details[0].message);

  let subscriber = new Subscriber({ firstName, lastName, email, phone });
  subscriber = await subscriber.save();
  res.send(subscriber);
});

router.put("/:id", async (req, res) => {
  let { firstName, lastName, email, phone } = req.body;

  const { error } = validator({ firstName, lastName, email, phone });
  if (error) return res.status(400).send(error.details[0].message);

  let subscriber = await Subscriber.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email, phone },
    { new: true }
  );
  if (!subscriber) return res.status(400).send("ID Invalid");
  res.send(subscriber);
});

router.delete("/:id", async (req, res) => {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
  if (!subscriber) return res.status(400).send("ID Invalid");
  res.send(subscriber);
});

router.get("/:id", async (req, res) => {
  const subscriber = await Subscriber.findById(req.params.id);
  if (!subscriber) return res.status(400).send("Id invalid");
  res.send(subscriber);
});

module.exports = router;
