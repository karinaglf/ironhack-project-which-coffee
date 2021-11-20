// routes/auth.routes.js
const router = require('express').Router();
const User = require('./../models/User.model');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// ROUTE

// GET  /signup
router.get('/signup', (req, res) => {
  res.render('auth/signup-form');
});

//GET  /signup -
router.get('/signup', (req, res) => {
  res.render('auth/signup-form');
});

module.exports = router;
