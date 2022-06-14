const { isDate } = require('moment')
const mongoose = require ('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = mongoose.Schema({
    user_id: {
            type: ObjectId,
            ref: "myUser"
            },
    product_id: {
                type: ObjectId,
                ref: "product"
                },
    amount: Number,
    isFreeAppUser: Boolean,
    date: String
},{timestamps: true})

module.exports = mongoose.model('myOrder',orderSchema)