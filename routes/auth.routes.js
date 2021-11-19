const router = require("express").Router();

<<<<<<< HEAD
// ROUTES router

//GET  /signup / router
=======
// ROUTE

//GET  /signup -
>>>>>>> a26e4f516539e3a63cf72875a7cf1c3a1e73715e
router.get("/signup", (req, res) => {
  res.render("auth/signup-form");
});

module.exports = router;
