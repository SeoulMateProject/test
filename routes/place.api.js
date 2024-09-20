const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

// 특정 장소 정보 불러오기
router.get('/:PlaceId', placeController.getPlaceDetails);

// 특정 장소와 연관된 일기들 불러오기
router.get('/:PlaceId/diary', placeController.getPlaceDiaries);

// 장소를 코스에 스크랩하는 API
router.post('/scrap', placeController.scrapPlace);

module.exports = router;
