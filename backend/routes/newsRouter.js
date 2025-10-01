// server/routes/newsRouter.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

// --- API Keys (use env vars in production) ---
const newsAPIKey =
  process.env.NEWSAPI_KEY || "a13409cf0f9e419c92433e842c29639c";
const gnewsAPIKey = process.env.GNEWS_KEY || "e64e1672020362c16a3e3fce5f2c0e3f";
const mediastackKey =
  process.env.MEDIASTACK_KEY || "38e76a6bedfb87de79610bba6e4baa13";

// --- In-memory cache ---
let cache = {};
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// --- Safe fetch helper ---
async function safeFetch(url) {
  try {
    const res = await fetch(url, { timeout: 15000 });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Fetch failed: ${url} → ${err.message}`);
    return null;
  }
}

// --- Core fetch function ---
async function fetchAllNews(query = "general") {
  const now = Date.now();
  if (cache[query] && now - cache[query].timestamp < CACHE_TTL) {
    return cache[query].articles;
  }

  const urls = [
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${newsAPIKey}`,
    `https://gnews.io/api/v4/search?q=${query}&token=${gnewsAPIKey}`,
    `http://api.mediastack.com/v1/news?access_key=${mediastackKey}&keywords=${query}&languages=en`,
  ];

  const data = await Promise.all(urls.map((u) => safeFetch(u)));

  const articles = data.flatMap((d, idx) => {
    if (!d) return [];
    switch (idx) {
      case 0: // NewsAPI
        return (d.articles || []).map((a) => ({
          title: a.title,
          description: a.description,
          url: a.url,
          source: a.source?.name || "Unknown",
          publishedAt: a.publishedAt,
          imageUrl: a.urlToImage,
        }));
      case 1: // GNews
        return (d.articles || []).map((a) => ({
          title: a.title,
          description: a.description,
          url: a.url,
          source: a.source?.name || "Unknown",
          publishedAt: a.publishedAt,
          imageUrl: a.image,
        }));
      case 2: // Mediastack
        return (d.data || []).map((a) => ({
          title: a.title,
          description: a.description,
          url: a.url,
          source: a.source || "Unknown",
          publishedAt: a.published_at,
          imageUrl: a.image,
        }));
      default:
        return [];
    }
  });

  // Remove duplicates by URL
  const seen = new Set();
  const uniqueArticles = articles.filter((a) => {
    if (seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // Sort newest first
  uniqueArticles.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  // Save to cache
  cache[query] = { articles: uniqueArticles, timestamp: now };

  return uniqueArticles;
}

// --- Routes ---

// GET /api/news?q=keyword&limit=20
router.get("/", async (req, res) => {
  const query = req.query.q || "general";
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const news = await fetchAllNews(query);
    res.json({ success: true, articles: news.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
});

// GET /api/news/top-headlines?limit=10
router.get("/top-headlines", async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const news = await fetchAllNews("top-headlines");
    res.json({ success: true, articles: news.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch top headlines" });
  }
});

// GET /api/news/latest?limit=10
router.get("/latest", async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const news = await fetchAllNews("general");
    res.json({ success: true, articles: news.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch latest news" });
  }
});

// GET /api/news/source/:sourceName?limit=10
router.get("/source/:sourceName", async (req, res) => {
  const sourceName = req.params.sourceName.toLowerCase();
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const news = await fetchAllNews();
    const filtered = news.filter((a) => a.source.toLowerCase() === sourceName);
    res.json({ success: true, articles: filtered.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch news by source" });
  }
});

router.get("/search", async (req, res) => {
  const keyword = (req.query.q || "").toLowerCase();
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const news = await fetchAllNews();
    const filtered = news.filter((a) =>
      a.title.toLowerCase().includes(keyword)
    );
    res.json({ success: true, articles: filtered.slice(0, limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to search news" });
  }
});

module.exports = router;
