const mainService = require("../services/main.service");

// 상위 장소 (District) 리스트업
exports.getDistricts = async (req, res, next) => {
  try {
    const districts = await mainService.getDistricts();
    res.status(200).json(districts);
  } catch (error) {
    next(error);
  }
};

// 하위 장소 (Place) 리스트업
exports.getPlacesByDistrict = async (req, res, next) => {
  try {
    const { DistrictId } = req.params;
    const places = await mainService.getPlacesByDistrict(DistrictId);
    res.status(200).json(places);
  } catch (error) {
    next(error);
  }
};

// 핫한 장소 리스트업
exports.getHotPlaces = async (req, res, next) => {
  try {
    const hotPlaces = await mainService.getHotPlaces();
    res.status(200).json(hotPlaces);
  } catch (error) {
    next(error);
  }
};

// 핫한 코스 리스트업
exports.getHotCourses = async (req, res, next) => {
  try {
    const hotCourses = await mainService.getHotCourses();
    res.status(200).json(hotCourses);
  } catch (error) {
    next(error);
  }
};
