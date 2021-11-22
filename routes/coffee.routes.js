const router = require('express').Router();
const Coffee = require('../models/coffee.model');
const fileUploader = require('../config/cloudinary.config');

// GET - Show all coffees list

router.get('/coffees', (req, res) => {
  Coffee.find()
    .then((coffeesList) => {
      res.render('coffees/all-coffees', { coffeesList });
    })
    .catch((err) => console.log('Error while displaying all coffees: ', err));
});

// GET /coffee-search?name="str"&originCountry="str"
router.get('/coffee-search', (req, res) => {
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
      res.render('coffees/coffees-search-result', {
        coffeesList: foundCoffees,
      });
    });
});

// GET   /coffees/detail/:coffeeId
router.get('/coffees/detail/:coffeeId', (req, res) => {
  console.log('req.params', req.params);
  const coffeeId = req.params.coffeeId;

  Coffee.findById(coffeeId) //
    .then((oneCoffee) => {
      res.render('coffees/coffee-details', { oneCoffee });
    });
});

//GET /coffees/create-coffee
router.get('/coffees/create-coffee', (req, res) => {
  res.render('coffees/create-coffee');
});

//POST - /coffees/create-coffee - Send and save data from form to database
router.post('/coffees/create-coffee', fileUploader.single('image'), (req, res) => {
  const { name, process, originCountry, variety, roastType, flavor, roaster } = req.body;
  
 //Check if there is any form input file to upload otherwise model default
 let image;
  if (req.file) {
    image = req.file.path;
  }

  Coffee.create({ name, process, originCountry, variety, roastType, flavor, roaster, image })
    .then((createdCoffee) => {
      console.log({createdCoffee})
      res.redirect(`/coffees/detail/${createdCoffee._id}`);
    })
    .catch((err) => console.log('Error while creating a coffee: ', err));
});

//GET /coffees/edit-coffee/:coffeeId - Show the Edit Form
router.get('/coffees/edit-coffee/:coffeeId', (req, res, next) => {
  Coffee.findById(req.params.coffeeId)
    .then((foundCoffee) => {
      res.render('coffees/edit-coffee', { coffee: foundCoffee });
    })
    .catch((err) =>
      console.log('Error while getting the coffee for the edit form: ', err)
    );
});

// POST  /coffees/edit-coffee/:coffeeId
router.post('/coffees/edit-coffee/:coffeeId', fileUploader.single('image'), (req, res) => {
  const coffeeId = req.params.coffeeId;
  const { name, process, originCountry, variety, roastType, flavor, roaster, existingImage } = req.body;

    //Check if there was an update on the image file 
    if (req.file) {
      image = req.file.path;
    } else {
      image = existingImage;
    }

    Coffee.findByIdAndUpdate( coffeeId, { name, process, originCountry, variety, roastType, flavor, roaster, image }, { new: true } )
    .then( updatedCoffee => {
      // if everything is fine, take me back to the details page so we can see the changes we made
      res.redirect(`/coffees/detail/${coffeeId}`);
    } )
    .catch( err => console.log("Error while getting the updated coffee: ", err))
  })

// POST - Delete Coffees
router.post('/coffees/detail/:coffeeId/delete', (req, res) => {
  Coffee.findByIdAndRemove(req.params.coffeeId)
    .then(() => {
      res.redirect('/coffees');
    })
    .catch((err) => console.log('Error while deleting a coffee: ', err));
});

module.exports = router;
