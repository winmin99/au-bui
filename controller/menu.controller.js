const Menu = require("../schemas/menus");

class MenuController {
async getAllMenu (req, res) {
  try {
    const { buffet_id } = req.params;

    const thisMenus = await Menu.findOne({buffet_id}).sort({
      createdAt: -1
    });

    if(!thisMenus) {
      res.status(400).json({success:false, message:"등록된 가게가 없습니다."});
    } else {
      const allMenusInfo = await Menu.find({ buffet_id }).sort({
        createdAt: -1
      });

      const data = [];

      for (let i=0; i<allMenusInfo.length; i++) {
        data.push({
          menu_id: allMenusInfo[i]._id,
          buffet_id: allMenusInfo[i].buffet_id,
          todayMenu: allMenusInfo[i].todayMenu,
          servingDate: allMenusInfo[i].servingDate,
          createdAt: allMenusInfo[i].createdAt,
        });
      }
      res.status(200).json({success:true, data:data, message: "메뉴를 조회하였습니다."});
    }
  } catch(error) {
    console.log
    res.status(400).json({success:true, message:"실패"})
  }
}
};

module.exports = MenuController;