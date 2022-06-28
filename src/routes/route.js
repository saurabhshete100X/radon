const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const BlogController = require("../controllers/BlogController")
const middleWare = require("../middlewares/auth")


router.get("/test-me", function(req, res) {
        res.send("My first ever api!")
    })
    ////////////////////Project1 blog////////////////////////////////////////////
router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.loginUser)

router.post("/blogs", middleWare.authentication, BlogController.createBlog)

router.get("/blogs", middleWare.authentication, BlogController.getBlog)

router.put("/blogs/:blogId", middleWare.authentication, BlogController.updateBlog)

router.delete("/blogs/:blogId", middleWare.authentication, BlogController.deleteBlog)
router.delete("/blogs", middleWare.authentication, BlogController.deleteParams)



module.exports = router;