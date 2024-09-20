const diaryService = require("../services/diary.service");

exports.createDiary = async (req, res, next) => {
  try {
    const newDiary = await diaryService.createDiary(req.body);
    res.status(201).json(newDiary);
  } catch (error) {
    next(error);
  }
};

// 기존 다이어리 업데이트
exports.updateDiary = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    const updatedDiary = await diaryService.updateDiary(diaryId, req.body);
    res.json(updatedDiary);
  } catch (error) {
    if (error.message === "Diary not found") {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

// 다이어리 삭제
exports.deleteDiary = async (req, res, next) => {
  try {
    const { diaryId } = req.params;
    await diaryService.deleteDiary(diaryId);
    res.json({ message: "Diary deleted successfully" });
  } catch (error) {
    if (error.message === "Diary not found") {
      res.status(404).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

exports.myDiary = async (req, res, next) => {
  try {
    const { KakaoId } = req.params;

    if (!KakaoId) res.json({ message: "KakaoId is missed" });
    const myDiaries = await diaryService.findMyDiaries(KakaoId);
    if (myDiaries.length === 0) {
      return res
        .status(404)
        .json({ message: "No diaries found for the given KakaoId" });
    }
    res.json(myDiaries);
  } catch (error) {
    next(error);
  }
};

exports.scrapedDiary = async (req, res, next) => {
  try {
    const { KakaoId } = res.params;

    if (!KakaoId) res.json({ message: "KakaoId is not found" });

    const scrapedDiaries = await diaryService.scrapedDiaries(KakaoId);

    if (scrapedDiaries.length === 0) {
      return res
        .status(404)
        .json({ message: "No scrapedDiaries found for the given KakaoId" });
    }
    res.json(scrapedDiaries);
  } catch (error) {
    next(error);
  }
}; // 테스트 미완료

exports.samePlaceDiary = async (req, res, next) => {
  try {
    const { placeId } = res.params;

    if (!placeId) res.json({ message: "PlaceId is not found" });

    const samePlaceDiaries = await diaryService.samePlaceDiarie(placeId);

    if (samePlaceDiaries.length === 0) {
      return res
        .status(404)
        .json({ message: "No samePlaceDiaries found for the given KakaoId" });
    }
    res.json(samePlaceDiaries);
  } catch (error) {
    next(error);
  }
}; // 테스트 미완료

exports.scrapDiary = async (req, res, next) => {
  try {
    const { KakaoId } = req.KakaoId;
    const { diaryId } = req.diaryId;

    if (!KakaoId || !diaryId) res.json({ message: "No KakaoId OR diaryId" });

    await diaryService.scrapDiary(KakaoId, diaryId);

    return res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};