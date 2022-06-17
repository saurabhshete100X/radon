const jwt = require("jsonwebtoken");
const userModelDetails = require("../models/userModel");

const createUser = async function (req, res) {
try {
  let data = req.body;
  if ( Object.keys(data).length != 0) {
     let savedData = await userModelDetails.create(data);
 
    res.status(201).send({ msg: savedData });
  }
  else res.status(400).send({ msg: "BAD REQUEST"})
} catch (err) {
  console.log("This is the error :", err.message)
  res.status(500).send({ msg: "Error", error: err.message }) 
}
  
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;
  console.log(userName , password);

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
  try {
    let userId = req.params.userId;
    let userDetails = await userModelDetails.findById(userId);
    if (!userDetails)
      return res.status(401).send({ status: false, msg: "No such user exists" });
  
    res.send({ status: true, data: userDetails });
  } catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message }) 
  }


  
};

const updateUser = async function (req, res) {
   try {
    let userId = req.params.userId;
  let user = await userModelDetails.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModelDetails.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
   } catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message }) 
   }

 
};

const deleteUser = async function (req, res) {
   
try {
  let userId = req.params.userId;
  let user = await userModelDetails.findById(userId);
  
  if (!user) {
    return res.send("No such user exists");
  }

 
  let updatedUser = await userModelDetails.findOneAndUpdate({ _id: userId }, {$set:{isDeleted:true}},{new:true});
  res.send({ data: updatedUser });
} catch (err) {
  console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message }) 
}
  
};

const postMessage = async function (req, res) {
  // let message = req.body.message
  try {
    
  let userId = req.params.userId;
 
  let user = await userModelDetails.findById(userId);
 
  if(!user){ return res.send({status: false, msg: 'No such user exists'})}
  let message = req.body.message
  let updatedPosts=user.Post
     updatedPosts.push(message)
  let updatedUser = await userModelDetails.findOneAndUpdate({_id: user._id},{Post: updatedPosts}, {new: true})

  //return the updated user document
  return res.send({status: true, data: updatedUser})
  } catch (err) {
    console.log("This is the error :", err.message)
    res.status(500).send({ msg: "Error", error: err.message })
  }
}





module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteteUser = deleteUser;
module.exports.postMessage = postMessage;