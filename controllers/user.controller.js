const { getKakaoUserInfo, findOrCreateUser } = require('../services/user.service');

exports.login = async (req, res) => {
  const { access_token } = req.body; // POST 요청으로 받은 액세스 토큰

  if (!access_token) {
    return res.status(400).json({ error: "No access token provided" });
  }

  try {
    // 카카오 API를 사용하여 사용자 정보 가져오기
    const userInfo = await getKakaoUserInfo(access_token);

    // 사용자 정보로 데이터베이스에서 찾거나 없으면 생성
    const user = await findOrCreateUser(userInfo);

    // 성공적으로 로그인된 경우 사용자 정보 반환
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error('Error during login:', error.message);
    return res.status(500).json({ error: "Login failed" });
  }
};
