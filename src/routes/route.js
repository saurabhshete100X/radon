const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const BlogController = require("../controllers/BlogController")



router.get("/test-me", function(req, res) {
        res.send("My first ever api!")
    })
    ////////////////////Project1 blog////////////////////////////////////////////
router.post("/authors", authorController.createAuthor)
router.post("/Blogs", BlogController.createBlog)

router.get("/blogs", BlogController.getBlog)

router.put("/blogs/:blogId", BlogController.updateBlog)

router.delete("/blogs/:blogId", BlogController.deleteBlog)
router.delete("/blogs", BlogController.deleteParams)


module.exports = router;