const express = require('express');
const router = express.Router();
const CowinController = require("../controllers/cowinController")



router.get("/test-me", function(req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

//////assignment below////////////////////
router.get("/cowin/getDistrictId", CowinController.getDistrictId)

router.get("/getWhether", CowinController.getWhether)

router.get("/getWeatherList", CowinController.getWeatherList)

router.get("/getMeme", CowinController.getMeme)
router.post("/confrimOTP", CowinController.confrimOtp)

router.post("/createMeme", CowinController.createMeme)
    // WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;