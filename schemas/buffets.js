const mongoose = require("mongoose");

const { Schema } = mongoose;
const Buffets = new Schema({

  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = mongoose.model("Buffets", Buffets);

