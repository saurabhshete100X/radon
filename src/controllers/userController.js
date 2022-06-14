const jwt = require("jsonwebtoken");
const userModelDetails = require("../models/userModel");

const createUser = async function (req, res) {

  let data = req.body;
  let savedData = await userModelDetails.create(data);
 
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModelDetails.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });


  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "Radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];

 
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  

  let decodedToken = jwt.verify(token, "functionup-radon");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;

  let userDetails = await userModelDetails.findById(userId);
  console.log(userDetails)
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
    // let token = req.headers["x-Auth-token"];
    // if (!token) token = req.headers["x-auth-token"];

 
    // if (!token) return res.send({ status: false, msg: "token must be present" });
  
    // console.log(token);
    
  
    // let decodedToken = jwt.verify(token, "functionup-radon");
    // if (!decodedToken)
    //   return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModelDetails.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModelDetails.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

const deleteUser = async function (req, res) {
    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];

 
    if (!token) return res.send({ status: false, msg: "token must be present" });
  
    console.log(token);
    
  
    let decodedToken = jwt.verify(token, "functionup-radon");
    if (!decodedToken)
      return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let user = await userModelDetails.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

 
  let updatedUser = await userModelDetails.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
  res.send({ data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteteUser = deleteUser;