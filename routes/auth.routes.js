const router = require("express").Router();

// ROUTE

//GET  /signup -
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
