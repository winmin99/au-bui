const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Menus", MenuSchema);