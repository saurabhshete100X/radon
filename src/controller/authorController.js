const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");
const { use } = require("../route/route");


const createAuthor = async function (req, res) {
	try {
		let details = req.body;

		if (!details.fname) return res.status(400).send({
			status: false,
			msg: "First name is required"
		});
		if (!details.lname) return res.status(400).send({
			status: false,
			msg: "Last name is required"
		});
		if (!details.title) return res.status(400).send({
			status: false,
			msg: "Title is required"
		});
		if (!details.email) return res.status(400).send({
			status: false,
			msg: "Email is required"
		});
		if (!details.password) return res.status(400).send({
			status: false,
			msg: "Password is required"
		});

		const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details.email));
		if (!validateEmail) return res.status(400).send({
			status: false,
			msg: "Invalid Email ID, Please check"
		});

		const data = await authorModel.create(details)
		res.status(201).send({
			status: true,
			data: data
		});

	} catch (err) {
		res.status(500).send({
			status: false,
			error: err.message
		});
	}
}

const loginUser = async function (req, res) {
	try {
		let userName = req.body.email;
		let password = req.body.password;
		let user = await authorModel.findOne({ email: userName, password: password });
		if (!user) return res.status(404).send({ status: false, msg: "UserName and Password Is Not Correct" });

		let token = jwt.sign(
			{
				userId: user._id.toString(),
				batch: "Radon",
				organisation: "Functionup",
			},
			"functionup-radon"
		);
		res.setHeader("x-api-key", token)
		res.status(200).send({ staus: true,authorId:user._id, token: token });
	

	} catch (err) {
		res.status(400).send({ status: false, Error: err.message })
	}
};

const getLoginAuthorsData = async function (req, res) {
	try {
		let token = req.headers["x-api-key"];
		if (!token) token = req.headers["x-api-key"];
		if (!token) return res.status(400).send({ status: false, msg: "Token Must Be Present" });
		console.log(token)

		let decodedToken = jwt.verify(token, "functionup-radon")
		if (!decodedToken)
			return res.status(400).send({ staus: false, msg: "Token Is Invalid" });
		let userId = req.params.userId;

		let userDeatails = await userModel.findById(userId)
		console.log(userDeatails)
		if (!userDeatails)
			return res.status(400).send({ status: false, msg: "No Such User Exists" });

	res.status(200).send({ staus: true, token: token });
} catch (err) {
	res.status(400).send({ status: false, Error: err.message })
}
};
	
module.exports = { createAuthor, loginUser,getLoginAuthorsData };