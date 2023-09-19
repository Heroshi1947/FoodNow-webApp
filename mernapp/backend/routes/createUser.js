const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // bcrypt functions are async in nature so use async await
const jwtSecret = "this_has_to_be_atleast_32bit_string"; // should be written in .env file

// --------------------------------------------user signup route----------------------------------------------//

router.post(
  "/creatuser",
  [
    body("email", "invalid email id").isEmail(),
    body("name", "name must be atleast 5 characters").isLength({ min: 5 }),

    // password must be at least 5 chars long
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // ensuring validations are applied before creating user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10); // you can use any number in gensalt
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
      console.log(error);
    }
  }
);

//---------------------------------------------------user login route---------------------------------------//

router.post("/loginuser", async (req, res) => {
  let email = req.body.email;
  try {
    let userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "Invalid Email id" });
    }
    const pswrdCompare = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!pswrdCompare) {
      return res.status(400).json({ errors: "Invalid password dumbo" });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, jwtSecret);
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
