# When Boredom Strikes BackEnd
## Welcome to the When Boredom Strikes BackEnd 

### Dependencies
- Mongoose
- Express
- dotenv
- Cors
- Morgan

### Model/Schema/
## Movies

title: String,  
director: String,  
year: Number,  
genre: String,  
image: String,  
rating: Number,  
link: String,  
video: String  

## Books

title: String,  
author: String,  
year: Number,  
genre: String,  
image: String,  
link: String  

### Route Table
## Movies
| URL | Method | Action |
|-----|--------|--------|
| / | GET | Test Route |
| /movies | GET | Index page of all Movies|
| /movies | POST | Create New Movie |
| /movies/:id | PUT | Update Movie |
| /movies/:id | DELETE | Delete selected Movie |

## Books 
| URL | Method | Action |
|-----|--------|--------|
| /books | GET | Index page of all Books|
| /books | POST | Create New Books |
| /books/:id | PUT | Update Books |
| /books/:id | DELETE | Delete selected Books |

### User Stories
When a user is in the backend of the application the user should be able to display all the Movies and Books created. If a user is using Postman, Thunder Client, or Insomnia they can go to the routes listed about to create, update, or delete Movies or Books. If any errors occur while trying to do so double check what kind of request, you are making to the server and verify it with what you are attempting. For reference use the table above for guidance on which route to take. The user will also have to sign in or sign up when opening the app after doing so they will have access to a list of movies, books, and a random snack recipe. 

### Challenges
