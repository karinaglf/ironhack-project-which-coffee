const router = require('express').Router();
const isLoggedIn = require('./../middleware/isLoggedIn');
const User = require('./../models/User.model');

//GET - home page
router.get('/', (req, res, next) => {
  let userIsLoggedIn = false;
  if (req.session.user) {
    userIsLoggedIn = true;
  }

  res.render('index', { userIsLoggedIn: userIsLoggedIn });
});

//GET - profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  User.findById(user._id)
    .populate('favoriteCoffees')
    .then((foundedUser) => {
      console.log(foundedUser);
      res.render('user-profile', { user });
    });
});

module.exports = router;
