const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    DistrictId: { type: Schema.Types.ObjectId, ref: 'District', required: true },  // District의 _id를 참조
    PlaceName: { type: String, required: true },  // 장소 이름
    PlaceImage: { type: String },  // 이미지 파일 경로
    Like: { type: Number, default: 0 },  // 좋아요 수
    Description: { type: String }  // 장소 설명
}, { timestamps: true });

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;