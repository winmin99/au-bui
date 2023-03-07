const jwt = require("jsonwebtoken");
const { User } = require("../schemas/users");

authMiddleware = (req, res, next) => {
  console.log("------ 🤔 Authorization Checking ------");

  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      res.status(400).json({
        success: false,
        message: "로그인이 필요합니다!",
      });
      return;
    }

    const { user_id } = jwt.verify(tokenValue, process.env.MY_SECRET_KEY);

    console.log("------ ✅  Authorization Checked ------");
    res.locals.user_id = user_id;
    next();
  } catch (e) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};