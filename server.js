// npm installs or routes
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env


//Routes
const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const userfoodRoutes = require('./routes/userfoodRoutes');
const cartRoutes = require('./routes/cartRoutes');

//Middleware
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const { checkCart } = require('./middleware/cartMiddleware');
const clearCarts = require('./middleware/clearCart'); 



//Configure App
const app = express();
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const PORT = process.env.PORT || 3000;

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then((result) => app.listen(PORT), console.log(`Listening on port ${PORT}`))
.catch((err) => console.log(err));


//Established middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// Routes 
app.get('*', checkUser);
app.get('*', checkCart)

app.use(authRoutes);
app.use(foodRoutes);
app.use(userfoodRoutes);
app.use(cartRoutes);

app.get('/', function (req, res) {
  res.render("index")
});




