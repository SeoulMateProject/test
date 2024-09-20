const courseService = require('../services/course.service');

// 코스 폴더 생성 컨트롤러
exports.createFolder = async (req, res) => {
    try {
      const folderData = req.body;
      const newFolder = await courseService.createFolder(folderData);
      
      res.status(201).json({
        success: true,
        data: newFolder,
      });
    } catch (error) {
      console.error("Error creating folder: ", error);
      
      res.status(500).json({
        success: false,
        message: "코스 폴더 생성 중 오류 발생",
        error: error.message // 에러 메시지 추가
      });
    }
  };
  
  

// 코스 폴더 이름 변경 컨트롤러
exports.renameFolder = async (req, res) => {
    const { courseId } = req.params;
    const { newFolderName } = req.body;
    try {
        const updatedFolder = await courseService.renameFolder(courseId, newFolderName);
        res.status(200).json({ success: true, folder: updatedFolder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 코스 폴더 내 장소 삭제 컨트롤러
exports.deletePlaceFromFolder = async (req, res) => {
    const { courseId } = req.params;
    const { placeId } = req.body;
    try {
        const updatedFolder = await courseService.deletePlaceFromFolder(courseId, placeId);
        res.status(200).json({ success: true, folder: updatedFolder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
