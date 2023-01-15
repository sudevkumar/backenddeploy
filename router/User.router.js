const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;

  try {
    bcrypt.hash(pass, 5, async (err, secure_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, pass: secure_pass, name, age });
        await user.save();
        res.send("User Registered");
      }
    });
  } catch (err) {
    res.send("Error in registration");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_password = user[0].pass;
    if (user.length > 0) {
      bcrypt.compare(pass, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "masai");
          res.send({ msg: "Login Succesfully", token: token });
        } else {
          res.send("Please enter right credentials");
        }
      });
    }
  } catch (err) {
    res.send("Error in login");
    console.log(err);
  }
});

module.exports = {
  userRouter,
};
