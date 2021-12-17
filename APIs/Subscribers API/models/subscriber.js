const mongoose = require("mongoose");

const subscriberSchema = {
  name: {
    type: String,
    required: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
};

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
