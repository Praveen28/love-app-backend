const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/incomeController");

router.get("/user/:id", incomeController.getIncomeData);

router.post("/bankName", incomeController.postBankName);

router.post("/incomeData", incomeController.postIncomeData);

router.post("/delIncomeData", incomeController.postDeleteIncomeData);

module.exports = router;
