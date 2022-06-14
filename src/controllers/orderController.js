const orderModel = require('../models/orderModel')
const userModel = require('../models/userModel')
const productModel = require('../models/productModel')


const createOrder = async function(req, res,){
    let data = req.body
    let idNew = data.user_id
    let idNew2 = data.product_id
    let userId = await userModel.find({ _id:idNew })
    let productId = await productModel.find({ _id:idNew2 })
    if(idNew){
        if(userId.length == 0){
            res.send({msg: "product id is not valid"}) 
        }
    }
    if(idNew2){
        if(productId.length == 0){
            res.send({msg: "user id is not valid"})   
        }
    }
    if(req.header['isfreeappuser'] == 'true'){
        req.body.amount = 0
        req.body.isFreeAppUser = req.header.isfreeappuser
    }else if(productId.price <= 100){
            req.body.amount = productId.price
            let newBal = await productModel.updateOne({_id:idNew2},{$inc: {balance: checkPrice.price * -1}})
            let amt = req.body.amount
            amt = productId.price
            req.body.isFreeAppUser = req.header.isfreeappuser
        }
        
    
    let savedOrder = await orderModel.create(data)
    res.send({msg: savedOrder})
}



module.exports.createOrder = createOrder