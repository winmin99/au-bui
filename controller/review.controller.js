const Review = require("../schemas/reviews");
const Buffet = require("../schemas/buffets");

class ReviewController {

//리뷰 작성
async postTorReview(req, res) {
  try {
    const { user_id, nickname } = res.locals;
    const { review, starScore } = req.body;
    const { buffet_id } = req.params;

    if(!review) {
      return res.json({ message: "리뷰 내용을 입력해주세요"});
    }
  
    const thisBuffets = await Buffet.findOne({ buffet_id }).sort({
      createdAt: -1
    });
  
    if(!thisBuffets) {
     return res.status(400).json({success:false, message: "등록된 가게가 없습니다."})
    } else{
      const createReview = await Review.create({
        user_id: user_id,
        review: review,
        nickname: nickname,
        buffet_id: buffet_id,
        starScore: starScore,
        createdAt: createdAt,    
      });
      res.status(201).json({ success:true, createReview, message: "리뷰가 등록되었습니다."})  
    }       
  } catch (error) {
    res.status(400).json({success:false, message:"실패"})
  }
}

//리뷰 조회
async getReview (req, res) {
  try {
    const { buffet_id } = req.params;

    const thisBuffets = await Buffet.findOne({buffet_id}).sort({
      createdAt: -1
    });

    if(!thisBuffets) {
      res.status(400).json({success:false, message: "등록된 가게가 없습니다."})
    } else {
      const  allReviewsInfo = await Review.find({ buffet_id }).sort({
        createdAt: -1
      });
      const data = [];
      
      for (let i= 0; i<allReviewsInfo.length; i++){
        data.push({
          review_id: allReviewsInfo[i]._id,
          user_id: allReviewsInfo[i].user_id,
          nickname: allReviewsInfo[i].nickname,
          review: allReviewsInfo[i].review,
          createdAt: allReviewsInfo[i].createdAt,
        });
      }
      res.status(200).json({success:true, data: data, message:"리뷰를 조회하였습니다."})
    }    
  } catch (error) {
    console.log
    res.staus(400).json({success:false, message:"실패"})
  }
}

//리뷰 수정
 async updateReview (req, res) {
  try {
    const user_id = res.locals;
    const { review_id } = req.params;
    const { review } = req.body;
    
    const reviewToUpdate = await Review.findOne({ review_id })

    if(!reviewToUpdate) {
      res.status(400)
      .json({ success: false, message: "해당 댓글이 없습니다." });           
    } else if (user_id != reviewToUpdate.user_id) {
      res.status(400)
      .json({ success: false, message: "수정 권한이 없습니다." });       
    } else {
      const updateReview = await Review.updateOne(
        { _id },
        { $set: { review } }
      );
      return updateReview;
    }
  } catch (error) {
    console.log
    res.staus(400).json({success:false, message:"실패"})
  }
}

// 리뷰 삭제
async deleteReview (req, res) {
  try {
    const user_id = res.locals;
    const { review_id } = req.params;

    const reviewToDelete = await Review.findOne({review_id});

    if(!reviewToDelete) {
      res.status(400)          
      .json({ success: false, message: "해당 댓글이 없습니다." });
    } else if (user_id != reviewToDelete.user_id) {
      res.status(400)          
      .json({ success: false, message: "삭제 권한이 없습니다." });
    } else {
      const deleteReview = await Review.deleteOne({review_id});
      res.status(200).json({
        success: true,
        message: "댓글이 삭제되었습니다.",
      });
    }
  } catch(error) {
    console.log
    res.staus(400).json({success:false, message:"실패"})
  }
}

//댓글에 별점 올리기
// reviewOnStarScore = async(req, res) => {
//   try {
//     const user_id = res.locals;
//     const 

//   } catch(error) {
//     res.staus(400).json({success:false, message:"실패"})
//   }
// }
};
module.exports = ReviewController;