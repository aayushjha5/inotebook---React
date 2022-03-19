const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Aayushisagoodboy';

//ROUTE 1: 
//Create a User using: POST "/api/auth/createuser".
//doesnt require auth for login
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  //if there  are error , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether user with the same email exists
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email exists!" });
    }
    //Hashing Passwords using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    //if not then create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error")
  };
})

//ROUTE 2:
//CREATING LOGIN ENDPOINT AND SENDING AUTH TOKEN
//Authenticate a User: "/api/auth/login" . No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  //if there  are error , return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    //checking whether entered email exists in the DB or not.
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email Credentials " });
    }
    //compare entered password with user password for the email provided if upper condition is false
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid password Credentials" });
    }

    //if password is correct then send the payload(data)
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken })

  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Internal Server Error");
  }


})

//ROUTE3:
//Get Logged in User Details using POST "/api/auth/getuser" . << login required>>
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send(" Internal Server Error");
  }
})
module.exports = router