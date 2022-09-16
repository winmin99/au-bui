const mongoose = require("mongoose"); // 몽구스를 사용하겠다는 선언

// 몽구스로 post라는 객체는 이런 모양으로 받겠다고 선언
const Users = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
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

// 이로써 Users 관련 DB는, 여기서 만든 몽구스 모델을 기준으로 받겠다고 외부에 선언/공개합니다.
module.exports = mongoose.model("Users", Users);
