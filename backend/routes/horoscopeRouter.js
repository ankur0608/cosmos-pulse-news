// server/routes/horoscopeRouter.js
const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const CONCURRENCY_LIMIT = 8;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const CACHE_FILE = path.join(__dirname, "horoscopeCache.json");

// --- English horoscope config ---
const languages = {
  english: {
    baseUrl: "https://www.astrosage.com/horoscope/daily-{sign}-horoscope.asp",
    signs: {
      aries: "aries",
      taurus: "taurus",
      gemini: "gemini",
      cancer: "cancer",
      leo: "leo",
      virgo: "virgo",
      libra: "libra",
      scorpio: "scorpio",
      sagittarius: "sagittarius",
      capricorn: "capricorn",
      aquarius: "aquarius",
      pisces: "pisces",
    },
    labels: {
      luckyNumber: ["Lucky Number", "Lucky Number :-"],
      luckyColor: ["Lucky Color", "Lucky Color :-"],
      remedy: ["Remedy", "Remedy :-"],
    },
  },
};

// ----------------- Scraper Functions -----------------
async function scrapeHoroscopeDetails(page, labels) {
  return await page.evaluate((labels) => {
    const horoscopeEl =
      document.querySelector(".ui-large-content") ||
      document.querySelector(".ui-large-content.text-justify") ||
      document.querySelector(".ui-horoscope-content") ||
      document.querySelector(".ui-content-block");

    const horoscope = horoscopeEl ? horoscopeEl.innerText.trim() : null;

    let luckyNumber = null;
    let luckyColor = null;
    let remedy = null;

    const divs = Array.from(document.querySelectorAll("div.ui-large-content"));
    divs.forEach((div) => {
      const b = div.querySelector("b");
      if (!b) return;
      const labelText = b.innerText.trim();
      const value = div.innerText.replace(b.innerText, "").trim();

      if (labels.luckyNumber.some((l) => labelText.includes(l)))
        luckyNumber = value;
      else if (labels.luckyColor.some((l) => labelText.includes(l)))
        luckyColor = value;
      else if (labels.remedy.some((l) => labelText.includes(l))) remedy = value;
    });

    const ratings = {};
    document.querySelectorAll(".col-sm-4, .col-sm-6").forEach((div) => {
      const category = div
        .querySelector("b")
        ?.innerText.replace(":", "")
        .trim();
      if (!category) return;

      const stars = Array.from(div.querySelectorAll("img")).map((img) =>
        img.getAttribute("src").includes("star2.gif") ? 1 : 0
      );
      const filledStars = stars.reduce((sum, s) => sum + s, 0);
      if (filledStars > 0) ratings[category] = filledStars;
    });

    return { horoscope, luckyNumber, luckyColor, remedy, ratings };
  }, labels);
}

async function scrapeWithRetry(browser, task) {
  const { lang, sign, url, labels } = task;
  let page;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on("request", (req) => {
        if (
          ["image", "stylesheet", "font", "media"].includes(req.resourceType())
        )
          req.abort();
        else req.continue();
      });

      console.log(`[${lang}] Scraping ${sign} (Attempt ${attempt}) → ${url}`);
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

      const data = await scrapeHoroscopeDetails(page, labels);
      await page.close();

      console.log(`✅ [${lang}] Success: ${sign}`);
      return { lang, sign, status: "fulfilled", value: data };
    } catch (err) {
      console.error(
        `[${lang}] Failed attempt ${attempt} for ${sign}: ${err.message}`
      );
      if (page) await page.close();

      if (attempt === MAX_RETRIES) {
        return {
          lang,
          sign,
          status: "rejected",
          reason: err.message,
          value: {
            horoscope: null,
            luckyNumber: null,
            luckyColor: null,
            remedy: null,
            ratings: {},
          },
        };
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
}

// ----------------- Core Scraper (Reusable) -----------------
async function runHoroscopeScraper() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const allTasks = [];
  const config = languages.english;
  for (const [sign, slug] of Object.entries(config.signs)) {
    allTasks.push({
      lang: "english",
      sign,
      url: config.baseUrl.replace("{sign}", slug),
      labels: config.labels,
    });
  }

  const results = [];
  const runningPromises = [];

  try {
    for (const task of allTasks) {
      const promise = scrapeWithRetry(browser, task);
      runningPromises.push(promise);

      promise.then((result) => {
        results.push(result);
        const index = runningPromises.indexOf(promise);
        if (index > -1) runningPromises.splice(index, 1);
      });

      if (runningPromises.length >= CONCURRENCY_LIMIT) {
        await Promise.race(runningPromises);
      }
    }

    await Promise.all(runningPromises);

    const finalOutput = { english: {} };
    results.forEach((r) => {
      if (r) finalOutput[r.lang][r.sign] = r.value;
    });

    fs.writeFileSync(CACHE_FILE, JSON.stringify(finalOutput, null, 2));
    return finalOutput;
  } catch (err) {
    throw new Error(err.message);
  } finally {
    await browser.close();
  }
}

// ----------------- Routes -----------------

// Use cached data
router.get("/", async (req, res) => {
  if (fs.existsSync(CACHE_FILE)) {
    const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
    return res.json({ success: true, data: cachedData });
  }
  // If cache not found, trigger scrape
  try {
    const data = await runHoroscopeScraper();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Routes
router.get("/english", async (req, res) => {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
      return res.json({ success: true, data: cachedData });
    }
    const data = await runHoroscopeScraper();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
// Force re-scrape
router.get("/scrape", async (req, res) => {
  try {
    const data = await runHoroscopeScraper();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export router and scraper function
module.exports = { router, runHoroscopeScraper };
