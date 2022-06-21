const BlogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel")
const createBlog = async function(req, res) {
    try {
        const details = req.body;
        if (!details.title) return res.status(400).send({ status: false, msg: "Title of the blog is required" });
        if (!details.body) return res.status(400).send({ status: false, msg: "Body of the blog is required" });
        if (!details.authorId) return res.status(400).send({ status: false, msg: "Author_Id of the blog is required" });
        if (!details.category) return res.status(400).send({ status: false, msg: "Category of the blog is required" });
        const validate = await authorModel.findById(details.authorId)
        if (!validate) return res.status(400).send({ status: false, msg: "Please enter valid authorId" })
        const data = await BlogModel.create(details)
        res.status(201).send({ status: true, msg: data })
    } catch (err) {
        res.status(400).send({ status: false, Error: err.message })
    }
}
module.exports = { createBlog }