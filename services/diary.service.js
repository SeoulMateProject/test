const MyPage = require("../models/myPage");
const Diary = require("../models/diary");
require("dotenv").config();

exports.createDiary = async (diaryData) => {
  const diary = new Diary({
    ...diaryData,
    Date: new Date(),
  });
  return await diary.save();
};

exports.updateDiary = async (diaryId, diaryData) => {
  console.log(diaryId);
  const updatedDiary = await Diary.findOneAndUpdate({ diaryId }, diaryData, {
    new: true,
  });
  if (!updatedDiary) {
    throw new Error("Diary not found");
  }
  return updatedDiary;
};

exports.deleteDiary = async (diaryId) => {
  const deletedDiary = await Diary.findOneAndDelete(diaryId);
  if (!deletedDiary) {
    throw new Error("Diary not found");
  }
  return deletedDiary;
};

exports.findMyDiaries = async (KakaoId) => {
  try {
    const diaries = await Diary.find({ KakaoId });
    return diaries;
  } catch (error) {
    throw new Error("Error retrieving diaries: " + error.message);
  }
};

exports.scrapedDiaries = async (KakaoId) => {
  try {
    const myPage = await MyPage.findOne({ KakaoId: KakaoId });

    if (!myPage) throw new Error("My Page not found");

    const diaries = await Diary.find({
      DiaryId: { $in: myPage.scrapedDiaryId },
    });
    return diaries;
  } catch (error) {
    throw new Error("Error retrieving diaries: " + error.message);
  }
};

exports.samePlaceDiaries = async (PlaceId) => {
  try {
    const samePlaceDiarie = await Diary.findOne({ PlaceId: PlaceId });

    if (!samePlaceDiarie) throw new Error("samePlaceDiaries is not found");

    return samePlaceDiarie;
  } catch (error) {
    throw new Error("Error retrieving diaries: " + error.message);
  }
};

exports.scrapDiary = async (KakaoId, diaryId) => {
  try {
    const myPage = await MyPage.findOne({ KakaId: KakaoId });
    if (!myPage) throw new Error("My Page error");
    if (myPage.scrapedDiaryId.includes(diaryId)) {
      return { success: false, message: "이미 스크랩된 일기입니다." };
    }
    myPage.scrapedDiaryId.push(diaryId);
    await myPage.save();
    return { success: true, message: "일기 스크랩에 성공했습니다." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
exports.Mydiary;