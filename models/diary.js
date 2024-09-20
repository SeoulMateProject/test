const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // 사용자 ID 참조
    PlaceId: { type: Schema.Types.ObjectId, ref: 'Place', required: true },  // 장소 ID 참조
    DiaryImage: { type: String, required: true },  // 일기 이미지 (URL 또는 파일 경로)
    Title: { type: String, required: true },  // 일기 제목
    Content: { type: String, required: true },  // 일기 내용
    Like: { type: Number, default: 0 },  // 좋아요 수
    Date: { type: Date, default: Date.now },  // 일기 작성 날짜
    Public: { type: Boolean, default: true }  // 공개 여부
}, { timestamps: true });

const Diary = mongoose.model("Diary", diarySchema);
module.exports = Diary;
