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
    aabaa: ['Kenya', 'Rwanda'],
    aaaba: ['Ethiopia', 'Kenya', 'Rwanda'],
    aaaab: ['Ethiopia', 'Kenya', 'Rwanda'],
    abbaa: ['Kenya', 'Rwanda'],
    aabba: ['Kenya', 'Rwanda'],
    aaabb: ['Kenya', 'Rwanda'],
    baaaa: ['Ethiopia', 'Kenya'],
    babaa: ['Kenya', 'Rwanda'],
    ababa: ['Kenya', 'Rwanda'],
    bbaaa: ['Ethiopia'],
    bbbbb: ['Colombia', 'Brazil', 'Costa Rica'],
    babbb: ['Brazil', 'Costa Rica'],
    bbabb: ['Colombia', 'Panama'],
    bbbab: ['Colombia', 'Panama'],
    bbbba: ['Brazil', 'Costa Rica', 'Panama'],
    baabb: ['Brazil', 'Costa Rica'],
    bbaab: ['Brazil', 'Costa Rica', 'Panama'],
    bbbaa: ['Brazil', 'Costa Rica', 'Panama'],
    abbbb: ['Brazil', 'Costa Rica'],
    ababb: ['Brazil', 'Panama'],
    babab: ['Brazil', 'Costa Rica', 'Panama'],
    aabbb: ['Brazil', 'Costa Rica'],
  };

  const originCountries = dictionary[combination]; 

  Coffee.find({ originCountry: { $in: originCountries } }) //
    .then((foundCoffees) => {
      res.render('coffees/coffees-listing', {
        coffeesList: foundCoffees,
      });
    });
});

module.exports = router;
