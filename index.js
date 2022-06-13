const express = require("express");
const app = express();
const port = process.env.PORT || 5000; 
const mongoose = require('mongoose'); //interacting with mongoDB 
const dotenv = require("dotenv"); 
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const userRoute = require('./routes/users');
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const path = require("path");
const multer = require("multer");
const { json, cookie } = require("express/lib/response");

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');


dotenv.config();

mongoose.connect('mongodb+srv://glyfy:glyfy@cluster0.j2bnm.mongodb.net/orbital?retryWrites=true&w=majority', {useNewURLParser: true}, () => {
    console.log("Connected to MongoDB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());

//create sessions
app.use(cors({
  origin:"http://localhost:5000",
  methods:["GET", "POST", "PUT"],
  credentials: true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  key:"userID",
  secret:"jeviSHIT",
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: 60 * 60 * 24 * 1000
  }
}))

//some security stuff
app.use(helmet());
app.use(morgan("common"));

//routes 
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//uploading files to server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); //target folder for uploading files
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
})
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch(err){   
    console.log(err);   
  }
});

//heroku deployment
app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

//get backend running
var listener = app.listen(port, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});