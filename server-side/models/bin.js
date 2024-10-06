// models/bin.js
const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  location: { type: String, required: true },
  binType: { type: Number, required: true },
  binStatus: { type: String, required: true },
  image: { type: String, required: true },
});

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;
