// npm installs or routes
const express = require('express')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');



//Configure App
const app = express()

// database connection
const dbURI = 'mongodb+srv://jrp329:Awesome101@rgm.bciueqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then((result) => app.listen(3000), console.log("Listening To Port 3000"))
.catch((err) => console.log(err));


// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');


// Routes 
app.get('*', checkUser);

app.use(authRoutes);
app.use(foodRoutes);

app.get('/', function (req, res) {
  res.render("index")
});

/*app.get('/test', function (req, res){
  res.render("test")
})*/


