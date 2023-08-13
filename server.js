// npm installs
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.listen(3000)

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// Routes 
app.get('/', function (req, res) {
  res.send('Hello World')
})

