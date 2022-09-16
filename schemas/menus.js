const mongoose = require("mongoose");
const { Schema } = mongoose;
const Menus = new Schema({
  buffet_id: {
    type: String,
    required: true,
  },
  todayMenu: {
    type: String,
    required: true,
  },
  servingDate: {
    type: Date,
    // default: Date.now,
  },
});

module.exports = mongoose.model("Menus", Menus);
