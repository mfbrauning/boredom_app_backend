//////////////////////////////
// DEPENDENCIES
//////////////////////////////
require("dotenv").config();
const { PORT = 3000, DATABASE_URL } = process.env;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan")


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
    useNewUrlParser: true
});
mongoose.connection
    .on("open", () => console.log("connected to mongoose"))
    .on("close", () => console.log("disconnected from mongoose"))
    .on("error", (error)=> console.log(error));


//////////////////////////////
// ROUTES
//////////////////////////////
// Test Route
app.get("/", (req, res) => {
    res.send("boredom app is working")
})


//////////////////////////////
// LISTENER
//////////////////////////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))