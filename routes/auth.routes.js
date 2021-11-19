const router = require("express").Router();

// ROUTES router

//GET  /signup / router
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
