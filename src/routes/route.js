const express = require('express');
const router = express.Router();
const commonMW = require ("../middlewares/commonMiddleware")
const userController= require("../controllers/userController")
const productController = require ('../controllers/productController')
const orderController = require ('../controllers/orderController')
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


//ASSIGNMENT/Middleware2

router.post("/createProduct", productController.createProduct)
router.post("/createUser", commonMW.mid1, userController.createUser)
router.post("/createOrder", commonMW.mid1, orderController.createOrder)



module.exports = router;