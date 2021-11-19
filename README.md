## Description

A platform to discover - according to your taste - a selection of specialty coffee beans from the greatest roasters. Users can find, filter and add coffees to their favorite list.

**Keywords**: coffee beans, coffee roasters, specialty coffee, matc, discovery, coffee lovers.

## User Stories

- **404** - As a user I want to see an aesthetic 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see an aesthetic error page when the super team screws it up so that I know that is not my fault.
- **Homepage** - As a user I want to be able to access the homepage and filter the existing coffees by general fields and filter roasters by location, log in and sign up.
- **Coffee Results** - As a user I want to see the list of coffee beans filtered by my preferences and be able to click on each one if I want learn more information about it.
- **Roasters Results** - As a user I want to see the list of roasters filtered by my searched location and be able to click on each one if I want learn more information about it.
- **Coffee Detail** - As a user I want to see more details about the coffee bean, such as: roaster that supplies it, process, origin, flavor, roasting type, etc. Plus, be able to save the coffee as a favorite.
- **Roaster Detail** - As a user, I want to see more details about the roasters, like: location, logo, description and check a list of coffees that are supplied by them. 
- **Sign Up** - As a user I want to sign up on the web page and knowand choose from a coffee-enthusiast or a roaster profile. On the signup page, I want to know that if I sign up I will be able take a quizz that will recommend coffees from the database. Also if I'm roaster I can add, edit or remove my coffee beans from the database.
- **Log In** - As a user I want to be able to log in on the web page so that I can get back to my account.
- **Log Out** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **Profile Page** - As logged-in user I want to be able access my profile and see a list of my favorite coffees.
- **Edit Profile** - As a user I want to be able to edit my profile and remove coffees from my favorite list.
- **Take Quizz** - As a user I want to take a quizz to discover coffee beans according to my taste. **(BACKLOG)**
- **Quizz Result** - As a user I want to be able to see the result of the quizz I just did. **(BACKLOG)**
- **Add Coffee** - As a user with a roaster account, I want to be able to add new coffees to the database and attach them to my roaster company profile. **(BACKLOG)**
- **Edit Coffee -** As a user with a roaster account, I want to be able to edit the existing coffees that are related to my roaster company profile. **(BACKLOG)**
- **Delete Coffee -** As a user with a roaster account, I want to be able to remove the existing coffees that are related to my roaster company profile from the database. **(BACKLOG)**

## Server Routes (back-end)

| Method   | Route                                | Description                                                  | Request Body                               |
| -------- | ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------ |
| `GET`    | `/`                                  | Main page route. Renders home index view.                    |                                            |
| `GET`    | `/coffees`                           | Renders coffees-list view and display coffee-search-form     | {origin, name}                             |
| `GET`    | `/coffees-search-result`             | Renders  searched-coffee view                                |                                            |
| `GET`    | `/coffee/detail/:coffeeId`           | Renders coffee-detail view and favorite button that POST to coffees/favorites/add-favorite | {coffeeId}                                 |
| `GET`    | `/roasters`                          | Renders roasters-list view and display roasters-search-form  | {name, country}                            |
| `GET`    | `/roasters-search-result`            | Renders  searched-roaster view                               |                                            |
| `GET`    | `/roaster/detail/:roasterId`         | Renders roaster-detail view                                  |                                            |
| `GET`    | `/signup`                            | Renders auth/signup-form view.                               | { username, email, password, profileType } |
| `POST`   | `/signup`                            | Sends Sign Up info to the server and creates user in the DB. Redirect to index view |                                            |
| `GET`    | `/login`                             | Renders auth/login-form view.                                | { username                                 |
| `POST`   | `/login`                             | Sends Login form data to the server. Redirect to index view  |                                            |
| `POST`   | `/logout`                            | Log user out and redirects to index view                     |                                            |
| `GET`    | `/profile/:userId`                   | Private route. Renders to user-profile view and renders favorite-coffees-view . If profileType is roaster renders my-coffees view |                                            |
| `POST`   | `coffees/favorites/add-favorite`     | Add a new favorite coffee to the user-profile view           |                                            |
| `DELETE` | `coffees/favorites/delete/:coffeeID` | Deletes the existing favorite from the current user.         |                                            |
| `GET`    | `/quiz`                              | Renders coffee-quiz view                                     |                                            |
| `POST`   | `/quiz`                              | Renders coffee-quiz-result view                              | quiz to be defined                         |
| `GET`    | `/coffees/add-coffee`                | Renders add-coffee view for profileType roaster              | {}                                         |
| `POST`   | `/coffees/add-coffee`                | Send add-coffee form info to server and create coffee in DB  |                                            |
| `GET`    | `/coffees/edit-coffee/:coffeeId`     | Renders edit-coffee view                                     |                                            |
| `PUT`    | `/coffees/edit-coffee/:coffeeId`     | Send edit-coffee form into to server and updates coffee in DB |                                            |
| `DELETE` | `/coffees/delete/:coffeeId`          | Deletes the existing coffee from the coffees Collection      |                                            |



## Models

**Users**

```
{
  name: {type: String, required: true},
  username: {type: String, required: true},
	email: {type: String, required: true},
  password: {type: String, required: true},
	userType: {type: String, enum: ['Customer', 'Roaster'], required: true},
	favoriteCoffees: [{ type: Schema.Types.ObjectId, ref: 'Coffees' }]
},
{
  timestamps: true
}
```

**Coffees**

```
 {
  name: {type: String, required: true },
  process: {type: String, enum: ['Natural', 'Washed', 'Honey', 'Other'], default:'Other', required: true},
  originCountry: {type: String, required: true},
  variety: {type: String, required: true},
  roastType: {type: String, enum: ['Filter', 'Espresso'], required: true},
  flavor: {type: String, required: true},
  description: {type: String},
  roaster: {
    type: Schema.Types.ObjectId,
    ref: 'Roaster'
  }
  }
```

**Roasters**

```
{
  name: {type: String, required: true },
  location: {
    city: {type: String, required: true },
    country: {type: String, required: true }
  },
  logo: { type: String, default: '../images/avatar.png' },
  site: {type: String, required: true },
}
```

## Backlog

- Coffee Quiz
- Add Reviews
- Coffee Roaster Login - Add/ Edit or Delete Products
- Create a public API with the db we made.

## Links

#### Git

[Repository Link](https://github.com/karinaglf/ironhack-project-which-coffee)

Deploy Link

#### Project  Management

[Notion Page](https://karinaglf.notion.site/Project-Which-Coffee-323ebe1af0e349678bb803fc34621390)

#### Slides

Our Presentation