const router = require("express").Router();

// AUTH ROUTES GO HERE

//GET  /signup
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
