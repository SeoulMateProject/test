// controllers/place.controller.js
const placeService = require('../services/place.service');

// 장소 정보 불러오기
exports.getPlaceDetails = async (req, res) => {
  const { PlaceId } = req.params;
  const userId = req.user._id;
  
  try {
    const placeDetails = await placeService.getPlaceById(PlaceId, userId);
    res.status(200).json(placeDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 장소와 연관된 일기들 불러오기
exports.getPlaceDiaries = async (req, res) => {
  const { PlaceId } = req.params;

  try {
    const diaries = await placeService.getDiariesByPlaceId(PlaceId);
    res.status(200).json(diaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 장소 스크랩 (코스에 추가)
exports.scrapPlace = async (req, res) => {
  const { PlaceId } = req.body;  // 스크랩할 장소의 ID
  const { FolderId } = req.body; // 추가할 코스(폴더)의 ID
  const userId = req.user._id;   // 현재 로그인된 유저의 ID

  try {
    await placeService.scrapPlaceToFolder(PlaceId, FolderId, userId);
    res.status(200).json({ message: 'Place added to the folder successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
