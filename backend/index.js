const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const {
  router: horoscopeRouter,
  runHoroscopeScraper,
} = require("./routes/horoscopeRouter");
const newsRouter = require("./routes/newsRouter");
// const stockRouter = require("./routes/stockRouter"); // ✅ import stock router
// const financialRouter = require("./routes/financialRouter");

const app = express();
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(express.json());

app.use("/api/horoscope", horoscopeRouter);
app.use("/api/news", newsRouter);
// app.use("/api/stocks", stockRouter); // ✅ mount stock routes
// app.use("/api/financials", financialRouter);
const PORT = 3000;
const CACHE_FILE = path.join(__dirname, "routes/horoscopeCache.json");

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

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
