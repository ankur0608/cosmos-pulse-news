const express = require("express");
const router = express.Router();

const { getIBMFinancials } = require("../controllers/financialController");

// Route: GET /api/financials/ibm
router.get("/ibm", getIBMFinancials);

module.exports = router;
