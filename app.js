const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });

// 외부 API를 이용해 DB를 채우는 스크립트 가져오기
const fetchAndSavePlaces = require('./scripts/populateDatabase');

// 모델 불러오기 (필요시)
const District = require("./models/district");

// 라우터 불러오기
const placeRoutes = require('./routes/place.api');
const courseRoutes = require('./routes/course.api');
const diaryRoutes = require('./routes/diaries.api');
const mainRoutes = require('./routes/main.api');
const userRoutes = require('./routes/user.api');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
서버 종료 (수동)
lsof -i :3000  //포트 3000 사용 중인 프로세스 찾기
kill -9 <PID>  //종료시키기
*/

// MongoDB 연결
const mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL)
  .then(() => {
    console.log("Connected to database successfully");
    
    // 프로그램 실행 시 외부 API에서 데이터 가져와서 DB 채우기 (한 번만 실행)
    fetchAndSavePlaces(); // 외부 API 호출 및 데이터 저장
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });

// 라우터 연결
app.use('/place', placeRoutes);  // 장소 관련 API
app.use('/course', courseRoutes);  // 코스 관련 API
app.use('/main',mainRoutes);
app.use('/diary',diaryRoutes);
app.use('/users',userRoutes);

// 다른 API 라우트가 있다면 여기에 추가
// app.use('/someOtherRoute', someOtherRoute);

// 포트 열어주기
const port = process.env.PORT;
app.listen(port, () => console.log("server on at " + port));
