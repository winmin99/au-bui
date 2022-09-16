const mongoose = require("mongoose");
const { Schema } = mongoose;
const Menus = new Schema({
  buffet_id: {
    type: String,
    required: true,
  },
  buffetName: {
    type: String,
    required: true,
  },
  todayMenu: {
    type: String,
    required: true,
  },
  tomorrowMenu: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Menus", Menus);
