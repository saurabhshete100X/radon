const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    Year: {
        type: Number,
        default: 2021
    },
    tags: [String],

    authorName: String,

    totalPages: Number,

    stockAvailable:{
        type: Boolean,
        default: false
    },

    isPublished: Number,
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
