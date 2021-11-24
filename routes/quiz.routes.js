const router = require('express').Router();
const Coffee = require('../models/Coffee.model');
const User = require('./../models/User.model');

router.get('/quiz', (req, res) => {
  res.render('quiz/quiz-form');
});

router.post('/quiz', (req, res) => {
  const { q_1, q_2, q_3, q_4, q_5, q_6 } = req.body;
  const combination = q_1 + q_2 + q_3 + q_4 + q_5; // "abababa"

  // console.log('combination', combination);

  const dictionary = {
    aaaaa: ['Ethiopia', 'Kenya', 'Rwanda'],
    abaaa: ['Ethiopia'],
    aabaa: ['Kenya', 'rwanda'],
  };
  const originCountries = dictionary[combination]; // dictionary["aaaaaa"]   or dictioinary.aaaaaa

  Coffee.find({ originCountry: { $in: originCountries } }) //
  .then(
    (foundCoffees) => {
      res.render('coffees/coffees-listing', {
        coffeesList: foundCoffees,
      });
    }
  );
});

module.exports = router;
