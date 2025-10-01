// server/routes/newsRouter.js
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

// --- Constants ---
const TOP_HEADLINES_QUERY = "top-headlines";

// --- Helper Functions ---

/**
 * @description Creates a date string for the past N days in YYYY-MM-DD format.
 * @param {number} daysAgo - How many days back to set the date.
 * @returns {string} The formatted date string (e.g., "2025-09-24").
 */
function getPastDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

const sevenDaysAgo = getPastDate(7);

// --- API Configuration ---
const apiSources = [
  {
    name: "NewsAPI",
    enabled: true,
    buildUrl: (query) => {
      const apiKey = process.env.NEWS_API_KEY;
      const encodedQuery = encodeURIComponent(query);
      if (query === TOP_HEADLINES_QUERY) {
        return `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
      }
      return `https://newsapi.org/v2/everything?q=${encodedQuery}&language=en&from=${sevenDaysAgo}&sortBy=publishedAt&apiKey=${apiKey}`;
    },
    normalize: (data) =>
      (data.articles || []).map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source?.name || "Unknown",
        publishedAt: a.publishedAt,
        imageUrl: a.urlToImage,
      })),
  },
  {
    name: "GNews",
    enabled: true,
    buildUrl: (query) => {
      const apiKey = process.env.GNEWS_API_KEY;
      const encodedQuery = encodeURIComponent(query);
      if (query === TOP_HEADLINES_QUERY) {
        return `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=${apiKey}`;
      }
      return `https://gnews.io/api/v4/search?q=${encodedQuery}&lang=en&from=${new Date(
        sevenDaysAgo
      ).toISOString()}&token=${apiKey}`;
    },
    normalize: (data) =>
      (data.articles || []).map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source?.name || "Unknown",
        publishedAt: a.publishedAt,
        imageUrl: a.image,
      })),
  },
  {
    name: "Mediastack",
    enabled: true,
    buildUrl: (query) => {
      const apiKey = process.env.MEDIASTACK_API_KEY;
      const encodedQuery = encodeURIComponent(query);
      return `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${encodedQuery}&languages=en&date=${sevenDaysAgo},${getPastDate(
        0
      )}`;
    },
    normalize: (data) =>
      (data.data || []).map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source || "Unknown",
        publishedAt: a.published_at,
        imageUrl: a.image,
      })),
  },
];

// --- In-memory cache ---
const cache = {};
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

// --- Core Logic ---

/**
 * @description Fetches data from a URL with a timeout and handles errors gracefully.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<object|null>} The JSON response or null if an error occurs.
 */
async function safeFetch(url) {
  try {
    const res = await fetch(url, { timeout: 15000 });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.json();
  } catch (err) {
    console.error(`❌ Fetch failed: ${err.message}`);
    return null;
  }
}

/**
 * @description Fetches, aggregates, and processes news from multiple API sources.
 * @param {string} query - The search query or topic.
 * @returns {Promise<Array<object>>} A sorted and deduplicated array of news articles.
 */
async function fetchAllNews(query = "general") {
  const now = Date.now();
  const cacheKey = query.toLowerCase();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    console.log(`CACHE HIT for query: "${cacheKey}"`);
    return cache[cacheKey].articles;
  }
  console.log(`CACHE MISS for query: "${cacheKey}"`);

  try {
    const activeSources = apiSources.filter(
      (s) => s.enabled && process.env[s.name.toUpperCase() + "_API_KEY"]
    );
    const fetchPromises = activeSources.map((source) =>
      safeFetch(source.buildUrl(query))
    );
    const responses = await Promise.all(fetchPromises);

    const articles = responses.flatMap((data, index) => {
      if (!data) return [];
      return activeSources[index].normalize(data);
    });

    const seenUrls = new Set();
    const uniqueArticles = articles.filter((a) => {
      if (!a || !a.url || !a.title || seenUrls.has(a.url)) return false;
      seenUrls.add(a.url);
      return true;
    });

    uniqueArticles.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    cache[cacheKey] = { articles: uniqueArticles, timestamp: now };
    return uniqueArticles;
  } catch (error) {
    console.error(`Error processing news for query "${query}":`, error);
    return [];
  }
}

/**
 * @description A helper function to handle the common logic for all news routes.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {() => string} getQuery - A function that returns the query string for fetchAllNews.
 */
async function handleNewsRequest(req, res, getQuery) {
  try {
    const query = getQuery(req);
    const limit = parseInt(req.query.limit, 10) || 20;
    const news = await fetchAllNews(query);
    res.json({ success: true, articles: news.slice(0, limit) });
  } catch (err) {
    console.error("Route handler error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching news." });
  }
}

// --- API Routes ---

router.get("/", (req, res) => {
  handleNewsRequest(req, res, (request) => request.query.q || "general");
});

router.get("/top-headlines", (req, res) => {
  handleNewsRequest(req, res, () => TOP_HEADLINES_QUERY);
});

router.get("/search", (req, res) => {
  const keyword = req.query.q;
  if (!keyword) {
    return res
      .status(400)
      .json({ success: false, message: "Search query 'q' is required" });
  }
  handleNewsRequest(req, res, (request) => request.query.q);
});

router.get("/category/:categoryName", (req, res) => {
  const { categoryName } = req.params;
  if (!categoryName) {
    return res
      .status(400)
      .json({ success: false, message: "Category name is required." });
  }
  handleNewsRequest(req, res, (request) => request.params.categoryName);
});

module.exports = router;
