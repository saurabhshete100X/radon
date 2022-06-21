const authorModel = require("../models/authorModel")

const createAuthor = async function(req, res) {
    try {
        let details = req.body;

        if (!details.fname) return res.status(400).send({ status: false, msg: "First name is required" });
        if (!details.lname) return res.status(400).send({ status: false, msg: "Last name is required" });
        if (!details.title) return res.status(400).send({ status: false, msg: "Title is required" });
        if (!details.email) return res.status(400).send({ status: false, msg: "Email is required" });
        if (!details.password) return res.status(400).send({ status: false, msg: "Password is required" });

        const validateEmail = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details.email));
        if (!validateEmail) return res.status(400).send({ status: false, msg: "Invalid Email ID, Please check" });

        const data = await authorModel.create(details)
        res.status(201).send({ status: true, data: data });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports = { createAuthor };