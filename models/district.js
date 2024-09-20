const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const districtSchema = new Schema({
    DistrictName: { type: String, required: true }  // 구 이름
}, { timestamps: true });

const District = mongoose.model("District", districtSchema);
module.exports = District;
