const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const User = require("../DB_Modules/User");
const {
  validateNewuser,
  validateLogin,
  validateBill,
  validateResetpass,
} = require("../Validator/Validator");
const Bill = require("../DB_Modules/Bill");

comparepass = async (cupass, dbpass) => {
  return bcrypt.compare(cupass, dbpass);
};

exports.newuser = async (req, res) => {
  try {
    //Validate user input
    const { error, value } = validateNewuser(req.body);

    if (error) {
      new Error(error);
      error.statuscode = 400;
      throw error;
    }

    //Check if user with the same email exist
    const checkUser = await User.findOne({ email: value.email });
    if (checkUser) {
      const error = new Error();
      error.statuscode = 400;
      error.message = "User with the same Email exist";
      throw error;
    } else {
      const hassPassword = await bcrypt.hashSync(value.password, 10);
      const user = new User({
        name: value.name,
        email: value.email,
        password: hassPassword,
      });

      const result = await user.save();
      res.status(201).json({
        message: "User Created",
        userId: result._id,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    let user;
    const { error, value } = validateLogin(req.body);

    if (error) {
      new Error(error);
      error.statuscode = 400;
      throw error;
    }

    const checkEmail = await User.findOne({ email: value.email });
    if (!checkEmail) {
      const error = new Error();
      error.message = "Email does not exist";
      error.statuscode = 402;
      throw error;
    }

    user = checkEmail;
    const passequal = await comparepass(value.password, checkEmail.password);
    if (!passequal) {
      const error = new Error();
      error.message = "Email or Password Incorrect";
      error.statuscode = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECREAT,
      { expiresIn: "3h" }
    );

    res.cookie("TOLOINUS", token,{maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true});
    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(400).json({ error : error.message});
  }
};

exports.addBill = async (req, res) => {
  try {
    const { error, value } = validateBill(req.body);

    if (error) {
      new Error(error);
      error.statuscode = 400;
      throw error;
    }

    const checkBill = await Bill.findOne({ billName: value.billName });
    if (checkBill) {
      const error = new Error();
      error.message = "Bill with same name exist";
      error.statuscode = 402;
      throw error;
    }

    const bill = new Bill({
      billName: value.billName,
      billAmount: value.billAmount,
      billPaymentDate: value.billPaymentDate,
      billDuration: value.billDuration,
      user: req.userId,
    });

    const result = await bill.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        bills: result._id,
      },
    });

    res.status(200).json({ massage: "Bill Created "});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.resetpass = async (req,res) => {
  try {
    const checkEmail = await User.findOne({email : req.body.email})
    console.log(checkEmail);
    if(!checkEmail){
      const error = new Error()
      error.statuscode = 400;
      error.message = "The email does not exist";
      throw error;
    }

    const token = jwt.sign({email: checkEmail.email,userId: checkEmail.password.toString(),},process.env.SECREAT,{ expiresIn: "1h" });
    let Link = `${process.env.BASE_URL}resetpassword/${token}`;
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.MY_MAIL,
      to: req.body.email,
      subject: process.env.EMAIL_SUBJECT,
      html:`<p>Clicl <a href=${Link} target="_blank">HERE</a> to reset your password within the next 5 minutes</p>`,
    });

    console.log(Link);
    res.status(200).json({ info })
  } catch (error) {
    console.log("uuuiiiii uuiu"+error);
    res.status(500).json({error})
  }
}
