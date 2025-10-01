const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const {
  router: horoscopeRouter,
  runHoroscopeScraper,
} = require("./routes/horoscopeRouter");
const newsRouter = require("./routes/newsRouter");
// const stockRouter = require("./routes/stockRouter");
// const financialRouter = require("./routes/financialRouter");

const app = express();

// Use CORS for all origins in production, allow localhost for local dev
const origin =
  process.env.NODE_ENV === "production"
    ? "*" // Allow all origins in production
    : "http://localhost:8080";

app.use(cors({ origin, credentials: true }));
app.use(express.json());

app.use("/api/horoscope", horoscopeRouter);
app.use("/api/news", newsRouter);
// app.use("/api/stocks", stockRouter);
// app.use("/api/financials", financialRouter);

// Dynamic port for Render
const PORT = process.env.PORT || 3000;
const CACHE_FILE = path.join(__dirname, "routes/horoscopeCache.json");

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  if (!fs.existsSync(CACHE_FILE)) {
    try {
      console.log("🔮 Horoscope cache missing. Running scraper...");
      await runHoroscopeScraper();
      console.log("✅ Horoscope data cached successfully.");
    } catch (err) {
      console.error("❌ Failed to scrape horoscopes:", err.message);
    }
  } else {
    console.log("🟢 Horoscope cache exists. Skipping scraper.");
  }
});
