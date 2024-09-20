// services/place.service.js
const Place = require('../models/place');
const LikeFolder = require('../models/likeFolder'); // 코스 폴더 모델
const Diary = require('../models/diary');

// 장소 정보 불러오기
exports.getPlaceById = async (PlaceId, userId) => {
  const place = await Place.findById(PlaceId).populate('DistrictId');
  
  if (!place) {
    throw new Error('Place not found');
  }

  const isScrapped = await Place.findOne({
    _id: PlaceId,
    ScrappedBy: userId
  });

  return {
    DistrictName: place.DistrictId.DistrictName,
    PlaceName: place.PlaceName,
    PlaceImage: place.PlaceImage,
    Like: place.Like,
    MyScrapInfo: isScrapped ? true : false,
    Description: place.Description
  };
};
// 장소를 특정 코스에 추가하는 함수
exports.scrapPlaceToFolder = async (PlaceId, FolderId, userId) => {
    // 해당 폴더가 사용자의 폴더인지 확인
    const folder = await LikeFolder.findOne({ _id: FolderId, UserId: userId });
    
    if (!folder) {
      throw new Error('Folder not found or does not belong to the user');
    }
  
    // 해당 장소가 이미 폴더에 존재하는지 확인
    const isPlaceInFolder = folder.LikedPlaceId.includes(PlaceId);
    if (isPlaceInFolder) {
      throw new Error('Place already exists in this folder');
    }
  
    // 폴더에 장소 추가
    folder.LikedPlaceId.push(PlaceId);
    await folder.save();
  
    // 장소의 Like 수 증가
    await Place.findByIdAndUpdate(PlaceId, { $inc: { Like: 1 } });
    
    console.log(`Place ${PlaceId} liked and added to folder ${FolderId}`);
  };
  