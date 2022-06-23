const jwt = require("jsonwebtoken");
const authentication = function(req, res, next) {
    try {
        let token = req.headers[`x-api-key`]
        if (!token) return res.status(400).send({ status: false, msg: "Token must be present in Headers" });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

    next()
}
const authorisation = function(req, res, next) {
    let token = req.headers[`x-api-key`];
    let decodedToken = jwt.verify(token, "functionUp-radon");
    let userLoggedIn = decodedToken.userId;
    console.log(decodedToken)
    let userToBeModified = req.body.authorId || req.params.authorId || req.query.authorId;
    if (userLoggedIn !== userToBeModified) return res.status(403).send({ status: false, msg: "You are not authorised to do this" });
    next();

}
module.exports = { authentication, authorisation }