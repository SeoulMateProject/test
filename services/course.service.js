const LikeFolder = require('../models/likeFolder');

// 코스 폴더 생성 서비스
const MyPage = require('../models/myPage');  // MyPage 모델 가져오기

exports.createFolder = async (folderData) => {
  try {
    const folder = new LikeFolder(folderData);
    
    // 폴더 저장
    const savedFolder = await folder.save();
    
    // 사용자의 MyPage를 찾아 업데이트
    let userMyPage = await MyPage.findOne({ KakaoId: folderData.UserId });
    
    if (!userMyPage) {
      // MyPage가 없으면 새로 생성
      userMyPage = new MyPage({
        KakaoId: folderData.UserId,
        ScrapedPlaceFolder: [savedFolder._id], // 생성한 폴더를 스크랩한 폴더 목록에 추가
        ScrapedDiaryId: [] // 초기값으로 빈 배열
      });
    } else {
      // MyPage가 있으면 스크랩한 폴더 목록에 추가
      userMyPage.ScrapedPlaceFolder.push(savedFolder._id);
    }

    // MyPage 저장
    await userMyPage.save();
    
    return savedFolder;
  } catch (error) {
    console.error("Error in saving folder or updating MyPage: ", error);
    throw new Error("폴더 저장 또는 MyPage 업데이트 중 오류 발생");
  }
};

  

// 코스 폴더 이름 변경 서비스
exports.renameFolder = async (courseId, newFolderName) => {
    try {
        const folder = await LikeFolder.findById(courseId);
        if (!folder) throw new Error('해당 폴더를 찾을 수 없습니다.');
        
        folder.FolderName = newFolderName;
        await folder.save();
        return folder;
    } catch (error) {
        throw new Error('코스 폴더 이름 변경 중 오류 발생');
    }
};

// 코스 폴더 내 장소 삭제 서비스
exports.deletePlaceFromFolder = async (courseId, placeId) => {
    try {
        const folder = await LikeFolder.findById(courseId);
        if (!folder) throw new Error('해당 폴더를 찾을 수 없습니다.');

        folder.LikedPlaceId = folder.LikedPlaceId.filter(id => id.toString() !== placeId);
        await folder.save();
        return folder;
    } catch (error) {
        throw new Error('코스 폴더 내 장소 삭제 중 오류 발생');
    }
};
