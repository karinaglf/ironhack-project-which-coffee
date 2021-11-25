const router = require('express').Router();
const Roaster = require('../models/Roaster.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

// GET - Show all roasters list

router.get('/roasters', (req, res) => {
  const user = req.session.user;
  Roaster.find()
    .then((roastersList) => {
      res.render('roasters/roasters-listing', { roastersList, user });
    })
    .catch((err) => console.log('Error while displaying all roasters: ', err));
});

// GET /roaster-search?name="str"&originCountry="str"
router.get('/roaster-search', (req, res) => {
  const user = req.session.user;
  const roasterName = req.query.name;
  const country = req.query.country;

  //call the DB and find all the roasters that match the name
  Roaster.find({
    name: { $regex: roasterName, $options: 'i' },
    'location.country': { $regex: country, $options: 'i' },
  }) //makes it case sensitive and looks for any letter present in the title
    .then((foundRoaster) => {
      //render the page and display the found roasters
      res.render('roasters/roasters-listing', {
        roastersList: foundRoaster,
        user,
      });
    });
});

// GET   /roasters/detail/:roasterId
router.get('/roasters/detail/:roasterId', (req, res) => {
  const user = req.session.user;
  console.log('req.params', req.params);
  const roasterId = req.params.roasterId;

  Roaster.findById(roasterId) //
    .then((oneRoaster) => {
      res.render('roasters/roaster-details', { oneRoaster, user });
    });
});

//GET /roasters/create-roaster
router.get('/roasters/create-roaster', (req, res) => {
  const user = req.session.user;
  res.render('roasters/create-roaster', { user });
});

//POST - /roasters/create-roaster - Send and save data from form to database
router.post(
  '/roasters/create-roaster',
  fileUploader.single('logo'),
  (req, res) => {
    const { name, country, city, description, website, coffees } = req.body;
    const user = req.session.user;

    //Check if there is any form input file to upload otherwise model default
    let logo;
    if (req.file) {
      logo = req.file.path;
    }
    Roaster.create({
      name,
      'location.country': country,
      'location.city': city,
      logo,
      description,
      website,
      coffees,
    })
      .then((createdRoaster) => {
        res.redirect(`/roasters/detail/${createdRoaster._id}`);
        return User.findByIdAndUpdate(
          user._id,
          { $push: { roaster: createdRoaster._id } },
          { new: true }
        )
      .then
      })
      .catch((err) => console.log('Error while creating a roaster: ', err));
  }
);
//GET /roasters/edit-roaster/:roasterId - Show the Edit Form
router.get('/roasters/edit-roaster/:roasterId', (req, res, next) => {
  const user = req.session.user;
  Roaster.findById(req.params.roasterId)
    .then((foundRoaster) => {
      res.render('roasters/edit-roaster', { roaster: foundRoaster, user });
    })
    .catch((err) =>
      console.log('Error while getting the roaster for the edit form: ', err)
    );
});

// POST  /roasters/edit-roaster/:roasterId
router.post(
  '/roasters/edit-roaster/:roasterId',
  fileUploader.single('logo'),
  (req, res) => {
    const roasterId = req.params.roasterId;
    const {
      name,
      country,
      city,
      description,
      website,
      coffees,
      existingImage,
    } = req.body;

    //Check if there was an update on the logo file
    if (req.file) {
      logo = req.file.path;
    } else {
      logo = existingImage;
    }

    Roaster.findByIdAndUpdate(
      roasterId,
      { name, country, city, description, website, coffees, logo },
      { new: true }
    )
      .then((updatedRoaster) => {
        // if everything is fine, take me back to the details page so we can see the changes we made
        res.redirect(`/roasters/detail/${roasterId}`);
      })
      .catch((err) =>
        console.log('Error while getting the updated roaster: ', err)
      );
  }
);

// POST - Claim my Business
router.post('/roasters/detail/:roasterId/claim-my-business', (req, res) => {
  const userId = req.session.user._id;
  const theRoaster = req.params.roasterId;

  User.findById(userId)
    .then((currentUser) => {
      const currentRoasters = currentUser.roaster;
      console.log(`currentRoasters`, currentRoasters);
    })
    .catch((err) =>
      console.log('Error while relating roaster with user: ', err)
    );
});

// POST - Delete Roasters
router.post('/roasters/detail/:roasterId/delete', (req, res) => {
  Roaster.findByIdAndRemove(req.params.roasterId)
    .then(() => {
      res.redirect('/roasters');
    })
    .catch((err) => console.log('Error while deleting a roaster: ', err));
});

module.exports = router;
