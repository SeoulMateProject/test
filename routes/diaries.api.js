const express = require("express");
const router = express.Router();
const diaryController = require("../controllers/diaries.controller");

router.post("/createDiary", diaryController.createDiary);

router.put("/updateDiary/:diaryId", diaryController.updateDiary);

router.delete("/deleteDiary/:diaryId", diaryController.deleteDiary);

router.get("/myDiary/:KakaoId", diaryController.myDiary);

router.get("/scrapedDiary/:KakaoId", diaryController.scrapedDiary);

router.get("/samePlaceDiary/:PlaceId", diaryController.samePlaceDiary);

router.post("/scrapDiary", diaryController.scrapDiary);

module.exports = router;