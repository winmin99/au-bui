const mongoose = require("mongoose");

const connect = () => {
  const id = "test";
  // const password = 'test';
  const password = "test";
  const dbName = "basic";
  const uri = `mongodb+srv://${id}:${password}@cluster0.7cb6hlf.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      ignoreUndefined: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log("Mongo DB Connect Error");
      else console.log("Mongo Db Connect Success");
    }
  );
};

// 몽구스 Connection에 이벤트 리스너를 삽입
// 에러 발생 시 에러 내용을 기록
mongoose.connection.on("error", (err) => {
  console.error("Mongo DB Connect Error", err);
});

// 연결 종료 시 재연결을 시도한다.
mongoose.connection.on("disconnected", () => {
  console.error("Mongo Db DisConnect. reconnect.");
  connect();
});

module.exports = connect;
