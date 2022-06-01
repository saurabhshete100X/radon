const express = require('express');

const logger = require('../logger/logger.js');

const helper = require('../Util/helper.js');

const formatter = require('../Validator/formatter');

const router = express.Router();

router.get('/test-me', function(req, res){
    logger.welcome();
    helper.printDate();
    helper.printMonth();
    helper.getBatchInfo();
    formatter.trim();
    formatter.lowerCase();
    formatter.upperCase();

    res.send("Api works successfully, Check your terminal")
})



module.exports = router;