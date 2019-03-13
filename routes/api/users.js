// will only deal with authentication
const express = require("express");
const router = express.Router(); // router-level middleware (instead of app-level)
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// access   Public

// instead of app.use
router.get("/test", (req, res) => res.json({ msg: "Users works" })); // much like res.send, we instead want api to serve json

// @route   POST api/users/register
// @desc    Register user
// access   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // use mongoose to FIRST find if the email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        size: "200",
        rating: "x",
        default: "retro"
      });
      // proceed to create new user - in mongoose you want to say 'new'+modelname
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar, // will use the gravatar url
        password: req.body.password // currently unhashed
      });

      // generate a salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user)) // send back successful response with that user
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login user / Returning JWT token
// access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Check password - plain text and hashed password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // We want to create a token if matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // create JWT payload

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 60 * 60 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success" }); // success is not defined - needed quotation marks!
    // if authentication is successful, req.user property will be set to authenticated user
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
