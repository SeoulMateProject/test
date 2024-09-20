const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeFolderSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // 사용자 ID 참조
    FolderName: { type: String, required: true },  // 폴더 이름
    LikedFolderImage: { type: String },  // 폴더 대표 이미지 (URL 또는 파일 경로)
    LikedPlaceId: [{ type: Schema.Types.ObjectId, ref: 'Place' }],  // 좋아요한 장소 ID 목록
    Public: { type: Boolean, default: true },  // 폴더 공개 여부
    Like: { type: Number, default: 0 }  // 폴더의 좋아요 수
}, { timestamps: true });

const LikeFolder = mongoose.model("LikeFolder", likeFolderSchema);
module.exports = LikeFolder;
