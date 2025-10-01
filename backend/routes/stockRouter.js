// // backend/routes/stockRouter.js
// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// // Map friendly names to Yahoo symbols
// const symbolMap = {
//   "^NSEI": "^NSEI", // Nifty 50
//   "^BSESN": "^BSESN", // Sensex
//   "^DJI": "^DJI", // Dow Jones
// };

// // Get stock quote by symbol
// router.get("/quote/:symbol", async (req, res) => {
//   try {
//     let { symbol } = req.params;
//     if (symbolMap[symbol.toUpperCase()])
//       symbol = symbolMap[symbol.toUpperCase()];

//     const options = {
//       method: "GET",
//       url: `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary`,
//       params: { symbol, region: "US" }, // region can be IN for NSE/BSE
//       headers: {
//         "x-rapidapi-key": process.env.RAPIDAPI_KEY, // add to .env
//         "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
//       },
//     };

//     const response = await axios.request(options);
//     const quote = response.data.price;

//     if (!quote) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Symbol not found" });
//     }

//     res.json({
//       success: true,
//       symbol,
//       data: {
//         c: quote.regularMarketPrice?.raw || 0, // current price
//         d: quote.regularMarketChange?.raw || 0, // change
//         dp: quote.regularMarketChangePercent?.raw || 0, // change %
//       },
//     });
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch stock data" });
//   }
// });

// module.exports = router;
