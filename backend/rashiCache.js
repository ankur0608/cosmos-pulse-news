const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "data/english-rashi.json");

let englishRashiCache = null;

// Load JSON from file into memory
function loadRashiData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    englishRashiCache = JSON.parse(raw);
    console.log("✅ English Rashi Data loaded into memory");
  } catch (err) {
    console.error("❌ Failed to load Rashi Data:", err.message);
  }
}

// Expose cache and reload function
module.exports = {
  getEnglishRashi: () => englishRashiCache,
  reloadRashiData: loadRashiData,
};

// Initial load
loadRashiData();
