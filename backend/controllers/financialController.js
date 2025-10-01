const fetch = require("node-fetch");

// Controller function
const getIBMFinancials = async (req, res) => {
  const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/IBM";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
      "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const financials = data.financialData || {};
    const tableData = [
      {
        revenue: financials.totalRevenue?.fmt || "N/A",
        netIncome: financials.netIncome?.fmt || "N/A",
        eps: financials.eps?.fmt || "N/A",
        profitMargin: financials.profitMargins?.fmt || "N/A",
      },
    ];

    res.json({ success: true, data: tableData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch data" });
  }
};

module.exports = { getIBMFinancials };
