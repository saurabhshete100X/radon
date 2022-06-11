
const express = require('express');
const router = express.Router();

router.get("/test-me-5", function (req, res) {
    res.send({msg:"Hii Middleware"})
})

router.get("/test-me-6", function (req, res) {
    res.send("My first ever api1!")
})

router.get("/test-me-7", function (req, res) {
    res.send("My first ever api2!")
})

router.get("/test-me-8", function (req, res) {
    res.send("My first ever api3!")
})

router.get("/test-me-9", function (req, res) {
    res.send("My first ever api4!")
})



module.exports = router;