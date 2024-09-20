const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myPageSchema = new Schema({
    KakaoId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // 사용자 카카오 ID 참조
    ScrapedPlaceFolder: [{ type: Schema.Types.ObjectId, ref: 'LikeFolder' }],  // 스크랩한 장소 폴더
    ScrapedDiaryId: [{ type: Schema.Types.ObjectId, ref: 'Diary' }]  // 스크랩한 일기 목록
}, { timestamps: true });

const MyPage = mongoose.model("MyPage", myPageSchema);
module.exports = MyPage;
