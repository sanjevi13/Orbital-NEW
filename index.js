const express = require("express");
const app = express();
const mongoose = require('mongoose'); //interacting with mongoDB 
const dotenv = require("dotenv"); 
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const userRoute = require('./routes/users');
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
const port = process.env.PORT || 5000;

dotenv.config();

mongoose.connect('mongodb+srv://glyfy:glyfy@cluster0.j2bnm.mongodb.net/orbital?retryWrites=true&w=majority', {useNewURLParser: true}, () => {
    console.log("Connected to MongoDB");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(port, () => {
    console.log("backend server is running at port 5000" )
});