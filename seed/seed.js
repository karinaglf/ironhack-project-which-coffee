require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./../models/User.model');
const Coffee = require('./../models/Coffee.model');
const Roaster = require('./../models/Roaster.model');

// seed data

const coffees = [
  {
    name: 'test 1',
    process: 'natural',
    originCountry: 'Brazil',
    variety: 'arabica',
    roastType: ['filter'],
    flavor: 'cherries',
  },
  {
    name: 'test 2',
    process: 'washed',
    originCountry: 'Brazil',
    variety: 'arabica',
    roastType: ['filter', 'espresso'],
    flavor: 'mango',
  },
];

const users = [
  {
    name: 'Clara',
    username: 'clara123',
    email: 'clara123@mail.com',
    password: 'clara123@mail.com',
    isRoaster: true,
    favoriteCoffees: [],
  },
  {
    name: 'Karina',
    username: 'karina123',
    email: 'karina123@mail.com',
    password: 'karina123@mail.com',
    isRoaster: true,
    favoriteCoffees: [],
  },
];

const roasters = [
  {
    name: 'Clara',
    location: {
      city: 'Recife',
      country: 'Brazil',
    },
    logo: '',
    website: 'clara.com',
    coffees: [],
  },
  {
    name: 'Karina',
    location: {
      city: 'Lisboa',
      country: 'Portugal',
    },
    logo: '',
    website: 'karina.com',
    coffees: [],
  },
];

const MONGO_URI =
  process.env.MONGODB_URI ||
  'mongodb://localhost/ironhack-project-which-coffee';

let coffeeDocuments;
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Coffee.create(coffees);
  })
  .then((createdCoffees) => {
    coffeeDocuments = createdCoffees;
    users[0].favoriteCoffees.push(createdCoffees[0]._id);
    users[1].favoriteCoffees.push(createdCoffees[1]._id);
    return User.create(users);
  })
  .then(() => {
    return Roaster.create(roasters);
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });
