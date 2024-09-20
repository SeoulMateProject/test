const axios = require("axios");
const User = require("../models/User");
require("dotenv").config();

exports.getKakaoUserInfo = async (accessToken) => {
  try {
    // 액세스 토큰으로 사용자 정보 요청
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    // 응답 로그 출력 (디버깅용)
    console.log("Kakao API user response:", userResponse.data);

    const kakaoAccount = userResponse.data.kakao_account;
    
    // 동의받은 항목 확인 후 추출
    return {
      email: kakaoAccount.email || "No email",  // 이메일 (필수 항목, 고유 식별자로 사용)
      nickname: kakaoAccount.profile?.nickname || "No nickname",  // 프로필 닉네임
      profile_image: kakaoAccount.profile?.profile_image_url || "No image"  // 프로필 이미지
    };
  } catch (error) {
    console.error("Kakao API Error:", error.response ? error.response.data : error.message);
    throw new Error("Failed to fetch Kakao user info");
  }
};

exports.findOrCreateUser = async (userInfo) => {
  try {
    // email로 사용자 찾기
    let user = await User.findOne({ email: userInfo.email });

    if (user) {
      return user;  // 기존 사용자 반환
    } else {
      // 새로운 사용자 생성
      user = new User(userInfo);
      return await user.save();  // 저장 후 반환
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to find or create user");
  }
};
