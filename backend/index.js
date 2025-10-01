// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const { router: horoscopeRouter, runHoroscopeScraper } = require("./routes/horoscopeRouter");
const newsRouter = require("./routes/newsRouter");
// const stockRouter = require("./routes/stockRouter");
// const financialRouter = require("./routes/financialRouter");

const app = express();

// ------------------ CORS ------------------
// Allow localhost for dev, and frontend URL(s) for production
const allowedOrigins = process.env.NODE_ENV === "production"
  ? ["https://cosmos-pulse-news.vercel.app"] // frontend production
  : ["http://localhost:8080"]; // local dev

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ------------------ Middleware ------------------
app.use(express.json());

// ------------------ Routes ------------------
app.use("/api/horoscope", horoscopeRouter);
app.use("/api/news", newsRouter);
// app.use("/api/stocks", stockRouter);
// app.use("/api/financials", financialRouter);

// ------------------ Error Handling ------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 3000;
const CACHE_FILE = path.join(__dirname, "routes/horoscopeCache.json");

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Initialize horoscope cache
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
