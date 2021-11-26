const router = require('express').Router();
const isLoggedIn = require('./../middleware/isLoggedIn');
const User = require('./../models/User.model');
const Coffee = require('../models/Coffee.model');


//GET - home page
router.get('/', (req, res, next) => {
  const user = req.session.user;

  Coffee.find()
    .then((coffeeList) => {

      let n = 3;
      let randomCoffees = coffeeList.sort(() => Math.random() - Math.random()).slice(0, n)

      console.log(`coffeeList`, randomCoffees )
      res.render('index', { user , randomCoffees});
    })

});

//GET - profile page
router.get('/profile', isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  User.findById(user._id)
    .populate('favoriteCoffees')
    .populate('roaster')
    .then((foundedUser) => {

      let isRoaster = false;
      if (foundedUser.profileType === "roaster" ) {
        isRoaster = true;
      }

      console.log({user: foundedUser, isRoaster })
      res.render('user-profile', {user: foundedUser, isRoaster });

    });
});

module.exports = router;
