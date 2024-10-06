const mongoose = require("mongoose");

// Helper function to format the date
function formatDate(date) {
  if (!date) return null;
  const isoString = date.toISOString();
  return isoString.replace("T", " ").replace("Z", "").slice(0, 26); // Removes 'T', 'Z' and formats up to microseconds
}

const binSchema = new mongoose.Schema({
  location: { type: String, required: true },
  binType: { type: Number, required: true },
  binStatus: { type: String, required: true },
  image: { type: String, required: true },
  lastUpdated: {
    type: Date,
    default: Date.now,
    set: formatDate, // Use the setter to format the date
  },
});

const Bin = mongoose.model("Bin", binSchema);

module.exports = Bin;
