# Read Me

## **Description**

A platform to discover - according to your taste - a selection of specialty coffee beans from the greatest roasters. Users can find, filter and add coffees to their favorite list.

**Keywords**: coffee beans, coffee roasters, specialty coffee, match, discovery, coffee lovers.

## **User Stories**

- **404** - As a user I want to see an aesthetic 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see an aesthetic error page when the super team screws it up so that I know that is not my fault.
- **Homepage** - As a user I want to be able to access the homepage and filter the existing coffees by general fields and filter roasters by location, login and sign up.
- **Coffee Results** - As a user I want to see the list of coffee beans filtered by the coffee name and the origin of the bean and be able to click on each one if I want learn more information about it.
- **Roasters Results** - As a user I want to see the list of roasters filtered by their company name and my location and be able to click on each one if I want learn more information about it.
- **Coffee Detail** - As a user I want to see more details about the coffee bean, such as: company that roasts it, process used to dry the green bean, origin, flavor, roasting type, etc. Plus, be able to save the coffee as a favorite.
- **Create Coffee** - As a user with a roaster account, I want to be able to add new coffees to the database and attach them to my roaster company profile.
- **Edit Coffee -** As a user with a roaster account, I want to be able to edit the existing coffees that are related to my roaster company profile.
- **Delete Coffee -** As a user with a roaster account, I want to be able to remove the existing coffees that are related to my roaster company profile from the database.
- **Roaster Detail** - As a user, I want to see more details about the roasters, like: location, logo, description and check a list of coffees that are supplied by them.
- **Create Roaster** - As a user with a roaster account, I want to be able to create a roaster company on the database and attach to my profile.
- **Edit Roaster -** As a user with a roaster account, I want to be able to edit the existing roaster profile that is related to me.
- **Delete Roaster** - As a user with a roaster account, I want to be able to remove the existing profile company from the database.
- **Sign Up** - As a user I want to sign up on the web page and knowand choose from a coffee-enthusiast or a roaster profile. On the sign up page, I want to know that if I sign up I will be able take a quiz that will recommend coffees from the database. Also if I'm roaster I can add, edit or remove my coffee beans from the database.
- **Log In** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **Log Out** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **Profile Page** - As logged-in user I want to be able access my profile and see a list of my favorite coffees.
- **Edit Profile** - As a user I want to be able to edit my profile and remove coffees from my favorite list.
- **Take Quiz** - As a user I want to take a quiz to discover coffee beans according to my taste.
- **Quiz Result** - As a user I want to be able to see a list of coffees from the database as a result of the quiz I just did.

## **Server Routes (back-end)**

| Method         | Route                                  | Description                                                  | Request Body                                           |
| -------------- | -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| GET            | /                                      | Main page route. Renders home index view.                    |                                                        |
| GET            | /coffees                               | Renders coffees-list view and display coffee-search-form     | {name, origin, flavor}                                 |
| GET            | /coffee-search                         | Renders coffees-listing view                                 |                                                        |
| GET            | /coffee/detail/:coffeeId               | Renders coffee-details view and favorite button that POST to coffees/detail/:coffeeId/add-favorite and res.redirect to /profile | {coffeeId}                                             |
| POST           | /coffees/detail/:coffeeId/add-favorite | Renders coffee-details and res.redirect to /profile displaying other coffees added to favorites. If the coffee is already on favorites, then it takes out. | {oneCoffee, user}                                      |
| GET            | /coffees/create-coffee                 | Renders the create-coffee view.                              | {                                                      |
| name,          |                                        |                                                              |                                                        |
| process,       |                                        |                                                              |                                                        |
| originCountry, |                                        |                                                              |                                                        |
| variety,       |                                        |                                                              |                                                        |
| roastType,     |                                        |                                                              |                                                        |
| flavor,        |                                        |                                                              |                                                        |
| roaster,       |                                        |                                                              |                                                        |
| }              |                                        |                                                              |                                                        |
| POST           | /coffees/create-coffee                 | Posts a created coffee and res.redirect to its coffee-details view |                                                        |
| GET            | /coffees/edit-coffee/:coffeeId         | Renders the edit-coffees view.                               |                                                        |
| POST           | /coffees/edit-coffee/:coffeeId         | Finds the coffee to be edited and updates it. Redirects to its coffee-details view. |                                                        |
| POST           | /coffees/detail/:coffeeId/delete       | Deletes an existing coffee and redirects to the /coffees.    |                                                        |
| GET            | /roasters                              | Renders roasters-listing view and display roasters-search-form. | {name, country}                                        |
| GET            | /roasters-search                       | Renders roasters-listing view.                               |                                                        |
| GET            | /roaster/detail/:roasterId             | Renders roaster-details view.                                |                                                        |
| GET            | /roasters/create-roaster               | Renders create-roaster form view.                            | { name, country, city, description, website, coffees } |
| POST           | /roasters/create-roaster               | Creates a roaster and res.redirect to its details view.      |                                                        |
| GET            | /roasters/edit-roaster/:roasterId      | Renders the edit-roaster view.                               |                                                        |
| POST           | /roasters/edit-roaster/:roasterId      | Gets the roaster to be edited and updates it. Redirects to its roaster-details view. |                                                        |
| POST           | /roasters/detail/:roasterId/delete     | Deletes an existing roaster and redirects to the /roasters.  |                                                        |
| GET            | /signup                                | Renders auth/signup-form view.                               | { firstName, email, password, profileType }            |
| POST           | /signup                                | Sends Sign Up info to the server and creates user in the DB. Redirects to index view |                                                        |
| GET            | /login                                 | Renders auth/login-form view.                                | { email, password}                                     |
| POST           | /login                                 | Sends Login form data to the server. Redirect to index view  |                                                        |
| POST           | /logout                                | Log user out and redirects to index view                     |                                                        |
| GET            | /profile/:userId                       | Private route. Renders to user-profile view where are user's favorite coffees. If profileType is roaster renders the company profile view and the user's favorite coffees. |                                                        |
| GET            | /quiz                                  | Renders /quiz view.                                          |                                                        |
| POST           | /quiz                                  | Gets the answers from the quiz form and redirects to the coffee-listing view with the coffee origin filtered by the quiz result. |                                                        |

## **Models**

**Users**

`{
username: { type: String, required: true },
email: { type: String, required: true },
password: { type: String, required: true },
profileType: { type: String,  enum: ['roaster', 'coffeeLover'], required: true },
roaster: { type: Schema.Types.ObjectId, ref: 'Roaster' },
favoriteCoffees: [{ type: Schema.Types.ObjectId, ref: 'Coffee' }],
},
{
timestamps: true,
}`

**Coffees**

`{
name: { type: String, required: true },
process: {
type: String,
enum: ['natural', 'washed', 'honey', 'other'],
default: 'other',
required: true,
},
originCountry: { type: String, required: true },
variety: { type: String, required: true },
roastType: [{ type: String, enum: ['filter', 'espresso'], required: true }],
flavor: { type: String, required: true },
roaster: { type: Schema.Types.ObjectId, ref: 'Roaster' },
image: { type: String, default: '/images/img-coffee-placeholder.jpeg' },
}`

**Roasters**

`{
name: { type: String, required: true },
location: {
city: { type: String, required: true },
country: { type: String, required: true },
},
logo: { type: String, default: '/images/img-logo-placeholder.jpeg' },
description: { type: String, required: true },
website: { type: String, required: true },
coffees: [{ type: Schema.Types.ObjectId, ref: 'Coffee' }],
}`

## **Backlog**

- Add Reviews
- Create a public API with the db we made.
- Admin profile.

## **Links**

### **Git**

[Repository Link](https://github.com/karinaglf/ironhack-project-which-coffee)

### Heroku

[Deploy Link](https://which-coffee.herokuapp.com/)
