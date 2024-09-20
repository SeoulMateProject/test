const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main.controller");

// 상위 지역 (District) 리스트 불러오기
router.get("/district", mainController.getDistricts);

// 특정 District에 속한 장소(Place) 리스트 불러오기
router.get("/:DistrictId/place", mainController.getPlacesByDistrict);

router.get("/hotplace",mainController.getHotPlaces);

router.get("/hotcourse",mainController.getHotCourses);

module.exports = router;