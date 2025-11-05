// index.js
require('dotenv').config(); 

const express = require("express");
const cors =require("cors");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const {
  router: horoscopeRouter,
  runHoroscopeScraper,
} = require("./routes/horoscopeRouter");
const newsRouter = require("./routes/newsRouter");
// const stockRouter = require("./routes/stockRouter");
// const financialRouter = require("./routes/financialRouter");

const app = express();

// ------------------ CORS ------------------
// Allow multiple frontend origins (Vercel production + localhost dev)
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://cosmos-pulse-news.vercel.app"]
    : ["http://localhost:3000", "http://localhost:8080"];

// --- ADDED CONSOLE LOGS FOR DEBUGGING ---
console.log("--- Environment Debug ---");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Allowed Origins:", allowedOrigins);
console.log("News API Key Loaded:", process.env.NEWS_API_KEY ? "Yes" : "No - CHECK .env FILE");
console.log("---------------------------");
// ----------------------------------------

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman) or if origin is allowed
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

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

  // ------------------ Schedule Scraper (12:00 AM & 5:00 AM daily) ------------------
  cron.schedule(
    "0 0,5 * * *", // <-- THIS IS THE CHANGE (Runs at 12:00 AM and 5:00 AM)
    async () => {
      try {
        // I also updated the log message to be more general
        console.log("🕛 Running scheduled horoscope scraper..."); 
        await runHoroscopeScraper();
        console.log("✅ Horoscope data refreshed successfully.");
      } catch (err) {
        console.error("❌ Error refreshing horoscope data:", err.message);
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
});