const jwt = require('jsonwebtoken');
const Cart = require("../models/Cart");
const jwtSecret = process.env.JWT_SECRET;


// Define a middleware function to check the user's cart
const checkCart = async (req, res, next) => {
    
    const token = req.cookies.jwt;
    let UserID = null;

    jwt.verify(token, jwtSecret , (err, decodedToken) =>{
       if (err) {
          //console.log(err.message);
          //res.redirect('/');
          next();
        }else{
          UserID = decodedToken.id;
          
        }
    })


    try {
      const userHasCart = await Cart.findOne({ user: UserID })
       
      if(userHasCart){
        const cartSize = userHasCart.quantity;
        // Set the cartSize variable in res.locals to make it accessible in EJS templates
        res.locals.cartSize = cartSize;
      }else{
        res.locals.cartSize = 0;
      }

      // Continue with the next middleware or route handler
      next();
    } catch (error) {
        console.error('Error checking cart:', error);
        next(error);
    }

};

module.exports = { checkCart }; 