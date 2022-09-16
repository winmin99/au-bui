const mongoose = require("mongoose");

const { Schema } = mongoose;
const Users = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },        
  createdAt: {
    type: Date, // 이건 날짜 형태로 받을게요~!
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Users", Users);
