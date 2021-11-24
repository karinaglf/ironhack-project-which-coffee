// routes/auth.routes.js
const router = require('express').Router();
const User = require('./../models/User.model');
const bcrypt = require('bcrypt');

const isLoggedIn = require('./../middleware/isLoggedIn');
const isRoaster = require('./../middleware/isRoaster');

const saltRounds = 10;

// ROUTE

// GET  /signup
router.get('/signup', (req, res) => {
  res.render('auth/signup-form');
});

//POST /signup -

router.post('/signup', (req, res) => {
  const { username, email, password, profileType } = req.body;
  console.log('req.body', req.body);

  const usernameNotProvided = !username || username === '';
  const passwordNotProvided = !password || password === '';

  if (usernameNotProvided || passwordNotProvided) {
    res.render('auth/signup-form', {
      errorMessage: 'You need to give a username and password',
    });
    return;
  }

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    res.status(400).render('auth/signup-form', {
      errorMessage:
        'Your password needs to have at least 8 characters and must contain at least one number, one lowercase and one uppercase letter.',
    });
    return;
  }
  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        throw new Error('This username is already taken');
      }
      return bcrypt.genSalt(saltRounds);
    })
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      return User.create({
        username: username,
        password: hashedPassword,
        email: email,
        profileType: profileType
      });
    })
    .then((createdUser) => {
      req.session.user = createdUser;
      res.redirect('/');
    })
    .catch((err) => {
      res.render('auth/signup-form', {
        errorMessage: err.message || 'Error while trying to sign up',
      });
    });
});

// GET  /login

router.get('/login', (req, res) => {
  res.render('auth/login-form');
});

// POST  /login

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailNotProvided = !email || email === '';
  const passwordNotProvided = !password || password === '';

  if (emailNotProvided || passwordNotProvided) {
    res.render('auth/login-form', {
      errorMessage: 'Provide an email and password',
    });
    return;
  }
  let user;

  User.findOne({ email: email })
    .then((foundUser) => {
      console.log('foundUser', foundUser);
      user = foundUser;
      if (!foundUser) {
        throw new Error('Wrong credentials');
      }
      return bcrypt.compare(password, foundUser.password);
    })
    .then((isCorrectPassword) => {
      console.log('isCorrectPassword', isCorrectPassword);
      if (!isCorrectPassword) {
        throw new Error('Wrong credentials');
      } else if (isCorrectPassword) {
        req.session.user = user;
        res.redirect('/');
      }
    })
    .catch((err) => {
      res.render('auth/login-form', {
        errorMessage: err.massage || 'Provide email and password.',
      });
    });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error');
    }

    res.redirect('/');
  });
});

module.exports = router;
