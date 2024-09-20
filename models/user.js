const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },  // 이메일을 고유 식별자로 사용
    nickname: { type: String },  // 사용자 닉네임
    profile_image: { type: String }  // 프로필 이미지 (URL 또는 파일 경로)
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;


