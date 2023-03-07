const Buffet  = require("../schemas/buffets");
// const Menu  = require("../schemas/Menus");

class BuffetController {

//식당 목록 조회
async allBuffetsList (req, res) {
  try {
    // const { nickname } = res.locals.user;    
    const { buffet_id } = req.params;

    const thisBuffets = await Buffet.findOne({buffet_id}).sort({
      createdAt: -1
    });

    if(!thisBuffets) {
      res.status(400).json({success:false, message: "등록된 가게가 없습니다."});      
    } else {
      const allBuffetsInfo = await Buffet.find({ buffet_id }).sort({
        createdAt: -1
      });

      const data = [];

      for (let i=0; i<allBuffetsInfo.length; i++){
        data.push({
          buffet_id: allBuffetsInfo[i]._id,
          name: allBuffetsInfo[i].name,
          address: allBuffetsInfo[i].address,
          phoneNumber: allBuffetsInfo[i].phoneNumber,
          price: allBuffetsInfo[i].price,
          createdAt: allBuffetsInfo[i].createdAt,
        });
      }
      res.status(200).json({success:true, dada:data, message:"가게를 조회하였습니다."})
    }
  } catch(error){
    console.log
    res.status(400).json({success:true, message:"실패"})
  }
}
};

module.exports = BuffetController
 


