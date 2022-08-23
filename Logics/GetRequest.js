const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.resetpass = async (req,res) => {
    try {
        const token = req.params.token;
        res.status(200).json({
            token
        })

    } catch (error) {
        console.log(error);
    }
}


exports.gettest = async(req,res) => {
    console.log("Its working");
}
