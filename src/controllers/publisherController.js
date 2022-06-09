const publisherModel= require("../models/publisherModel")

const createPublisher = async function (req, res){
    let publisher = req.body
    let publisherCreated = await publisherModel.create(publisher) 
    res.send( {msg: publisherCreated})
}

const getPublishersDetails = async function(req, res){
    let publishers = await publisherModel.find()
    res.send( {data: publishers})
}

module.exports.createPublisher = createPublisher
module.exports.getPublishersDetails = getPublishersDetails