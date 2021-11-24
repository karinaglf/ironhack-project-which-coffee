const router = require('express').Router();
const Coffee = require('../models/Coffee.model');
const fileUploader = require('../config/cloudinary.config');
const User = require('./../models/User.model');
const isRoaster = require('./../middleware/isRoaster');
const Roaster = require('../models/Roaster.model');

// GET - Show all coffees list

router.get('/coffees', (req, res) => {
  const user = req.session.user;
  Coffee.find()
    .populate('roaster')
    .then((coffeesList) => {
      res.render('coffees/coffees-listing', { coffeesList, user });
    })
    .catch((err) => console.log('Error while displaying all coffees: ', err));
});

// GET /coffee-search?name="str"&originCountry="str"
router.get('/coffee-search', (req, res) => {
  const user = req.session.user;
  console.log('req.query', req.query); //URL query values
  const coffeeName = req.query.name; //Grab the value from the query
  const originCountry = req.query.originCountry; //Grab the value from the query

  //call the DB and find all the coffees that match the name
  Coffee.find({
    name: { $regex: coffeeName, $options: 'i' },
    originCountry: { $regex: originCountry, $options: 'i' },
  }) //makes it case sensitive and looks for any letter present in the title
    .then((foundCoffees) => {
      //render the page and display the found coffees
      res.render('coffees/coffees-listing', {
        coffeesList: foundCoffees,
        user,
      });
    });
});

// GET   /coffees/detail/:coffeeId
router.get('/coffees/detail/:coffeeId', (req, res) => {
  const user = req.session.user;
  console.log('req.params', req.params);
  const coffeeId = req.params.coffeeId;
  

  Coffee.findById(coffeeId)
    .populate('roaster')
    .then((oneCoffee) => {
      res.render('coffees/coffee-details', { oneCoffee, user });
    });
});

//GET /coffees/create-coffee
router.get('/coffees/create-coffee', isRoaster, (req, res) => {
  const user = req.session.user;
  Roaster.find().then((roasterList) => {
    res.render('coffees/create-coffee', { roasterList, user });
  });
});

//POST - /coffees/create-coffee - Send and save data from form to database
router.post(
  '/coffees/create-coffee',
  fileUploader.single('image'),
  (req, res) => {
    const {
      name,
      process,
      originCountry,
      variety,
      roastType,
      flavor,
      roaster,
    } = req.body;

    //Check if there is any form input file to upload otherwise model default
    let image;
    if (req.file) {
      image = req.file.path;
    }

    Coffee.create({
      name,
      process,
      originCountry,
      variety,
      roastType,
      flavor,
      roaster,
      image,
    })
      .then((createdCoffee) => {
        console.log({ createdCoffee });
        res.redirect(`/coffees/detail/${createdCoffee._id}`);
      })
      .catch((err) => console.log('Error while creating a coffee: ', err));
  }
);

//GET /coffees/edit-coffee/:coffeeId - Show the Edit Form
router.get('/coffees/edit-coffee/:coffeeId', (req, res, next) => {
  const user = req.session.user;
  Coffee.findById(req.params.coffeeId)
    .populate('roaster')
    .then((foundCoffee) => {
      Roaster.find().then((roasterList) => {
        res.render('coffees/edit-coffee', {
          coffee: foundCoffee,
          roasterList,
          user,
        });
      });
    })
    .catch((err) =>
      console.log('Error while getting the coffee for the edit form: ', err)
    );
});

// POST  /coffees/edit-coffee/:coffeeId
router.post(
  '/coffees/edit-coffee/:coffeeId',
  fileUploader.single('image'),
  (req, res) => {
    const coffeeId = req.params.coffeeId;
    const {
      name,
      process,
      originCountry,
      variety,
      roastType,
      flavor,
      roaster,
      existingImage,
    } = req.body;

    //Check if there was an update on the image file
    if (req.file) {
      image = req.file.path;
    } else {
      image = existingImage;
    }

    Coffee.findByIdAndUpdate(
      coffeeId,
      {
        name,
        process,
        originCountry,
        variety,
        roastType,
        flavor,
        roaster,
        image,
      },
      { new: true }
    )
      .then((updatedCoffee) => {
        // if everything is fine, take me back to the details page so we can see the changes we made
        res.redirect(`/coffees/detail/${coffeeId}`);
      })
      .catch((err) =>
        console.log('Error while getting the updated coffee: ', err)
      );
  }
);

// POST - Add Coffee as Favorite
router.post('/coffees/detail/:coffeeId/add-favorite', (req, res) => {
  const userId = req.session.user._id;
  const theCoffee = req.params.coffeeId;

  User.findById(userId)
    .then((currentUser) => {
      const currentFavorites = currentUser.favoriteCoffees;

      if (currentFavorites.includes(theCoffee)) {
        return User.findByIdAndUpdate(
          currentUser._id,
          { $pull: { favoriteCoffees: theCoffee } },
          { new: true }
        )
          .then((updatedUser) => {
            console.log('THE FAVORITES WAS REMOVED');
            res.redirect('/profile');
          })
          .catch((err) =>
            console.log(
              'Error while removing a coffee from the favorites list: ',
              err
            )
          );
      } else {
        return User.findByIdAndUpdate(
          currentUser._id,
          { $push: { favoriteCoffees: theCoffee } },
          { new: true }
        )
          .then((updatedUser) => {
            console.log('THE FAVORITES WAS ADDED');
            res.redirect('/profile');
          })
          .catch((err) =>
            console.log(
              'Error while adding a coffee to the favorites list: ',
              err
            )
          );
      }
    })
    .catch((err) =>
      console.log('Error while editing the favorite coffees list: ', err)
    );
});

// POST - Delete Coffees
router.post('/coffees/detail/:coffeeId/delete', (req, res) => {
  Coffee.findByIdAndRemove(req.params.coffeeId)
    .then(() => {
      res.redirect('/coffees');
    })
    .catch((err) => console.log('Error while deleting a coffee: ', err));
});

module.exports = router;
