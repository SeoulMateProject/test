const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');

// 코스 폴더 생성 라우트
router.post('/create', courseController.createFolder);

// 코스 폴더 이름 변경 라우트
router.put('/rewritename/:courseId', courseController.renameFolder);

// 코스 폴더 내 장소 삭제 라우트
router.delete('/delete/:courseId', courseController.deletePlaceFromFolder);

module.exports = router;
