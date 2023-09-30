// npm installs or routes
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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
const stripe = require('stripe')('sk_test_51NvlibLnsq0h6sVy4uw0cf0TEBeC4mVhsoFuTQvWr68eAHDgLT34wNx1JayyTifwPIBM8DcMS1e0or0lHhFzSJja001vq5corm');


// database connection
const dbURI = 'mongodb+srv://jrp329:Awesome101@rgm.bciueqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true,})
.then((result) => app.listen(3000), console.log("Listening To Port 3000"))
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




