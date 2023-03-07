const User = require("../schemas/users");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const postUserSchema = Joi.object({
  nickname: Joi.string().min(3).max(15).alphanum().required(),
  password: Joi.string().min(4).max(15).alphanum().required(),
  confirmPassword: Joi.string().max(15).alphanum().required(),
});
const postAuthShema = Joi.object({
  nickname: Joi.string().min(3).max(15).alphanum().required(),
  password: Joi.string().min(4).max(15).alphanum().required(),
});

class UserController {
//회원가입
async signup (req, res) {
    try {
      const { nickname, password, confirmPassword } = await postUserSchema.validateAsync(
        req.body
      );
      if(req.headers.authorization) {
        res.status(400).json({success: false, message:"이미 로그인 중입니다."});
        return;
      }

      if(password !== confirmPassword) {
        res.status(400).json({success: false, message:"비밀번호가 일치하지 않습니다."});
        return;
      }

      if(password.includes(nickname)) {
        res.status(400).json({success: false, message:"비밀번호는 닉네임을 포함할수 없습니다."});
      }

      const checkUser1 = await User.findOne({nickname});
      if(checkUser1) {
        res.status(400).json({success: false, message:"이미 사용중인 닉네임 입니다."});
        return;
      }
      
      await User.create({ nickname, password });
      res.status(200).json({success: true, message:"회원 가입에 성공하였습니다."})
      
    } catch (error) {
      res.status(400).json({success: false, message:"실패"});
    }
  }
  // 로그인 기능 
async login (req, res) {
    try {
      if (req.cookies.token) {
        res.status(400).json({success: false, message:"이미 로그인 중입니다."});
        return;
      }
      const { nickname, password } = await postAuthShema.validateAsync(req.body);
      const user = await User.findOne({nickname, password});
      if(!user) {
        res.status(400).json({success: false, message:"닉네임 패스워드를 확인해주세요"});
        return;
      }
      const token = jwt.sign({ userId: user.userId }, process.env.mySecretKey);
      res.cookie("token", token);

      const payload = {
        result: true,
        token: token,
        email: user.email,
        channel: user.channel,
        userimage : user.userimage
      };

      res.status(200).json(payload);
    } catch(error) {
      res.status(400).json({success: false, message:"실패"})
    }
  }

  //로그아웃
 async logout (req, res) {
    try {
      res.clearCookie("token");
      res.status(200).json({ result: true, message: "로그아웃" });
      // res.redirect("/");
      
  } catch (error) {
      res.status(400).json({ result: false, error: "네트워크 에러" });
  }
  }
}  
module.exports = UserController;
