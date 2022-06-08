
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: String,
    authorId: {
        type: Number,
        required: true
    },
    price: Number,
    ratings: String
},
//createdAt -
//updatedAt -

{timestamps: true});


module.exports = mongoose.model('BookDB', bookSchema)