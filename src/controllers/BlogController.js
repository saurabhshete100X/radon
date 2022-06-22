const BlogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel");
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
const getBlog = async function(req, res) {
    try {
        let authorId = req.query.authorId
        let valid = await authorModel.findById(authorId)
        if (!valid) return res.status(404).send({ status: false, msg: "enter valid authorID" })
        let tags = req.query.tags
        let category = req.query.category
        let getData = await BlogModel.findOne({ authorId: valid, tags: tags, category: category, isDeleted: false, isPublished: true })
        if (!getData) return res.status(404).send({ status: false, msg: "Please enter valid information" })
        console.log(getData)
        res.status(201).send({ status: true, data: getData })
    } catch (err) {
        res.status(404).send({ status: false, Error: err.message })
    }
}
const updateBlog = async function(req, res) {
    try {
        let data = req.body
        let blog_Id = req.params.blogId
        if (data.subcategory) {
            let subcategory = data.subcategory.split(",").map((x) => (x.trim()))
            data.subcategory = subcategory
        }
        if (data.tags) {
            let tags = data.tags.split(",").map((x) => (x.trim()))
            data.tags = tags
        }
        let checkBlog = await BlogModel.findById(blog_Id)
        if (!checkBlog) return res.status(404).send({ status: false, msg: "Blog Not Found" })
        if (checkBlog.isDeleted == true) return res.status(400).send({ status: false, msg: "This blog is already Deleted" })
        let update = await BlogModel.findByIdAndUpdate(blog_Id, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, isPublished: true, publishedAt: new Date() }, { new: true })
        res.status(200).send({ status: true, data: update })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}
const deleteBlog = async function(req, res) {
        try {
            let blog_Id = req.params.blogId;
            let checkBlog = await BlogModel.findById(blog_Id)
            if (!checkBlog) return res.status(404).send({ status: false, msg: "Blog Not Found" })
            if (checkBlog.isDeleted == true) return res.status(400).send({ status: false, msg: "this blog is already deleted" })
            let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blog_Id }, { $set: { isDeleted: true, DeletedAt: Date.now() } }, { new: true });
            if (deletedBlog.modifiedCount == 0) return res.status(400).send({ status: false, msg: "No Blog Document Exists" })
            res.status(200).send({ status: true, data: deletedBlog });
        } catch (err) {
            res.status(500).send({ msg: "error", error: err.message })
        }
    }
    // const BlogDelete = async function(req, res) {
    //     // try {
    //     //     let authorId = req.query.authorId
    //     //     let validation = await authorModel.findById(authorId)
    //     //     if (!validation) return res.status(404).send({ status: false, msg: "Enter valid authorId" })
    //     //     let q = req.query
    //     //     let deleteData = await BlogModel.deleteOne({ authorId: authorId, category: q.category, subcategory: q.subcategory, tags: q.tags, isPublished: false, new: true })
    //     //     res.status(200).send({ status: true, data: deleteData })
    //     // } catch (err) {
    //     //     res.status(404).send({ status: false, Error: err.message })
    //     // }

// }
const deleteParams = async function(req, res) {
    try {
        let data = req.query;
        let authorId = req.query.authorId
        let valid = await authorModel.findById(authorId)
        if (!valid) return res.status(404).send({ status: false, Msg: "enter valid authorId" })
        const deleteByQuery = await BlogModel.updateMany({ $and: [data, { authorId: valid, isDeleted: false }] }, { $set: { isDeleted: true, DeletedAt: new Date() } }, { new: true })
        if (deleteByQuery.modifiedCount == 0) return res.status(400).send({ status: false, msg: "The Blog is already Deleted" })
        res.status(200).send({ status: true, msg: deleteByQuery })
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}
module.exports = { createBlog, getBlog, updateBlog, deleteBlog, deleteParams }