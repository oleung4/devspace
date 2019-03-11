// will only deal with authentication
const express = require("express");
const router = express.Router();

// instead of app.use

// @route   GET api/users/test
// @desc    Tests users route
// access   Public
router.get("/test", (req, res) => res.json({ msg: "Users works" })); // much like res.send, we instead want api to serve json

module.exports = router;
