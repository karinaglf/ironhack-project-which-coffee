const router = require('express').Router();
const isLoggedIn = require('./../middleware/isLoggedIn');
const User = require('./../models/User.model');

//GET - home page
router.get('/', (req, res, next) => {
  const user = req.session.user;
  res.render('index', { user });
});

//GET - profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  User.findById(user._id)
    .populate('favoriteCoffees')
    .then((foundedUser) => {
      res.render('user-profile', {user: foundedUser });
    });
});

module.exports = router;
