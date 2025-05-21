const { checkout,paymentVerification } = require("../controllers/paymentcontroller");
const express = require("express")
const router = express.Router()

console.log("hello chalo reached here");
router.post("/checkout",checkout)
router.post("/paymentverification",paymentVerification)

module.exports = router;
