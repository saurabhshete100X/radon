const express = require('express');
const  Common  = require('../middleware/auth');
const router = express.Router();
const userController= require("../controllers/userController")
const userAuthController= require("../controllers/userController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userAuthController.createUser  )

router.post("/login", userAuthController.loginUser)

// //The userId is sent by front end
router.get("/users/:userId",Common.mid1,Common.mid2,userAuthController.getUserData)

router.put("/users/:userId", Common.mid1,Common.mid2,userAuthController.updateUser)

router.delete("/users/:userId",Common.mid1,Common.mid2, userAuthController.deleteteUser)

router.post("/users/:userId/posts",Common.mid1,Common.mid2, userAuthController.postMessage)

module.exports = router;

