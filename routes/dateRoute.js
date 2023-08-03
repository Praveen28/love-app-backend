const express = require("express");
const router = express.Router();

const dateController = require("../controllers/dateController");

router.get("/get-dates/:id", dateController.getDates);

router.post("/post-dates", dateController.postDates);

router.post("/del-record", dateController.postDeleteData);

module.exports = router;
