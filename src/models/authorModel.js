const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorId: {
        type: Number,
        required: true
    },
    authorName: String,
    age: Number,
    address: String    
}, 

{ timestamps: true });


module.exports = mongoose.model('AuthorDB', authorSchema)