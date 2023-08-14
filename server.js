// npm installs
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const app = express()

// database connection
const dbURI = 'mongodb+srv://jrp329:Awesome101@rgm.bciueqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');

// Routes 
app.get('/', function (req, res) {
  res.render("index")
})

app.get('/login', function (req, res) {
  res.render("login")
})

app.get('/signup', function (req, res) {
  res.render("signup")
})

