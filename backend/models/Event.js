const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  date: { type: String, required: true },   // store date as string or Date
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tickets: {
    vip: {
      price: { type: Number, required: true },
      capacity: { type: Number, required: true },
    },
    normal: {
      price: { type: Number, required: true },
      capacity: { type: Number, required: true },
    }
  },
  image: { type: String }, // we’ll store filename here
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who created event
  registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // users attending
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
