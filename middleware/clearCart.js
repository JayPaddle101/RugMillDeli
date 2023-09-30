const cron = require('node-cron');
const Cart = require("../models/Cart");

// Schedule the task to run daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // Find all carts and clear their items lists
    const carts = await Cart.find();
    for (const cart of carts) {
      cart.items = [];
      await cart.save();
    }
    console.log('Carts cleared at midnight.');
  } catch (error) {
    console.error('Error clearing carts at midnight:', error);
  }
});