const axios = require('axios');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const District = require('../models/district'); // District 모델 가져오기
const Place = require('../models/place');

// API URL을 여기에 정의
const apiUrl = 'https://www.visitseoul.net/file_save/OPENAPI/OPEN_API_kr.xml'; // 실제 API URL로 변경

async function fetchAndSavePlaces() {
  try {
    // API 요청
    const response = await axios.get(apiUrl);
    const xmlData = response.data;

    // XML 데이터를 JSON으로 파싱
    const parsedData = await parser.parseStringPromise(xmlData);

    // XML 데이터 구조 출력
    // console.log("파싱된 데이터 구조:", JSON.stringify(parsedData, null, 2));

    // Table1 태그의 데이터 접근
    const placesData = parsedData.NewDataSet.Table1;

    if (!placesData || !Array.isArray(placesData)) {
      throw new Error("장소 데이터를 찾을 수 없습니다. XML 구조를 확인하세요.");
    }

    // 장소 데이터를 순회하며 저장
    for (const place of placesData) {
      const address = place.COT_ADDR ? place.COT_ADDR[0] : ""; // COT_ADDR의 첫 번째 값 사용
      const districtNameMatch = address.match(/서울\s(\S+구)/);

      let districtName = "알 수 없음";
      if (districtNameMatch) {
        districtName = districtNameMatch[1];
      }

      let district = await District.findOne({ DistrictName: districtName });
      if (!district) {
        district = new District({ DistrictName: districtName });
        await district.save();
      }

      const existingPlace = await Place.findOne({ PlaceName: place.TITLE[0] });
      if (!existingPlace) {
        const newPlace = new Place({
          DistrictId: district._id,
          PlaceName: place.TITLE ? place.TITLE[0] : "알 수 없음",
          PlaceImage: place.COT_HOMEPAGE ? place.COT_HOMEPAGE[0] : "", // 이미지 대신 홈페이지 URL 사용
          Description: place.COT_USE_TIME_DESC ? place.COT_USE_TIME_DESC[0] : "",
        });

        await newPlace.save();
        console.log(`Saved: ${newPlace.PlaceName}`);
      }
    }

    console.log('Data import complete.');
  } catch (error) {
    console.error('Error fetching or saving places:', error);
  }
}

// export를 통해 다른 파일에서 호출 가능하게 함
module.exports = fetchAndSavePlaces;
