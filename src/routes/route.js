const express = require('express');

const logger = require('../logger/logger.js');

const helper = require('../Util/helper.js');

const formatter = require('../Validator/formatter');

const router = express.Router();

const abc = require('lodash');

// router.get('/test-me', function (req, res) {
//     logger.welcome();
//     helper.printDate();
//     helper.printMonth();
//     helper.getBatchInfo();
//     formatter.trim();
//     formatter.lowerCase();
//     formatter.upperCase();

//     res.send("Api works successfully, Check your terminal")
// })

router.get('/hello', function (req, res) {
    let array = ["Jan", "Feb", "Mar", "April", "May", "Jun", "July", "August", "Sep", "Oct", "Nov", "Dec"];
    console.log(abc.chunk(array, 4))



    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

    let odds = arr.filter(Arrayno => Arrayno % 2)

    odds2 = abc.tail(odds);

    console.log(odds2)


    let arr1 = [1, 2, 3, 2, 4, 1, 3]
    let arr2 = [1, 2, 3, 2, 9, 9, 1, 3]
    let arr3 = [7, 2, 7, 8, 8, 2, 3, 3]
    let arr4 = [1, 2, 3, 8, 7, 8, 9, 3]
    let arr5 = [5, 4, 5, 6, 2, 4, 6, 2]

    let uniqueArray = abc.union(arr1, arr2, arr3, arr4, arr5)

    console.log(uniqueArray);

    let movie1 = ["horror", "the shining"]
    let movie2 = ["Drama", "Titanic"]
    let movie3 = ["thriller", "shutter Island"]
    let movie4 = ["fantasy", "pans labyrinth"]

    let moviesDetails = abc.fromPairs([movie1, movie2, movie3, movie4])
    console.log(moviesDetails);

    res.send('Hello there!')


})


module.exports = router;


