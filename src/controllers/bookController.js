const { count } = require("console")
const AuthorModel = require("../models/authorModel")
const BookModel= require("../models/bookModel")

// Creating Book Schema
const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

// Problem Statement 3
const getBooksData= async function (req, res) {
    let savedData= await BookModel.findOneAndUpdate({bookName: "Two states"},{$set: {price: 100}},{new : true})
    let authordata = await AuthorModel.find({authorId: savedData.authorId}).select("authorName")
    let price = savedData.price
    res.send({msg: authordata, price})
}

// Problem Statement 4 

const respondBack = async function(req, res){

   const data = await BookModel.find( { price : { $gte: 50, $lte: 100} } ).select({authorId: 1, _id:0})
   const key = data.map(inp => inp.authorId)
   let temp = []

   for(let i=0; i<key.length; i++){
    let x = key[i]
    const author = await AuthorModel.find({authorId: x}).select({authorName:1, authorId: 1 ,_id:0})
    temp.push(author)
   }
   const authorName= temp.flat()
   res.send({msg: authorName})
}


module.exports.createBook = createBook

module.exports.getBooksData = getBooksData

module.exports.respondBack = respondBack