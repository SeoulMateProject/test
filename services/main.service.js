const District = require("../models/district");
const Place = require("../models/place");
const LikeFolder = require("../models/likeFolder");

// 상위 장소 (District) 리스트업
exports.getDistricts = async () => {
  return await District.find();
};

// 하위 장소 (Place) 리스트업
exports.getPlacesByDistrict = async (DistrictId) => {
  return await Place.find({ DistrictId });
};

// 핫한 장소 리스트업
exports.getHotPlaces = async () => {
  return await Place.aggregate([
    {
      $lookup: {
        from: "districts",
        localField: "DistrictId",
        foreignField: "_id",
        as: "District"
      }
    },
    { $unwind: "$District" },
    {
      $project: {
        DistrictName: "$District.DistrictName",
        PlaceName: 1,
        PlaceImage: 1,
        Like: 1
      }
    },
    { $sort: { Like: -1 } },
    { $limit: 10 } // 핫한 장소 상위 10개
  ]);
};

// 핫한 코스 리스트업
// 핫한 코스 리스트업
exports.getHotCourses = async () => {
    return await LikeFolder.aggregate([
      {
        $lookup: {
          from: "places",
          localField: "LikedPlaceId",
          foreignField: "_id",
          as: "Places"
        }
      },
      { $unwind: "$Places" },
      {
        $lookup: {
          from: "districts",
          localField: "Places.DistrictId",
          foreignField: "_id",
          as: "Places.District"
        }
      },
      { $unwind: "$Places.District" },
      {
        $group: {
          _id: "$_id",
          FolderName: { $first: "$FolderName" },
          LikedFolderImage: { $first: "$LikedFolderImage" }, // 폴더 이미지
          Like: { $first: "$Like" },
          Places: {
            $push: {
              PlaceName: "$Places.PlaceName",
              DistrictName: "$Places.District.DistrictName",
              Like: "$Places.Like",
              PlaceImage: "$Places.PlaceImage" // 장소 이미지 추가
            }
          }
        }
      },
      { $sort: { Like: -1 } },
      { $limit: 5 } // 핫한 코스 상위 5개
    ]);
  };
  