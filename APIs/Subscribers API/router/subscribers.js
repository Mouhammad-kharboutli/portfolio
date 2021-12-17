const { Router } = require("express");
const express = require("express");
const Subscriber = require("../models/subscriber");

const router = express.Router();

// get all subscribers
router.get("/", async (req, res) => {
  try {
    // const subscriber = { name: "JSON" };
    const subscriber = await Subscriber.find();
    res.json(await subscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create a subscriber
router.post("/", async (req, res) => {
  const subscriber = Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get a specific subscriber
router.get("/:id", getSubscriber, (req, res) => {
  res.json(res.subscriber);
});

// update a specific subscriber
router.patch("/:id", async (req, res) => {
  // check if the user is submitting a null value or empty string
  if (
    req.body.name === null ||
    req.body.name === "" ||
    req.body.subscribedToChannel === null ||
    req.body.subscribedToChannel === ""
  ) {
    res.json({
      message: "Subscriber can not be updated to null or empty value",
    });
    // terminating the application
    return;
  } else {
    try {
      await Subscriber.findByIdAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          subscribedToChannel: req.body.subscribedToChannel,
          date: Date.now(),
        }
      );
      res.json({ message: "Subscriber has been updated successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// delete a specific subscriber
router.delete("/:id", async (req, res) => {
  try {
    const subscriber = await Subscriber.deleteOne({ _id: req.params.id });
    if (subscriber == null) {
      return res.status(404).json({ message: "can not find that subscriber" });
    }
    res.json({ message: "Subscriber has been deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// common function to get, update and delete a subscriber
async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "can not find that subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.subscriber = subscriber;
  next();
}

module.exports = router;
