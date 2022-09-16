const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  buffet_id: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Reviews", ReviewSchema);