const Sandwich = require("../models/Sandwich");
const UserSandwich = require("../models/userSandwich");
const Cart = require("../models/Cart");
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;


//validate UserSandwich
module.exports.valIngSandwich = async(req, res) =>{
  const { selectedItems } = req.body;
    
  // Validate the selected items using the Sandwich model static method
  const validationResponse = await Sandwich.validateItems(selectedItems);
  
  if (validationResponse.valid) {

      // If all selected items are valid, you can proceed to now making the Sandwich
       
      const sandwichResponse  = await UserSandwich.makeSandwich(selectedItems, validationResponse.sandwich, validationResponse.value);
      
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


      if(sandwichResponse.valid){
      console.log("User ID: " + UserID)

      res.status(200).json({ valid: true, message: "Post Request Valid", SanID: sandwichResponse.userSanID, UserID: UserID, Quantity: sandwichResponse.amount})
      console.log(sandwichResponse);

    }else{
      res.status(400).json({ error: sandwichResponse.message });
    }

  } else {
    // If there are validation errors, return an error response
    res.status(400).json({ error: validationResponse.message });
  }
}

//Update Quantity
module.exports.updateQuantity = async(req, res) =>{
  const { cartId, sandwichId, action } = req.body;
  console.log(cartId, sandwichId, action);

  try {
    // Find the userSandwich by ID
    const userSandwich = await UserSandwich.findById(sandwichId);
    const userCart = await Cart.findById(cartId);


    if (!userSandwich || !userCart) {
      return res.status(404).json({ ok: false, message: 'User Sandwich not found' });
    }
  
    // Update the quantity based on the action
    if (action === 'increase') {
      userSandwich.quantity += 1;
      userCart.quantity +=1;
    } else if (action === 'decrease' && userSandwich.quantity > 1) {
      userSandwich.quantity -= 1;
      userCart.quantity -=1;
    }

    // Calculate the actual_price based on base_price and quantity
    userSandwich.actual_price = (userSandwich.base_price * userSandwich.quantity).toFixed(2);
  
    // Save the updated userSandwich and userCart
    await userSandwich.save();
    await userCart.save();
  
    res.status(200).json({ ok: true, message: 'Quantity updated successfully' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  }

}


//Delete Sandwich
module.exports.deleteSandwich = async(req, res) =>{
  const { cartId, sandwichId } = req.body;
  console.log(cartId, sandwichId);

  try {
    // Find the userSandwich by ID
    const userSandwich = await UserSandwich.findById(sandwichId);
    const userCart = await Cart.findById(cartId);
    const deleted_sandwich_amount = userSandwich.quantity;
    const new_userCart_amount = userCart.quantity - deleted_sandwich_amount;

    const deletedUserSandwich = await UserSandwich.findByIdAndRemove(sandwichId);

    if (deletedUserSandwich) {
      if(userCart){
         // Find the index of the sandwichId in the items array
         const sandwichIndex = userCart.items.findIndex((item) =>
         item.sandwich.equals(sandwichId)
       );
       if (sandwichIndex !== -1) {
        // Remove the sandwichId from the items array
        userCart.items.splice(sandwichIndex, 1);
        userCart.quantity = new_userCart_amount;
        await userCart.save(); // Save the updated cart
        }
      }
      res.status(204).send({ ok: true, message: 'Deleted Sandwich successfully' }); // Send a 204 No Content response if successful
    } else{
      res.status(404).json({ ok: false, message: 'UserSandwich not found' });
    }

    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ ok: false, message: 'Internal server error' });
  } 




}
