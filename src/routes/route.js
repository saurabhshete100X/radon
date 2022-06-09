const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require ("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor)

router.post("/createBook", bookController.createBook  )

router.post("/createPublisher", publisherController.createPublisher)

router.get("/getAuthorsData", authorController.getAuthorsData)

router.get("/getBooksData", bookController.getBooksData)

router.get("/getPublishersDetails", publisherController.getPublishersDetails)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

router.put("/booksByPut", bookController.booksByPut)

router.put("/authorRating", bookController.authorRating)

module.exports = router;