const UserSandwich = require("../models/userSandwich");
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const jwtSecret = process.env.JWT_SECRET;


module.exports.addToCart = async(req, res) =>{
  const { sandwichId, userId, quantity } = req.body;
  console.log( "SandwichID: " + sandwichId + " UserID: " + userId + " Quantity: " + quantity)

  try {
    let cart = await Cart.findOne({ user: userId }).exec();
  
    if (cart) {
      // If a cart matching the criteria is found, 'cart' will contain the cart object
      console.log('Found Cart:', cart);
      const new_quantity = cart.quantity + quantity;
      cart.items.push({ sandwich: sandwichId });
      cart.quantity = new_quantity;
      try {
        // Save the updated cart
        await cart.save();
        res.json({ validCart: true, message: 'Cart updated', cartID: cart._id});
      } catch (error) {
        console.error('Error updating cart:', error);
        // Handle the error and return an error response to the frontend
      }
    } else {
      // If no cart is found, 'cart' will be null
      console.log('Cart not found');
      cart = new Cart({ user: userId, items: [], quantity: quantity });
      cart.items.push({ sandwich: sandwichId });
      try {
        // Save the updated cart
        await cart.save();
        res.json({ validCart: true, message: 'Cart updated', cartID: cart._id });
      } catch (error) {
        console.error('Error updating cart:', error);
        // Handle the error and return an error response to the frontend
      }

    }
  } catch (error) {
    console.error('Error:', error);
    res.status(401).json({ validCart: false, message: "Cart Post Request Failed"})
  }
  
  //res.status(200).json({ valid: true, message: "Cart Post Request Valid"})
}


module.exports.getCart = async (req, res) =>{

  const cartID = req.params.cartID;
  const cart = await Cart.findById(cartID);
  //console.log(cartID)

  const userSandwiches = [];

  for (const item of cart.items) {
    const userSandwich = await UserSandwich.findById(item.sandwich);
    userSandwiches.push(userSandwich);
  }

  //console.log(userSandwiches)

  res.render("cart", {userSandwiches, cart})
}

module.exports.processPayment = async(req, res) => {
  const { cartId } = req.body;
  
  try {
    // Find the cart by ID
    const cart = await Cart.findById(cartId).exec();

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate the total amount based on userSandwich items in the cart
    let totalAmount = 0;
    const taxRate = 0.066;


    for (const item of cart.items) {
      // Assuming you have a function to fetch userSandwich details by ID
      const userSandwich = await UserSandwich.findById(item.sandwich);
       
      if (userSandwich) {
        totalAmount += userSandwich.actual_price;
      }
    }
    
    const taxAmount = totalAmount * taxRate; 
    const actual_total = (taxAmount + totalAmount).toFixed(2);


    const lineItems = [];

    for (const item of cart.items) {
    // Fetch the userSandwich data for the current item
    const userSandwich = await UserSandwich.findById(item.sandwich);

    if (userSandwich) {
     // Create a line item for the current item
     const lineItem = {
      price_data: {
        currency: 'usd', // You can change the currency code to match your currency
        unit_amount: userSandwich.base_price * 100, // Convert to cents
        product_data: {
          name: userSandwich.name,
          description: userSandwich.ing_list, // Include the ing_list as description
        },
      },
      quantity: userSandwich.quantity,
     };

     // Add the line item to the lineItems array
     lineItems.push(lineItem);
     }
    }

    const taxLineItem = {
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(taxAmount * 100), // Convert to cents and round to an integer
        product_data: {
          name: 'Tax',
        },
      },
      quantity: 1, // Assuming tax is a fixed amount
    };

    // Add the tax line item to the lineItems array
    lineItems.push(taxLineItem);

    const cancelUrl = `http://localhost:3000/getCart/${cartId}`;
    const successUrl = `http://localhost:3000/confirmedPayment/${cartId}`;



    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    // Send the payment intent back to the client
    res.status(200).json({ ok: true, message: "Payment Fetch Confirmed", url: session.url})

    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

}


module.exports.confirmedPayment = async(req, res) => {
  const cartId = req.params.cartID;
  
  try {

    // Find the Cart document by cartId
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Loop through the items array and delete each userSandwich
    for (const item of cart.items) {
      const userSandwichId = item.sandwich;

      // Delete the userSandwich by ID
      await UserSandwich.findByIdAndDelete(userSandwichId).exec();
    }

    // After deleting userSandwich items, you can clear the items array in the Cart
    cart.items = [];
    cart.quantity = 0;
    await cart.save();

    res.render("success")


  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports.toCart = async(req, res) => {
  const token = req.cookies.jwt;
  let UserID = null;

  jwt.verify(token, jwtSecret , (err, decodedToken) =>{
    if (err) {
      console.log(err.message);
      res.redirect('/login');
    }else{
      UserID = decodedToken.id;
      
    }
  })

  console.log(UserID);

  try {
    const userCart = await Cart.findOne({ user: UserID })
    if(userCart){
      if(userCart.quantity > 0){
        res.status(200).json({ valid: true, message: "To Cart Allowed", cartID: userCart._id})
      }else{
        res.status(204).json({ valid: false, message: "Nothing In Cart"})
      }
    }else{
      res.status(404).json({ valid: false, message: "User does not have cart" });
    }
    
  } catch (error) {
    console.error('Error checking cart:', error);
    res.status(500).json({ valid: false, message: 'Internal server error' });
  }


}