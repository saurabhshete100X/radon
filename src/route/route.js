const express = require('express');
const router = express.Router();
const authorController = require("../controller/authorController")
const BlogController = require("../controller/blogController")
const Middleware = require("../middleware/auth")

router.get("/test-me", function (req, res) {
	res.send("My first ever api!")
})
////////////////////Project1 Blogging Site////////////////////////////////////////////

router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.loginUser)

router.post("/blogs",Middleware.authentication,Middleware.authorisation, BlogController.createBlog)

router.get("/blogs",Middleware.authentication, BlogController.getBlog)

router.put("/blogs/:blogId", Middleware.authentication, Middleware.authorisation, BlogController.updateBlog)

router.delete("/blogs/:blogId", Middleware.authentication, Middleware.authorisation, BlogController.deleteBlog)

router.delete("/blogs", BlogController.deleteparams)

module.exports = router;


