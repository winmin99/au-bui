const mongoose = require("mongoose");

const { Schema } = mongoose;
const Reviews = new Schema({
  buffet_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  starScore: {
    type: Number,
    required: true,
    default: 0,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Reviews", Reviews);

