const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userData");
const Connection = require("../models/connectionData");
const nodemailer = require("nodemailer");
router.get("/", (req, res) => {
  res.json({});
});
router.route("/register").post(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(422).json({ error: "Please Fill the Field Properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "Email Already Exisits!!!" });
    } else {
      const user = new User({ username, email, password });
      await user.save();
      const userConnection = new Connection({
        user: user._id,
      });
      await userConnection.save();
      res.send(user);
      res.status(201).json({ message: "User Entered Successfully!!!" });
    }
  } catch (err) {
    //console.log(err);
  }
});
//login route
router.route("/login").post(async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please Enter Email" });
  }
  try {
    const userLogin = await User.findOne({ email });
    console.log(userLogin);
    if (userLogin) {
      res.send(userLogin);
      res.status(201).json({ message: "Correct Email!!!" });
    } else res.status(400).json({ message: "Invalid Email!!!" });
  } catch (err) {
    console.log(err);
  }
});
router.route("/login/:userId").get(async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});
router.route("/search").get(async (req, res) => {
  const { query } = req.query;
  try {
    // Search for usernames that start with the query
    const users = await User.find({
      username: { $regex: `^${query}`, $options: "i" },
    }).limit(10);
    res.json(users);
  } catch (error) {
    console.error("Error searching for usernames:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//sendKey Route
router.route("/sendKey").post(async (req, res) => {
  console.log(req.body);
  const { to, subject, description } = req.body;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "qureshinouman30@gmail.com",
      pass: "dcihugbcmleaidoy",
    },
  });

  let mailDetails = {
    from: "qureshinouman30@gmail.com",
    to: to,
    subject: subject,
    text: "OK",
    html: `<div>${description}</div>`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log(err.message);
      console.log("Error Occurs");
      res.status(400).json({ message: "ERROR" });
    } else {
      res.status(400).json({ message: "Email sent successfully" });
      console.log("Email sent successfully");
    }
  });
});

//compare Password route
router.route("/comparePassword").post(async (req, res) => {
  console.log(req);
  const { email, password } = req.body;
  const userLogin = await User.findOne({ email });
  const pswrd = await bcrypt.compare(password, userLogin.password);
  console.log(pswrd);
  res.send(pswrd);
});
module.exports = router;
