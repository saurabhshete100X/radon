const BlogModel = require("../models/blogModel")
const authorModel = require("../models/authorModel");
/////////////////////////////////////POST /blogs///////////////////////////////////////////////////////////
const createBlog = async function(req, res) {
        try {
            const details = req.body

            if (!details.title) return res.status(400).send({ status: false, msg: "Title of the blog is required" });
            if (!details.body) return res.status(400).send({ status: false, msg: "Body of the blog is required" });
            if (!details.authorId) return res.status(400).send({ status: false, msg: "Author_Id of the blog is required" });
            if (!details.category) return res.status(400).send({ status: false, msg: "Category of the blog is required" });

            const validate = await authorModel.findById(details.authorId);
            if (!validate) return res.status(400).send({ status: false, msg: "You have entered a invalid Author_Id" });

            const data = await BlogModel.create(details)
            res.status(201).send({ status: true, data: data })
        } catch (err) {
            res.status(500).send({ status: false, msg: err.message });
        }
    }
    //////////////////////////////////////////////GET /blogs/////////////////////////////////////////////
const getBlog = async function(req, res) {
        try {
            let q = req.query;
            let filter = {
                isDeleted: false,
                isPublished: true,
                ...q
            };
            if (q.authorId) {
                const validate = await authorModel.findById(q.authorId);
                if (!validate) return res.status(404).send({ status: false, msg: "AuthorId is not valid" });
            }
            const data = await BlogModel.find(filter);
            if (data.length == 0) return res.status(404).send({ status: false, msg: "No blog is found" });

            res.status(200).send({
                status: true,
                message: "Blog List",
                data: data
            })
        } catch (err) {
            res.status(500).send({ status: false, Error: err.message })
        }
    }
    ///////////////////////////////////////blogs/:blogId/////////////////////////////////////////
const updateBlog = async function(req, res) {
        try {
            let data = req.body
            let blog_Id = req.params.blogId
            let authorFormToken = req.authorId
            if (data.subcategory) {
                let subcategory = data.subcategory.split(",").map((x) => (x.trim()))
                data.subcategory = subcategory

            }
            if (data.tags) {
                let tags = data.tags.split(",").map((x) => (x.trim()))
                data.tags = tags
            }
            if (!authorFormToken) return res.status(400).send({ status: false, message: "is not a valid token id" })
            let checkBlog = await BlogModel.findById(blog_Id)

            if (checkBlog.authorId.toString() !== authorFormToken) return res.status(401).send({ status: false, message: "Unauthorized access ! user doesn't match" })
            if (!checkBlog) return res.status(404).send({ status: false, msg: "Blog Not Found" })
            if (checkBlog.isDeleted == true) return res.status(400).send({ status: false, msg: "This blog is already Deleted" })
            let update = await BlogModel.findByIdAndUpdate(blog_Id, { $push: { tags: data.tags, subcategory: data.subcategory }, title: data.title, body: data.body, isPublished: true, publishedAt: new Date() }, { new: true })
            res.status(200).send({
                status: true,
                message: "updated has been reflected",
                data: update
            })
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }
    ///////////////////////////////////////blogs/:blogId//////////////////////////////////
const deleteBlog = async function(req, res) {
        try {
            let blog_Id = req.params.blogId;
            let authorFormToken = req.authorId
            if (!authorFormToken) return res.status(400).send({ status: false, message: "is not a valid token id" })

            let checkBlog = await BlogModel.findById(blog_Id)
            if (checkBlog.authorId.toString() !== authorFormToken) return res.status(401).send({ status: false, message: "Unauthorized access ! user doesn't match" })

            if (!checkBlog) return res.status(404).send({ status: false, msg: "Blog Not Found" })

            if (checkBlog.isDeleted == true) return res.status(404).send({ status: false, msg: "this blog is already deleted" })
            let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blog_Id }, { $set: { isDeleted: true, DeletedAt: Date.now() } }, { new: true });
            if (deletedBlog.modifiedCount == 0) return res.status(404).send({ status: false, msg: "No Blog Document Exists" })
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
////////////////////////////////////blogs?queryParams/////////////////////////////////////////
const deleteParams = async function(req, res) {
    try {
        let data = req.query;
        let authorId = req.authorId
        let valid = await authorModel.findById(authorId)
            //res.send({ data: valid })
        if (valid._id.toString() !== authorId) return res.status(401).send({ status: false, message: "Unauthorized access ! user doesn't match" })

        const deleteByQuery = await BlogModel.updateMany({ $and: [data, { authorId: valid, isDeleted: false }] }, { $set: { isDeleted: true, DeletedAt: new Date() } }, { new: true })

        if (deleteByQuery.modifiedCount == 0) return res.status(400).send({ status: false, msg: "The Blog is already Deleted" })

        res.status(200).send({
            status: true,
            message: "deleted successfully",
            msg: deleteByQuery
        })
    } catch (err) {

        res.status(500).send({ error: err.message })
    }
}

module.exports = { createBlog, getBlog, updateBlog, deleteBlog, deleteParams }