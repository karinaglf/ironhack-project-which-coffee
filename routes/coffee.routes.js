const router = require("express").Router();
const Coffee = require("../models/coffee.model")

// GET - Show all coffees list

router.get("/coffees", (req, res) => {

    Coffee.find()
        .then((coffeesList)=> {
            res.render("coffees/all-coffees", {coffeesList});
        })
        .catch( (err) => console.log('Error while displaying all coffees: ',err));
  });

// GET /coffee-search?name="str"&originCountry="str"
router.get("/coffee-search", (req, res) => {
    console.log("req.query", req.query); //URL query values
    const coffeeName = req.query.name; //Grab the value from the query
    const originCountry = req.query.originCountry; //Grab the value from the query
  
    //call the DB and find all the coffees that match the name
    Coffee.find({ name: { $regex: coffeeName, $options: "i" }, originCountry: { $regex: originCountry, $options: "i" } }) //makes it case sensitive and looks for any letter present in the title
      .then((foundCoffees) => {
        //render the page and display the found coffees
        res.render("coffees/coffees-search-result", { coffeesList: foundCoffees });
      });
  });

module.exports = router;