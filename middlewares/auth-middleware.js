const jwt = require("jsonwebtoken");
const { User } = require("../schemas/users");

authMiddleware = (req, res, next) => {
  console.log("------ π€ Authorization Checking ------");

  try {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      res.status(400).json({
        success: false,
        message: "λ‘κ·ΈμΈμ΄ νμν©λλ€!",
      });
      return;
    }

    const { user_id } = jwt.verify(tokenValue, process.env.MY_SECRET_KEY);

    console.log("------ β  Authorization Checked ------");
    res.locals.user_id = user_id;
    next();
  } catch (e) {
    res.status(401).send({
      errorMessage: "λ‘κ·ΈμΈ ν μ¬μ©νμΈμ",
    });
    return;
  }
};