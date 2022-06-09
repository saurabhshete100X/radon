const { isValidObjectId } = require("mongoose")
const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publishersModel = require("../models/publisherModel")

//Problem 3

const createBook= async function (req, res) {
    let book = req.body
    
    let authorId = await authorModel.find().select({_id: 1})
    authorIdArr = authorId.map((obj) => {return obj._id.toString()})

    let publishedId = await publishersModel.find().select({_id: 1})
    publishedIdArr = publishedId.map((obj) => {return obj._id.toString()})

    if(book.author!= undefined){
        if(authorIdArr.includes(book.author)){
            if(book.publisher != undefined){
                if(publishedIdArr.includes(book.publisher)){
                    let bookCreated = await bookModel.create(book)
                    return res.send( {data: bookCreated})
                }
                return res.send("Invalid Publisher Id")
            }
            return res.send("Missing Publisher Id")
        }
        return res.send("Invalid Author Id")
    }
    return res.send("Missing Author Id")

    
}


const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

// Problem 4

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate([{ path: 'author' }, { path: 'publisher' }])
    res.send({data: specificBook})
}

//problem 5

const booksByPut = async function(req, res){
    let pub_id1 = '62a213f41e3fe40140b3878e'
    let pub_id2 = '62a214321e3fe40140b38794'

    let book1 = await bookModel.findByIdAndUpdate({pub_id1}, {$set: isHardCover == true}, {$new : true})
    res.send({data: book1})
}

const authorRating = async function(req, res){
    let data = await authorModel.find({ rating: { $gt: 3.5 } }).select({ _id: 1 })
    idArry = data.map((obj) => { return obj._id.toString() })
    let up = await bookModel.updateMany({ author_id: idArry  }, { $inc: { price: +10 } })
    res.send({ data: up })
}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.booksByPut = booksByPut
module.exports.authorRating = authorRating