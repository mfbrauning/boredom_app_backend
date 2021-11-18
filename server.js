//////////////////////////////
// DEPENDENCIES
//////////////////////////////
require("dotenv").config();
const { PORT = 3000, DATABASE_URL, SECRET} = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("./auth")


//////////////////////////////
// MIDDLEWARE
//////////////////////////////
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


//////////////////////////////
// DATABASE CONNECTION
//////////////////////////////
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .on("open", () => console.log("connected to mongoose"))
  .on("close", () => console.log("disconnected from mongoose"))
  .on("error", (error) => console.log(error));
/////////////////////
// Model
/////////////////////
// user model
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }, {timestamps: true}
)

const User = mongoose.model("user", userSchema)



const movieSchema = new mongoose.Schema(
  {
    title: String,
    director: String,
    year: Number,
    genre: String,
    image: String,
    rating: String,
    link: String,
    video: String,
  },
  { timestamp: true }
);

const Movie = mongoose.model("Movie", movieSchema);

const bookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    year: Number,
    genre: String,
    image: String,
    link: String,
  },
  { timestamp: true }
);

const Book = mongoose.model("Book", bookSchema);


// router
app.get("/", auth, (req, res) => {
    res.json(req.payload)
})

//////////////////////////////
// User Routes
//////////////////////////////
app.post("/signup", async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create(req.body)
        res.json(newUser)
    } catch(error) {
        res.status(400).json(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (user){
            const match = await bcrypt.compare(password, user.password)
            if(match){
                const token = await jwt.sign({username}, SECRET)
                res.json({token})
            } else {
                res.status(400).json({error: "password does not match"})
            }
        } else {
            res.status(400).json({error: "user does not exist"})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})



//////////////////////////////
// Movie Routes
//////////////////////////////
// Test Route
app.get("/", (req, res) => {
  res.send("boredom app is working");
});

// Index Route
app.get("/movies", async (req, res) => {
  try {
    res.json(await Movie.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Create Route
app.post("/movies", async (req, res) => {
  try {
    res.json(await Movie.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update Route
app.put("/movies/:id", async (req, res) => {
  try {
    res.json(
      await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Route
app.delete("/movies/:id", async (req, res) => {
  try {
    res.json(await Movie.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

/////////////////////////
// Book Routes
////////////////////////

// Index Route
app.get("/books", async (req, res) => {
  try {
    res.json(await Book.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Create Route
app.post("/books", async (req, res) => {
  try {
    res.json(await Book.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update Route
app.put("/books/:id", async (req, res) => {
  try {
    res.json(
      await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete Route
app.delete("/books/:id", async (req, res) => {
  try {
    res.json(await Book.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

//////////////////////////////
// LISTENER
//////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
